import React, { Component } from 'react';

class Code extends Component {

	render() {
		if(!this.props.block){
			return (
				<text style={{ backgroundColor: '#222', color: 'white', fontFamily: 'monospace' }}>
					{this.props.children}
				</text>
			);
		}
		else {
			return (
				<pre style={{ backgroundColor: '#222', color: 'white' }}>
					<code>
						{this.props.children}
					</code>
				</pre>
			);
			// eslint-disable-next-line
		};
	}
}

export default Code;