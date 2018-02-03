import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ShopList from './compoents/ShopList.js'
import Home from './compoents/home/home.js'
import ShopDetail from './compoents/ShopDetail.js'
import Content from './compoents/Content.js'
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className = 'container'>
      <Switch>
    
     <Route path="/content" component = {Content} />
      <Route exact  path="/home" component = {Home}/>
       <Redirect path = "/" to = "/home" />
     <Route path="/shopList" component = {ShopList} />
     <Route path="/shopDetail/:id" component = {ShopDetail} />
     </Switch>
      </div>
    )
  }
}

export default App;