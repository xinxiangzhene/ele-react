import React from 'react'
import './cart.scss'
import {InputNumber} from 'element-react'
export default class Cart extends React.Component {
constructor(props,context) {
    super(props);
    this.state = {
    	cartlist:[],
    	parices:0
    }
}

onChange(value) {
	console.log(value)
}
  render(){
  var arr = []
  var parices = 0;
    this.props.cartlist.map((item, index) => {
      arr.push(<li key = {index}>
      	<span>{item.name}</span>
   <InputNumber size="small" defaultValue={1} onChange={this.onChange.bind(this)} min="1" max="10"></InputNumber>
		¥<time className = 'parice'>{item.specfoods[0].price}</time>
       </li>)
      parices+=item.specfoods[0].price;
      
    })
    console.log(parices)
  	return(
  		<div id = 'cart'>
  			<header>购物车<a>[清空]</a></header>
  			<div className = 'product'>
  				<ul>
  					{arr}
  				</ul>
  			</div>
  			<footer>
  			<div className = 'footer_left'>
  				<time style = {{color:'#fff'}}>¥{parices}</time>
  			</div>
  			<div className = 'footer_right'></div>
  			</footer>
  		</div>
  	)
  }
}