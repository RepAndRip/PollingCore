import { EventInterface } from '@rizzzigit/eventemitter'
import { Polling } from './polling'
import { Subscription } from './subscription'

export abstract class PollingWorker {
  public constructor (polling: Polling) {
    this.polling = polling
    this.interval = 60000
    this.subscriptions = {}
  }

  public readonly polling: Polling
  public interval: number
  public readonly subscriptions: { [key: string]: Subscription<EventInterface> }

  public abstract init (): Promise<void>
  public abstract update (): Promise<void>
}
