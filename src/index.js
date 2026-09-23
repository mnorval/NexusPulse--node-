import { StreamBus } from "./bus.js";
import { SlidingWindow } from "./window.js";

const DEVICES = ["gate-01", "pump-07", "roof-pv", "cold-store"];

const bus = new StreamBus();
const windows = new Map(DEVICES.map((d) => [d, new SlidingWindow(8)]));

bus.on("telemetry", (evt) => {
  const w = windows.get(evt.device);
  w.push(evt.tempC);
  const stats = w.stats();
  const alert = stats.max - stats.min > 4.5 ? "THERMAL_SWING" : "nominal";
  process.stdout.write(
    `${evt.ts.toISOString().slice(11, 23)}  ${evt.device.padEnd(10)}  ` +
      `${evt.tempC.toFixed(2)}°C  μ=${stats.mean.toFixed(2)}  Δ=${(stats.max - stats.min).toFixed(2)}  ${alert}\n`
  );
});

for (const id of DEVICES) {
  let t = 18 + Math.random() * 6;
  setInterval(() => {
    t += (Math.random() - 0.48) * 1.4;
    bus.publish({ device: id, tempC: t, ts: new Date() });
  }, 350 + Math.random() * 400);
}

console.log("NexusPulse ingesting 4 edge nodes… Ctrl+C to stop\n");
