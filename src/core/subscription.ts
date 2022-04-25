import EventEmitter, { EventInterface } from '@rizzzigit/eventemitter'
import { PollingWorker } from './worker'

export abstract class Subscription<Events extends EventInterface> {
  public constructor (worker: PollingWorker) {
    this.worker = worker
    this.events = new EventEmitter()
  }

  public readonly events: EventEmitter<Events>
  public readonly worker: PollingWorker
}
