import React from 'react'
import { NavLink } from 'react-router-dom'
import $ from 'jquery'
import './home.scss'
import { baseUrl } from "./../../common/base.js"
class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			list: [],
			geohash: 'ww0v9te1kuc7',
			data: '',
			address: [],
			listIndex: [],
			city:'',
			name:'',
			user:''
		}
	}

	componentDidMount() {
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
		
		
		
		this.refs.city.style.display = 'none'
		this.refs.box.style.display = 'none'
		var arr = []
		var cityList = []
		$.ajax({
			url: baseUrl + 'city',
			dataType: 'json',
			success: (data) => {
				for(var i in data) {
					arr.push(i)
					cityList.push(data[i])
				}
				this.setState({
					list: cityList,
					listIndex: arr
				})
			}
		})
	
$.getJSON("http://api.map.baidu.com/location/ip?ip=&ak=WLPiPfqpz3ZHYduIe2ojrU9BrlEyfdq0&coor=bd09ll&callback=?", (data)=>{
                console.log(data);
                var obj = {
						latitude:data.content.point.x,
						longitude:data.content.point.y,
						name:data.address.split('|')[2]
						}
                
                this.setState({
                city:obj,
                name:data.address.split('|')[2]
                })
            });
	}
	back(data) {
		this.setState({
			city: data
		})
		
		setTimeout(()=>{
		$.ajax({
			url: baseUrl + 'geohash',
			dataType: 'json',
			data: {
				latitude: this.state.city.latitude,
				longitude: this.state.city.longitude
			},
			success: (data) => {
				this.setState({
					geohash: data.geohash,
				})
			}
		})
		},50)
	}
	search(e) {
		e.stopPropagation()
		if(this.refs.ipt.value.length > 0) {
			this.refs.box.style.display = 'block'
			this.refs.adrList.style.display = 'block'
		}else if(this.refs.ipt.value.length===0){
			this.refs.box.style.display = 'none'
			this.refs.adrList.style.display = 'none'
		}
		sessionStorage.setItem('geohash',this.state.geohash)
		$.ajax({
			url: baseUrl + 'list',
			dataType: 'json',
			data: {
				geohash: this.state.geohash,
				city: this.refs.ipt.value
			},
			success: (data) => {
				this.setState({
					address: data
				})
			}
		})
	}
	onSearch(e) {
		e.stopPropagation()
		if(this.refs.ipt.value.length > 0) {
			this.refs.box.style.display = 'block'
			this.refs.adrList.style.display = 'block'
		}
	}

	show(e) {
		e.stopPropagation()
		this.refs.box.style.display = 'block'
		this.refs.adrList.style.display = 'none'
		this.refs.city.style.display = 'block'
	}
	hide(){
		this.refs.box.style.display = 'none'
		this.refs.city.style.display = 'none'
		this.refs.adrList.style.display = 'none'
	}
    go(){
		this.props.history.push('./login')
    }
	render() {
		return(
			<div style={{overflow:"auto",width:"100%",height:"100%",position:"relative"}}>
			<div className='homeup' onClick = {this.hide.bind(this)}>
				<div className='container'>
					<div className='home_header'>
						<h1>
							<a>
								<img alt = ''  src="https://shadow.elemecdn.com/faas/desktop/media/img/map-logo.9a26ef.png"/>
							</a>
						</h1>
						<span className='home_header_right'>
						
								<span className='home_header_right_spanfirst'>{this.state.user}</span>
								
								<span ref="home_header_right_span" className='home_header_right_span'>
									<NavLink to = '/login'>注册</NavLink>
									<span>|</span>
									<NavLink to = '/login'>登录</NavLink>
								</span>
								
								
							<a className='home_header_right_a' onClick = {this.go.bind(this)}>我要开店</a>
						</span>
					</div>
					<div className='home_main'>
						<h2>
							<img alt = ''  src="https://shadow.elemecdn.com/faas/desktop/media/svg/map-logo-center.425427.svg" />
						</h2>
						<div className='home_nav'>
							<div className='home_nav_city'>
								<a className='home_city' onClick={(e)=>this.show(e)}>{this.state.city.name}
								<span className='iconfont icon-sanjiao_xia'></span>
								</a>
							</div>
							<div className='home_nav_search'>
								<div className='home_nav_1'>
									<input onKeyUp={(e)=>this.search(e)} type = 'search' ref = 'ipt' name="homeinput" placeholder="请输入你的收货地址（写字楼，小区，街道或者学校）" />
									<button className='home_but' onClick = {(e)=>this.onSearch(e)}>搜索</button>
								</div>
			<div ref = 'box' className='home_yinchang'>
			<div className = 'change_top'>
			<div>请选择你所在的城市</div><div><span>选城市</span>>定位置>叫外卖</div>
			</div>
			<div className = 'change_bottom'>
			<div>猜你在<span>{this.state.name}</span></div><div><input type = 'search' /></div>
			</div>
			<ul ref = 'adrList' className = 'diqu'>
      		{
      			this.state.address.map((item, index) => {
      					return(
      						 <li key={index}>
      						 <NavLink to = {'/shopList/'+item.geohash+'/'+item.latitude+'/'+item.longitude}>
      						 <p>{item.name}</p>
      						 <span>{item.address}</span>
      						 </NavLink></li>
      					)
      			})
      		}
						      </ul>
								 <ul ref = 'city' className = 'city'>
						            {
						              this.state.list.map((item, index) => {
						                return (
						                  <li key={index}>
						                  <strong style = {{color:'#0089DE'}}>{this.state.listIndex[index]}</strong><br />
						                      {
						                        item.map((itm, idx) => {
						                          return (
						                            <span onClick = { this.back.bind(this,itm) } key = {idx}>{itm.name}</span>
						                          )
						                        })
						                      }
						                  </li>
						                )
						              })
						            }
						          </ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			<div style={{overflow:"auto"}} className="homefooter">
				<div className="foot">
					<div className="foot_imgs">
						<img alt = ''  src="https://shadow.elemecdn.com/faas/desktop/media/img/appqc.95e532.png"/>
						<span>扫码下载 APP</span>
					</div>
					<div className="foot_txt">
						<p className="p1">新用户首次下单</p>
						<strong className="st">最高立减30元</strong>
						<p className="p2">立即下载APP，享更多优惠吧！</p>
					</div>
				</div>
				<p className="homelink">
					<a>我要开店</a>
					<a>联系我们</a>
					<a>服务条款和协议</a>
					<a>加入我们</a>
					<a>蜂鸟配送</a>
					<a>失信人员查询</a>
				</p>
				<div className="homefoo">
					互联网药品信息服务资格证书:
					<a>(沪)-经营性-2016-0011</a>
					<a> | 增值电信业务许可证 : </a>
					<a>沪B2-20150033</a> | 
					<a>上海工商行政管理</a>
					 Copyright ©2008-2017 上海拉扎斯信息科技有限公司, All Rights Reserved.
				</div>
				<div className="homefo">
					<img alt = ''  src="https://shadow.elemecdn.com/faas/desktop/media/img/picp_bg.e373b3.jpg"/>
				</div>
			</div>
			</div></div>
		)
	}
}
export default Home;