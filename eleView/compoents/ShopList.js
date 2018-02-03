import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import { Route, Switch, Redirect ,NavLink} from 'react-router-dom'
import { baseUrl } from "./../common/base.js"
class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    		shopList:[]
    }
  }
  componentDidMount(){
  	console.log(this.props.location.pathname)
  	var geohash = this.props.location.pathname.split('/')[2]
  	console.log(geohash)
  	var latitude = this.props.location.pathname.split('/')[3]
  	console.log(latitude)
  	var longitude = this.props.location.pathname.split('/')[4]
  	console.log(longitude)
	 
		$.ajax({
			url:baseUrl+'shopList',
			dataType:'json',
			data:{geohash:geohash,latitude:latitude,longitude:longitude},
			success:(data)=>{
				console.log(data)
				this.setState({
					shopList:data
				})
			}
			})
  }
  render() {
    return (
      <div className = 'content'>
      sssssssssss
      <ul>
      		{
      			this.state.shopList.map((item,i)=>{
      			return(<li key = {i}><NavLink to = {'/shopDetail/'+item.id}>{item.name}</NavLink></li>)	
      			})
      		}
      		</ul>
      </div>
    )
  }
}

export default Content;