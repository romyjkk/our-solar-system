import * as THREE from "three";

export class Mercury {
  constructor(modelLoader) {
    this.modelLoader = modelLoader;
    this.mercuryMesh = null;
    this.mixer = null;

    this.loadModel();
  }

  loadModel() {
    this.modelLoader.LoadModel(
      "scene.gltf",
      "mercury_enhanced_color",
      0.35,
      0.35,
      0.35,
      0,
      0,
      40, //39
      0,
      0,
      0,
      (gltf) => {
        this.mercuryMesh = gltf.scene;

        // geometry adjustment so it spins around their axis

        this.mercuryMesh.traverse((child) => {
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
  animateMercury() {
    if (this.mercuryMesh) {
      this.mercuryMesh.rotation.y += 0.001;
    }
  }
}
