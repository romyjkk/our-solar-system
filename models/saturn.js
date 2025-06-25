import * as THREE from "three";

export class Saturn {
  constructor(modelLoader) {
    this.modelLoader = modelLoader;
    this.saturnMesh = null;
    this.mixer = null;

    this.loadModel();
  }

  loadModel() {
    this.modelLoader.LoadModel(
      "scene.gltf",
      "public/saturn_planet/",
      0.9,
      0.9,
      0.9,
      0,
      0,
      140,
      10,
      10,
      0,
      (gltf) => {
        this.saturnMesh = gltf.scene;
        this.animations = gltf.animations;

        // model has its own animation built in

        if (this.animations && this.animations.length > 0) {
          this.mixer = new THREE.AnimationMixer(this.saturnMesh);
          this.animationAction = this.mixer.clipAction(this.animations[0]);
          this.animationAction.play();
          this.animationAction.timeScale = 0.5;
        }
      }
    );
  }
  animateSaturn() {
    if (this.mixer) {
      this.mixer.update(0.001);
    }
  }
}
