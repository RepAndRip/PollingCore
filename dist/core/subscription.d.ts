import EventEmitter, { EventInterface } from '@rizzzigit/eventemitter';
import { PollingWorker } from './worker';
export declare abstract class Subscription<Events extends EventInterface> {
    constructor(worker: PollingWorker);
    readonly events: EventEmitter<Events>;
    readonly worker: PollingWorker;
}
