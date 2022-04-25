"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const tslib_1 = require("tslib");
const eventemitter_1 = tslib_1.__importDefault(require("@rizzzigit/eventemitter"));
class Subscription {
    constructor(worker) {
        this.worker = worker;
        this.events = new eventemitter_1.default();
    }
    events;
    worker;
}
exports.Subscription = Subscription;
