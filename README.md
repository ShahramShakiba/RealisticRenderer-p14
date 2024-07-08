# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Objects/Laptop.webp" alt="Laptop" width="35" /> &nbsp; _Realistic Renderer_ &nbsp; <img src="https://skillicons.dev/icons?i=threejs" height="35" alt="threejs logo"  />  

<!----------------------------------------- Description ---------------------------------------->
### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Bubbles.png" alt="Bubbles" width="40" height="40" />&nbsp; _Description_

> To begin with, it is important to note that, this project have been sourced from an exceptional `Three.js Journey` Course. <br/>
 
### 👤 Instructed by a _proficient_ and _expert educator_ <a href="https://threejs-journey.com/" target="_blank"> _"Bruno Simon"_ </a>. 

 <br/>

> ### What Does "Realistic Renderer" Mean?
In the context of Three.js, a realistic renderer refers to a setup or configuration within the Three.js framework that aims to produce images and animations with a high degree of visual realism. <br/> This involves using advanced shading models, lighting techniques, and material properties to closely mimic the way light interacts with surfaces in the real world. <br/> <br/>

> ### Ways to Achieve Realistic Rendering
 1. _`  Physically Based Rendering (PBR)  `_ 
    - Description : <br/> Uses materials and lighting based on physical principles to achieve realistic effects. 
    - Implementation : <br/> Three.js supports PBR through MeshStandardMaterial and MeshPhysicalMaterial. <br/><br/>
    ```javascript
    const material = new THREE.MeshStandardMaterial({
    metalness: 0.8,
    roughness: 0.2,
    envMap: environmentMapTexture
    });
    ```
    <br/>
 2. _`  High Dynamic Range Imaging (HDRI)  `_ 
    - Description : <br/> Uses high dynamic range images as environment maps to provide realistic lighting and reflections.
    - Implementation : <br/> Load HDRI maps using RGBELoader or similar loaders. <br/><br/>
    ```javascript
    const loader = new THREE.RGBELoader();
    loader.load('path/to/hdri.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    });
    ```
    <br/>
 3. _`  Image-Based Lighting (IBL)  `_ 
    - Description : <br/> Uses environment maps to light the scene and produce accurate reflections.
    - Implementation : <br/> Set the environment map in the scene or on materials. <br/><br/>
    ```javascript
    scene.environment = hdrTexture;
    ```
    <br/>
 4. _`  Shadow Mapping  `_ 
    - Description : <br/> Implements shadows cast by objects to add depth and realism.
    - Implementation : <br/> Enable shadows on the renderer, light sources, and objects. <br/><br/>
    ```javascript
    renderer.shadowMap.enabled = true;
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.castShadow = true;
    scene.add(light);
    ```
    <br/>
 5. _`  Ambient Occlusion (AO)  `_ 
    - Description : <br/> Simulates the soft shadows that occur in creases, cracks, and corners.
    - Implementation : <br/> Use the AOMap property in materials or post-processing effects like SSAO (Screen Space Ambient Occlusion). <br/><br/>
    ```javascript
    const aoMaterial = new THREE.MeshStandardMaterial({
    aoMap: aoTexture
    });
    ```
    <br/>
 6. _`  Post-Processing Effects  `_ 
    - Description : <br/> Apply effects like bloom, depth of field, and tone mapping to enhance realism.
    - Implementation : <br/> Use EffectComposer and relevant shader passes. <br/><br/>
    ```javascript
    const composer = new THREE.EffectComposer(renderer);
    const renderPass = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.BloomPass();
    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    ```
    <br/>


> ### Benefits of Realistic Rendering
1. Visual Quality : <br/>
   - Produces visually stunning and immersive scenes that closely resemble real-world visuals.
   - Enhances the visual appeal and professionalism of applications.

2. Enhanced User Experience : <br/>
   - Provides a more engaging and believable experience for users, which is especially important in applications like virtual reality and video games.

3. Better Presentation : <br/>
   - Improves the presentation of products, architectural designs, and other visual content, aiding in marketing and decision-making processes.

<br/><br/>

> ### Disadvantages of Realistic Rendering 
1. Performance Overhead : <br/>
   - Realistic rendering techniques can be computationally intensive, potentially leading to lower frame rates and increased load times.
   - Requires optimization to ensure smooth performance, especially on lower-end hardware.

2. Complexity : <br/>
   - Implementing realistic rendering involves complex configurations and understanding of advanced rendering concepts.
   - May require extensive tweaking and fine-tuning to achieve desired results.

3. Resource Intensive : <br/>
   - High-quality textures, environment maps, and post-processing effects can consume significant amounts of memory and storage.
   - Large assets and complex scenes can impact download times and responsiveness.
     
<br/>

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Eyes.png" alt="Eyes" width="25" height="25" /> Feel free to delve into the code as it has been written in a straightforward manner for easy understanding.
<br/> <br/> 


<!-------- try it live -------->
#### _Give it a go in real-time and give me a Star_ &nbsp; <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Glowing%20Star.png" alt="Glowing Star" width="25"  /> <a href="https://realistic-render-shahram.netlify.app/" target="_blank"> &nbsp; _Realistic Renderer_ </a> 

<br/>

<!--------- Video --------->
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Objects/Clapper%20Board.webp" alt="Clapper Board" width="35" /> &nbsp; Realistic rendering

https://github.com/ShahramShakiba/RealisticRenderer-p14/assets/110089830/2b3c73b4-a3bf-4674-b0e9-7b974ba4a98f

  <br/> 

***

<!--======================= Social Media ===========================-->
 ## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Man%20Detective%20Light%20Skin%20Tone.png" alt="Man Detective Light Skin Tone" width="65" /> Find me around the Web  
<a href="https://www.linkedin.com/in/shahramshakiba/" target="_blank">
    <img src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/linkedin/default.svg" width="52" height="40" alt="linkedin logo"  />
  </a> &nbsp;&nbsp;&nbsp;
  <a href="https://t.me/ShahramShakibaa" target="_blank">
    <img src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/telegram/default.svg" width="52" height="40" alt="telegram logo"  />
  </a> &nbsp;&nbsp;&nbsp;
  <a href="https://wa.me/message/LM2IMM3ABZ7ZM1" target="_blank">
    <img src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/whatsapp/default.svg" width="52" height="40" alt="whatsapp logo"  />
  </a> &nbsp;&nbsp;&nbsp;
  <a href="https://instagram.com/shahram.shakibaa?igshid=MzNlNGNkZWQ4Mg==" target="_blank">
    <img src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/instagram/default.svg" width="52" height="40" alt="instagram logo"  />
  </a> &nbsp;&nbsp;&nbsp;
  <a href="https://twitter.com/ShahramShakibaa" target="_blank">
    <img src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/twitter/default.svg" width="52" height="40" alt="twitter logo"  />
  </a>
