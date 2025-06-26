import * as THREE from "three";

export class Uranus {
  constructor(modelLoader) {
    this.modelLoader = modelLoader;
    this.uranusMesh = null;
    this.mixer = null;

    this.loadModel();
  }

  loadModel() {
    this.modelLoader.LoadModel(
      "scene.gltf",
      "uranus-2",
      0.0008,
      0.0008,
      0.0008,
      0,
      0,
      160,
      0,
      0,
      0,
      (gltf) => {
        this.uranusMesh = gltf.scene;

        // geometry adjustment so it spins around their axis

        this.uranusMesh.traverse((child) => {
          if (child.isMesh) {
            child.geometry.computeBoundingSphere();
            const center = child.geometry.boundingSphere.center;
            child.geometry.translate(-center.x, -center.y, -center.z);
            child.geometry.computeBoundingSphere();
          }
        });
      }
    );
  }
  animateUranus() {
    if (this.uranusMesh) {
      this.uranusMesh.rotation.y += 0.001;
    }
  }
}
