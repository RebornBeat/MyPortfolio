import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import github from './github.svg'
import blue_github from './blue_github.svg'
import email from './email.svg'
import blue_email from './blue_email.svg'

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
			</div>

		);
	}
}

export default class App extends Component {
	constructor(props) {
	super(props);
	this.state = { toggled: "n/a", data: "n/a", fetched: false, index: 2, prev: false, next: false};
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
					<div className="contact_wrapper" id="email" onMouseEnter= {this.onHover.bind(this)} onMouseLeave= {this.onExit.bind(this)} >
						{ this.state.toggled != "email" && <img src={email} className="logo" alt="Logo" /> }
						{ this.state.toggled === "email" && <img src={blue_email} className="logo" alt="Logo" /> }
						<span className="contact_text" id="email" > Contact Me </span>
					</div>						
				</div>
			</div>
			<div id="projects_container">
				{ this.state.prev === true && <img src={`${process.env.PUBLIC_URL}/assets/left_arrow.svg`} id="left_button" alt="Left Arrow" width="5%" height="20%"/> }
				{ this.state.fetched === true && <ProjectDisplay data = {this.state.data} index = {this.state.index}/> }
				{ this.state.next === true && <img src={`${process.env.PUBLIC_URL}/assets/right_arrow.svg`} id="right_button" alt="Left Arrow" width="5%" height="20%"/> }
			</div>
		</div>
		);
	}
}

