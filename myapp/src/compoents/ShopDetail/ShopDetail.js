import React from 'react'
import $ from 'jquery'
import { baseUrl } from "./../../common/base.js"
import "./ShopDetail.scss"
import store from './../../redux/store.js'
import Header from "../Header/Header.js"
import Footer from "../Footer/Footer.js"
import { Rate} from 'element-react';
import Cart from './Cart.js'
class Shop extends React.Component {
  constructor(props,context) {
    super(props);
    this.state = {
    	detail:[],
    	shopDT:'',
    	shopDTimg:'',
    	songfei:''
    }
   this.toBuy=this.toBuy.bind(this)
  }
	componentDidMount(){
		 
		var id = this.props.match.params.id;
		var that = this;
			//店铺详情信息
			$.ajax({
			url:baseUrl+'shopDetail1',
			dataType:'json',
			data:{id:id},
			success:(data1)=>{
				console.log(data1)
				this.setState({
					songfei:data1.piecewise_agent_fee.description,
					shopDT:data1,
					shopDTimg:data1.image_path
				})
			}
		})
			$.ajax({
			url:baseUrl+'shopDetail',
			dataType:'json',
			data:{id:id},
			success:(data)=>{
				this.setState({
					detail:data
				})
			}
		})
			
	//滚动把商品分类列表定位在最上面
		$(".bigbox").on("scroll", function() {
			var $scrollTop = $(".bigbox").scrollTop();
				if($scrollTop>200){
				that.refs.shopmen_nav.style.position = 'fixed' 
				that.refs.shopmen_nav.style.top = '0' 
			}
				if($scrollTop<200){
					that.refs.shopmen_nav.style.position = 'static'
				}
		})
		setTimeout(()=>{
			$('.shopmen_nav').find('li').eq(0).addClass('active')
		},1000)
	}
	
	//加入购物车
	addCart(data){
	 store.dispatch({
      type:"ADD_CART",
      data: data
   })
	}
	
	
	//点击滚动到相对应的食物分类
	scrollToAnchor(anchorName){
		$('.shopmen_nav').find('li').eq(anchorName-1).addClass('active').siblings().removeClass('active')
    if (anchorName) {
        let anchorElement = document.getElementById(anchorName);
        	$(".bigbox").animate({
                scrollTop: anchorElement.offsetTop-160
            }, 400);
        if(anchorElement) { anchorElement.scrollIntoView()}
    }
  }
	//列表排序
	liebiao(){
		$('.shopmin_food').css({width:'90%'})
		this.refs.liebiao.style.background = '#0089dc'
		this.refs.liebiao.style.color = '#fff'
		this.refs.jiugong.style.background = '#fff'
		this.refs.jiugong.style.color = '#0089dc'
	}
	//九宫格排序
	jiugong(){
			$('.shopmin_food').css({width:'42.5%'})
			this.refs.jiugong.style.background = '#0089dc'
		  this.refs.liebiao.style.background = '#fff'
		  this.refs.liebiao.style.color = '#0089dc'
		  this.refs.jiugong.style.color = '#fff'
	}
	
	//传递去结算路由跳转方法给子组件Cart
	toBuy(){
		this.props.history.push('/login')
	}
	
