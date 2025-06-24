// imports
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

// GSAP

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// classes

import { LoadingManager } from "/utils/loading-manager.js";
import { ModelLoader } from "/models/model-loader.js";
import { Sun } from "/models/sun.js";
import { Mercury } from "/models/mercury.js";
import { Venus } from "/models/venus.js";
import { Earth } from "/models/earth.js";
import { Mars } from "/models/mars.js";
import { Jupiter } from "/models/jupiter.js";
import { Saturn } from "/models/saturn.js";
import { Uranus } from "/models/uranus.js";
import { Neptune } from "/models/neptune.js";

import { LightSetup } from "/utils/lights.js";

// variables

let planetData = [];

// obtain data from JSON

async function fetchJSON() {
  try {
    const response = await fetch("./planetdata.json");
    const data = await response.json();
    planetData = data.planets;
    return planetData;
  } catch (error) {
    console.error("Error fetching JSON:", error);
    throw error;
  }
}

// setup scene, renderer, camera and lights

let loadingManager = new LoadingManager();
let modelLoader = new ModelLoader(loadingManager.getManager());

modelLoader.scene = new THREE.Scene(); // create a scene
const renderer = new THREE.WebGLRenderer({ antialias: true }); // setup renderer, give edges smooth effect
renderer.outputColorSpace = THREE.SRGBColorSpace; // output of our renderer, depends on the model we are using

renderer.setSize(window.innerWidth, window.innerHeight); // set size of renderer
renderer.setClearColor(0x000000); // clear renderer to black color
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // set pixel ratio to render properly on different devices

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // creates high quality realistic shadow, at performance cost

document.getElementById("container").appendChild(renderer.domElement);

// lights

let lightSetup = new LightSetup(modelLoader);

// create camera, position and add to scene

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
); // create a camera: 45 deg fov, aspect ratio of camera, set near and far plane
camera.position.set(10, 0, 35);
camera.rotation.set(0, 0, 0);
// camera.lookAt(5, 0, 39); // look at the center of the scene

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(modelLoader.scene, camera);
composer.addPass(renderPass);

// bloom effect to make the sun (and planets) glow

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0,
  0,
  1
);
composer.addPass(bloomPass);
modelLoader.bloomPass = bloomPass;

// random starry background

const stars = new Array();
for (var i = 0; i < 20000; i++) {
  let x = THREE.MathUtils.randFloatSpread(4000);
  let y = THREE.MathUtils.randFloatSpread(4000);
  let z = THREE.MathUtils.randFloatSpread(4000);
  stars.push(x, y, z);
}

const starsGeometry = new THREE.BufferGeometry();
starsGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(stars, 3)
);
const starsMaterial = new THREE.PointsMaterial({ color: 0x999999 });
const starField = new THREE.Points(starsGeometry, starsMaterial);
modelLoader.scene.add(starField);

// loading the models, see model-loader.js

let mixer;
let sun = new Sun(modelLoader);
let mercury = new Mercury(modelLoader);
let venus = new Venus(modelLoader);
let earth = new Earth(modelLoader);
let mars = new Mars(modelLoader);
let jupiter = new Jupiter(modelLoader);
let saturn = new Saturn(modelLoader);
let uranus = new Uranus(modelLoader);
let neptune = new Neptune(modelLoader);

// lookAt target setup for scrolltrigger

const lookAtTarget = new THREE.Vector3(0, 0, 0);

// async function to setup loop for scrolltrigger

async function main() {
  // fetch planet data from json
  let planetData = await fetchJSON();
  // set default settings for scrolltrigger, adds 'scroll snapping'
  ScrollTrigger.defaults({
    snap: {
      snapTo: document.querySelectorAll(".info").length - 9,
      duration: 0.5,
      ease: "power1.inOut",
      directional: false,
    },
  });

  // loop through each planet (and one sun) and create scroll trigger for each
  planetData.forEach((planet) => {
    const textElement = document.querySelector(`#${planet.name} .info h2`);
    if (textElement) {
      textElement.style.opacity = 0;
    }
    const width = window.innerWidth;
    // setup gsap timeline
    const animation = gsap.timeline({
      scrollTrigger: {
        trigger: `#${planet.name}`,
        // depending on the width of the screen, set different start and end points
        start: () => {
          return width < 1700 ? "top 75%" : "top 70%";
        },
        end: () => {
          return width < 1700 ? "bottom 75%" : "bottom 70%";
        },
        scrub: true,
        snap: 1,
        ease: "power1.inOut",
        markers: true,
        // on enter: start typing animation, with a small delay for visibility
        onEnter: () => {
          setTimeout(() => {
            if (textElement) {
              if (!textElement.classList.contains("typing-animation")) {
                textElement.style.opacity = 1;
                textElement.classList.add("typing-animation");
              }
            } else {
              return;
            }
          }, 300);
        },
      },

      onUpdate: () => {
        camera.lookAt(planet.lookAt.x, planet.lookAt.y, planet.lookAt.z);
      },
    });
    // gsap timeline, move camera position and lookAt target
    if (width < 1280) {
      animation.to(
        camera.position,
        {
          x: planet.camera.x,
          y: planet.camera.y,
          z: planet.cameraSmall.z,
        },
        0
      );
    } else if (width > 1280 && width < 1400) {
      animation.to(
        camera.position,
        {
          x: planet.camera.x,
          y: planet.camera.y,
          z: planet.cameraMedium.z,
        },
        0
      );
    } else {
      animation.to(
        camera.position,
        {
          x: planet.camera.x,
          y: planet.camera.y,
          z: planet.camera.z,
        },
        0
      );
    }
    animation.to(
      lookAtTarget,
      {
        x: planet.lookAt.x,
        y: planet.lookAt.y,
        z: planet.lookAt.z,
      },
      0
    );
    // change opacity and position of the card for a smooth entrance

    animation.fromTo(
      `#${planet.name} .info`,
      {
        x: 150,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
      },
      0
    );
  });
}

ScrollTrigger.refresh();
main();

// smooth scrolling, very satisfying
ScrollSmoother.create({
  wrapper: "#main-container",
  content: "#scroll-container",
  // smooth: 1,
});

// animate function
function animate() {
  if (mixer) mixer.update(0.001);
  if (sun) sun.animateSun();
  if (mercury) mercury.animateMercury();
  if (venus) venus.animateVenus();
  if (earth) earth.animateEarth();
  if (mars) mars.animateMars();
  if (jupiter) jupiter.animateJupiter();
  if (saturn) saturn.animateSaturn();
  if (uranus) uranus.animateUranus();
  if (neptune) neptune.animateNeptune();
  camera.lookAt(lookAtTarget);
  composer.render();
}

renderer.setAnimationLoop(animate);

// so the models don't squish/stretch when resizing the window
function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight; // update camera aspect ratio
  camera.updateProjectionMatrix(); // update camera projection matrix
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
