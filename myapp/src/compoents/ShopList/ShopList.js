import React from 'react'
import $ from 'jquery'
import {NavLink } from 'react-router-dom'
import { baseUrl } from "./../../common/base.js"
import Header from './../Header/Header.js'
import './ShopList.scss'
import Footer from "../Footer/Footer.js"
import RightBox from './RightBox.js'
import { Rate, Loading,Popover } from 'element-react';
class Content extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			shopList: [],
			foodKind: [],
			geohash: '',
			latitude: '',
			longitude: '',
			twoKind: [],
			address: '',
			page: 0,
			fullscreen: false
		}
	}

	componentDidMount() {
		setTimeout(() => {
			$('.kind_right').find('span').eq(0).addClass('active')
		}, 500)
		//隐藏二级店铺分类
		this.refs.twoKind.style.display = 'none';
		//获取经纬度
		var geohash = this.props.location.pathname.split('/')[2]
		var latitude = this.props.location.pathname.split('/')[3]
		var longitude = this.props.location.pathname.split('/')[4]
		this.setState({
			geohash: geohash,
			latitude: latitude,
			longitude: longitude
			
		})
		var that = this;

		$.ajax({
			url: baseUrl + 'geohash',
			dataType: 'json',
			data: {
				latitude: latitude,
				longitude: longitude
			},
			success: (data) => {
				this.setState({
					address: data.address
				})
			}
		})

		//商品分类：
		$.ajax({
			url: baseUrl + 'foodKind',
			dataType: 'json',
			data: {
				latitude: latitude,
				longitude: longitude
			},
			success: (data) => {
				this.setState({
					foodKind: data
				})
			}
		})
		//店铺列表
		$.ajax({
			url: baseUrl + 'shopList',
			dataType: 'json',
			data: {
				geohash: geohash,
				latitude: latitude,
				longitude: longitude,
				page: this.state.page
			},
			success: (data) => {
				this.setState({
					shopList: data
				})
			}
		})
		var page = 1;
		if(sessionStorage.getItem('user')){
				more()
			this.refs.login.style.display = 'none'
		}else{
			this.refs.login.style.display = 'block';
		}
		
		function more(){
		$(".content").on("scroll", function() {
			var $scrollTop = $(".content").scrollTop();
			var $scrollTop3 = $("body")[0].clientHeight;
			var $scrollTop2 = $(".content")[0].scrollHeight;
			if(Math.floor($scrollTop + $scrollTop3) >= $scrollTop2-150) {
				console.log('滚动到底部')
				var arr = that.state.shopList
				page++;
				that.setState({
					fullscreen: true
				});
				that.timeout = setTimeout(() => {
					that.setState({
						fullscreen: false
					});
				}, 500);
				console.log(page)
				$.ajax({
					url: baseUrl + 'shopList',
					dataType: 'json',
					data: {
						geohash: geohash,
						latitude: latitude,
						longitude: longitude,
						page: page
					},
					success: (data) => {
						var arrs = arr.concat(data)
						that.setState({
							shopList: arrs
						})
					}
				})
			}
		})
		}
document.body.onfocus = function(){
document.title =that.state.address;
};
document.body.onblur = function(){
document.title = '记得回来点单哦！--饿了么';
};
	}

	//店铺分类列表
	foodList(index) {
		$('.kind_right').find('span').eq(index).addClass('active').siblings().removeClass('active')

		this.setState({
			fullscreen: true
		});
		this.timeout = setTimeout(() => {
			this.setState({
				fullscreen: false
			});
		}, 500);

		setTimeout(() => {
			$('.list_twoKind').find('span').eq(0).addClass('active').siblings().removeClass('active')
		}, 100)
		var data = this.state.foodKind[index]
		if(data.id) {
			this.refs.twoKind.style.display = 'block';
			this.setState({
				twoKind: data.sub_categories
			})
			var sign = (new Date()).getTime()
			console.log(sign)
			$.ajax({
				url: baseUrl + 'foodList',
				dataType: 'json',
				data: {
					geohash: this.state.geohash,
					latitude: this.state.latitude,
					longitude: this.state.longitude,
					id: data.id,
					sign: sign,
					page: this.state.page
				},
				success: (data) => {
//					console.log(data)
					this.setState({
						shopList: data
					})
				}
			})
		} else {
			this.refs.twoKind.style.display = 'none';
			$.ajax({
				url: baseUrl + 'shopList',
				dataType: 'json',
				data: {
					geohash: this.state.geohash,
					latitude: this.state.latitude,
					longitude: this.state.longitude,
					page: this.state.page
				},
				success: (data) => {
					this.setState({
						shopList: data
					})
				}
			})
		}
	}
	//店铺二级分类列表
	twoKind(index) {
		this.setState({
			fullscreen: true
		});
		this.timeout = setTimeout(() => {
			this.setState({
				fullscreen: false
			});
		}, 300);
		var data = this.state.twoKind[index]

		$('.list_twoKind').find('span').eq(index).addClass('active').siblings().removeClass('active')

		$.ajax({
			url: baseUrl + 'twoKind',
			dataType: 'json',
			data: {
				geohash: this.state.geohash,
				latitude: this.state.latitude,
				longitude: this.state.longitude,
				id: data.id
			},
			success: (data) => {
				this.setState({
					shopList: data
				})
			}
		})
	}
	render() {
		return(
			<div className = 'content'>
		<RightBox />
      <Header />
      {
        this.state.fullscreen && <Loading text = '正在加载更多商家。。' fullscreen={true} />
      }
      <div className = 'list_top'>
      		<span>当前位置:<time>{this.state.address}</time></span>
      		<NavLink to = '/home'><i style ={{color:'#0089dc',fontSize:'0.12rem'}}>[切换地址]</i></NavLink>
      		<div className="shopcontent_head_right">
								<input type="text" placeholder="搜索商家,美食..." />
								<button className="iconfont icon-sousuo"></button>
							</div>
      </div>
      <div className = 'list_top_logo'>
      	<div>
      		<img alt = '' src="https://shadow.elemecdn.com/faas/desktop/media/img/takeout.408a87.png" />
      	</div>
      </div>
      <div className = 'list_kind'>
      				<ul>
      				<div className = 'kind_left'>商家分类:</div>
      					<div className = 'kind_right' ref = 'foodKind'>
      			{this.state.foodKind.map((item,index)=>{
      				return(
							<span key = {index} onClick = {this.foodList.bind(this,index)}>{item.name}</span>
							)
      		})
      		}
      	
      			<div className = 'list_twoKind' ref = 'twoKind'>
      				<ul>
      			{
      				this.state.twoKind.map((items,index)=>{
      				return(
							<span key = {index} onClick = {this.twoKind.bind(this,index)}>{items.name}</span>
							)
      		})
      	}
      			</ul>
      	</div>
      			</div>
      			
      			</ul>
      	
      </div>
      
      
        <div className = 'list_shoplist'>
       		<ul>
      		{
      			this.state.shopList.map((item,i)=>{
      			return(
      			 <Popover style = {{border:'2px solid #ddd'}} key = {i} placement="right-start"  width="300" trigger="hover" content={(
      			 	<div className="list_shoplist_tanchu">
      			 	<div>
			      			 			<p>{item.name}</p>
      			 		{
      			 			item.flavors.map((ite,k)=>{
      			 				return (
			      			 		<span key = {k}>{ite.name}</span>
      			 				)
      			 			})
      			 		}
      			 		</div>
      			 		<div>
      			 			<span className="iconfont icon-huopiaotongxing"></span>
      			 			{
      			 			item.supports.map((ite1,k1)=>{
      			 				return (
			      			 		<span key = {k1}>{ite1.description}</span>
      			 				)
      			 			})
      			 		}
      			 			<p><span>{item.piecewise_agent_fee.description}元</span>|<span>平均{item.order_lead_time}分钟送达</span></p>
      			 			<p>{item.name}餐厅</p>
      			 		</div>
      			 	</div>
      			 )}>
      			<li><NavLink to = {'/shopDetail/'+item.id} >
      			<div className = 'shoplist_left'>
<img width = '0.1rem' alt='' height = '0.1rem' src ={'http://fuss10.elemecdn.com/'+item.image_path+'.'+item.image_path.substr(32)+'?imageMogr2/thumbnail/70x70'}/>  
						<p>{item.order_lead_time}分钟</p>
						</div>
      			<div className = 'shoplist_right'>
      			<h3>{item.name}</h3>
      			<Rate disabled={true} value={item.rating}/>
      			<p>配送费¥{item.float_delivery_fee}</p>
      		</div>
      			</NavLink></li>
     			 </Popover>	
      	)
      			})
      		}
      	</ul>
       </div>
       <div className="more_wai"><div className="more" ref ='login'>查看更多商家,请<NavLink to = '/login'>登录</NavLink></div></div>
       
       <Footer />
      </div>
		)
	}
}

export default Content;