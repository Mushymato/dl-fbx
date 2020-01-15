import React from "react";
import ReactThreeFbxViewer from "./Viewer";
import { withRouter } from "react-router-dom";
import { fbxSource } from "./App";
// import fbxIdx from './fbx/index.json';

// let fbxUrl = require('./fbx/asd.fbx');

const cameraPositions = {
  c: { x: 0, y: 0.5, z: 1.5 },
  d: { x: 3, y: 0.5, z: 6 },
  w: { x: 2, y: 0, z: 0 }
};
const controlsPositions = {
  c: { x: 0, y: 0.5, z: 0 },
  d: { x: 0, y: 1, z: 0 },
  w: { x: 0, y: 0, z: 0 }
};
const faceOffsets = {
  face1: { x: 2, y: 1 },
  face2: { x: 0, y: 0 },
  face3: { x: 1, y: 0 },
  face4: { x: 2, y: 0 },
  face5: { x: 3, y: 0 },
  face6: { x: 0, y: -1 },
  face7: { x: 1, y: -1 },
  face8: { x: 2, y: -1 },
  face9: { x: 3, y: -1 },
}
class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asset: null
    };
    this.handleChange = this.handleChange.bind(this);
  }
  updateModelState() {
    let asset = this.props.match.params.asset;
    this.setState({
      asset: asset,
      model: `${fbxSource}/fbx/${asset}/${asset}.fbx`,
      texture: `${fbxSource}/fbx/${asset}/${asset}.png`,
    });
    if (asset[0] === 'w' && asset[9] === '2') {
      let texture_asset = asset.substring(0, 9) + '1';
      this.setState({ texture: `${fbxSource}/fbx/${asset}/${texture_asset}.png` });
    }
    // try {
    //   this.setState({ model: `${fbxSource}/fbx/${asset}/${asset}.fbx` });
    // } catch (e) { }
    // try {
    //   this.setState({ texture: `${fbxSource}/fbx/${asset}/${asset}.png` });
    // } catch (e) {
    //   if (asset.length > 10) {
    //     let texture_asset = asset.substring(0, 10);
    //     try {
    //       this.setState({
    //         texture: require(`./fbx/${texture_asset}/${texture_asset}.png`)
    //       });
    //     } catch (e) { }
    //   }
    //   if (asset[0] === 'w') {
    //     try {
    //       let texture_asset = asset.substring(0, 9) + '1';
    //       this.setState({
    //         texture: require(`./fbx/${asset}/${texture_asset}.png`)
    //       });
    //     } catch (e) { }
    //   }
    // }
    // if (fbxIdx[asset.substring(0, 1)][asset].ex !== null) {
    //   const ex = fbxIdx[asset.substring(0, 1)][asset].ex;
    //   try {
    //     this.setState({ ex: require(`./fbx/${ex}/${ex}.fbx`) });
    //   } catch (e) { }
    //   try {
    //     this.setState({ exTexture: require(`./fbx/${ex}/${ex}.png`) });
    //   } catch (e) { }
    // }
  }
  componentDidMount() {
    this.updateModelState();
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.updateModelState();
    }
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    if (this.state.model === undefined) {
      return <React.Fragment></React.Fragment>;
    }
    const backgroundColor = 0x000000;
    const angle = 0;
    const near = 1;
    const far = 1000;
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight - 5
    };
    const type = this.state.asset[0];
    let cameraPosition = cameraPositions[type];
    let controlsPosition = controlsPositions[type];
    let rotation = {
      x: 0,
      y: 0,
      z: 0,
      order: 'XYZ'
    }
    if (this.props.match.params.rotation) {
      const rot = this.props.match.params.rotation.split(',');
      if (rot.length === 3) {
        rotation = {
          x: parseFloat(rot[0]),
          y: parseFloat(rot[1]),
          z: parseFloat(rot[2]),
        }
      }
    }
    if (this.props.match.params.controlsPosition) {
      const ctrl = this.props.match.params.controlsPosition.split(',');
      if (ctrl.length === 3) {
        controlsPosition = {
          x: parseFloat(ctrl[0]),
          y: parseFloat(ctrl[1]),
          z: parseFloat(ctrl[2]),
        }
      }
    }
    if (this.props.match.params.cameraPosition) {
      const cam = this.props.match.params.cameraPosition.split(',');
      if (cam.length === 3) {
        cameraPosition = {
          x: parseFloat(cam[0]),
          y: parseFloat(cam[1]),
          z: parseFloat(cam[2]),
        }
      }
    }
    let faceOffset = { x: 0, y: 0 };
    if (this.props.match.params.face && faceOffsets[this.props.match.params.face]) {
      faceOffset = faceOffsets[this.props.match.params.face];
    }
    let wireframe = false;
    let pixelate = false;
    let outline = false;
    if (this.props.match.params.renderMode) {
      const rm = this.props.match.params.renderMode[0];
      if (rm === 'p') {
        let ratio = null;
        if (this.props.match.params.renderMode[1] === 'x') {
          ratio = parseInt(this.props.match.params.renderMode.substring(2));
          outline = true;
        } else {
          ratio = parseInt(this.props.match.params.renderMode.substring(1));
        }
        if (!isNaN(ratio) && ratio > 0) {
          pixelate = 1 / ratio;
          if (outline) {
            outline = ratio / 100;
          }
        }
      } else if (rm === 'w') {
        wireframe = true;
      }
    }
    // const zoom = 7;
    return (
      <div>
        <ReactThreeFbxViewer
          model={this.state.model}
          texture={this.state.texture}
          // ex={this.state.ex}
          // exTexture={this.state.exTexture}
          backgroundColor={backgroundColor}
          angle={angle}
          near={near}
          far={far}
          // zoom={zoom}
          faceOffset={faceOffset}
          wireframe={wireframe}
          pixelate={pixelate}
          outline={outline}
          viewport={viewport}
          rotation={rotation}
          cameraPosition={cameraPosition}
          controlsPosition={controlsPosition}
          animationIdx={this.props.match.params.animationIdx}
        />
      </div>
    );
  }
}

export default withRouter(Model);
