"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polling = void 0;
const lib_1 = require("../lib");
class Polling {
    constructor(client, context) {
        this.client = client;
        this.workers = [];
        this.context = context || (() => {
            const contextData = {};
            const context = {
                get: (key) => contextData[key],
                set: (key, value) => { (contextData[key] = value); },
                isset: (key) => key in contextData,
                unset: (key) => { delete contextData[key]; }
            };
            return context;
        })();
    }
    client;
    workers;
    context;
    async run() {
        const { workers, client } = this;
        const runningWorkers = [];
        while (true) {
            for (const worker of workers) {
                if (!runningWorkers.find((runningWorker) => runningWorker === worker)) {
                    const service = async () => {
                        while (true) {
                            if (!runningWorkers.find((runningWorker) => runningWorker === worker)) {
                                if (!workers.find((entry) => entry === worker)) {
                                    break;
                                }
                                runningWorkers.push(worker);
                            }
                            else if (!workers.find((entry) => entry === worker)) {
                                break;
                            }
                            try {
                                await worker.update();
                            }
                            catch (error) {
                                client.log('Polling', error.stack);
                            }
                            await (0, lib_1.sleep)(worker.interval);
                        }
                    };
                    runningWorkers.push(worker);
                    service();
                }
            }
            await (0, lib_1.sleep)(1000);
        }
    }
    async add(worker) {
        this.workers.push(worker);
    }
    async remove(worker) {
        const { workers } = this;
        const workerIndex = workers.indexOf(worker);
        if (workerIndex > -1) {
            workers.splice(workerIndex, 1);
        }
    }
}
exports.Polling = Polling;
