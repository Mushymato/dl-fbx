import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Model from './Model';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/:id" children={<Model />} />
        </Switch>
      </BrowserRouter>)
  }
}

export default App;