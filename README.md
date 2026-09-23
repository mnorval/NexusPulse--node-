# NexusPulse

In-process **edge telemetry fabric**. Four virtual devices emit temperature samples; a sliding window computes mean/range and flags thermal swing — no Redis required to demo the pattern.

## Run
```bash
node src/index.js
```

## Pattern
Pub/sub bus → windowed reducer → stdout “ops console”. Swap `StreamBus` for MQTT or NATS in production.
