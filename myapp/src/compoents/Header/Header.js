import React from 'react'
import {NavLink} from 'react-router-dom'
import $ from "jquery"
import "./Header.scss"


class Home extends React.Component{
	constructor(props){
		super(props)
		this.state={
			user:''
		}
		
	}
	componentDidMount(){
		var that=this
		setTimeout(function(){
			if(sessionStorage.getItem('user')){
				$('.home_header_right_span').hide()
				$('.home_header_right_spanfirst').show()
				var msg=sessionStorage.getItem('user',that.user)
					var str= msg.substr(0,3)+"****"+msg.substr(7);
					that.setState({
						user:str
					})
			}else{
				$('.home_header_right_span').show()
				$('.home_header_right_spanfirst').hide()
			}
		},300)
	}
	
	render(){
		return(
			<div className='shop_box'>
				<div className="shop_header">
					<div className="shop_head_cont">
						<div className="shop_head_login">
							<img src="http://cangdu.org:8001/img/1616620aef84349.png" alt='' />
						</div>
						
						<div className="shop_head_list1">首页</div>
						<div className="shop_head_list2">我的订单</div>
						<div className="shop_head_list3">合作加盟</div>
						<div className="shop_head_list4">我的客服</div>
						
						<div className="shop_head_float">
							<div className="shop_head_float1">规则中心</div>
							<div className="shop_head_float2">
								<span className="iconfont icon-shouji"></span>
								<span>手机应用</span>
								<div className="shop_wema">
									<span>扫一扫, 手机订餐更方便</span>
									<img src="https://shadow.elemecdn.com/faas/desktop/media/img/appqc.95e532.png" alt=''/>
								</div>
							</div>
							
							<div className="shop_head_float3">
								
								<span className='home_header_right_spanfirst'>{this.state.user}</span>
								<span ref="home_header_right_span" className='home_header_right_span'>
									<span className="iconfont icon-wode"></span>
									<span><NavLink to = '/login' style = {{color:'#fff'}}>登录/注册</NavLink></span>
								</span>
								
							</div>
							
						</div>
						
					</div>
				</div>
			</div>
		)
	}
}
export default Home;
















