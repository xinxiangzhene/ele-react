import React from 'react'
import './cart.scss'
import $ from 'jquery'
import store from './../../redux/store.js'
import {Badge} from 'element-react'
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

//购物车加
add(i){
	console.log(i)
	var arr = store.getState().todoCart;
	arr[i].price = arr[i].price+arr[i].price/arr[i].num;
	arr[i].num++;
	console.log(arr)
	store.dispatch({
		type:'ADD_CART',
		data:arr
	})
}
//购物车加
jian(i){
	var arr = store.getState().todoCart;
	arr[i].price = arr[i].price-arr[i].price/arr[i].num;
	arr[i].num--;
	if(arr[i].num===0){
		arr.splice(i,1)
	}
	console.log(arr)
	store.dispatch({
		type:'ADD_CART',
		data:arr
	})
}

//清空购物车
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
//点击结算按钮
zhifu(){
	if(this.refs.parice.innerHTML>=this.props.qisong){
		this.props.toBuy()
	}else{
		console.log(1)
	}
			
}

  render(){
  console.log(store.getState().todoCart)
  var arr = []
  var parice = 0;
    this.props.cartlist.map((item, index) => {
      arr.push(<li key = {index}>
      	<span>{item.name}</span>
   		<button onClick = {this.jian.bind(this,index)}>-</button><input style={{width:'30px',textAlign:'center'}}  readOnly="readOnly" value = {item.num} type = 'text' /><button onClick = {this.add.bind(this,index)}>+</button>
		¥<time>{item.price}</time>
       </li>)
      parice+=item.price;
    
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