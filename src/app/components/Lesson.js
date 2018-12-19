import React, { Component } from 'react';
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react';

class Lesson extends Component {

	constructor(props){
		super(props);
		this.markComplete = this.markComplete.bind(this);
		this.markIncomplete = this.markIncomplete.bind(this);
		this.state = { completed: false };
	}

	markComplete() {
		this.setState({ completed: true });
	}

	markIncomplete() {
		this.setState({ completed: false });
	}

	render() {
		const completed = this.state.completed;
		if(completed) {
			return (
				<Segment color="green">
					Great job, you've completed the <strong>{this.props.title}</strong> lesson. Move on to the next one for more!
					<Container style={{ marginTop: '.5em' }}>
						<Button basic onClick={this.markIncomplete}>
							Return to Lesson
						</Button>
					</Container>
				</Segment>
			);
		} else {
			return (
				<Segment color="grey">
					<Header as='h3'>{this.props.title}</Header>
					{this.props.children}
		        	<Segment compact>
		        		<Button color="green" onClick={this.markComplete}>
		        			<Icon name="check" />Done
		        		</Button>
		        		{ this.props.files ? <Button color="blue" href={this.props.files}> <Icon name="file alternate outline" />Download Files </Button> : null }
		        		{ this.props.resources ? <Button color="gray" href={ this.props.resources }> More Resources </Button> : null }
			        </Segment>
				</Segment>
			);
		}
	}
}

export default Lesson;