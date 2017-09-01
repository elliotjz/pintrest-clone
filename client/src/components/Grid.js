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
		console.log('mapping pins to columns')
		let columns = []
		const numberOfColumns = this.state.columns

		console.log('number of columns:')
		console.log(numberOfColumns)

		for(let i = 0; i < numberOfColumns; i++) {
			columns.push([])
		}
		this.props.pinList.forEach((pin, index) => {
			columns[index % numberOfColumns].push(pin)
		})
		console.log('columns:')
		console.log(columns)
		return columns
	}

	componentDidMount() {
		this.getColumns()
		window.addEventListener("resize", () => {
			console.log('resized')
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





