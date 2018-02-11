import React from 'react'
import store from './../../redux/store.js'
export default class CartList extends React.Component{
	
	componentDidMount(){
		console.log(store.getState().todoCart)
	}
	render(){
		return(
			<div>
				<h1>订单信息</h1>
			</div>
		)
	}
}
