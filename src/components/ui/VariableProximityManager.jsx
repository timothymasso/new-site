import { useEffect, useRef } from 'react';

// Shared animation frame manager
class VariableProximityManager {
  constructor() {
    this.instances = new Set();
    this.rafId = null;
    this.isRunning = false;
    this.frameCount = 0;
  }

  register(instance) {
    this.instances.add(instance);
    if (!this.isRunning) {
      this.start();
    }
  }

  unregister(instance) {
    this.instances.delete(instance);
    if (this.instances.size === 0) {
      this.stop();
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    const loop = () => {
      this.frameCount++;
      this.instances.forEach(instance => {
        if (instance.update) {
          // For long text instances, update every other frame to maintain 60fps
          if (instance.isLongText && this.frameCount % 2 === 0) {
            return;
          }
          instance.update();
        }
      });
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.isRunning = false;
    this.frameCount = 0;
  }
}

export const manager = new VariableProximityManager();
