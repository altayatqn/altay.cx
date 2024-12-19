export function calculateStress(weight, material, forceType, bridgeLength = 500, bridgeSection = 100) {
    const force = weight * 9.81;
    let stress = 0;
    let deformation = 0;
  
    switch(forceType) {
      case 'flexion':
        stress = (force * bridgeLength) / (4 * bridgeSection);
        deformation = (force * Math.pow(bridgeLength, 3)) / (48 * material.elasticModulus * bridgeSection);
        break;
      case 'traction':
        stress = force / bridgeSection;
        deformation = (force * bridgeLength) / (material.elasticModulus * bridgeSection);
        break;
      case 'compression':
        stress = force / bridgeSection;
        deformation = (force * bridgeLength) / (material.elasticModulus * bridgeSection);
        break;
    }
  
    return { stress, deformation };
  }