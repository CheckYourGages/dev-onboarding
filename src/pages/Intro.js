import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';

class Intro extends Component {

	render() {

		return (
			<div>
				<Header as='h2'>Welcome to the SLATE Stack</Header>
				<Container textAlign="left">
					<p> SLATE is built on a multiple technologies each withtheir own very large scope. It can be difficult at first to start contributing, because you may feel like you need to learn every small part of each technology. Thankfully, that's not the case. This tutorial will narrow the scope of each technology so that you can begin contributing as soon as possible.</p>
					<p> Note that this doesn't mean that the topics covered here are all you'll ever use within SLATE, just that with this minimum set of skills you can begin to interact with the SLATE system and contribute some services to the SLATE application catalog.</p>
				</Container>
			</div>
		);

	}
}

export default Intro;