  render() {
  		var shop=this.state.shopDT
  		var shopDT = this.state.shopDTimg;
    return (
    	
    	<div className="bigbox" id = 'bigbox'>
    		<Cart toBuy={this.toBuy}  cartlist = {store.getState().todoCart} qisong = {shop.float_minimum_order_amount} songfei = {this.state.songfei} />
				<Header />
				
	    		<div className="shopdetail">
						<div className="DT_header">
							<div className="contentDT">
									<div className="shopguide-info">
										<img alt = ''  src={'http://fuss10.elemecdn.com/'+shopDT+'.'+shopDT.substr(32)+'?imageMogr2/thumbnail/70x70'}/>
										<div className="shang_DT">
											<h1>{this.state.shopDT.name}</h1>
												<Rate disabled={true} value={this.state.shopDT.rating} showText={true} />
											<p>({this.state.shopDT.rating_count})</p>
										</div>
						<div className="shang_DT_tan">
										
													<ul>
														<li className="shang_DT_tanlist1">
															<div className="shang_DT_divli1">
																<h2>{this.state.shopDT.rating}</h2>
																<p>
																	<span>综合评价</span>
																	<br />
																	<span>高于周边商家</span>
																	<span>55.3%</span>
																</p>
															</div>
															<div className="shang_DT_divli2">
																<div>
																	<span>服务态度</span>
																	<Rate disabled={true} value={3.9} showText={true} />
																</div>
																<div>
																	<span>菜品评价</span>
																	<Rate disabled={true} value={3.9} showText={true} />
																</div>
															</div>
														</li>
														<li className="shang_DT_tanlist2">{this.state.shopDT.description}</li>
														<li className="shang_DT_tanlist3">
															<p>
																<span>商家地址：</span>
																<span>{this.state.shopDT.address}</span>
															</p>
															<p>
																<span>营业时间：</span>
																<span>10:00-21:30</span>
															</p>
														</li>
														<li className="shang_DT_tanlist4">
															<p>
																由<span>{this.state.shopDT.name}</span>提供配送服务
															</p>
														</li>
													</ul>
										</div>



									</div>
									<div className="shopguide-server">
										<span>
											<em>起送价</em>
											<em>{shop.float_minimum_order_amount}元</em>
										</span>
										<span>
											<em></em>
											<em>{this.state.songfei}元</em>
										</span>
										<span>
											<em>平均送达速度</em>
											<em>42分钟</em>
										</span>
									</div>
									<div className="shopguide-favor">
										<p className="iconfont icon-bqxin"></p>
										<p>收藏</p>
									</div>
							</div>
						</div>
					</div>
				
					<div className="shopcontent">
						<div className="shopcontent_cont">
							<div className="shopcontent_head">
								<ul>
									<li>所有产品</li>
									<li>评价</li>
									<li>商家资质</li>
								</ul>
								<ul>
									<li>默认排序</li>
									<li>评分<i className="iconfont icon-paixu"></i></li>
									<li>销量<i className="iconfont icon-paixu"></i></li>
									<li>价格<i className="iconfont icon-paixu"></i></li>
									<li><span  ref = 'jiugong' onClick = {this.jiugong.bind(this)} className="iconfont icon-msnui-qr-code" ></span><span ref = 'liebiao' onClick = {this.liebiao.bind(this)} className="iconfont icon-fenlei2"></span></li>
								</ul>
							</div>
							<div className="shopcontent_head_right">
								<input type="text" placeholder="搜索商家美食" />
								<button className="iconfont icon-sousuo"></button>
							</div>
						</div>
					</div>
				
					<div className="shopmain_big">
						<div className="shopmain">
							<div className="shopAction_left">
									<ul className="shopmen_nav" ref = 'shopmen_nav'>
										{
											this.state.detail.map((item,index)=>{
												return (
													<li onClick = {this.scrollToAnchor.bind(this,index+1)} key = {index}>{item.name}</li>
												)
											})
										}
									</ul>
								<div className="shopmen_content">
								
								{
									this.state.detail.map((item,index)=>{
										return (
											<div   key = {index} className="shopmin_lis1">
												<h3 id = {index+1}>
													{item.name}
													<span>{item.description}</span>
												</h3>
												{
													item.foods.map((ite,ind)=>{
														return (
														<div key = {ind} className="shopmin_food" ref = 'shopmin_food'>
															<span>
																<img alt = ''  src={'http://fuss10.elemecdn.com/'+ite.image_path+'.'+ite.image_path.substr(32)+'?imageMogr2/thumbnail/70x70'}/>
															</span>
															<div className="shopmin_food_DT">
																<p>{ite.name}</p>
																<p>{ite.description}</p>
																
																<p><span></span><span>({ite.rating_count})</span><span>月售{ite.month_sales}份</span></p>
																<p><span>￥{ite.specfoods[0].price}</span></p>
																{/*{
																	ite.specfoods.map((i,itd)=>{
																		return (
																			<p key = {itd}><span>￥{i.original_price}</span><span>{ite.min_purchase}份起购</span></p>
																		)
																	})
																}*/}
															</div>
															<div className="shopmin_food_btn">
																<button onClick = {this.addCart.bind(this,ite)}>加入购入车</button>
															</div>
														</div>
														)
													})
												}
												
											</div>
										)
									})
								}
									
								</div>
							</div>
							<div className="shopAction_right">
								
							</div>
						</div>
					</div>
					
					<Footer />
					
			</div>
    	
    )	
  		
  }
}

export default Shop;