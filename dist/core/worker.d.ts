import { EventInterface } from '@rizzzigit/eventemitter';
import { Polling } from './polling';
import { Subscription } from './subscription';
export declare abstract class PollingWorker {
    constructor(polling: Polling);
    readonly polling: Polling;
    interval: number;
    readonly subscriptions: {
        [key: string]: Subscription<EventInterface>;
    };
    abstract init(): Promise<void>;
    abstract update(): Promise<void>;
}
