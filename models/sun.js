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

        // const box = new THREE.Box3().setFromObject(this.sunMesh);
        // const size = box.getSize(new THREE.Vector3());
        // console.log("Sun width:", size.x, "height:", size.y, "depth:", size.z);
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

// import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
// import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/addons/postprocessing/RenderPass.js";

// // blooming effect

// const renderPass = new RenderPass(scene, camera);
// composer.addPass(renderPass);

// const bloomPass = new UnrealBloomPass(
//   new THREE.Vector2(window.innerWidth, window.innerHeight),
//   0.2, // strength
//   0.4, // radius
//   0.7 // threshold
// );
// composer.addPass(bloomPass);

// export { bloomPass };
