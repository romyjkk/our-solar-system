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
      "public/realistic_jupiter/",
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

        // const box = new THREE.Box3().setFromObject(this.jupiterMesh);
        // const size = box.getSize(new THREE.Vector3());
        // console.log(
        //   "Jupiter width:",
        //   size.x,
        //   "height:",
        //   size.y,
        //   "depth:",
        //   size.z
        // );
      }
    );
  }
  animateJupiter() {
    if (this.jupiterMesh) {
      this.jupiterMesh.rotation.y += 0.001;
    }
  }
}
