import React from 'react';
import ReactThreeFbxViewer from './Viewer';
import { withRouter } from "react-router-dom";

// let fbxUrl = require('./fbx/asd.fbx');

const cameraPositions = {
    c: {
        x: 0,
        y: 0.5,
        z: 3
    },
    d: {
        x: 2,
        y: 0.5,
        z: 6
    },
    w: {
        x: 6,
        y: -6,
        z: 10
    }
}
class Model extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            asset: null,
            animationIdx: 1
        }
        this.handleChange = this.handleChange.bind(this);
    }
    updateModelState() {
        let asset = this.props.match.params.asset;
        this.setState({
            asset: asset,
            animationIdx: this.props.match.params.animationIdx
        });
        try {
            this.setState({ model: require(`./fbx/${asset}/${asset}.fbx`) });
        } catch (e) {
            console.log('No model');
        }
        try {
            this.setState({ texture: require(`./fbx/${asset}/${asset}.png`) });
        } catch (e) {
            if (asset.length > 10) {
                let texture_asset = asset.substring(0, 10);
                try {
                    this.setState({ texture: require(`./fbx/${texture_asset}/${texture_asset}.png`) });
                }
                catch (e) {
                    console.log('No og texture');
                }
            }
            console.log('No texture');
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
            return <React.Fragment></React.Fragment>
        }
        const type = this.state.asset.substring(0, 1);
        const backgroundColor = 0x000000;
        const angle = 0;
        const near = 1;
        const far = 1000;
        const viewport = {
            width: 1000,
            height: window.innerHeight - 10,
        };
        const cameraPosition = cameraPositions[type];
        const controlsPosition = {
            x: 0,
            y: 0,
            z: 0,
        };
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
                    animationIdx={this.state.animationIdx - 1} />
            </div>
        );
    }
}

export default withRouter(Model);