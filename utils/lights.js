import * as THREE from "three";

export class LightSetup {
  constructor(modelLoader) {
    this.modelLoader = modelLoader;
    this.ambientLight = null;

    this.setLight();
  }

  setLight() {
    this.ambientLight = new THREE.AmbientLight(0x303030, 40);
    this.modelLoader.scene.add(this.ambientLight);
  }
}
