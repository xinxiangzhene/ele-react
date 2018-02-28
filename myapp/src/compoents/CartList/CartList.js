import React from 'react'
import store from './../../redux/store.js';
import Header from './../Header/Header.js'
import './CartList.scss'
//import Erweima from './Erweima.js'
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
    	address:[],
    	changeAdr:'',
    	address_List:[],
    	detail:''
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
		this.refs.addresss.style.display='none'
				$.ajax({
			url:baseUrl+'CartList',
			dataType:'json',
			data:{id:obj.id,latitude:obj.latitude,longitude:obj.longitude},
			success:(data)=>{
				if(JSON.parse(data.activities[1].attribute)){
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
			    if(jian===undefined){
					this.refs.manjian.style.display='none';
				}else{
					this.setState({
				    jian:cityList[jian][1],
					man:arr[jian]
				    })
				}
			}else{
				this.refs.manjian.style.display='none';
			}
			    this.setState({
				prices:prices,
				fee:data.float_delivery_fee,
				detail:data
			})

				
			}
		})
			
	//获取收货地址列表：
		$.ajax({
			url:baseUrl+'users/AddList',
			dataType:'json',
			data:{user:sessionStorage.getItem('user')},
			success:(data)=>{
				if(data[0].Add_List){
					
					this.setState({
						address_List:JSON.parse(data[0].Add_List)
					})
					this.state.address_List.map((item,index)=>{
						if(item.address.city!=sessionStorage.getItem('city')){
							$('.dizhi_list').eq(index).css({background:'#7c7c7c'})
						}
					})
				}else{
					console.log('暂无地址')
				}
				}
			})
	}
back(){
	window.history.go(-1)
}
quxiao(){
	this.setState({
		dialogVisible: false
	})
}
//确认添加地址
queding(){
	var obj = {
		name:this.refs.name.value,
		addr:this.refs.addr.value,
		sex:$('input:radio:checked').val(),
		address:this.state.changeAdr,
		tel:this.refs.tel.value,
		user:sessionStorage.getItem('user')
	}
	var arr = []
		$.ajax({
			url:baseUrl+'users/AddList',
			dataType:'json',
			data:{user:sessionStorage.getItem('user')},
			success:(data)=>{
				if(data[0].Add_List){
						arr = JSON.parse(data[0].Add_List)
						arr.push(obj)
				}else{
					arr.push(obj)
				}
				data[0].Add_List = JSON.stringify(arr)
			$.ajax({
				type:'post',
			url:baseUrl+'users/addAddress',
			data:data[0],
			success:(data1)=>{
				console.log('1')
			}
			})
			}
	})
	Message({
      type: 'success',
      message: '添加新地址成功!'
    });
	this.setState({
		dialogVisible: false
	}) 
}
//搜索详细地址
address(){
	if(this.refs.address.value.length===0){
		this.refs.addresss.style.display='none'
	}else{
		this.refs.addresss.style.display='block'
	}
	$.ajax({
			url: baseUrl + 'list',
			dataType: 'json',
			data: {
				geohash: sessionStorage.getItem('geohash'),
				city: this.refs.address.value
			},
			success: (data) => {
				this.setState({
					address: data
				})
			}
		})
}
//选择收货详细地址
changeAdr(data){
	this.setState({
		changeAdr:data
	})
	this.refs.address.value = data.name;
	this.refs.addresss.style.display='none'
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
					<ul className='pro_list'>
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
         	<li><time>位置</time><input onKeyUp={this.address.bind(this)} ref='address' placeholder='请输入小区、大厦或学校'/></li>
         	<ul className='address_list' ref='addresss'>
         		{
         			this.state.address.map((item,index)=>{
         				return(
         					<li key={index} onClick={this.changeAdr.bind(this,item)}>
         						<p>{item.name}</p>
         						<p>{item.address}</p>
         					</li>
         				)
         			})
         		}
         		</ul>
         	<li><time>详细地址</time><input  ref='addr' placeholder='单元号、门牌号'  /></li>
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
						
     							{this.state.address_List.map((item,index)=>{
     								return(
     									<li className='dizhi_list' key={index}><strong>{item.name}</strong><strong>{item.tel}</strong>
     									<p>{item.address.name}{item.address.address}&nbsp;&nbsp;{item.address.addr}</p>
     									</li>
     								)
     							})}
     						
						</ul>
					</div>
				</section>
			</div>
		)
	}
}
