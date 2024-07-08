//===================================================
/* "It is not an actual project; therefore, 
I rely on comments to assess the code." */
//===================================================

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
rgbeLoader.load('/environmentMaps/0/2k.hdr', (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = environmentMap;
  scene.environment = environmentMap;
});

//==================== Models =========================
//========= Helmet
gltfLoader.load('/models/FlightHelmet/glTF/FlightHelmet.gltf', (gltf) => {
  gltf.scene.scale.set(10, 10, 10);
  scene.add(gltf.scene);

  updateAllMaterials();
});

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
  antialias: true, // Multi sampling antialias (MSAA)
});
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//=========== Tone Mapping
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 3; // it's like intensity

gui.add(renderer, 'toneMapping', {
  No: THREE.NoToneMapping,
  Linear: THREE.LinearToneMapping,
  Reinhard: THREE.ReinhardToneMapping,
  Cineon: THREE.CineonToneMapping,
  ACESFilmic: THREE.ACESFilmicToneMapping,
});
gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001);

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

/* Tone mapping
intends to convert High Dynamic Range (HDR) values to Low Dynamic Range (LDR) values. 
will fake the process of converting LDR to HDR even if the colors aren't HDR resulting in a very realistic render. */

/* Super sampling antialias (SSAA) or full screen sampling (FSAA)
- we increase the resolution beyond the actual one.
- when resized to its normal-sized, each pixel color will automatically be averaged from the 4 pixels rendered.
- Easy but bad for performance. 

- you're gonna render your canvas twice the size on the width & on the height and then resize it back to the initial size, you get 4 time more pixels. */

/* Multi sampling (MSAA)
- Automatically performed by most recent GPUs.
- Will check the neighbours of the pixel being rendered. if it's the edge of the geometry, will mix its color with those neighbours colors.
- only works on geometry edges. */
