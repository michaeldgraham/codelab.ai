import { PropsWithChildren } from 'react'
import {
  Actor,
  EventObject,
  StateMachine,
  StateSchema,
  Typestate,
} from 'xstate'

export type ComponentProps<
  TContext = any,
  TEvent extends EventObject = any,
  TProps = any
> = PropsWithChildren<ActorProps<TContext, TEvent> & TProps>

export interface ActorProps<TContext, TEvent extends EventObject> {
  actor: Actor<TContext, TEvent>
}

export interface MachineProps<
  TContext,
  TStateSchema extends StateSchema,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any
    context: TContext
  }
> {
  machine: StateMachine<TContext, TStateSchema, TEvent, TTypestate>
}

/**
 * Using machine
 */
// export interface ComponentProps<
//   TContext,
//   TStateSchema extends StateSchema,
//   TEvent extends EventObject,
//   TTypestate extends Typestate<TContext> = {
//     value: any
//     context: TContext
//   }
// > {
//   machine: StateMachine<TContext, TStateSchema, TEvent, TTypestate>
// }
