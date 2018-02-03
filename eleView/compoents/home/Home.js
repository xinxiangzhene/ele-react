import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'

import './home.scss'

class Home extends React.Component{
	constructor(props){
		super(props)
		
		
	}
	render(){
		return(
			<div className='homeup'>
				<div className='container'>
					<div className='home_header'>
						<h1>
							<a>
								<img src="https://shadow.elemecdn.com/faas/desktop/media/img/map-logo.9a26ef.png"/>
							</a>
						</h1>
						<span className='home_header_right'>
							<a>注册</a>
							<span>|</span>
							<a>登录</a>
							<a>我要开店</a>
						</span>
					</div>
					<div className='home_main'>
						<h2>
							<img src="https://shadow.elemecdn.com/faas/desktop/media/svg/map-logo-center.425427.svg" />
						</h2>
						<div className='home_nav'>
							<div className='home_nav_city'>
								<a>信阳
								<span className='iconfont icon-arrLeft-fill'></span>
								</a>
							</div>
							<div className='home_nav_search'>
								<div className='home_nav_1'>
									<input type="text" name="homeinput" placeholder="请输入你的收货地址（写字楼，小区，街道或者学校）" />
									<button className='home_but'>搜索</button>
								</div>
								<div className='home_yinchang'>
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default Home;
























