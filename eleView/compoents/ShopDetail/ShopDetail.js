import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import { Route, Switch, Redirect ,NavLink} from 'react-router-dom'

import { baseUrl } from "./../../common/base.js"
import "./ShopDetail.scss"
import Header from "../Header/Header.js"
import Footer from "../Footer/Footer.js"
import { Rate, Loading } from 'element-react';

class Shop extends React.Component {
  constructor(props,context) {
    super(props);
    this.state = {
    	detail:[],
    	shopDT:'',
    	shopDTimg:'',
    	songfei:''
    }
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
	}
	addCart(data){
		console.log(data)
	}
	
	scrollToAnchor(anchorName){
    if (anchorName) {
        let anchorElement = document.getElementById(anchorName);
        if(anchorElement) { anchorElement.scrollIntoView()}
    }
  }
	
  render() {
  		var shop=this.state.shopDT
  		var shopDT = this.state.shopDTimg
    return (
    	
    	<div className="bigbox">
    	
				<Header />
				
	    		<div className="shopdetail">
						<div className="DT_header">
							<div className="contentDT">
									<div className="shopguide-info">
										<img src={'http://fuss10.elemecdn.com/'+shopDT+'.'+shopDT.substr(32)+'?imageMogr2/thumbnail/70x70'}/>
										<div className="shang_DT">
											<h1>{this.state.shopDT.name}</h1>
											<p>------({this.state.shopDT.rating_count})</p>
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
									<li><span className="iconfont icon-msnui-qr-code"></span><span className="iconfont icon-fenlei2"></span></li>
								</ul>
							</div>
							<div className="shopcontent_head_right">
								<input type="tel" placeholder="搜索商家美食" />
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
													<li onClick = {this.scrollToAnchor.bind(this,index)} key = {index}>{item.name}</li>
												)
											})
										}
									</ul>
								<div className="shopmen_content">
								
								{
									this.state.detail.map((item,index)=>{
										return (
											<div   key = {index} className="shopmin_lis1">
												<h3 id = {index}>
													{item.name}
													<span>{item.description}</span>
												</h3>
												{
													item.foods.map((ite,ind)=>{
														return (
														<div key = {ind} className="shopmin_food">
															<span>
																<img src={'http://fuss10.elemecdn.com/'+ite.image_path+'.'+ite.image_path.substr(32)+'?imageMogr2/thumbnail/70x70'}/>
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