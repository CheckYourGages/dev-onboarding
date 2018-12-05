import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import Lesson from './components/Lesson';

class Kubernetes extends Component {

  render() {

    return (
      <div>
        <Header as='h2'>Navigating Kubernetes</Header>
        <Container textAlign='left'>

        	<Lesson title="A Quick Look at Kubectl">
        		TODO
        	</Lesson>

        	<Lesson title="Containers vs Pods vs Deployments">
        		TODO
        	</Lesson>

        	<Lesson title="Deploying and Observing Applications">
        		TODO
        	</Lesson>

        	<Lesson title="Resource Definitions">
        		TODO
        	</Lesson>

        	<Lesson title="Services">
        		TODO
        	</Lesson>

        	<Lesson title="Volumes">
        		TODO
        	</Lesson>

        	<Lesson title="ConfigMaps and Secrets">
        		TODO
        	</Lesson>

        	<Lesson title="Putting it All Together">
        		TODO
        	</Lesson>

        	<Lesson title="Containers vs Pods vs Deployments">
        		TODO
        	</Lesson>

        	<Lesson title="Debugging Strategies">
        		TODO
        	</Lesson>

        </Container>
      </div>
    );

  }
}

export default Kubernetes;