import { EventObject } from 'xstate'

export enum EventNameApp {
  FETCH_DATA = 'FETCH_DATA',
}

export interface EventApp extends EventObject {
  type: keyof typeof EventNameApp
}
