/**
 * We construct a tree by traversing the tree data using the treeAppender strategy
 */

import { reduce } from 'lodash'
import { Graph } from '@codelab/core/graph'
import { Node } from '@codelab/core/node'
import {
  graphAppenderIteratee,
  treeAppenderIteratee,
  treeWalker,
} from '@codelab/core/traversal'
import { NodeDtoI } from '@codelab/shared/interface/node'
import { GraphSubTreeAcc, TreeSubTreeAcc } from '@codelab/shared/interface/tree'

/**
 * This method generates a non-binary tree given JSON input. Each input node is
 *
 * @param input - Input data with a tree-like structure, in JSON format.
 *
 * @returns Root `Node` of the `Tree`
 *
 * ```typescript
 * const tree = makeTree(data)
 * ```
 *
 */
export const makeTree = (input: NodeDtoI): Node => {
  const root = new Node(input)
  const subTreeContext = {
    subTree: root,
    prev: root,
    parent: root,
  }

  return reduce<Node, TreeSubTreeAcc<Node>>(
    (input as Node)?.children ?? [],
    treeWalker<TreeSubTreeAcc<Node>>(root, treeAppenderIteratee),
    subTreeContext,
  ).subTree
}

/**
 * Using Vertex/Edge representation
 */
export const makeGraph = (input: NodeDtoI): Graph => {
  // Convert input to Node input structure first, nodeFinder requires Node representation
  const root = makeTree(input)
  const graph = new Graph({ vertices: [], edges: [] })
  const subTreeContext = {
    graph,
    subTree: root,
    parent: root,
    prev: root,
  }

  graph.addVertexFromNode(root)

  return reduce<Node, GraphSubTreeAcc<Node>>(
    (input as Node).children ?? [],
    treeWalker<GraphSubTreeAcc<Node>>(root, graphAppenderIteratee),
    subTreeContext,
  ).graph
}

// export const fromNodes = <P extends Props = any>(
//   inputNodes: Array<Node>,
// ): Node => {
//   const nodes = inputNodes.map((inputNode) => new Node(inputNode))

//   return new Node()
//   // const root = new Node(input)
//   // const subTreeAcc = {
//   //   subTree: root,
//   //   prev: root,
//   //   parent: root,
//   // }
//   // return reduce<DTONode, TreeAcc>(
//   //   root.dto.children,
//   //   treeWalker<TreeAcc, DTONode>(root.dto, treeAppenderIteratee),
//   //   subTreeAcc,
//   // ).subTree
// }