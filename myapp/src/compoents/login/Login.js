import React from 'react'
import './Login.scss'
import $ from 'jquery'

import {Switch} from 'element-react';
import { Alert  } from 'element-react';

class Login extends React.Component{
	constructor(props){
		super(props)
		this.state = {
        	current: 0,
        	mag:"获取验证码",
        	codeState:false,
        	yanzhengma:'',
        	pass:'password',
        	value1:false
        };
	};
	
	componentDidMount(){
		this.refs.logininput2.style.display = 'none';
	}
	//获取验证码
	butt(){
		
		var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
		
		var that = this;
		var a=30;
		
		if(myreg.test(this.refs.tel1.value)==true){
			clearInterval(this.timer);
			this.timer=setInterval(()=>{
				if(a==0){
					a=30;
					this.setState({
						mag: "发送验证码"
					});
					this.codeState=false;
					clearInterval(that.timer);
				}else{
					this.setState({
						mag:a+"s后重新发送"
					});
					this.codeState=true;
				}
				a--
			},1000)
			
			var haoma=this.refs.tel1.value;
			console.log(haoma)
			$.ajax({
				type:"get",
				url:"http://localhost:3000/yanzheng",
				data:{user:haoma},
				success:function(data){
					console.log(data)
					this.setState({
						yanzhengma:data
					})
				}
			});
		}else{
			alert("手机号格式不对")
		}
	}
	login1(){
		var that=this;
		var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
		if(myreg.test(this.refs.tel1.value)==true){
			$.ajax({
				type:"get",
				url:"http://localhost:3000/newlogon",
				data:{user:this.refs.tel1.value,code:this.refs.password1.value},
				success:function(data){
					console.log(data)
					sessionStorage.setItem('user',that.refs.tel1.value);
					if(data==0){
						that.props.history.push('./home')
					}else if(data==1){
						that.props.history.push('./home')
					}else{
						alert("请填写正确的验证码")
					}
				}
			});
		}else{
			alert("请填写合法的手机号")
		}
	}
	
	login2(){
		console.log(this.refs.tel2.value,this.refs.password2.value)
		var that=this;
		var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
		if(myreg.test(this.refs.tel2.value)==true){
			$.ajax({
				type:"get",
				url:"http://localhost:3000/denglu",
				data:{user:this.refs.tel2.value,pass:this.refs.password2.value},
				success:function(data){
					console.log(data)
					sessionStorage.setItem('user',that.refs.tel2.value);
					if(data==0){
						that.props.history.push('./home')
					}else if(data==2){
						alert("手机号还没注册请注册")
					}else if(data==1){
						alert("手机号或密码错误")
					}
				}
			});
		}else{
			alert("请填写合法的手机号")
<<<<<<< HEAD
		}
	}
	//密码登录时密码点击显示或隐藏
	passpan(){
		if(this.state.value1==false){
			$(".login_input22_switch").removeClass("icon-yincang");
			$(".login_input22_switch").addClass("icon-xianshi");
			this.setState({
				pass:"text",
				value1:true
			})
		}else{
			$(".login_input22_switch").removeClass("icon-xianshi");
			$(".login_input22_switch").addClass("icon-yincang");
			this.setState({
				pass:"password",
				value1:false
			})
=======
>>>>>>> 79ff0442b1653b7882e5c583c65195ff5f6814bd
		}
		
	}
	duanxin(){
		this.refs.logininput.style.display = 'block';
		this.refs.logininput2.style.display = 'none';
		
		this.refs.logininput.style.fontWeight='600';
		this.refs.loginhead_span1.style.color='#2395ff';
		this.refs.loginhead_span2.style.color='#333';
	}
	mima(){
		this.refs.logininput.style.display = 'none';
		this.refs.logininput2.style.display = 'block';
		
		this.refs.logininput2.style.fontWeight='600';
		this.refs.loginhead_span2.style.color='#2395ff';
		this.refs.loginhead_span1.style.color='#333';
	}
	
