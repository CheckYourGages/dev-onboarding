import React, { Component } from 'react';
import { Button, Container, Header } from 'semantic-ui-react';

class Intro extends Component {

	render() {

		return (
			<div>
				<Header as='h2'>Welcome to the SLATE Stack</Header>
				<Container textAlign="left">
					<p> SLATE is built on multiple technologies each with their own very large scope. It can be difficult at first to start contributing, because you may feel like you need to learn every small part of each technology. Thankfully, that's not the case. This tutorial will narrow the scope of each technology so that you can begin contributing as soon as possible.</p>
					<p> Note that this doesn't mean that the topics covered here are all you'll ever use within SLATE, just that with this minimum set of skills you can begin to interact with the SLATE system and contribute some services to the SLATE application catalog.</p>
					<p> Throughout this tutorial, you will need to access some demo files. Those can be cloned from our github page via the link below. If you decide to use Minislate, which will be discussed further in the next section, this should be cloned into the Minislate container as opposed to your local system, for ease of access.</p>
					<Button href="https://github.com/slateci/tutorial-demo-files" color="blue">Github Demo Files</Button>
				</Container>
			</div>
		);

	}
}

export default Intro;