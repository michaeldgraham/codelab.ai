import { Machine, assign, sendParent } from 'xstate'
import { ContextNode } from './machine-node--context'
import {
  EventNameNode,
  EventNode,
  EventNodeCreate,
  EventNodeDelete,
  EventNodeEdit,
  EventNodeEditSubmit,
} from './machine-node--event'
import { StateNameNode, StateSchemaNode } from './machine-node--state'
import { NodeService as NodeServiceEntity } from '@codelab/core/node'
import { EventNameApp } from '@codelab/state/app'

export const createMachineNode = (nodeService: NodeServiceEntity) => {
  return Machine<ContextNode, StateSchemaNode, EventNode>({
    id: 'node',
    initial: StateNameNode.LOADING,
    context: {
      nodes: [],
      node: null,
      editedNode: null,
      nodeService,
    },
    states: {
      [StateNameNode.IDLE]: {
        on: {
          [EventNameNode.NODE_CREATE]: {
            target: StateNameNode.CREATING,
          },
          [EventNameNode.NODE_DELETE]: {
            target: StateNameNode.DELETING,
          },
          [EventNameNode.NODE_EDIT]: {
            target: StateNameNode.EDITING,
          },
        },
      },
      [StateNameNode.LOADING]: {
        invoke: {
          id: 'getNodes',
          src: (ctx) =>
            new Promise((resolve, reject) => {
              ctx.nodeService.getNodes(resolve)
            }),
          onDone: {
            target: StateNameNode.LOADED,
          },
        },
      },
      [StateNameNode.LOADED]: {
        entry: [
          assign<ContextNode, any>({
            nodes: (ctx: ContextNode, event: any) => {
              return [...event.data]
            },
          }),
        ],
        always: StateNameNode.IDLE,
      },
      [StateNameNode.CREATING]: {
        invoke: {
          id: 'creating_node',
          src: (ctx, event) =>
            new Promise((resolve, reject) => {
              ctx.nodeService.createNode(
                (event as EventNodeCreate).payload,
                resolve,
              )
            }),
          onDone: {
            target: StateNameNode.CREATED,
          },
        },
      },
      [StateNameNode.CREATED]: {
        entry: [
          assign<ContextNode, any>({
            nodes: (ctx: ContextNode, event: any) => {
              return [...ctx.nodes, { ...event.data, key: event.data.id }]
            },
          }),
          sendParent((ctx, event) => ({
            type: EventNameApp.CREATED_NODE,
            payload: (event as EventNodeCreate).payload,
          })),
        ],
        always: StateNameNode.IDLE,
      },
      [StateNameNode.DELETING]: {
        invoke: {
          id: 'deleting_node',
          src: (ctx, event) =>
            new Promise((resolve, reject) => {
              ctx.nodeService.deleteNode(
                (event as EventNodeDelete).payload,
                resolve,
              )
            }),
          onDone: {
            target: StateNameNode.DELETED,
          },
        },
      },
      [StateNameNode.DELETED]: {
        always: StateNameNode.LOADING,
      },
      [StateNameNode.EDITING]: {
        entry: [
          assign({
            editedNode: (ctx, event) =>
              ctx.nodes.find(
                (node) => node.id === (event as EventNodeEdit).payload,
              ) as ContextNode['nodes'][number],
          }),
          sendParent((ctx, event) => ({
            type: EventNameApp.EDITING_NODE,
          })),
        ],
        on: {
          [EventNameNode.NODE_EDIT_CANCEL]: {
            actions: assign<ContextNode, any>({
              editedNode: null,
            }),
            target: StateNameNode.IDLE,
          },
          [EventNameNode.NODE_EDIT_SUBMIT]: {
            target: StateNameNode.EDIT_SUBMITTING,
          },
        },
      },
      [StateNameNode.EDIT_SUBMITTING]: {
        invoke: {
          id: 'edit_node_submitting',
          src: (ctx, event) =>
            new Promise((resolve, reject) => {
              ctx.nodeService.updateNode(
                (event as EventNodeEditSubmit).payload,
                resolve,
              )
            }),
          onDone: {
            target: StateNameNode.EDITED,
          },
        },
      },
      [StateNameNode.EDITED]: {
        entry: [
          assign<ContextNode, any>({
            nodes: (ctx: ContextNode, event: any) => {
              const editedNode = event.data
              const index = ctx.nodes
                .map((node) => node.id)
                .indexOf(editedNode.id)
              const newNodes = [...ctx.nodes]

              newNodes[index] = editedNode

              return newNodes
            },
          }),
          sendParent((ctx, event) => ({
            type: EventNameApp.EDITED_NODE,
            payload: (event as EventNodeCreate).payload,
          })),
        ],
        always: StateNameNode.IDLE,
      },
      [StateNameNode.ERROR]: {},
      [StateNameNode.SUCCESS]: {},
    },
  })
}
