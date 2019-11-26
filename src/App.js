import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Model from './Model';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Redirect to="/dl-fbx/c110349_01" />

        <Switch>
          <Route path="/dl-fbx/:id" children={<Model />} />
        </Switch>
      </BrowserRouter>)
  }
}

export default App;