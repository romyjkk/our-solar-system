import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export class LoadingManager {
  constructor() {
    this.loadingManager = new THREE.LoadingManager();
    this.gltfLoader = new GLTFLoader(this.loadingManager);
    this.progressBar = null;
    this.progressPercentage = null;
    this.progressBarContainer = null;

    this.setUpUI();
    this.setUpEvents();
  }

  getManager() {
    return this.loadingManager;
  }

  setUpUI() {
    this.progressBar = document.getElementById("progress-bar");
    this.progressPercentage = document.getElementById("progress-percentage");
    this.progressBarContainer = document.getElementById("loader");
  }

  setUpEvents() {
    this.loadingManager.onProgress = (url, loaded, total) => {
      let percentage = Math.floor((loaded / total) * 100);

      if (this.progressBar && this.progressPercentage) {
        this.progressBar.value = percentage;
        this.progressPercentage.textContent = percentage + "%";
      }
    };
    this.loadingManager.onLoad = () => {
      if (this.progressBarContainer) {
        setTimeout(() => {
          this.progressBarContainer.style.display = "none";
        }, 1000);
      }
    };

    this.loadingManager.onError = (url) => {
      console.error("Error loading:", url);
    };
  }

  getLoader() {
    return this.gltfLoader;
  }
}
