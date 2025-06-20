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
      "public/mars-2/",
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

        // const box = new THREE.Box3().setFromObject(this.marsMesh);
        // const size = box.getSize(new THREE.Vector3());
        // console.log("Mars width:", size.x, "height:", size.y, "depth:", size.z);
      }
    );
  }
  animateMars() {
    if (this.marsMesh) {
      this.marsMesh.rotation.y += 0.001;
    }
  }
}
