import React from 'react';
import ReactThreeFbxViewer from './viewer';
import { withRouter } from "react-router-dom";

// let fbxUrl = require('./fbx/asd.fbx');

class Model extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            asset: this.props.match.params.asset
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.setState({ asset: this.props.match.params.asset });
        }
    }
    onLoad(e) {
        console.log(e);
    }
    onError(e) {
        console.log(e);
    }
    modelExists() {
        try {
            require.resolve(`./fbx/${this.state.asset}.fbx`);
            require.resolve(`./fbx/${this.state.asset}.png`);
            return true;
        } catch (e) {
            return false;
        }
    }
    render() {
        if (!this.modelExists()) {
            return <React.Fragment></React.Fragment>
        }
        const model = require(`./fbx/${this.state.asset}.fbx`);
        const texture = require(`./fbx/${this.state.asset}.png`);
        const backgroundColor = 0x000000;
        const angle = 0;
        const near = 1;
        const far = 100;
        const viewport = {
            width: 400,
            height: 800,
        }
        const cameraPosition = {
            x: 0,
            y: 0,
            z: 3
        };
        const controlsPosition = {
            x: 0,
            y: 0,
            z: 0
        }
        return (
            <ReactThreeFbxViewer
                model={model}
                texture={texture}
                backgroundColor={backgroundColor}
                angle={angle}
                near={near}
                far={far}
                viewport={viewport}
                cameraPosition={cameraPosition}
                controlsPosition={controlsPosition}
                onLoading={this.onLoad}
                onError={this.onError} />
        );
    }
}

export default withRouter(Model);