import React from 'react';
import ReactThreeFbxViewer from './Viewer';
import { withRouter } from "react-router-dom";

// let fbxUrl = require('./fbx/asd.fbx');

class Model extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            asset: null,
            animationIdx: 1
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.setState({
            asset: this.props.match.params.asset,
            animationIdx: this.props.match.params.animationIdx
        });
    }
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.setState({
                asset: this.props.match.params.asset,
                animationIdx: this.props.match.params.animationIdx
            });
        }
    }
    modelExists() {
        try {
            require.resolve(`./fbx/${this.state.asset}/${this.state.asset}.fbx`);
            require.resolve(`./fbx/${this.state.asset}/${this.state.asset}.png`);
            return true;
        } catch (e) {
            return false;
        }
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        if (!this.modelExists()) {
            return <React.Fragment></React.Fragment>
        }
        const model = require(`./fbx/${this.state.asset}/${this.state.asset}.fbx`);
        const texture = require(`./fbx/${this.state.asset}/${this.state.asset}.png`);
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
        };
        return (
            <div>
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
                    animationIdx={this.state.animationIdx - 1} />
            </div>
        );
    }
}

export default withRouter(Model);