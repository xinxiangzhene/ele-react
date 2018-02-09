import React from 'react'
import './cart.scss'
//import $ from 'jquery'
import {InputNumber} from 'element-react'
export default class Cart extends React.Component {
constructor(props,context) {
    super(props);
    this.state = {
    	cartlist:[],
    	parice:0
    }
}

onChange(value) {
	console.log(value)
	var danjia = this.state.parice;
		danjia+=value
	this.setState({
		parice:danjia
	})
}
  render(){
  var arr = []
  var parice = 0;
    this.props.cartlist.map((item, index) => {
      arr.push(<li key = {index}>
      	<span>{item.name}</span>
   		<InputNumber size="small" defaultValue={1} onChange={this.onChange.bind(this,item.specfoods[0].price)} min="0" max="10"></InputNumber>
		¥<time ref = 'parice'>{item.specfoods[0].price}</time>
       </li>)
      parice+=item.specfoods[0].price;
    
    })
   
    var parices = parice + this.state.parice;
    if(parices>0){
     if(parices>=this.props.qisong){
     	console.log('11111')
     	this.refs.footer_right.innerHTML = `去结算>`
     }else if(parices<this.props.qisong){
     	this.refs.footer_right.innerHTML = `还差${this.props.qisong-parices}起送`
     }}
  	return(
  		<div id = 'cart'>
  			<header>购物车<a>[清空]</a></header>
  			<div className = 'product'>
  				<ul>
  					{arr}
  				</ul>
  			</div>
  			<footer>
  			<div  style = {{color:'#fff'}} className = 'footer_left'>
  				<time>¥{parices}</time>
  				&nbsp;{this.props.songfei}
  			</div>
  			<div  style = {{color:'#000'}} ref = 'footer_right' className = 'footer_right'>
  				购物车是空的
  			</div>
  			</footer>
  		</div>
  	)
  }
}