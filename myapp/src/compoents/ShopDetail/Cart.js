import React from 'react'
import './cart.scss'
import $ from 'jquery'
import store from './../../redux/store.js'
import {InputNumber,Badge} from 'element-react'
export default class Cart extends React.Component {
constructor(props,context) {
    super(props);
    this.state = {
    	cartlist:[],
    	parice:0,
    	zhufu:false
    }
    
}

componentDidMount(){
	
}

onChange(value) {
	console.log(value)
	var danjia = this.state.parice;
		danjia+=value
	this.setState({
		parice:danjia
	})
}
clear(){
	store.dispatch({
      type:"DEL_CART",
      data: ''
    })
	this.refs.footer_right.innerHTML = `购物车是空的`;
    this.refs.footer_right.style.background = '#e4e4e4';
    this.setState({
    	parice:0,
    	zhifu:false
    })
}
zhifu(){
	if(this.refs.parice.innerHTML>=this.props.qisong){
		console.log(0)
		this.props.toBuy()
	}else{
		console.log(1)
	}
			
}

  render(){
  	console.log(this)
  var arr = []
  var parice = 0;
    this.props.cartlist.map((item, index) => {
      arr.push(<li key = {index}>
      	<span>{item.name}</span>
   		<InputNumber size="small" defaultValue={1} onChange={this.onChange.bind(this,item.specfoods[0].price)} min="0" max="10"></InputNumber>
		¥<time>{item.specfoods[0].price}</time>
       </li>)
      parice+=item.specfoods[0].price;
    
    })
   
    var parices = parice + this.state.parice;
    if(parices>0){
     if(parices>=this.props.qisong){
     	this.refs.footer_right.style.background = '#51d862';
     	this.refs.footer_right.style.color = '#fff';
     	this.refs.footer_right.innerHTML = `去结算&nbsp;>`
     }else if(parices<this.props.qisong){
     	this.refs.footer_right.innerHTML = `还差${this.props.qisong-parices}起送`
     	this.refs.footer_right.style.background = '#e4e4e4';
     
     }}
    var length = this.props.cartlist.length;
  	return(
  		<div id = 'cart'>
  			<header>购物车<a onClick = {this.clear.bind(this)} style = {{color:'#0089dc'}}>&nbsp;[清空]</a></header>
  			<div className = 'product'>
  				<ul>
  					{arr}
  				</ul>
  			</div>
  			<footer> 
     
  			<div  style = {{color:'#fff'}} className = 'footer_left'>
  				<Badge  className="mark" value={ length }><span style = {{fontSize:'0.14rem'}} className = 'iconfont icon-gouwuche'></span></Badge>&nbsp;&nbsp;&nbsp;¥<time id = 'parice' ref = 'parice' style = {{fontSize:'0.22rem'}}>{parices}</time>
  				&nbsp;<span style = {{fontSize:'12px',color:'#999',margin:'0.2rem'}}>|&nbsp;&nbsp;{this.props.songfei}</span>
  			</div>
  			<div onClick = {this.zhifu.bind(this)} style = {{color:'#000'}} ref = 'footer_right' className = 'footer_right'>
  				购物车是空的
  			</div>
  			</footer>
  		</div>
  	)
  }
}