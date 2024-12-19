import './style.css';
import './src/styles/forceIndicator.css';
import { MATERIALS } from './src/constants/materials';
import { calculateStress } from './src/utils/calculations';
import { ForceIndicator } from './src/components/ForceIndicator';

class BridgeSimulator {
  constructor() {
    this.initializeElements();
    this.setupEventListeners();
    this.forceIndicator = new ForceIndicator(this.bridge);
    this.updateSimulation();
  }

  initializeElements() {
    this.materialSelect = document.getElementById('material');
    this.forceTypeSelect = document.getElementById('force-type');
    this.weightInput = document.getElementById('weight');
    this.weightDisplay = document.getElementById('weight-display');
    this.forcePoint = document.getElementById('force-point');
    this.bridge = document.getElementById('bridge');
    this.materialInfo = document.getElementById('material-info');
    this.stressInfo = document.getElementById('stress-info');
    this.bridgeWidth = this.bridge.offsetWidth;
    this.forcePosition = 0.5;
  }

  setupEventListeners() {
    this.materialSelect.addEventListener('change', () => {
      this.updateBridgeMaterial();
      this.updateSimulation();
    });
    this.forceTypeSelect.addEventListener('change', () => {
      this.forceIndicator.updateForceDisplay(this.forceTypeSelect.value);
      this.updateSimulation();
    });
    this.weightInput.addEventListener('input', (e) => {
      this.weightDisplay.textContent = `${e.target.value} kg`;
      this.updateSimulation();
    });

    this.setupDragAndDrop();
  }

  setupDragAndDrop() {
    this.forcePoint.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', '');
    });

    this.bridge.addEventListener('dragover', (e) => {
      e.preventDefault();
      const rect = this.bridge.getBoundingClientRect();
      const x = e.clientX - rect.left;
      this.forcePosition = Math.max(0, Math.min(1, x / rect.width));
      this.forcePoint.style.left = `${this.forcePosition * 100}%`;
      this.updateSimulation();
    });
  }

  updateBridgeMaterial() {
    const material = MATERIALS[this.materialSelect.value];
    this.bridge.querySelector('.bridge-deck').style.backgroundColor = material.color;
  }

  updateSimulation() {
    const material = MATERIALS[this.materialSelect.value];
    const weight = parseInt(this.weightInput.value);
    const forceType = this.forceTypeSelect.value;
    const { stress, deformation } = calculateStress(weight, material, forceType);

    this.updateMaterialInfo(material);
    this.updateStressInfo(weight, stress, deformation);
    this.updateBridgeState(stress, material, forceType);
  }

  updateMaterialInfo(material) {
    this.materialInfo.innerHTML = `
      <h3>${material.name}</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
        <div>
          <strong>Compression</strong>
          <p>${material.compressionStrength} kg/cm²</p>
        </div>
        <div>
          <strong>Traction</strong>
          <p>${material.tensileStrength} kg/cm²</p>
        </div>
        <div>
          <strong>Flexion</strong>
          <p>${material.flexuralStrength} kg/cm²</p>
        </div>
      </div>
    `;
  }

  updateStressInfo(weight, stress, deformation) {
    this.stressInfo.innerHTML = `
      <h3>Résultats d'Analyse</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
        <div>
          <strong>Force</strong>
          <p>${weight} kg</p>
        </div>
        <div>
          <strong>Contrainte</strong>
          <p>${stress.toFixed(1)} kg/cm²</p>
        </div>
        <div>
          <strong>Déformation</strong>
          <p>${(deformation * 10).toFixed(2)} cm</p>
        </div>
      </div>
    `;
  }

  updateBridgeState(stress, material, forceType) {
    const maxStress = material[forceType === 'flexion' ? 'flexuralStrength' : 
                              forceType === 'traction' ? 'tensileStrength' : 
                              'compressionStrength'];
    
    const stressRatio = stress / maxStress;
    const isBroken = stressRatio > 1;
    
    this.bridge.classList.toggle('broken', isBroken);
    if (isBroken) {
      this.bridge.style.transform = 'rotate(5deg)';
    } else {
      this.bridge.style.transform = 'none';
    }
  }
}

new BridgeSimulator();