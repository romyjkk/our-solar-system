import * as THREE from "three";

export class Jupiter {
  constructor(modelLoader) {
    this.modelLoader = modelLoader;
    this.jupiterMesh = null;
    this.mixer = null;

    this.loadModel();
  }

  loadModel() {
    this.modelLoader.LoadModel(
      "scene.gltf",
      "realistic_jupiter",
      0.008,
      0.008,
      0.008,
      0,
      0,
      120,
      0,
      0,
      0,
      (gltf) => {
        this.jupiterMesh = gltf.scene;
      }
    );
  }
  animateJupiter() {
    if (this.jupiterMesh) {
      this.jupiterMesh.rotation.y += 0.001;
    }
  }
}
