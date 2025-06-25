import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js"; // Add this line

// class that helps with loading models

export class ModelLoader {
  constructor(loadingManager) {
    this.loader = new GLTFLoader(loadingManager);
    this.models = {};
    this.scene = null;
  }

  LoadModel(
    modelName,
    modelPath,
    xScale = 1,
    yScale = 1,
    zScale = 1,
    xPos = 0,
    yPos = 0,
    zPos = 0,
    xRot = 0,
    yRot = 0,
    zRot = 0,
    callback,
    glowOptions = null
  ) {
    this.loader.load(modelPath + "/" + modelName, (gltf) => {
      let mesh = gltf.scene;
      this.scene.add(mesh);

      mesh.scale.set(xScale, yScale, zScale);
      mesh.position.set(xPos, yPos, zPos);
      mesh.rotation.set(xRot, yRot, zRot);

      if (glowOptions) {
        this.enableGlow(glowOptions);
      }

      if (callback) {
        callback(gltf);
      }
    });
  }

  enableGlow(options = {}) {
    const {
      strength = 0,
      radius = 0,
      threshold = 1,
      toneMapping = THREE.ReinhardToneMapping,
      exposureValue = 1,
    } = options;

    if (this.bloomPass && strength > 0) {
      this.bloomPass.strength = strength;
      this.bloomPass.radius = radius;
      this.bloomPass.threshold = threshold;
    } else if (this.bloomPass && strength === 0) {
      this.bloomPass.strength = 0;
    }

    if (this.renderer && toneMapping !== THREE.NoToneMapping) {
      this.renderer.toneMapping = toneMapping;
      this.renderer.toneMappingExposure = Math.pow(exposureValue, 4.0);
    }
  }
}
