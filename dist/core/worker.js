"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollingWorker = void 0;
class PollingWorker {
    constructor(polling) {
        this.polling = polling;
        this.interval = 60000;
        this.subscriptions = {};
    }
    polling;
    interval;
    subscriptions;
}
exports.PollingWorker = PollingWorker;
