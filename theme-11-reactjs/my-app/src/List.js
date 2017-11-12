import React, { Component } from 'react';

class List extends Component {

	constructor() {
		super();

		this.state = {

			data: [
				{
					id: 1,
					name: 'File 1'	
				},
				{
					id: 2,
					name: 'File 2'	
				},
				{
					id: 3,
					name: 'File 3'	
				},
				{
					id: 4,
					name: 'File 4'	
				},
			]
		}
	}

	render() {

		// create a copy of the data		
		let files = [...this.state.data];

		return(
			<ul>
				{
					files.map(file => {
						return (
							<li
								key={file.id}
							>
								{file.name}
							</li>
						)
					})
				}
			</ul>
		)
	}
}

export default List;

