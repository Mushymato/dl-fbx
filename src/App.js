import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Model from './Model';
import ModelList from './Gallery';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename="/dl-fbx">
        <Switch>
          <Route exact path="/" component={ModelList} />
          <Route path="/:asset/:animationIdx" component={Model} />
        </Switch>
      </BrowserRouter>)
  }
}

export default App;