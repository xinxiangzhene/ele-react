import React from 'react'
import store from './../../redux/store.js'
import Header from './../Header/Header.js'
import './CartList.scss'
import {Dialog,Button,Message} from 'element-react'
import { baseUrl } from "./../../common/base.js"
import $ from 'jquery'
export default class CartList extends React.Component{
	constructor(props,context) {
    super(props);
    this.state = {
    	proList:[],
    	man:0,
    	jian:0,
    	prices:0,
    	fee:0,
    	 dialogVisible: false,
    	 address:[]
    }
    
}
	componentDidMount(){
		var obj = JSON.parse(localStorage.getItem('info'));
		var objs = JSON.parse(localStorage.getItem('proList'))
		this.setState({
				proList:JSON.parse(localStorage.getItem('proList'))
			})
		var arr=[];
		var cityList=[]
		var prices=0;
		var manjian;
				$.ajax({
			url:baseUrl+'CartList',
			dataType:'json',
			data:{id:obj.id,latitude:obj.latitude,longitude:obj.longitude},
			success:(data)=>{
				console.log(data)
				manjian = JSON.parse(data.activities[1].attribute)
				objs.map((item,index)=>{
					prices+=item.price;
				})
				for(var i in manjian) {
					arr.push(i)
					cityList.push(manjian[i])
				}
				var jian;
			    arr.map((it,i)=>{
			    	if(prices>=it){
			    		jian=i;
			    	}
			    })
			    this.setState({
				prices:prices,
				fee:data.float_delivery_fee
			})

				console.log()
				if(jian===undefined){
					this.refs.manjian.style.display='none';
				}else{
					this.setState({
				    jian:cityList[jian][1],
					man:arr[jian]
				    })
				}
			}
		})
			
//		setTimeout(()=>{
//			$.ajax({
//					url: "http://localhost:3000/ele/proList",
//					type:'post',
//					data:{list:arrs},
//					 cache: false,
//					success:function(data){
//						console.log(data)
//					}
//				})
//		},300)
	}
back(){
	window.history.go(-1)
}
quxiao(){
	this.setState({
		dialogVisible: false
	})
}
queding(){
	var obj = {
		name:this.refs.name.value,
		addr:this.refs.addr.value,
		sex:$('input:radio:checked').val(),
		address:this.refs.address.value,
		tel:this.refs.tel.value
	}
	console.log(obj)
	Message({
      type: 'success',
      message: '添加新地址成功!'
    });
	this.setState({
		dialogVisible: false
	}) 
}
address(){
	console.log(this.refs.address.value)
	console.log(sessionStorage.getItem('geohash'))
	$.ajax({
			url: baseUrl + 'list',
			dataType: 'json',
			data: {
				geohash: sessionStorage.getItem('geohash'),
				city: this.refs.address.value
			},
			success: (data) => {
				console.log(data)
				this.setState({
					address: data
				})
			}
		})
}
	render(){
		return(
			<div id = 'dingdan'>
				<Header />
				<aside>
					<div className='aside_header'>
						<h1>订单信息</h1>
						<p onClick={this.back.bind(this)}><i style={{fontSize:'12px'}} className='iconfont icon-fanhui1'></i>返回商家修改</p>
					</div>
					<ul>
						<li><span>商品</span><span>份数</span><span>小计(元)</span></li>
						{
							this.state.proList.map((item,index)=>{
								return(
									<li key={index}>
									<span>{item.name}</span><span>{item.num}</span><span>¥{item.price.toFixed(2)}</span>
									</li>
								)
							})
						}
					</ul>
					<div className='aside_footer'>
					<p>总价:<span>¥{this.state.prices.toFixed(2)}</span></p>
					<p ref='manjian'>满{this.state.man}减{this.state.jian}:<span>-¥{this.state.jian.toFixed(2)}</span></p>
					<p>餐盒费:<span>¥{this.state.proList.length.toFixed(2)}</span></p>
					<p>配送费:<span>¥{this.state.fee.toFixed(2)}</span></p>
					<p><span>结算:¥<time>{this.state.prices.toFixed(2)-this.state.jian+this.state.proList.length+this.state.fee}</time></span></p>
					</div>
					<div className='bg'><img src='http://cangdu.org:8001/img/161d1e2305e5255.png' /></div>
				</aside>
				<section>
					<div className='sec_address'>
						<div className='address_top'>
							<h1>收货地址</h1>
							<span onClick={ () => this.setState({ dialogVisible: true }) }>添加新地址</span>
     
     
     <Dialog className="dialog" size="tiny" visible={ this.state.dialogVisible }  onCancel={ () => this.setState({ dialogVisible: false }) } lockScroll={ false }>
        <Dialog.Body>
         <ul>
         	<li><time>姓名</time><input ref='name' placeholder='请输入您的姓名' /></li>
         	<li><time>性别</time>
         	<input type='radio' ref='sex' name='sex' defaultValue='男' />男&nbsp;&nbsp;
         	<input type='radio' ref='sex' name='sex'  defaultValue='女' />女
         	</li>
         	<li><time>位置</time><input ref='addr' placeholder='单元号、门牌号' /></li>
         	<li><time>详细地址</time><input onKeyUp={this.address.bind(this)} ref='address' placeholder='请输入小区、大厦或学校' /></li>
         	<li><time>手机号</time><input ref='tel' placeholder='请输入您的手机号' /></li>
         </ul>
        </Dialog.Body>
        <Dialog.Footer className="dialog-footer">
          <Button onClick={this.quxiao.bind(this)}>取消</Button>
          <Button type="primary" onClick={this.queding.bind(this) }>确定</Button>
        </Dialog.Footer>
      </Dialog>
						</div>
						<ul className='address_center'>
							
						</ul>
					</div>
				</section>
			</div>
		)
	}
}
