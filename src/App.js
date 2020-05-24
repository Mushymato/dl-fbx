import React from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import Model from './Model';
// import { CharacterIndex, DragonIndex } from './Gallery';
import { CharacterIndex, DragonIndex, WeaponIndex, OtherIndex } from './Gallery';
export const fbxSource = process.env.PUBLIC_URL;

class App extends React.Component {
  render() {
    return (
      <HashRouter basename="/">
        <Switch>
          <Route exact path="/">
            <ul>
              <li><Link to={`/character`}>character</Link></li>
              <li><Link to={`/dragon`}>dragon</Link></li>
              <li><Link to={`/weapon`}>weapon</Link></li>
              <li><Link to={`/other`}>other</Link></li>
            </ul>
          </Route>
          <Route exact path="/character" component={CharacterIndex} />
          <Route exact path="/dragon" component={DragonIndex} />
          <Route exact path="/weapon" component={WeaponIndex} />
          <Route exact path="/other" component={OtherIndex} />
          <Route path="/:asset/:animationIdx?/:face?/:renderMode?/:rotation?/:cameraPosition?/:controlsPosition?" component={Model} />
        </Switch>
      </HashRouter>)
  }
}

export default App;
