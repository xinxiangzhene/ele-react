import React from 'react'
import {Route,Switch,Redirect,NavLink} from 'react-router-dom'
import $ from 'jquery'
import './home.scss'
import { baseUrl } from "./../../common/base.js"
class Home extends React.Component{
	constructor(props){
		super(props)
		this.state = {
     list:[],
     geohash:'',
     data:'',
     address:[],
     listIndex:[]
   }
	}
	
	
	componentDidMount(){
  var arr = []
  var that = this;
  var cityList = []
		$.ajax({
			url:baseUrl+'city',
			dataType:'json',
			success:(data)=>{
				for(var i in data){
					arr.push(i)
					cityList.push(data[i])
				}
				this.setState({
					list:cityList,
					listIndex:arr
				})
			}
			})
  }
  back(data){
  	console.log(data)
  	this.setState({
				data:data
			})
  	var name = data.name
  		$.ajax({
			url:baseUrl+'geohash',
			dataType:'json',
			data:{latitude:data.latitude,longitude:data.longitude},
			success:(data)=>{
				console.log(data)
				this.setState({
					geohash:data.geohash
				})
			}
			})
  }
  search(){
  		$.ajax({
			url:baseUrl+'list',
			dataType:'json',
			data:{geohash:this.state.geohash,city:this.refs.ipt.value},
			success:(data)=>{
					this.setState({
						address:data
				})
			}
			})
  }
  onSearch(){
  	console.log('1')
  }
  shop(){
  		$.ajax({
			url:baseUrl+'shopList',
			dataType:'json',
			data:{geohash:this.state.geohash,latitude:this.state.data.latitude,longitude:this.state.data.longitude},
			success:(data)=>{
				console.log(data)
			}
			})
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
									<input onKeyUp={this.search.bind(this)} type = 'search' ref = 'ipt' name="homeinput" placeholder="请输入你的收货地址（写字楼，小区，街道或者学校）" />
									<button className='home_but' onClick = {this.onSearch.bind(this)}>搜索</button>
								</div>
								<div className='home_yinchang'>
			<ul ref = 'adrList'>
      		{
      			this.state.address.map((item, index) => {
      					return(
      						 <li key={index}>
      						 <NavLink to = {'/shopList/'+item.geohash+'/'+item.latitude+'/'+item.longitude}>{item.address}
      						 
      						 </NavLink></li>
      					)
      			})
      		}
      </ul>
		 <ul>
            {
              this.state.list.map((item, index) => {
                return (
                  <li key={index}>
                  {this.state.listIndex[index]}<br />
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
			</div>
		)
	}
}
export default Home;
























