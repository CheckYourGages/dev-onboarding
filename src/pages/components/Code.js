import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

class Code extends Component {

	render() {
		return (
			<Segment inverted compact style={{ fontFamily: 'monospace' }}>
				{this.props.children}
			</Segment>
		);
	}
}

export default Code;