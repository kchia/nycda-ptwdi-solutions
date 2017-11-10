import React, { Component } from 'react';
import './Folder.css';

class Folder extends Component {
	constructor() {
		super();

		this.state = {
			isHidden: false
		};
	}

	render() {
		return (
			<div>
				<h1>
					Home
				</h1>
				<ul
					className={this.state.isHidden ? 'file-list-hidden' : 'file-list'}
				>
					<li>
						File1
					</li>
					<li>
						File2
					</li>
					<li>
						File3
					</li>
				</ul>
				<button onClick={() => this.toggleVisibility()}>
					toggle!
				</button>
			</div>	
		)
	}

	toggleVisibility() {
		
		this.setState(currentState => ({
			isHidden: !currentState.isHidden
		}), () => console.log(`Toggling visibility of files!: ${this.state.isHidden}`))
	}
}

export default Folder;