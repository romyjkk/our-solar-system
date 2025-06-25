import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// class to set up loader, once all models are loaded, you will continue to the simulation

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
    let body = document.querySelector("body");
    this.loadingManager.onProgress = (url, loaded, total) => {
      let percentage = Math.floor((loaded / total) * 100);
      body.classList.add("overflow-hidden");

      if (this.progressBar && this.progressPercentage) {
        this.progressBar.value = percentage;
        this.progressPercentage.textContent = percentage + "%";
      }
    };
    this.loadingManager.onLoad = () => {
      if (this.progressBarContainer) {
        setTimeout(() => {
          body.classList.remove("overflow-hidden");
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
