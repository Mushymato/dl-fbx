import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Model from './Model';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename="/dl-fbx">
        <Redirect to="/c110349_01" />

        <Switch>
          <Route path="/:asset" children={<Model />} />
        </Switch>
      </BrowserRouter>)
  }
}

export default App;