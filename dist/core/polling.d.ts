import Core from '@repandrip/core';
import { Context } from './context';
import { PollingWorker } from './worker';
export declare class Polling {
    constructor(client: Core.Client, context?: Context);
    readonly client: Core.Client;
    readonly workers: Array<PollingWorker>;
    readonly context: Context;
    run(): Promise<void>;
    add(worker: PollingWorker): Promise<void>;
    remove(worker: PollingWorker): Promise<void>;
}
