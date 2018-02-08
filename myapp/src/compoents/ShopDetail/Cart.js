import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import { Route, Switch, Redirect ,NavLink} from 'react-router-dom'

import { baseUrl } from "./../../common/base.js"

export default class Cart extends React.Component {
  constructor(props,context) {
    super(props);
    this.state = {
    	
    }
  }
  render(){
  	return(
  		<div id = 'cart'>
  			<header></header>
  			<div></div>
  		</div>
  	)
  }
}