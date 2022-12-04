"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var THREE = _interopRequireWildcard(require("three"));

var _OrbitControls = require("three/examples/jsm/controls/OrbitControls");

var _gsap = _interopRequireDefault(require("gsap"));

var dat = _interopRequireWildcard(require("dat.gui"));

var _vertex = _interopRequireDefault(require("../shaders/flylight/vertex.glsl"));

var _fragment = _interopRequireDefault(require("../shaders/flylight/fragment.glsl"));

var _RGBELoader = require("three/examples/jsm/loaders/RGBELoader");

var _GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader");

var _firework = _interopRequireDefault(require("./firework"));

var _Water = require("three/examples/jsm/objects/Water2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// 导入水模块
// 目标：认识shader
//创建gui对象
var gui = new dat.GUI(); // console.log(THREE);
// 初始化场景

var scene = new THREE.Scene(); // 创建透视相机

var camera = new THREE.PerspectiveCamera(90, window.innerHeight / window.innerHeight, 0.1, 1000); // 设置相机位置
// object3d具有position，属性是1个3维的向量

camera.position.set(0, 0, 20); // 更新摄像头

camera.aspect = window.innerWidth / window.innerHeight; //   更新摄像机的投影矩阵

camera.updateProjectionMatrix();
scene.add(camera); // 加入辅助轴，帮助我们查看3维坐标轴
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);
// 加载纹理
// 创建纹理加载器对象

var rgbeLoader = new _RGBELoader.RGBELoader();
rgbeLoader.loadAsync("./assets/2k.hdr").then(function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
}); // 创建着色器材质;

var shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: _vertex["default"],
  fragmentShader: _fragment["default"],
  uniforms: {},
  side: THREE.DoubleSide //   transparent: true,

}); // 初始化渲染器

var renderer = new THREE.WebGLRenderer({
  alpha: true
}); // renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.BasicShadowMap;
// renderer.shadowMap.type = THREE.VSMShadowMap;

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping; // renderer.toneMapping = THREE.LinearToneMapping;
// renderer.toneMapping = THREE.ReinhardToneMapping;
// renderer.toneMapping = THREE.CineonToneMapping;

renderer.toneMappingExposure = 0.1;
var gltfLoader = new _GLTFLoader.GLTFLoader();
var LightBox = null;
gltfLoader.load("./assets/model/newyears_min.glb", function (gltf) {
  console.log(gltf);
  scene.add(gltf.scene); //   创建水面

  var waterGeometry = new THREE.PlaneBufferGeometry(100, 100);
  var water = new _Water.Water(waterGeometry, {
    scale: 4,
    textureHeight: 1024,
    textureWidth: 1024
  });
  water.position.y = 1;
  water.rotation.x = -Math.PI / 2;
  scene.add(water);
});
gltfLoader.load("./assets/model/flyLight.glb", function (gltf) {
  console.log(gltf);
  LightBox = gltf.scene.children[0];
  LightBox.material = shaderMaterial;

  for (var i = 0; i < 150; i++) {
    var flyLight = gltf.scene.clone(true);
    var x = (Math.random() - 0.5) * 300;
    var z = (Math.random() - 0.5) * 300;
    var y = Math.random() * 60 + 5;
    flyLight.position.set(x, y, z);

    _gsap["default"].to(flyLight.rotation, {
      y: 2 * Math.PI,
      duration: 10 + Math.random() * 30,
      repeat: -1
    });

    _gsap["default"].to(flyLight.position, {
      x: "+=" + Math.random() * 5,
      y: "+=" + Math.random() * 20,
      yoyo: true,
      duration: 5 + Math.random() * 10,
      repeat: -1
    });

    scene.add(flyLight);
  }
}); // 设置渲染尺寸大小

renderer.setSize(window.innerWidth, window.innerHeight); // 监听屏幕大小改变的变化，设置渲染的尺寸

window.addEventListener("resize", function () {
  //   console.log("resize");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight; //   更新摄像机的投影矩阵

  camera.updateProjectionMatrix(); //   更新渲染器

  renderer.setSize(window.innerWidth, window.innerHeight); //   设置渲染器的像素比例

  renderer.setPixelRatio(window.devicePixelRatio);
}); // 将渲染器添加到body

document.body.appendChild(renderer.domElement); // 初始化控制器

var controls = new _OrbitControls.OrbitControls(camera, renderer.domElement); // 设置控制器阻尼

controls.enableDamping = true; // 设置自动旋转

controls.autoRotate = true;
controls.autoRotateSpeed = 0.1; // controls.maxPolarAngle = (Math.PI / 3) * 2;
// controls.minPolarAngle = (Math.PI / 3) * 2;

var clock = new THREE.Clock(); // 管理烟花

var fireworks = [];

function animate(t) {
  controls.update();
  var elapsedTime = clock.getElapsedTime(); //   console.log(fireworks);

  fireworks.forEach(function (item, i) {
    var type = item.update();

    if (type == "remove") {
      fireworks.splice(i, 1);
    }
  });
  requestAnimationFrame(animate); // 使用渲染器渲染相机看这个场景的内容渲染出来

  renderer.render(scene, camera);
}

animate(); // 设置创建烟花函数

var createFireworks = function createFireworks() {
  var color = "hsl(".concat(Math.floor(Math.random() * 360), ",100%,80%)");
  var position = {
    x: (Math.random() - 0.5) * 40,
    z: -(Math.random() - 0.5) * 40,
    y: 3 + Math.random() * 15
  }; // 随机生成颜色和烟花放的位置

  var firework = new _firework["default"](color, position);
  firework.addScene(scene, camera);
  fireworks.push(firework);
}; // 监听点击事件


window.addEventListener("click", createFireworks);