	render(){
		return(
			<div className="loginbox">
			
				<div className="loginup">
					<div className="loginHeader">
						<div className="loginlogo">
							<img alt = ''  src="http://cangdu.org:8001/img/16163bcbb334272.png"/>
						</div>
						
						<div className="loginhead">
							<span ref="loginhead_span1" onClick={this.duanxin.bind(this)}>短信登录</span>
							<span ref="loginhead_span2" onClick={this.mima.bind(this)}>密码登录</span>
						</div>
					</div>
					
					<div className="logininput" ref="logininput">
						<div className="logininput1">
							<input ref = 'tel1' className="login_input1" type="tel" placeholder="手机号" />
							<button onClick={this.butt.bind(this)} ref="CountButton" className="CountButton">{this.state.mag}</button>
						</div>
						<div className="logininput2">
							<input ref = 'password1' className="login_input2" type="tel" placeholder="验证码" />
						</div>
						<button onClick = {this.login1.bind(this)} ref='loginbtn' className="loginbtn">登录</button>
					</div>
					
					<div className="logininput20" ref="logininput2">
						<div className="logininput21">
							<input ref = 'tel2' className="login_input21" type="tel" placeholder="手机号/邮箱" />
						</div>
						<div className="logininput22">
							<input ref = 'password2' className="login_input22" type={this.state.pass} placeholder="密码" />
							<span onClick = {this.passpan.bind(this)} className="login_input22_switch iconfont icon-yincang"></span>
						</div>
						<button onClick = {this.login2.bind(this)} ref='loginbtn2' className="loginbtn2">登录</button>
					</div>
					
				</div>
				
				<div className="loginfooter">
					<div className="loginfooter_div">
						<h2>所有方：上海拉扎斯信息科技有限公司</h2>
						<p>
							增值电信业务许可证 :沪B2-20150033 | 沪ICP备 09007032 |上海工商行政管理 Copyright ©2008-2017 ele.me, All Rights Reserved.  
						</p>
						<img alt = ''  src="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAA0CAMAAABfCzE1AAAC/VBMVEX29va8vLz09PT4+Pj39/36AwMEI34II2/09Pz29vH78/36+/kEBVfx9/by+/P+/v/4+fPw8fH99PP69evh4eEAAADy8uz0+ev89/f9+P5nbpnN0ubx+v3w9/D38fbr9/vDzdrttkwFGGz1/f3rqzv38e8jOnycpLwMIV3w8fr5y3jw1JLlwWDo0HvmoRzkjg65urj5wUX16+D02qnqxXbzFgz16sw6UIn8/vRmd6b32IP3w2bn7Pjo9u6LmblccZTwLxD7+u317frf5+7v4L7gsVj17ZL511/aegiMxubx8+T68eKjsc/hgS9YbKVNXYuxv9p2hq4+AAD55k7uZDr29ur8+LH79mzTqGbrlSj1thXaEAnuunHVzHUYEmAwM1PLkUb81yvbVhjs0VopEUjplUDY3e/27sZxeWUAAE3GOiMmAyHCehzG6va5ucvcxZPc5XvcykkAAD7ySSf29diolFbROQnq9fbu/OP6/MxaV2OTckdwFyB2AADS8vbd3d/16sTqypMyRneJi5PRqziiTxIsAADy9vaAveMshcEAfrxuXE6UIxCHVACZPgCSPgC+6Pa44/O82eqQyurg2tj27stzlbHq1bDo0KCDgn+vhlpSBDXBhS+cTQBYAADu9vbH7vb29u6l0u717ub29t6kxd2Jt9tsrtuty8M+icKktLAAQpEALIwAAIrow4m4n4Odp3kAAGoAAFg+Pk3JkT67fSzm9vZjpdTivbIAUaGyuKDtz5vWuJXqyYw4aYIAAHVUTVGfdTiFPgDh9PbP5vbI4fKr2PLi5Oru5uHq5OHm3dRFls11pcjT0bbhyqtjjKhFdaUsbKUAY6XkxqIAY5+7tpzPzZPeypNYbJPdsXUAPnXIn3Crk2yxfWzGmWNNTWOFXTUAACxsNQBsAABNAACl2OLY8tS7xsaTw8XYz8HUz8Hu1KVNhaVYhZ+xq5nuypN9bIxYbIXWu30ALH0ALHWfhWyTbFh1WE1jTU0+AE1NPj4APiy2dR/GhQBjAACcJ2DBAAAQ10lEQVRYw7SXW1PbRhiGl9Wyu5IsIUuMzrKEVct2gBAIYJv6bGIzYHwYGKBpCYQEJhMyFIZJJqerpLlq/0H/QC5z2emv69qpTcs9r6RFWLb32fd795sxmJh4MHFLDx4MXvx7dDcc/v+U/X9nejA4wEScAxBCMJJPgSj7kutSlQdCYlMVhARQeG4kACGAHATcHQlCDsQD8ICbgpwIx6rVeE/mYMJzKa8pri9JIoDmkHusuAjuTGzhImRuARjnuDgYyQAICaqqynnVckuyYHiA1zXOGj2HTA2RYd6RIBM3ASbg0LmxX0JWCiHMG+/WZta2LIvVUTMRBfzNcgCYngJ3JgjE71giowLj1aOUJoa15uLCl49fFlp7Jif6vutC7eZjkGHdjVvjCQZYMM4CPJ5GDcPVFmM6j8Vi5x9PTtfeqZLxlhf+W36GBe5MMD7EGtoGuVERN9dmNv44P8/1v/2d7kTn52+2f1xXkWT8p/biXWJBkWWKYXFgqIQsq0Damj89+eM81vm6t/eO6W07F/vzj5MfVt8itgtqBq+yYn7PFhf/3id0MSvxlu66HkypIi9QN6568qaqTelI07KGgiinK1xKlQQtzAqbKYUKSPYTZipBDY8KqpYvsXZkQJEHFEnyME43WEhQS2G4vvjqPHY0sbfX3GuuNveY/s7EzrfXQNwPpThAvjzCApw42MHIFFRe3JRdLTgzGRNzVYG0JNYBtdgsIccDFOd5iGA+LviSapm8oemeJbAmgzhD6TnFLFtxioaA56glerew9ARy+a2HPxwlc++al7PLx7u7u9vLl8399U+xD60lQy5lKUwkbtzi2AVRMV3c0rKyaJZJwavpcs2APJjipH67mIBle5pXdABEkV6ky44TBM7guEinJ1JI8kA9Px0lC1JtK2UB3wV8HEF4Cyvk63J2tfV77H2zebm2W52cfPPz5M/X883mw6PM/SbUVAFRzwAjrDgXH1TyczLn5BF72iC4yFuJhGGZUtF0SOYzrPWTbUPk2Uyeb2OMk4Rp+DdZ8RHI68JUGXd9bxMh3gga8TxgX3kLq6TWw9XFV7Gj/bXLewxqZbe1vTI5Wf3xsnX4/OPinmehTYpkd4QlwvgUa/dOh5CLOpUN1CUBTz3FEARZz/dxwTWNHs65WUVBnCzZpB04TMHgbBObCoo+BXsYkyQmmJ1HZ+GSaCVuY3FLWw8HwXq9djm/srK7Mnly/Gpl8nqlOn+5/yL25XFzScgDqCVGWBBycQ5R6vVJvx5VOoWoU6kUPgUKzcK8k8FBWOf9HGmjuJ4AStYmgYvEz+2GWQp6PVLxEpqYPYswyaWZCphcuCyBianbWP7qwcKX58nnM8+aJ5Mvj1cmqz9XGd715Mn8zmEy9mXj9KHqlVw0zhYEkKOIJtz0Ur6CmQYVSoZARtQvJPtiVuDkdiY6CxWaUJBN+l1H72R606GdKSQLAOnIiTLlLm7n470M6VFRFxGV9FtYxlLzQywZ+33n8qfJgVaG488sX6f7i0ex2Mff1pasvK6N3RpwocbnC39TECok8GUq+Zj41FCEIBmVoFDTkVzB3YaCrE1k4/aTbjGZw7afiwJcEX1xOof7/lJEyn2Me5TjeTGBwLhByK5Qe+vS0vreC4b1ev/yekj1qDpZPa0ObndbrQ+x2JPDPaMkCcrYLZqAYrH8hHQdxS8QR9SRIWPMq7zMXGiretAAvlyMSLeocRSyIpZxH3+1yVfcZ1iI1wTzYskqBRmMo0DO+poo64JkjLB4NpeHBG2WYT1JHixeDbGqr6ssXUOsl892Xidjzw+b66YI6QhLQihVE8/SEc5t1TokqJt1TSbYoGKjS/rZvJlL2kYNnRGSc+qcbGOn+ClDGsUoSgYOsQGitOQG5S6DikgyKhTS7XI8ISkjLE9CgKqrszMs2bHYcWuu+r2GK6yEw0K+udo5jsWeX+0sr9Z44QbLSm0abvasEAhWBZfTaXbipOk2OjjXEEsOwe1aqsj1CM6kTa+TdMI0LkhmGn+KD7D0ot1NYhb5drF4UfiUxJknuaKlwLFbMgXW1q8//TTAyhzvzzGe/6k6t/NhiPXD8pYER1geQGZN40W+AZBsE4LZQTD2a2UWc0NyO6QimTCfAkFUKGpyhzjGBc6FWw7uGgG2IXBtwpwqpIcqf2ILC2QT0BGWovC8svpoY2P/G8M6aF19d4ttQ3Z9x3rGsI52Fu/PrcrgBitLTTPFO5k02mTJcQZtiZBsKiw2BJV3cNRwaXHa1JSijwADd0q5DNt2fcLei21F3XSDgOQKdgVHtl2IiCt6ugCsERbgFN5bnVvY2Pk2iPzjq9NhzueXl5dndwe324szLxjW/v3799aNcbZY5rMJSoUyaQsGJkhXrdCvVKYTKUOuqw3WscxsLyoAQdVrXDZu46CHP7NwZzqkw9zytBoVHJLWNB93ZH2qgqnGW9Tj/8V6AKnKZ1eX504eHz6JxX5fvFquslwdHB4ezje3WX+oziw+Yg3ixc7GD2vTBhpjAQ4AhGg3M201MKZyjfc0M6tNqSlpSi8nbU6fYvnqCQnB5GDIsKIcl+vnorMuSWM7FDyoBjjHjCLMLTvCNMVZVB5jcYIA3KVfH71Z2D9iEZp79tv29fXu/OzsvdnZX3Z3r7cXW8fMxm9PN2Z+nebHDQJB3pPk+DTuKvArqWyhhBnqwAV1LqyjHoka9VDPl0m0GVKQypcKOIfL4VkXp5VyVCa2T0NJcxhWYVDEjh2RMAUgZ3CjIiJJkYz1g7m/tp++j5HYh8WFZ62nO1eLrZ3WvdZ+q/nbwuJ7Frqrx/cePlpH2hgL1dWaznZXmuUZt7WbX0Vbfo+QnjzN0tYjuOAaKVPL2qT8OWVNlwtuYinvJAu+oKhaQNK+6xLbzco29g0LeFQdYVGgSMrDg1ezp09fM1ee33960Dx4+ebNy5eD4WB/+/Gg+79/ev/0+NGsd9O3RMvUxEYOB6hNSBGOsGRedDIYE8yuDGFDz0WJvMsin7VgSCmYCoI26SDAfHeSOXsQeZZ75latDmWaGmH9U5tZBy0Nh3H8d9vUhcMNHC+ooNNhwBgHQ1RmC4rd8Sp2d3d3d3fr2Wfr2d3d3d3dng+oU0/9wz987uXdeI7B55787sbCDqGah5s0iVQumyx55uSDPXnllo2qZK1Vq12VRn1bFM/apHp6aIWanuJNRDem15aBxywcnq56ZrJZ5qS5+Qz67S9opF7JSqSCrm8G7Vkyc7a0DG/LmSpzuhR2O2/AUf4coBlK06yN5FMn7QVYsOJT5UmWLFc+WKIE9dNOjGGFI8UjkMXMmdN3SZK1uOIVvRW9Yu3ESJIkk9NnTl6tpdIkUard/Mfy4aDkzViKnKn5TBlLFshu+45ldRjNObOwRTjebjTarc1Kp2bN2RMyZCpWD9lTUByVL3upzCVK5ypK5CKp1Hlyp7FwWTKwRNo8qVKarRhLmPWSxywkq0alSJNalSulT54s/ZDY2CpevFatcsXjA6JLssyQw0gTj1Q1ZOX1VU2SGINIaOu0OeuZ8ulJtFuMFoKwGhmWocwUZSV4EPJmDkvDwv0mxtmxBLjDM1C0nbEWZdKmMeU3YiaTPQWIcsrOY4j7BSvgr1q3UqVIrOjrVAEqmKOta7X+OlCrpE9fTfTUUDWxudlh+VHyoHApjjMRrNVooe16bSUksFkIluBxBnNkd5goszU/iFYrm2BCWQw4TWTBaauZpmkzGdO7dlD8PAJJmYGHSDOYnkTEUUTaos37BAOBRCWcPH21IYBUtlzeQhW9eetWzJukSpdkyQdXjhSsEJRdmIP5jgUG5zgFTYCZ7fkN37FYmyFLioQiNg52LZGFJBwMRmRJwcPQNiHWgGiMM+NWC8CyhIWmSBqyT7DZGZ5CDOBh+oDgOXOGtEWaRxSppjNSs0HyZMm6VGnUuV2SvKDnGw1uVGVy0uSZvR65kMfjifqyp/2OBXmBFCJLWsJkMDisHb5j0Yi35ndYSKORgTyncDC8wWbggQ2zEGwujoZQGSCcGGlLS9EdKFMCbidIym5JwAgebo/0Ox+a5ghaDRf3RDyalFioOkyDatWS15lcp3HjyXBMliy2kRK9EU+lSnKI1udWUSv6P4YjJo5lTGDtIdkvi3VrSJ7KVTNX61QnOczPTg1KJoMjWIOaHrGGFHa73SFary3ajHT7X1hkwO2uKot9wpLHe6ht5bYZS6bqXbZm2RrV0zfoXK1BWU9xMRyWq7pDDqQLmzS5ENiJt1vH7YDj2KfdECo/aeXZnfCGujQL/m/cemXun32B1yvzjEIzl02cODH3dHT4zcrSa5Dv1ftno37BsnAsUTTk9EdFSRGlSKFCilMtWEGDpCrN11WufKiFkigpdSW5qstH5NLnliU/nEwQHj2+eXz67PvbWo1A1OqGC4cu74b2LxMKI7RUGHdRGP0nX5uu5xcObdh0TtfNEyeOm/5AeHiqzKDyQ84vvArfoWPFl08avKjq9suSkpgoeUSnVLmypCgeJVrQq0TLKsUTlT6a1636jHgug758YkX+aVF/5F+ypqcgNGyKVGEWanNjfvmpAiCUHz4IodXrx//BN0EYgTqWGVD/HQQYzZwKvhO5e/QbHfP9hAV5wQics4VAM2iSJ1I3UYLSV7xOWZRE2emEDlTEoMsVKsImGNLY9doywsneAr57Q49PR+hJq6ZoU8MZqPywgQjVL1MYjZ0G0Vm1uPkffLlS8mMmrZihCh+EzbvKD9t8tdW49nOGL7qzbUXTr1h4XDRjBJCxNmPRgMsf9EvFo30Ur18Uo7KYGA1K0J4A5ddcvjQGzMbQ+k7MiWJWQxAW9EeoJ2D1FEZAQBZ8RegBL7RpyZk/+NrDibC821LhyKnrW253FY4sEwb1/ygIwgsIHxgWxwJRTlsw1kTkUsNybWewtjsINaY5Nb/LVVtJdAdlTRS9UthHm2gy4YewYVDcHBeEkd+w4AWR+Y4wGqFzi8/8wdceGmD8tAPUHgR5v/sZmCttOS3MQ+NvrtWxfrp9VSuFNTHsFcOS5pUgiaoT8KJRMSxqsux2qwGaYFn8OxYJx/JTD8R/8CvWhmsj0ZyuA7562nSdj9CURRP+4Hu+ZA2ihg1cBz3Zo9+tWL0t3XK6YTdETR34FQv9hEWH1KDT6XfLst8f1TRNkiorkgaBkv2gVF1qwYDPTrII6bVFIyiUFaN8k6B8YljwqydzXRZ2fwOd0nDk+H5r/+TbIBw0bxQGrGo4yrdtRbcpy0cFtq8HX/vD/Qb8jmUJBGL5cwX9hWpLoihFRVETFQWqvjbMUeAKOKAxkC4DE2Kd2OO6IED4AQs6EU3oF3/ztbTbbBeEY+3/5Cs/CS46uiMwVBBazUVt4PByF3Uh5mv/FQv7Cctm8IVcbrc/6IagaZoM5QRIsuYEc7vUUBETQ2BmTMcyxouf6t69PdJt9pgCSLeZY7r3/4tvb/e4bx9cGz/EP9d9D/pK9QsW6B1zUQADCkAJBiFgotPlh8rXgmrI58BxEqMYxqpP+Q7ovxj2K5bRgjCHqWhAdcF2DPujYacrKgOjH9LnK8IxJEtAcDBeVxD6qv6/WA4a5zicMJiL+AKBkOpSVQgSmAPEZhqWYhGOwwV6J6bQZfJ/xSJB5PIkhuwQNpxibKDJiSwJRSiDjcdgoIOPAjBEfcfKTyDd/gcWnOL8PykPHrD+66MoPqbl0b9BYcDF/BcqnQuPP+bE4fRfLmNw9D+fREEJQxLjT2Hh798e2/4/i9N8AXbWnz5JbpfEAAAAAElFTkSuQmCC"/>
					</div>
				</div>
				
			</div>
		)
	}
}
export default Login;

















