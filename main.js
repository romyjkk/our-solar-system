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

// setup

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

// camera

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
); // create a camera: 45 deg fov, aspect ratio of camera, set near and far plane
camera.position.set(10, 0, 0);
camera.rotation.set(0, 0, 0);
// camera.lookAt(5, 0, 39); // look at the center of the scene

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(modelLoader.scene, camera);
composer.addPass(renderPass);

// bloom

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0,
  0,
  1
);
composer.addPass(bloomPass);
modelLoader.bloomPass = bloomPass;

// starry background

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

// loading models

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

// const planetData = {
//   sun: {
//     camera: { x: 0, y: 0, z: 35 },
//     lookAt: { x: 10, y: 0, z: 0 },
//   },
//   mercury: {
//     camera: { x: 0.8, y: 0, z: 41 },
//     lookAt: { x: -10, y: 0, z: 0 },
//   },
//   venus: {
//     camera: { x: 2, y: 0, z: 63 },
//     lookAt: { x: -10, y: 0, z: 0 },
//   },
//   earth: {
//     camera: { x: 2, y: 0, z: 83 },
//     lookAt: { x: -10, y: 0, z: 0 },
//   },
//   mars: {
//     camera: { x: 1, y: 0, z: 102 },
//     lookAt: { x: -10, y: 0, z: 0 },
//   },
//   jupiter: {
//     camera: { x: 1.5, y: 0, z: 123 },
//     lookAt: { x: -10, y: 0, z: 0 },
//   },
//   saturn: {
//     camera: { x: 2, y: 0, z: 145 },
//     lookAt: { x: -10, y: 0, z: 0 },
//   },
//   uranus: {
//     camera: { x: 0.5, y: 0, z: 161.5 },
//     lookAt: { x: -10, y: 0, z: 0 },
//   },
//   neptune: {
//     camera: { x: 0.5, y: 0, z: 182.5 },
//     lookAt: { x: -10, y: 0, z: 0 },
//   },
// };

const lookAtTarget = new THREE.Vector3(10, 0, 0);

async function main() {
  let planetData = await fetchJSON();
  ScrollTrigger.defaults({
    snap: {
      snapTo: document.querySelectorAll(".info").length - 9,
      duration: 0.5,
      ease: "power1.inOut",
      directional: false,
    },
  });
  // console.log(Object.keys(planets).length);
  planetData.forEach((planet) => {
    // window.addEventListener("load", () => {
    const animation = gsap.timeline({
      scrollTrigger: {
        trigger: `#${planet.name}`,
        start: "top 70%",
        end: "bottom 70%",
        scrub: true,
        snap: 1,
        ease: "power1.inOut",
        markers: true,
      },
      onUpdate: () => {
        camera.lookAt(planet.lookAt.x, planet.lookAt.y, planet.lookAt.z);
      },
    });
    animation
      .to(
        camera.position,
        {
          x: planet.camera.x,
          y: planet.camera.y,
          z: planet.camera.z,
        },
        0
      )
      .to(
        lookAtTarget,
        {
          x: planet.lookAt.x,
          y: planet.lookAt.y,
          z: planet.lookAt.z,
        },
        0
      );
    console.log(planet.name);
  });
}

ScrollTrigger.refresh();
main();

// scroll smoother

let smoother = ScrollSmoother.create({
  wrapper: "#main-container",
  content: "#scroll-container",
  // smooth: 1,
});

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

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight; // update camera aspect ratio
  camera.updateProjectionMatrix(); // update camera projection matrix
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
