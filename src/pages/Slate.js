import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import Lesson from './components/Lesson';

class Slate extends Component {

  render() {

    return (
      <div>
        <Header as='h2'>Navigating SLATE</Header>
        <Container textAlign='left'>

        	<Lesson title="Where does SLATE Fit In?">
        		TODO
        	</Lesson>

        	<Lesson title="The SLATE Portal">
        		TODO
        	</Lesson>

        	<Lesson title="Deploying an App with SLATE">
        		TODO
        	</Lesson>

        	<Lesson title="Observing and Managing Apps in SLATE">
        		TODO
        	</Lesson>

        	<Lesson title="Security in SLATE">
        		TODO
        	</Lesson>

        </Container>
      </div>
    );

  }
}

export default Slate;