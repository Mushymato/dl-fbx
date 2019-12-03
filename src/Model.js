import React from "react";
import ReactThreeFbxViewer from "./Viewer";
import { withRouter } from "react-router-dom";

// let fbxUrl = require('./fbx/asd.fbx');

const cameraPositions = {
  c: {
    x: 0,
    y: 0.5,
    z: 1.5
  },
  d: {
    x: 3,
    y: 0.5,
    z: 6
  }
};
const controlsPositions = {
  c: {
    x: 0,
    y: 0.5,
    z: 0
  },
  d: {
    x: 0,
    y: 1,
    z: 0
  }
};
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
      asset: asset
    });
    try {
      this.setState({ model: require(`./fbx/${asset}/${asset}.fbx`) });
    } catch (e) {
      //   console.log("No model");
    }
    try {
      this.setState({ texture: require(`./fbx/${asset}/${asset}.png`) });
    } catch (e) {
      if (asset.length > 10) {
        let texture_asset = asset.substring(0, 10);
        try {
          this.setState({
            texture: require(`./fbx/${texture_asset}/${texture_asset}.png`)
          });
        } catch (e) {
          //   console.log("No og texture");
        }
      }
      //   console.log("No texture");
    }
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
      height: window.innerHeight
    };
    const type = this.state.asset.substring(0, 1);
    let cameraPosition = cameraPositions[type];
    let controlsPosition = controlsPositions[type];
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
    // const zoom = 7;
    return (
      <div>
        <ReactThreeFbxViewer
          model={this.state.model}
          texture={this.state.texture}
          backgroundColor={backgroundColor}
          angle={angle}
          near={near}
          far={far}
          // zoom={zoom}
          viewport={viewport}
          cameraPosition={cameraPosition}
          controlsPosition={controlsPosition}
          animationIdx={this.props.match.params.animationIdx}
        />
      </div>
    );
  }
}

export default withRouter(Model);
