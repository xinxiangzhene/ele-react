import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import { Route, Switch, Redirect ,NavLink} from 'react-router-dom'
import { baseUrl } from "./../common/base.js"
class Header extends React.Component {
  constructor(props,context) {
    super(props);
    this.state = {
    	detail:[]
    }
  }
	componentDidMount(){
		console.log(this.props.match.params.id)
		var id = this.props.match.params.id;
			$.ajax({
			url:baseUrl+'shopDetail',
			dataType:'json',
			data:{id:id},
			success:(data)=>{
				console.log(data)
				this.setState({
					detail:data
				})
			}
			})
	}
	detail(data){
		console.log(data)
	}
  render() {
    return (
    	<div>店铺详情
    	 <ul>
      		{
      			this.state.detail.map((item,i)=>{
      			return(<li key = {i} onClick = {this.detail.bind(this,item)}>{item.name}</li>)	
      			})
      		}
      		</ul>
    	
    	</div>
    )
  }
}

export default Header;