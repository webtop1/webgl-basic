"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Three = _interopRequireWildcard(require("three"));

var _fragment = _interopRequireDefault(require("../shaders/startpoint/fragment.glsl"));

var _vertex = _interopRequireDefault(require("../shaders/startpoint/vertex.glsl"));

var _fragment2 = _interopRequireDefault(require("../shaders/fireworks/fragment.glsl"));

var _vertex2 = _interopRequireDefault(require("../shaders/fireworks/vertex.glsl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Fireworks =
/*#__PURE__*/
function () {
  function Fireworks(color, to) {
    var _this = this;

    var from = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      x: 0,
      y: 0,
      z: 0
    };

    _classCallCheck(this, Fireworks);

    console.log("???????????????", color, to);
    this.color = new Three.Color(color); // ???????????????????????????

    this.startGeometry = new Three.BufferGeometry();
    var startPositionArray = new Float32Array(3);
    startPositionArray[0] = from.x;
    startPositionArray[1] = from.y;
    startPositionArray[2] = from.z;
    this.startGeometry.setAttribute("position", new Three.BufferAttribute(startPositionArray, 3));
    var astepArray = new Float32Array(3);
    astepArray[0] = to.x - from.x;
    astepArray[1] = to.y - from.y;
    astepArray[2] = to.z - from.x;
    this.startGeometry.setAttribute("aStep", new Three.BufferAttribute(astepArray, 3)); // ?????????????????????

    this.startMaterial = new Three.ShaderMaterial({
      vertexShader: _vertex["default"],
      fragmentShader: _fragment["default"],
      transparent: true,
      blending: Three.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: {
          value: 0
        },
        uSize: {
          value: 20
        },
        uColor: {
          value: this.color
        }
      }
    }); // console.log(this.startGeometry);
    // ??????????????????

    this.startPoint = new Three.Points(this.startGeometry, this.startMaterial); // ????????????

    this.clock = new Three.Clock(); // ?????????????????????

    this.fireworkGeometry = new Three.BufferGeometry();
    this.FireworksCount = 180 + Math.floor(Math.random() * 180);
    var positionFireworksArray = new Float32Array(this.FireworksCount * 3);
    var scaleFireArray = new Float32Array(this.FireworksCount);
    var directionArray = new Float32Array(this.FireworksCount * 3);

    for (var i = 0; i < this.FireworksCount; i++) {
      // ?????????????????????
      positionFireworksArray[i * 3 + 0] = to.x;
      positionFireworksArray[i * 3 + 1] = to.y;
      positionFireworksArray[i * 3 + 2] = to.z; //   ???????????????????????????????????????

      scaleFireArray[i] = Math.random(); //   ???????????????????????????

      var theta = Math.random() * 2 * Math.PI;
      var beta = Math.random() * 2 * Math.PI;
      var r = Math.random();
      directionArray[i * 3 + 0] = r * Math.sin(theta) + r * Math.sin(beta);
      directionArray[i * 3 + 1] = r * Math.cos(theta) + r * Math.cos(beta);
      directionArray[i * 3 + 2] = r * Math.sin(theta) + r * Math.cos(beta); //   console.log(
      //     directionArray[i * 3 + 0],
      //     directionArray[i * 3 + 1],
      //     directionArray[i * 3 + 2]
      //   );
    }

    this.fireworkGeometry.setAttribute("position", new Three.BufferAttribute(positionFireworksArray, 3));
    this.fireworkGeometry.setAttribute("aScale", new Three.BufferAttribute(scaleFireArray, 1));
    this.fireworkGeometry.setAttribute("aRandom", new Three.BufferAttribute(directionArray, 3));
    this.fireworksMaterial = new Three.ShaderMaterial({
      uniforms: {
        uTime: {
          value: 0
        },
        uSize: {
          value: 0
        },
        uColor: {
          value: this.color
        }
      },
      transparent: true,
      blending: Three.AdditiveBlending,
      depthWrite: false,
      vertexShader: _vertex2["default"],
      fragmentShader: _fragment2["default"]
    });
    this.fireworks = new Three.Points(this.fireworkGeometry, this.fireworksMaterial); // ????????????

    this.linstener = new Three.AudioListener();
    this.linstener1 = new Three.AudioListener();
    this.sound = new Three.Audio(this.linstener);
    this.sendSound = new Three.Audio(this.linstener1); // ?????????????????????

    var audioLoader = new Three.AudioLoader();
    audioLoader.load("./assets/audio/pow".concat(Math.floor(Math.random() * 4) + 1, ".ogg"), function (buffer) {
      _this.sound.setBuffer(buffer);

      _this.sound.setLoop(false);

      _this.sound.setVolume(1);
    });
    audioLoader.load("./assets/audio/send.mp3", function (buffer) {
      _this.sendSound.setBuffer(buffer);

      _this.sendSound.setLoop(false);

      _this.sendSound.setVolume(1);
    });
  } //   ???????????????


  _createClass(Fireworks, [{
    key: "addScene",
    value: function addScene(scene, camera) {
      scene.add(this.startPoint);
      scene.add(this.fireworks);
      this.scene = scene;
    } //   update??????

  }, {
    key: "update",
    value: function update() {
      var elapsedTime = this.clock.getElapsedTime(); // console.log(elapsedTime);

      if (elapsedTime > 0.2 && elapsedTime < 1) {
        if (!this.sendSound.isPlaying && !this.sendSoundplay) {
          this.sendSound.play();
          this.sendSoundplay = true;
        }

        this.startMaterial.uniforms.uTime.value = elapsedTime;
        this.startMaterial.uniforms.uSize.value = 20;
      } else if (elapsedTime > 0.2) {
        var time = elapsedTime - 1; //   ??????????????????

        this.startMaterial.uniforms.uSize.value = 0;
        this.startPoint.clear();
        this.startGeometry.dispose();
        this.startMaterial.dispose();

        if (!this.sound.isPlaying && !this.play) {
          this.sound.play();
          this.play = true;
        } //??????????????????


        this.fireworksMaterial.uniforms.uSize.value = 20; //   console.log(time);

        this.fireworksMaterial.uniforms.uTime.value = time;

        if (time > 5) {
          this.fireworksMaterial.uniforms.uSize.value = 0;
          this.fireworks.clear();
          this.fireworkGeometry.dispose();
          this.fireworksMaterial.dispose();
          this.scene.remove(this.fireworks);
          this.scene.remove(this.startPoint);
          return "remove";
        }
      }
    }
  }]);

  return Fireworks;
}();

exports["default"] = Fireworks;