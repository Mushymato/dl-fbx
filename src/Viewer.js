import React from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { fbxSource } from "./App";

let OrbitControls = require("three-orbit-controls")(THREE);
let FBXLoader = require("three-fbxloader-offical");

export default class ReactThreeVisor extends React.Component {
  static propTypes = {
    model: PropTypes.string,
    texture: PropTypes.string,
    backgroundColor: PropTypes.number,
    viewport: PropTypes.object,
    cameraPosition: PropTypes.object,
    controlsPosition: PropTypes.object,
    angle: PropTypes.number,
    far: PropTypes.number,
    near: PropTypes.number,
    onError: PropTypes.func,
    onLoading: PropTypes.func,
    zoom: PropTypes.number
  };

  checkProps = () => {
    this.cameraPosition = this.props.cameraPosition || { x: 2, y: 0, z: 10 };
    this.controlsPosition = this.props.controlsPosition || { x: 0, y: 0, z: 0 };
    this.viewport = this.props.viewport || {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.angle = this.props.angle || 45;
    this.far = this.props.far || 2000;
    this.near = this.props.near || 1;
    this.lights = this.props.ligths || null;
    this.zoom = this.props.zoom || 1;
  };

  // onWindowResize = () => {
  //     this.camera.aspect = this.viewport.width / this.viewport.height;
  //     this.camera.updateProjectionMatrix();
  //     this.renderer.setSize(this.viewport.width, this.viewport.height);
  // }

  animate = () => {
    this.animation = requestAnimationFrame(this.animate);
    if (this.mixers.length > 0) {
      for (var i = 0; i < this.mixers.length; i++) {
        this.mixers[i].update(this.clock.getDelta());
      }
    }
    this.renderer.render(this.scene, this.camera);
  };
  init = () => {
    // mixers
    this.mixers = [];
    this.clock = new THREE.Clock();

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      this.angle,
      this.viewport.width / this.viewport.height,
      this.near,
      this.far
    );
    this.camera.position.set(
      this.cameraPosition.x,
      this.cameraPosition.y,
      this.cameraPosition.z
    );
    this.camera.zoom = this.zoom;
    this.camera.updateProjectionMatrix();

    // Controls
    this.controls = new OrbitControls(this.camera);
    this.controls.target.set(
      this.controlsPosition.x,
      this.controlsPosition.y,
      this.controlsPosition.z
    );
    this.controls.update();

    // Scene
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(this.props.backgroundColor);
    this.scene.background = new THREE.Color(0xfdfdfd);
    this.scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

    // Light
    let light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 200, 0);
    this.scene.add(light);
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 200, 100);
    light.castShadow = false;
    light.shadow.camera.top = 180;
    light.shadow.camera.bottom = -100;
    light.shadow.camera.left = -120;
    light.shadow.camera.right = 120;
    light = new THREE.DirectionalLight(0xffffff);
    this.scene.add(light);
    light = new THREE.AmbientLight(0x222222);
    this.scene.add(light);

    // model
    const loaderCallback = (object, textureFile, offset) => {
      let material = null;
      if (textureFile !== null) {
        const texture = new THREE.TextureLoader().load(textureFile);
        material = new THREE.MeshBasicMaterial({
          map: texture,
          skinning: true,
          wireframe: Boolean(this.props.wireframe)
        });
      }
      object.traverse(function (child) {
        if (child.isMesh) {
          if (material !== null) {
            if (Array.isArray(child.material)) {
              child.material = child.material.map(() => {
                return material;
              });
            } else {
              child.material = material;
            }
          }
          child.castShadow = false;
          child.receiveShadow = false;
        }
      });

      object.mixer = new THREE.AnimationMixer(object);
      if (object.mixer) {
        this.mixers.push(object.mixer);
      }

      if (this.props.animationIdx !== undefined) {
        if (this.props.animationIdx.includes("+")) {
          const args = this.props.animationIdx.split("+");
          if (args.length === 2) {
            const aniFile = args[0];
            const aniName = args[1];
            const ani = `${fbxSource}/fbx/${aniFile}.fbx`;
            let aniLoader = new FBXLoader();
            aniLoader.load(ani, obj => {
              const animation = obj.animations.find(a => a.name === aniName);
              if (animation) {
                let action = object.mixer.clipAction(animation);
                action.play();
              }
            });
          }
        } else if (object.animations && object.animations[this.props.animationIdx]) {
          let action = object.mixer.clipAction(object.animations[this.props.animationIdx]);
          action.play();
        }
      }
      if (offset !== null) {
        object.position.add(offset);
      }
      this.scene.add(object);
    };
    loaderCallback.bind(this);
    if (this.props.model) {
      let loader = new FBXLoader();
      loader.load(
        this.props.model,
        object => {
          loaderCallback(object, this.props.texture, null);
        },
        s => {
          this.handleLoad(s);
        },
        error => {
          this.handleError(error);
        }
      );
    }
    // if (this.props.ex) {
    //   let loader = new FBXLoader();
    //   loader.load(
    //     this.props.ex,
    //     object => {
    //       const offset = new THREE.Vector3(0, 0.25, 0);
    //       if (this.props.exTexture) {
    //         loaderCallback(object, this.props.exTexture, offset);
    //       } else {
    //         loaderCallback(object, this.props.texture, offset);
    //       }
    //     },
    //     s => {
    //       this.handleLoad(s);
    //     },
    //     error => {
    //       this.handleError(error);
    //     }
    //   );
    // }

    // Renderer
    if (this.props.pixelate) {
      this.renderer = new THREE.WebGLRenderer({ antialias: false });
      this.renderer.setPixelRatio(this.props.pixelate);
      this.renderer.domElement.style.imageRendering = 'pixelated';
    } else {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
    }
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize(this.viewport.width, this.viewport.height);
    // this.renderer.setViewport(0, 0, this.viewport.width, this.viewport.height);
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);
    // window.addEventListener('resize', this.onWindowResize.bind(this), false);
    this.animate();
  };

  handleLoad = e => {
    if (this.props.onLoad) {
      this.props.onLoading(e);
    }
  };

  handleError = e => {
    if (this.props.onError) {
      this.props.onError(e);
    }
  };

  componentDidMount() {
    this.checkProps();
    this.init();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animation);
    this.mixers = null;
    this.clock = null;
    this.camera = null;
    this.controls = null;
    this.scene = null;
    this.renderer = null;
  }
  render() {
    return (
      <div
        ref={el => {
          this.container = el;
        }}
      />
    );
  }
}
