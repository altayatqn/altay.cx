(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();const l={beton:{name:"Béton",compressionStrength:250,tensileStrength:20,flexuralStrength:40,elasticModulus:3e5,color:"#CBD5E1"},"beton-arme":{name:"Béton Armé",compressionStrength:300,tensileStrength:300,flexuralStrength:400,elasticModulus:2e6,color:"#94A3B8"},acier:{name:"Acier",compressionStrength:3550,tensileStrength:3550,flexuralStrength:3550,elasticModulus:21e5,color:"#475569"},bois:{name:"Bois",compressionStrength:200,tensileStrength:100,flexuralStrength:150,elasticModulus:11e4,color:"#92400E"}};function d(n,t,s,r=500,e=100){const i=n*9.81;let o=0,a=0;switch(s){case"flexion":o=i*r/(4*e),a=i*Math.pow(r,3)/(48*t.elasticModulus*e);break;case"traction":o=i/e,a=i*r/(t.elasticModulus*e);break;case"compression":o=i/e,a=i*r/(t.elasticModulus*e);break}return{stress:o,deformation:a}}class c{constructor(t){this.bridge=t,this.createIndicators()}createIndicators(){this.flexionArrows=document.createElement("div"),this.flexionArrows.className="flexion-arrows hidden",this.flexionArrows.innerHTML=`
    <div class="arrow arrow-up"></div>
    <div class="arrow arrow-down"></div>
  `,this.bridge.appendChild(this.flexionArrows)}updateForceDisplay(t){const s=document.getElementById("force-point");this.flexionArrows.classList.toggle("hidden",t!=="flexion"),s.style.display=t==="flexion"?"none":"block",t==="traction"?(s.style.width="36px",s.style.height="36px"):(s.style.width="24px",s.style.height="24px")}}class h{constructor(){this.initializeElements(),this.setupEventListeners(),this.forceIndicator=new c(this.bridge),this.updateSimulation()}initializeElements(){this.materialSelect=document.getElementById("material"),this.forceTypeSelect=document.getElementById("force-type"),this.weightInput=document.getElementById("weight"),this.weightDisplay=document.getElementById("weight-display"),this.forcePoint=document.getElementById("force-point"),this.bridge=document.getElementById("bridge"),this.materialInfo=document.getElementById("material-info"),this.stressInfo=document.getElementById("stress-info"),this.bridgeWidth=this.bridge.offsetWidth,this.forcePosition=.5}setupEventListeners(){this.materialSelect.addEventListener("change",()=>{this.updateBridgeMaterial(),this.updateSimulation()}),this.forceTypeSelect.addEventListener("change",()=>{this.forceIndicator.updateForceDisplay(this.forceTypeSelect.value),this.updateSimulation()}),this.weightInput.addEventListener("input",t=>{this.weightDisplay.textContent=`${t.target.value} kg`,this.updateSimulation()}),this.setupDragAndDrop()}setupDragAndDrop(){this.forcePoint.addEventListener("dragstart",t=>{t.dataTransfer.setData("text/plain","")}),this.bridge.addEventListener("dragover",t=>{t.preventDefault();const s=this.bridge.getBoundingClientRect(),r=t.clientX-s.left;this.forcePosition=Math.max(0,Math.min(1,r/s.width)),this.forcePoint.style.left=`${this.forcePosition*100}%`,this.updateSimulation()})}updateBridgeMaterial(){const t=l[this.materialSelect.value];this.bridge.querySelector(".bridge-deck").style.backgroundColor=t.color}updateSimulation(){const t=l[this.materialSelect.value],s=parseInt(this.weightInput.value),r=this.forceTypeSelect.value,{stress:e,deformation:i}=d(s,t,r);this.updateMaterialInfo(t),this.updateStressInfo(s,e,i),this.updateBridgeState(e,t,r)}updateMaterialInfo(t){this.materialInfo.innerHTML=`
    <h3>${t.name}</h3>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
      <div>
        <strong>Compression</strong>
        <p>${t.compressionStrength} kg/cm²</p>
      </div>
      <div>
        <strong>Traction</strong>
        <p>${t.tensileStrength} kg/cm²</p>
      </div>
      <div>
        <strong>Flexion</strong>
        <p>${t.flexuralStrength} kg/cm²</p>
      </div>
    </div>
  `}updateStressInfo(t,s,r){this.stressInfo.innerHTML=`
    <h3>Résultats d'Analyse</h3>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
      <div>
        <strong>Force</strong>
        <p>${t} kg</p>
      </div>
      <div>
        <strong>Contrainte</strong>
        <p>${s.toFixed(1)} kg/cm²</p>
      </div>
      <div>
        <strong>Déformation</strong>
        <p>${(r*10).toFixed(2)} cm</p>
      </div>
    </div>
  `}updateBridgeState(t,s,r){const e=s[r==="flexion"?"flexuralStrength":r==="traction"?"tensileStrength":"compressionStrength"],o=t/e>1;this.bridge.classList.toggle("broken",o),o?this.bridge.style.transform="rotate(5deg)":this.bridge.style.transform="none"}}new h;
