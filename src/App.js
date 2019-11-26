import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Model from './Model';

function ModelList() {
  const files = [
    'c100001_01',
    'c100003_01',
    'c100004_04',
    'c100016_01',
    'c110349_01',
    'c100001_08',
    'c100003_02',
    'c100004_10',
    'c100018_01',
    'c100002_01',
    'c100003_07',
    'c100005_01',
    'c100009_01',
    'c100027_01',
    'c100002_02',
    'c100004_01',
    'c100006_01',
    'c100010_04',
    'c100029_01',
    'c100002_06',
    'c100004_02',
    'c100006_03',
    'c100010_07',
    'c100029_02',
  ].sort();
  return (
    <ul>
      {files.map(fn => { return (<li><Link to={`/${fn}`}>{fn}</Link></li>) })}
    </ul>
  )
}

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename="/dl-fbx">
        <Switch>
          <Route exact path="/" component={ModelList} />
          <Route path="/:asset" component={Model} />
        </Switch>
      </BrowserRouter>)
  }
}

export default App;