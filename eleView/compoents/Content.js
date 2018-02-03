import React from 'react'
import ReactDOM from 'react-dom'
import {NavLink} from 'react-router-dom'
import $ from 'jquery'
import { baseUrl } from "./../common/base.js"

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     cityList:[],
     geohash:'',
     data:'',
     address:[]
    }
  }
  componentDidMount(){
  var arr = []
  var that = this;
		$.ajax({
			url:baseUrl+'city',
			dataType:'json',
			success:function(data){
				for(var i in data){
					arr.push(data[i])	
				}
			that.setState({
				cityList:arr
			})}
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
    render() {
    	console.log(this.state.address)
    	var that = this
    	console.log(this.state.geohash)
    	var data = that.state.cityList
    	return (
      <div style = {{overflow:'auto'}}>
      <input onKeyUp = {this.search.bind(this)} type = 'search' ref = 'ipt' />
      <button onClick = {this.shop.bind(this)}>搜索城市地区</button>
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
              this.state.cityList.map((item, index) => {
                return (
                  <li key={index}>
                      {
                        item.map((itm, idx) => {
                          return (
                            <span  onClick = { this.back.bind(this,itm) } key = {idx}>{itm.name}</span>
                          )
                        })
                      }
                  </li>
                )
              })
            }
          </ul>
      </div>
    )
	    	
  }
}

export default Content;