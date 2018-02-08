import React from 'react'
import "./Footer.scss"

class Footer extends React.Component{
	constructor(props){
		super(props)
		this.state={
			
		}
		
	}
	render(){
		return(
			<div className='Footer_boxs'>
				<div className="Footerbox_foot">
					<div className="Footerbox_foot_list1_div">
					<div className="Footerbox_foot_list1">
						<h3>用户帮助</h3>
						<span>我的客服</span>
					</div>
					<div className="Footerbox_foot_list2">
						<h3>商务合作</h3>
						<span>我要开店</span>
						<span>加盟指南</span>
						<span>市场合作</span>
						<span>开放平台</span>
					</div>
					<div className="Footerbox_foot_list3">
						<h3>关于我们</h3>
						<span>饿了么介绍</span>
						<span>加入我们</span>
						<span>联系我们</span>
						<span>规则中心</span>
					</div>
					<div className="Footerbox_foot_list4">
						<ul>
							<li>24小时客服热线 : 10105757</li>
							<li>关注我们
							<span className="iconfont icon-weixin"></span>
							<span className="iconfont icon-weibo"></span>
							</li>
						</ul>
					</div>
					<div className="Footerbox_foot_list5">
						<img alt = '' src="https://shadow.elemecdn.com/faas/desktop/media/img/appqc.95e532.png"/>
						<div className="Footerbox_foot_list51">
							<h3>下载手机版</h3>
							<p>扫一扫,手机订餐方便</p>
						</div>
					</div>
					</div>
					<div className="Footerbox_foot_list6">
						<h5>所有方：上海拉扎斯信息科技有限公司</h5>
						<p>增值电信业务许可证 : 沪B2-20150033|上海工商行政管理| Copyright ©2008-2017 ele.me, All Rights Reserved.</p>
					</div>
					<div className="Footerbox_foot_list7">
						<img alt = '' src="https://shadow.elemecdn.com/faas/desktop/media/img/picp_bg.e373b3.jpg"/>
					</div>
				</div>
			</div>
		)
	}
}
export default Footer;
















