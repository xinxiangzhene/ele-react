import React from 'react'
import ReactDOM from 'react-dom'

import FastClick from 'fastclick'
import Es6Promise from 'es6-promise'
import store from './redux/store.js'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import App from './App.js'

FastClick.attach(document.body)
Es6Promise.polyfill()

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return <h1>哈哈,又报错了!!!</h1>;
    }
    return this.props.children;
  }
}

function test(){
ReactDOM.render(<ErrorBoundary>
  	<Router>
    <Switch>
        <Route path = "/" component = {App} />
    </Switch>
  	</Router>
</ErrorBoundary>, document.getElementById("app"));
}
test();
store.subscribe(test)