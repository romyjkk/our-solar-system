import * as THREE from "three";

// make new class (sun), call class modelloader, and in main.js call class sun
export class Sun {
  constructor(modelLoader) {
    this.modelLoader = modelLoader;
    this.sunMesh = null;
    this.mixer = null;

    this.loadModel();
  }

  loadModel() {
    this.modelLoader.LoadModel(
      "scene.gltf",
      "public/sun_model/",
      0.01,
      0.01,
      0.01, // scale
      0,
      0,
      0, // pos
      0,
      0,
      0, // rot
      (gltf) => {
        this.sunMesh = gltf.scene;
      },
      {
        strength: 0.3,
        radius: 4,
        threshold: 0.1,
        exposureValue: 1.5,
      }
    );
  }

  animateSun() {
    if (this.sunMesh) {
      this.sunMesh.rotation.y += 0.0004;
    }
  }
}
