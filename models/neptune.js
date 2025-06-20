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
      "public/neptune-2/",
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

        // const box = new THREE.Box3().setFromObject(this.neptuneMesh);
        // const size = box.getSize(new THREE.Vector3());
        // console.log(
        //   "Neptune width:",
        //   size.x,
        //   "height:",
        //   size.y,
        //   "depth:",
        //   size.z
        // );

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
