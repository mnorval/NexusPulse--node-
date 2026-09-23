import { EventEmitter } from "node:events";

export class StreamBus extends EventEmitter {
  publish(evt) {
    this.emit("telemetry", evt);
  }
}
