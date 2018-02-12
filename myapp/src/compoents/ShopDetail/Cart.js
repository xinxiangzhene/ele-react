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
    	zhufu:false
    }
    
}

componentDidMount(){
	setTimeout(()=>{
		$('.add-to-cart').on('click', function () {
	var cart = $('#carts');
	var img = $(this).parent().parent().find('img').eq(0);
	if (img) {
		var imgclone = img.clone().offset({
			top: img.offset().top,
			left: img.offset().left
		}).css({
			'opacity': '0.5',
			'position': 'absolute',
			'height': '100px',
			'width': '100px',
			'z-index': '99999',
			'border-radius':'50%'
		}).appendTo($('body')).animate({
			'top': cart.offset().top + 10,
			'left': cart.offset().left + 10,
			'width': 40,
			'height': 40
		}, 1500);
		imgclone.animate({
			'width': 10,
			'height': 10
		}, function () {
			$(this).detach();
		});
	}
});
	},1000)
}

//购物车加
add(i){
	console.log(i)
	var arr = store.getState().todoCart;
	arr[i].price = arr[i].price+arr[i].price/arr[i].num;
	arr[i].num++;
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
	if(arr.length===0){
     	this.refs.footer_right.innerHTML = `购物车是空的`
	}
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
  var arr = []
  var parices = 0;
    this.props.cartlist.map((item, index) => {
      arr.push(<li key = {index}>
      	<span id = 'name'>{item.name}</span>
   		<button onClick = {this.jian.bind(this,index)}>-</button>
   		<input style={{width:'30px',textAlign:'center'}}  readOnly="readOnly" value = {item.num} type = 'text' />
   		<button onClick = {this.add.bind(this,index)}>+</button>
		<b className = 'price'>¥{item.price.toFixed(2)}</b>
       </li>)
      parices+=item.price;
    
    })
    if(parices>0){
     if(parices>=this.props.qisong){
     	this.refs.footer_right.style.background = '#51d862';
     	this.refs.footer_right.style.color = '#fff';
     	this.refs.footer_right.innerHTML = `去结算&nbsp;>`
     }else if(parices<this.props.qisong){
     	this.refs.footer_right.style.color = '#000';
     	this.refs.footer_right.innerHTML = `还差${this.props.qisong-parices}起送`
     	this.refs.footer_right.style.background = '#e4e4e4';
     
     }}
    var length = this.props.cartlist.length;
  	return(
  		<div id = 'cart'>
  			<header >购物车<a onClick = {this.clear.bind(this)} style = {{color:'#0089dc'}}>&nbsp;[清空]</a></header>
  			<div className = 'product'>
  				<ul>
  					{arr}
  				</ul>
  			</div>
  			<footer>
  			<div  style = {{color:'#fff'}} className = 'footer_left'>
  				<Badge className="mark" value={ length }><i id = 'carts' style = {{fontSize:'0.14rem'}} className = 'iconfont icon-gouwuche'></i></Badge>&nbsp;&nbsp;&nbsp;&nbsp;<time id = 'parice' ref = 'parice' style = {{fontSize:'0.22rem'}}>¥{parices.toFixed(2)}</time>
  		<span style = {{fontSize:'12px',color:'#999',marginLeft:'0.1rem'}}>|&nbsp;{this.props.songfei}</span>
  			</div>
  			<div onClick = {this.zhifu.bind(this)} style = {{color:'#000'}} ref = 'footer_right' className = 'footer_right'>
  				购物车是空的
  			</div>
  			</footer>
  		</div>
  	)
  }
}