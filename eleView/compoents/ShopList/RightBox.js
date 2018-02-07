import React from 'react'
import $ from 'jquery'
import { Route, Switch, Redirect ,NavLink} from 'react-router-dom'

import { baseUrl } from "./../../common/base.js"
import './RightBox.scss'
import { Notification } from 'element-react';
export default class RightBox extends React.Component {
  constructor(props,context) {
    super(props);
    	this.state = {
    		isShow:true
    }
  }
  show(){
  	var that = this;
  	if(this.state.isShow){
//		that.refs.rightBox.style.right = '0';
that.refs.rightBox.style.transform='translate(-356px)';
  		that.setState({
  			isShow:false
  		})
  	}else{
  		that.refs.rightBox.style.transform='translate(0px)';
  		that.setState({
  			isShow:true
  		})
  	}
  }
  
  render(){
  	return(
  	<div ref = 'rightBox' className = 'rightBox'>
		  		<div className = 'box_left'>
		  				<div onClick = {this.show.bind(this)} className = 'cart'>
		  				<i className = 'iconfont icon-gouwuche'></i>
		  				 购物车
		  				</div>
		  				</div>
		  				<div className = 'box_right'>
		  		</div>
  		</div>
  	)
  }
}