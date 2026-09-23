export class SlidingWindow {
  constructor(size) {
    this.size = size;
    this.buf = [];
  }
  push(v) {
    this.buf.push(v);
    if (this.buf.length > this.size) this.buf.shift();
  }
  stats() {
    if (!this.buf.length) return { mean: 0, min: 0, max: 0 };
    const min = Math.min(...this.buf);
    const max = Math.max(...this.buf);
    const mean = this.buf.reduce((a, b) => a + b, 0) / this.buf.length;
    return { mean, min, max };
  }
}
