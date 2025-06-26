import * as THREE from "three";

export class Neptune {
  constructor(modelLoader) {
    this.modelLoader = modelLoader;
    this.neptuneMesh = null;
    this.mixer = null;

    this.loadModel();
  }

  loadModel() {
    this.modelLoader.LoadModel(
      "scene.gltf",
      "neptune-2",
      0.35,
      0.35,
      0.35,
      0,
      0,
      180,
      0,
      0,
      0,
      (gltf) => {
        this.neptuneMesh = gltf.scene;

        // geometry adjustment so it spins around their axis

        this.neptuneMesh.traverse((child) => {
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

  animateNeptune() {
    if (this.neptuneMesh) {
      this.neptuneMesh.rotation.y += 0.001;
    }
  }
}
