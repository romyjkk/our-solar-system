import * as THREE from "three";

export class Earth {
  constructor(modelLoader) {
    this.modelLoader = modelLoader;
    this.earthMesh = null;
    this.mixer = null;

    this.loadModel();
  }

  loadModel() {
    this.modelLoader.LoadModel(
      "scene.gltf",
      "public/earth-2",
      0.81,
      0.81,
      0.81,
      0,
      0,
      80,
      0,
      0,
      0,
      (gltf) => {
        this.earthMesh = gltf.scene;

        // geometry adjustment so it spins around their axis

        this.earthMesh.traverse((child) => {
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

  animateEarth() {
    if (this.earthMesh) {
      this.earthMesh.rotation.y += 0.001;
    }
  }
}
