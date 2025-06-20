import * as THREE from "three";

export class Venus {
  constructor(modelLoader) {
    this.modelLoader = modelLoader;
    this.venusMesh = null;
    this.mixer = null;

    this.loadModel();
  }

  loadModel() {
    this.modelLoader.LoadModel(
      "scene.gltf",
      "public/venus-2/",
      0.85,
      0.85,
      0.85,
      0,
      0,
      60, //72
      0,
      0,
      0,
      (gltf) => {
        this.venusMesh = gltf.scene;

        // const box = new THREE.Box3().setFromObject(this.venusMesh);
        // const size = box.getSize(new THREE.Vector3());
        // console.log(
        //   "Venus width:",
        //   size.x,
        //   "height:",
        //   size.y,
        //   "depth:",
        //   size.z
        // );

        this.venusMesh.traverse((child) => {
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

  animateVenus() {
    // if (this.mixer) this.mixer.update(0.001);

    if (this.venusMesh) {
      this.venusMesh.rotation.y += 0.001;
    }
  }
}
