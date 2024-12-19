export class ForceIndicator {
    constructor(bridge) {
      this.bridge = bridge;
      this.createIndicators();
    }
  
    createIndicators() {
      this.flexionArrows = document.createElement('div');
      this.flexionArrows.className = 'flexion-arrows hidden';
      this.flexionArrows.innerHTML = `
        <div class="arrow arrow-up"></div>
        <div class="arrow arrow-down"></div>
      `;
      this.bridge.appendChild(this.flexionArrows);
    }
  
    updateForceDisplay(forceType) {
      const forcePoint = document.getElementById('force-point');
      this.flexionArrows.classList.toggle('hidden', forceType !== 'flexion');
      forcePoint.style.display = forceType === 'flexion' ? 'none' : 'block';
      
      if (forceType === 'traction') {
        forcePoint.style.width = '36px';
        forcePoint.style.height = '36px';
      } else {
        forcePoint.style.width = '24px';
        forcePoint.style.height = '24px';
      }
    }
  }