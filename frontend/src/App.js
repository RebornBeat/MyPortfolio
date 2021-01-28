import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import github from './github.svg'
import blue_github from './blue_github.svg'
import email from './email.svg'
import blue_email from './blue_email.svg'
import round_github from './github_round.svg'
import round_github_mobile from './github_round_mobile.svg'
import round_email_mobile from './email_round_mobile.svg'

export class ContactDisplay extends Component {	
	constructor(props) {
	super(props);
	this.state = { fromEmail: "n/a", subject: "n/a", content: "n/a"};
	}
	
	onClick (e) {
		
		if ( e.target.id === "exit_button" ) {
			this.props.parentCallback(e.target.id);
		} else {
			let data = { fromEmail: this.state.fromEmail, subject: this.state.subject, content: this.state.content }
			
			axios.post(`/contact/`, { data }).then((res) =>  {
				this.props.parentCallback(e.target.id);
			}) 
			
		}
		
		
	}
	
	handleChange (e) {
		
		if ( e.target.id === "from_email" ) {
			this.setState({fromEmail: e.target.value})
		}
		
		if ( e.target.id === "subject" ) {
			this.setState({subject: e.target.value})
		}
		
		if ( e.target.id === "body_content" ) {
			this.setState({content: e.target.value})
		}
		
	}
	
	render() {
	
		return (
			<div id="contact_form_container">
				<div id="contact_form_wrapper">
					<input type="text" id="from_email" placeholder="Your Email" onChange={this.handleChange.bind(this)} ></input>
					<input type="text" id="subject" placeholder="Subject" onChange={this.handleChange.bind(this)} ></input>
					<textarea id="body_content" placeholder="Content" onChange={this.handleChange.bind(this)} ></textarea>
					<span id="contact_submit" onClick= { this.onClick.bind(this) } > Submit </span>
				</div>
				<img src={`${process.env.PUBLIC_URL}/assets/exit.svg`} id="exit_button" alt="Exit" width="3%" height="6%"  onClick= { this.onClick.bind(this) }  />
			</div>
		)
	}
}

export class ProjectDisplay extends Component {
	
	render() {
		
		let projectJSON = this.props.data[this.props.index]
		
		let stackList = []
		
		for ( let i in projectJSON.Tags.data) {
			stackList.push(<span className="stack">{projectJSON.Tags.data[i]}</span>)
		}
			
		let descriptionList = []

		for ( let i in projectJSON.Description.data) {
			descriptionList.push(<li>{projectJSON.Description.data[i]}</li>)
		}
		
		let animationID = undefined;
		
		return (
		
			<div id="projects_wrapper_main">
				<div id="stack_container_main">
					{stackList}
				</div>
				<span id="project_title">{projectJSON.Title}</span>
				<div id="general_container">
					<div id="photo_container">
						<img src={`${process.env.PUBLIC_URL}/assets/${projectJSON.PhotoName}`} alt="this slowpoke moves" width="100%" height="100%"/>
					</div>
					<div id="description_container">
						<ul>
							{descriptionList}
						</ul>
					</div>
				</div>
				<div className="links_container">
					<a href={projectJSON.DemoLink} target="_blank" rel="noopener noreferrer" className="project_link demo_link"><span> View Demo </span></a>
					<a href={projectJSON.GithubLink} target="_blank" rel="noopener noreferrer" className="project_link"><img src={round_github} id="Github_Link" alt="this slowpoke moves" height="90%"></img></a>
				</div>
			</div>

		);
	}
}

export class AppMain extends Component {
	constructor(props) {
	super(props);
	this.state = { toggled: "n/a", data: "n/a", fetched: false, index: 2, prev: false, next: false, projectKey: 0};
	}
	
	sendData = (e) => {
		this.props.parentCallback(e.target.id);
	}
	
	onClick (e) {
		let x = 0
		
		if ( e.target.id === "left_button"){
			x = this.state.index - 1
			this.setState({ index: x})
		}
		
		if ( e.target.id === "right_button"){
			x = this.state.index + 1 
			this.setState({ index: x})	
		}
		
		this.setState({ projectKey: Math.random()})
		
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
		
		if (this.state.data[this.state.index - 1] != undefined ) {
			if ( this.state.prev != true ) {
				this.setState({ prev: true })
			}
		} else {
			if ( this.state.prev != false ) {
				this.setState({ prev: false })
			}
		}
		
		if (this.state.data[this.state.index + 1] != undefined ) {
			if ( this.state.next != true ) {
				this.setState({ next: true })
			}
		} else {
			if ( this.state.next != false ) {
				this.setState({ next: false })
			}
		}
		
	}

	componentDidMount() {
		
		axios.post(`/fetch/`).then((res) =>  {
			this.setState({ data: res.data.details, fetched: true })
		}) 
		
	}
	
	render () {
		
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
						<div className="contact_wrapper_mobile" id="github_mobile" >
							<img src={round_github_mobile} className="logo_mobile" alt="Logo" /> 
						</div>						
						<div className="contact_wrapper" id="email" onMouseEnter= {this.onHover.bind(this)} onMouseLeave= {this.onExit.bind(this)} onClick= { this.sendData.bind(this) }>
							{ this.state.toggled != "email" && <img src={email} className="logo" alt="Logo" /> }
							{ this.state.toggled === "email" && <img src={blue_email} className="logo" alt="Logo" /> }
							<span className="contact_text" id="email" > Contact Me </span>
						</div>		
						<div className="contact_wrapper_mobile" id="email_mobile" >
							<img src={round_email_mobile} className="logo_mobile" alt="Logo" /> 
						</div>						
					</div>
				</div>
				<div id="projects_container">
					{ this.state.prev === true && <img src={`${process.env.PUBLIC_URL}/assets/left_arrow.svg`} id="left_button" alt="Left Arrow" width="5%" height="20%" onClick = {this.onClick.bind(this)} /> }
					{ this.state.fetched === true && <ProjectDisplay data = {this.state.data} index = {this.state.index} key = {this.state.projectKey} /> }
					{ this.state.next === true && <img src={`${process.env.PUBLIC_URL}/assets/right_arrow.svg`} id="right_button" alt="Left Arrow" width="5%" height="20%" onClick = {this.onClick.bind(this)} /> }
				</div>
			</div>
		);
	}
}

export default class Controller extends Component {
	constructor(props) {
		super(props);
		this.state = { displayContact: false };
	}
	
	callbackFunction = (componentName) => {
		
		if ( componentName === "email") {
			this.setState({displayContact: true});
		} else {
			this.setState({displayContact: false});
		}

	}
	
	render () {
		
		return (
			<div id="bg_container">
				{ this.state.displayContact === false &&  <AppMain parentCallback = {this.callbackFunction} /> } 
				{ this.state.displayContact === true &&  <ContactDisplay parentCallback = {this.callbackFunction} /> } 
			</div>
		)
		
	}
}

