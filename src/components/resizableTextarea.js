import React from "react"

import "./styles/resizableTextarea.scss"

class ResizableTextarea extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
			rows: props.rows,
			minRows: props.minRows,
			maxRows: props.maxRows,
		};
	}
	
	handleChange = (event) => {
		this.props.onChange(event);

    const textareaLineHeight = 24;
		const { minRows, maxRows } = this.state;
		
		const previousRows = event.target.rows;
  	event.target.rows = minRows; // reset number of rows in textarea 
		
		const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
    
    if (currentRows === previousRows) {
    	event.target.rows = currentRows;
    }
		
		if (currentRows >= maxRows) {
			event.target.rows = maxRows;
			event.target.scrollTop = event.target.scrollHeight;
		}
    
  	this.setState({
    	value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
	};
	
	render() {
		return (
			<textarea
				rows={this.state.rows}
				value={this.state.value}
				placeholder={'Enter your text here...'}
				className={'textarea'}
				onChange={this.handleChange}
			/>
		);
	}
}

export default ResizableTextarea