import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import github from './github.svg'
import blue_github from './blue_github.svg'
import email from './email.svg'
import blue_email from './blue_email.svg'

export default class App extends Component {
	constructor(props) {
	super(props);
	this.state = { toggled: "n/a",  data: "n/a", fetched: false};
	}
	
	onHover (e) {
		
		if ( e.target.id === "github" ) {
			this.setState({ toggled: "github" })
			return
		}
		
		if ( e.target.id === "email" ) {
			this.setState({ toggled: "email" })
			return
		}
		
		this.setState({ toggled: "n/a" })
		
	}
	
	onExit (e) {
		this.setState({ toggled: "n/a" })
	}
	
	
	componentDidUpdate() {
		console.log("update", this.state)
	}
	
	render () {
		
		if ( this.state.fetched === false ){
			axios.post(`/fetch/`).then((res) =>  {
				this.setState({ data: res.data.details, fetched: true })
			}) 
		}
			
		return (
		<div id="container">
			<div id="info_container">
				<div className="name">
					Christian Liz-Fonts
				</div>
				<div className="name">
					Full-Stack Web Developer
				</div>
				<div id="contact_container">
					<div className="contact_wrapper" id="github" onMouseEnter= {this.onHover.bind(this)} onMouseLeave= {this.onExit.bind(this)} >
						{ this.state.toggled != "github" && <img src={github} className="logo" alt="Logo" /> }
						{ this.state.toggled === "github" && <img src={blue_github} className="logo" alt="Logo" /> }
						<span className="contact_text"  > View Github </span>
					</div>	
					<div className="contact_wrapper" id="email" onMouseEnter= {this.onHover.bind(this)} onMouseLeave= {this.onExit.bind(this)} >
						{ this.state.toggled != "email" && <img src={email} className="logo" alt="Logo" /> }
						{ this.state.toggled === "email" && <img src={blue_email} className="logo" alt="Logo" /> }
						<span className="contact_text" id="email" > Contact Me </span>
					</div>						
				</div>
				<div id="projects_container">
				
				</div>
			</div>
		</div>
		);
	}
}

