//===================================================
/* "It is not an actual project; therefore, 
I rely on comments to assess the code." */
//===================================================

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const canvas = document.querySelector('canvas.webgl');
const gui = new GUI();
const scene = new THREE.Scene();

let width = window.innerWidth;
let height = window.innerHeight;

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const rgbeLoader = new RGBELoader();

//==================== Texture =========================
const textureLoader = new THREE.TextureLoader();
const floorColorTexture = textureLoader.load(
  '/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_diff_1k.jpg'
);
const floorNormalTexture = textureLoader.load(
  '/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_nor_gl_1k.png'
);
const floorAORoughnessMetalnessTexture = textureLoader.load(
  '/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_arm_1k.jpg'
);

const wallColorTexture = textureLoader.load(
  '/textures/castle_brick_broken_06/castle_brick_broken_06_diff_1k.jpg'
);
const wallNormalTexture = textureLoader.load(
  '/textures/castle_brick_broken_06/castle_brick_broken_06_nor_gl_1k.png'
);
const wallAORoughnessMetalnessTexture = textureLoader.load(
  '/textures/castle_brick_broken_06/castle_brick_broken_06_arm_1k.jpg'
);

floorColorTexture.colorSpace = THREE.SRGBColorSpace;
wallColorTexture.colorSpace = THREE.SRGBColorSpace;

//============= Update all materials ==================
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (child.isMesh) {
      // Activate shadow here
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};

//================ Environment Map =====================
//========= Intensity
scene.environmentIntensity = 0.7;
gui.add(scene, 'environmentIntensity').min(0).max(10).step(0.001);

//========= HDR (RGBE) equirectangular
rgbeLoader.load('/environmentMaps/0/2k.hdr', (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = environmentMap;
  scene.environment = environmentMap;
});

//==================== Models =========================
//========= Helmet
// gltfLoader.load(
//   './models/FlightHelmet/glTF/FlightHelmet.gltf',
//   (gltf) => {
//     gltf.scene.scale.set(10, 10, 10);
//     scene.add(gltf.scene);

//     updateAllMaterials();
//   },
//   undefined,
//   (error) => {
//     console.error('Error loading model:', error);
//   }
// );

//======== Hamburger
gltfLoader.load(
  './models/hamburger.glb',
  (gltf) => {
    gltf.scene.scale.set(0.5, 0.5, 0.5);
    scene.add(gltf.scene);

    updateAllMaterials();
  },
  undefined,
  (error) => {
    console.error('Error loading model:', error);
  }
);

//==================== Objects =========================
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    map: floorColorTexture,
    normalMap: floorNormalTexture,
    aoMap: floorAORoughnessMetalnessTexture,
    roughnessMap: floorAORoughnessMetalnessTexture,
    metalnessMap: floorAORoughnessMetalnessTexture,
  })
);
floor.rotation.x = Math.PI / -2;

const wall = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    normalMap: wallNormalTexture,
    aoMap: wallAORoughnessMetalnessTexture,
    roughnessMap: wallAORoughnessMetalnessTexture,
    metalnessMap: wallAORoughnessMetalnessTexture,
  })
);
wall.rotation.x = Math.PI * 2;
wall.position.y = 5;
wall.position.z = -5;

scene.add(floor, wall);

//===================== Lights =========================
const directionalLight = new THREE.DirectionalLight('#ffffff', 4);
directionalLight.position.set(-4.99, 7.05, 1.64);
directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.normalBias = 0.032;
directionalLight.shadow.bias = 0.001;
directionalLight.shadow.mapSize.set(1024, 1024);
scene.add(directionalLight);

//========== Shadow Helper
// const directionalLightHelper = new THREE.CameraHelper(
//   directionalLight.shadow.camera
// );
// scene.add(directionalLightHelper);

//========== directionalLight targets the center of the model
directionalLight.target.position.set(0, 4, 0);
directionalLight.target.updateWorldMatrix(); // update the matrix only once

// scene.add(directionalLight.target); // update matrix

//========= GUI
gui.add(directionalLight, 'intensity', 0, 10, 0.001).name('Light intensity');
gui.add(directionalLight.position, 'x', -10, 10, 0.001).name('Light X');
gui.add(directionalLight.position, 'y', -10, 10, 0.001).name('Light Y');
gui.add(directionalLight.position, 'z', -10, 10, 0.001).name('Light Z');

gui.add(directionalLight, 'castShadow');
gui.add(directionalLight.shadow, 'bias', -0.05, 0.05, 0.001).name('bias');
gui
  .add(directionalLight.shadow, 'normalBias', -0.05, 0.05, 0.001)
  .name('normalBias');

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

//====== Tone Mapping
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1.63; // it's like intensity

gui.add(renderer, 'toneMapping', {
  No: THREE.NoToneMapping,
  Linear: THREE.LinearToneMapping,
  Reinhard: THREE.ReinhardToneMapping,
  Cineon: THREE.CineonToneMapping,
  ACESFilmic: THREE.ACESFilmicToneMapping,
});
gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001);

renderer.useLegacyLights = false;
gui.add(renderer, 'useLegacyLights');

//===== Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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

/* Matrix
- When we change properties like "position", "rotation", "scale", those will be compiled into a matrix
- this process is done right before the object is rendered and only if it's in the scene so we can not change them unless we use .target.updateWorldMatrix() on the property */

/* traverse()
- traverse is a method used to visit all descendants of an object, including itself, and perform operations on each of them. */

/* Hamburger - before optimizing
- you can see wired looking on the top bun, these artifacts are called "shadow-acne"

- shadow acne can occur on both smooth and flat surfaces for precision reasons when calculating if the surface is in the shadow or not.

the hamburger is casting a shadow on its own surface.

we have to tweak the light shadow's "bias" and "normalBias" 
bias: usually help for the flat surfaces
normalBias: usually helps for rounded surfaces */
