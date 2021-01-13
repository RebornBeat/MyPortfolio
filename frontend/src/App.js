import './App.css';
import github from './github.svg'
import email from './email.svg'

function App() {
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
				<div className="contact_wrapper">
					<img src={github} className="logo" alt="Logo" />
					<span className="contact_text"> View Github </span>
				</div>	
				<div className="contact_wrapper">
					<img src={email} className="logo" alt="Logo" />
					<span className="contact_text"> Contact Me </span>
				</div>						
			</div>
		</div>
    </div>
  );
}

export default App;
