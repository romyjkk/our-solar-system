import * as THREE from "three";
// import { gsap } from "gsap";

// export function initAnimation(camera, controls) {
//   document.addEventListener("DOMContentLoaded", (event) => {
//     gsap.from(camera.position, {
//       delay: 3,
//       duration: 5,
//       x: 5,
//       z: 1,
//       ease: "power1.inOut",
//     });
//     gsap.from("#header-properties", {
//       delay: 5,
//       duration: 5,
//       opacity: 0,
//       ease: "circ.in",
//     });
//     gsap.to("#header-properties", {
//       duration: 2,
//     });
//   });
// }

// initial animation

// document.addEventListener("DOMContentLoaded", (event) => {
//   const initAnimation = gsap.timeline({
//     onComplete: () => {
//       let controls = new OrbitControls(camera, renderer.domElement);
//       controls.enableRotate = false;
//       controls.enablePan = false;
//       controls.enableZoom = true;

//       controls.minDistance = 8;
//       controls.maxDistance = 1000;
//       controls.zoomSpeed = 0.8;

//       console.log("Animations complete, controls enabled");
//     },
//   });

//   initAnimation.from(camera.position, {
//     delay: 3,
//     duration: 5,
//     x: 13,
//     z: 0,
//     ease: "power1.inOut",
//   });
//   initAnimation.from(
//     "#header-properties",
//     {
//       duration: 5,
//       opacity: 0,
//       ease: "circ.in",
//     },
//     "-=2"
//   );
//   initAnimation.to("#header-properties", {
//     duration: 2,
//   });
// });
