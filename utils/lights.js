import * as THREE from "three";

// light setup class, a bit underused

export class LightSetup {
  constructor(modelLoader) {
    this.modelLoader = modelLoader;
    this.ambientLight = null;

    this.setLight();
  }

  setLight() {
    this.ambientLight = new THREE.AmbientLight(0x303030, 35);
    this.modelLoader.scene.add(this.ambientLight);
  }
}
