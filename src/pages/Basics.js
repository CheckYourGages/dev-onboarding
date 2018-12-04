import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import Lesson from './components/Lesson';
import Code from './components/Code';

class Basics extends Component {

  render() {

    return (
      <div>
        <Header as='h2'>Necessary Background Knowledge</Header>
        <Container textAlign='left'>

        	<Lesson title="Containers" resources="TODO">
        		An application environment with all dependencies packaged inside, making it system-agnostic.
        	</Lesson>

        	<Lesson title="Kubernetes" resources="TODO">
        		A distributed systems orchestration platform used to deploy and maintain containerized applications.
        	</Lesson>

        	<Lesson title="Nodes" resources="https://kubernetes.io/docs/concepts/architecture/nodes/">
        		The Kubernetes unit of hardware that represents one computational system.
        	</Lesson>

        	<Lesson title="Clusters" resources="https://kubernetesbootcamp.github.io/kubernetes-bootcamp/1-1.html">
        		The Kubernetes unit of hardware in which scheduling and node management occurs.
        	</Lesson>

        	<Lesson title="Federation" resources="https://kubernetes.io/docs/concepts/cluster-administration/federation/">
        		A collection of clusters which may be orchestrated or share information to work toward a common goal.
        	</Lesson>

        </Container>
      </div>
    );

  }
}

export default Basics;