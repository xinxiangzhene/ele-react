import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ShopList from './compoents/ShopList/ShopList.js'
import Home from './compoents/home/Home.js'
import Login from './compoents/login/Login.js'
import ShopDetail from './compoents/ShopDetail/ShopDetail.js'
import CartList from './compoents/CartList/CartList.js'
class App extends React.Component {
//constructor(props) {
//  super(props);
//}
  render() {
    return (
      <div className = 'container'>
      <Switch>
    	<Route path="/login" component = {Login} />
      <Route exact  path="/home" component = {Home}/>
      <Route path="/shopList" component = {ShopList} />
     <Route path="/shopDetail/:id" component = {ShopDetail} />
     <Route path="/shopList" component = {ShopList} />
     <Route path="/shopDetail/:id" component = {ShopDetail} />
     <Route path="/CartList" component = {CartList} />
      <Redirect path = '/' to = '/home' />
     </Switch>
      </div>
    )
  }
}

export default App;