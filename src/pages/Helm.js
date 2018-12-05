import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import Lesson from './components/Lesson';

class Helm extends Component {

  render() {

    return (
      <div>
        <Header as='h2'>Navigating Helm</Header>
        <Container textAlign='left'>

        	<Lesson title="What is Helm?" resources="https://docs.helm.sh/">
        		TODO
        	</Lesson>

        	<Lesson title="Let's Talk Tiller" resources="https://docs.helm.sh/">
        		TODO
        	</Lesson>

        	<Lesson title="Helm Repositories" resources="https://docs.helm.sh/">
        		TODO
        	</Lesson>

        	<Lesson title="Templating with Helm" resources="https://docs.helm.sh/">
        		TODO
        	</Lesson>

        	<Lesson title="The Value of values.yaml" resources="https://docs.helm.sh/">
        		TODO
        	</Lesson>

        </Container>
      </div>
    );

  }
}

export default Helm;