import React from 'react'
import './RightBox.scss'
import $ from 'jquery'
export default class RightBox extends React.Component {
  constructor(props,context) {
    super(props);
    	this.state = {
    		isShow:true
    }
  }
  
  componentDidMount(){
  	var that = this;
  	this.refs.top.style.display = 'none';
  	$(".content").on("scroll", function() {
			var $scrollTop = $(".content").scrollTop();
					if($scrollTop>=500){
						that.refs.top.style.display = 'block';
					}else if($scrollTop<400){
						that.refs.top.style.display = 'none';
					}

			})
  }
  show(){
  	var that = this;
  	if(this.state.isShow){
that.refs.rightBox.style.transform='translate(-356px)';
  		that.setState({
  			isShow:false
  		})
  	}else{
  		that.refs.rightBox.style.transform='translate(0px)';
  		that.setState({
  			isShow:true
  		})
  	}
  }
  top(){
//	$(".content").scrollTop(0)
		$(".content").animate({
                scrollTop: 0
            }, 600);
  }
  render(){
  	return(
  	<div ref = 'rightBox' className = 'rightBox'>
		  		<div className = 'box_left'>
		  				<div onClick = {this.show.bind(this)} className = 'cart'>
		  				<i className = 'iconfont icon-gouwuche'></i>
		  				 购物车
		  				</div>
		  				<div className = 'goTop'>
		  				<i ref = 'top' className = 'iconfont icon-tubiao102' onClick = {this.top.bind(this)}></i>
		  				</div>
		  				</div>
		  				<div className = 'box_right'>
		  		</div>
  		</div>
  	)
  }
}