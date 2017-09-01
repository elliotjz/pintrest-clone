import React from 'react'
import Pin from './Pin'

class Grid extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			columns: 1
		}
	}

	getColumns() {
		const width = document.documentElement.clientWidth
		let columns = 1
		if (width > 1000) { columns = 5 }
		else if (width > 800) { columns = 4 }
		else if (width > 600) { columns = 3 }
		else if (width > 400) { columns = 2 }
		this.setState({
			columns
		})
	}

	mapPinsToColumns() {
		let columns = []
		const numberOfColumns = this.state.columns

		for(let i = 0; i < numberOfColumns; i++) {
			columns.push([])
		}
		this.props.pinList.forEach((pin, index) => {
			columns[index % numberOfColumns].push(pin)
		})
		return columns
	}

	componentDidMount() {
		this.getColumns()
		window.addEventListener("resize", () => {
			this.getColumns()
		})
	}

	render() {
		let columns = this.mapPinsToColumns()
		return (
			<div className='masonry-container'>
				<div className='masonry'>
					{
						columns.map((column, index) => {
							return (
								<div className='column' key={index}>
									{
										column.map((pin, index) => {
											return <Pin
												key={index}
												pinData={pin}
												deleteBtn={this.props.deleteBtn}
												likeBtn={this.props.likeBtn}
											/>
										})
									}
								</div>
							)
						})
					}
			  </div>
			</div>
		)
	}
}

export default Grid





