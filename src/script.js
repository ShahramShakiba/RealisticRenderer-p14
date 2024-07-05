import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const canvas = document.querySelector('canvas.webgl');
const gui = new GUI();
const scene = new THREE.Scene();

let width = window.innerWidth;
let height = window.innerHeight;

//==================== Loaders ========================
const gltfLoader = new GLTFLoader();
const rgbeLoader = new RGBELoader();

//============= Update all materials ==================
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (child.isMesh) {
      // Activate shadow here
    }
  });
};

//================ Environment Map =====================
//========= Intensity
scene.environmentIntensity = 1;
gui.add(scene, 'environmentIntensity').min(0).max(10).step(0.001);

//========= HDR (RGBE) equirectangular
// rgbeLoader.load('/environmentMaps/0/2k.hdr', (environmentMap) => {
//   environmentMap.mapping = THREE.EquirectangularReflectionMapping;

//   scene.background = environmentMap;
//   scene.environment = environmentMap;
// });

//==================== Models =========================
//========= Helmet
// gltfLoader.load('/models/FlightHelmet/glTF/FlightHelmet.gltf', (gltf) => {
//   gltf.scene.scale.set(10, 10, 10);
//   scene.add(gltf.scene);

//   updateAllMaterials();
// });

//===================== Camera =========================
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
camera.position.set(4, 5, 4);
scene.add(camera);

//================ Orbit Controls ======================
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
controls.enableDamping = true;

//==================== Renderer ========================
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//================ Resize Listener ====================
window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//=================== Animate =======================
const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
