import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import Lesson from './components/Lesson';

class Setup extends Component {

  render() {

    return (
      <div>
        <Header as='h2'>Setting Up Your Environment</Header>
        <Container textAlign='left'>

        	<Lesson title="Installing Docker">
        		TODO
        	</Lesson>

        	<Lesson title="Installing Kubectl and Autocomplete">
        		TODO
        	</Lesson>

        	<Lesson title="Installing Minikube">
        		TODO
        	</Lesson>

        	<Lesson title="Installing Helm and Setting Up Tiller">
        		TODO
        	</Lesson>

        	<Lesson title="Jumpbox Access">
        		TODO
        	</Lesson>

        </Container>
      </div>
    );

  }
}

export default Setup;