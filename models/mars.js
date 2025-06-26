import * as THREE from "three";

export class Mars {
  constructor(modelLoader) {
    this.modelLoader = modelLoader;
    this.marsMesh = null;
    this.mixer = null;

    this.loadModel();
  }

  loadModel() {
    this.modelLoader.LoadModel(
      "scene.gltf",
      "mars-2",
      0.3,
      0.3,
      0.3,
      0,
      0,
      100, //152
      0,
      0,
      0,
      (gltf) => {
        this.marsMesh = gltf.scene;
      }
    );
  }
  animateMars() {
    if (this.marsMesh) {
      this.marsMesh.rotation.y += 0.001;
    }
  }
}
