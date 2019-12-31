import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Model from './Model';
// import { CharacterIndex, DragonIndex } from './Gallery';
import { CharacterIndex, DragonIndex, WeaponIndex } from './Gallery';
export const fbxSource = process.env.REACT_APP_FBX_SRC;

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename="/dl-fbx">
        <Switch>
          <Route exact path="/">
            <ul>
              <li style={{ float: "left", width: "10%" }}><Link to={`/character`}>character</Link></li>
              <li style={{ float: "left", width: "10%" }}><Link to={`/dragon`}>dragon</Link></li>
              <li style={{ float: "left", width: "10%" }}><Link to={`/weapon`}>weapon</Link></li>
            </ul>
          </Route>
          <Route exact path="/character" component={CharacterIndex} />
          <Route exact path="/dragon" component={DragonIndex} />
          <Route exact path="/weapon" component={WeaponIndex} />
          <Route path="/:asset/:animationIdx?/:renderMode?/:rotation?/:cameraPosition?/:controlsPosition?" component={Model} />
        </Switch>
      </BrowserRouter>)
  }
}

export default App;
