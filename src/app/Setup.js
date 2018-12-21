import React, { Component } from 'react';
import { Container, Divider, Header } from 'semantic-ui-react';
import Lesson from './components/Lesson';

class Setup extends Component {

  render() {

    return (
      <div>
        <Header as='h2'>Setting Up Your Environment</Header>
        <Container textAlign='left'>

            <Header as='h3'> Using a Developer SLATE Bundle </Header>

            <Lesson title="Installing Minislate" resources="https://github.com/slateci/minislate">
                <p> Under "More Resources" you will find the Github page for a project called Minislate, as well as installation instructions. Minislate acts as a self-contained instance of the SLATE platform, including all the components listed below. Using this gives you access to the Cluster and the components running within it as if you are the System Admin of a SLATE Cluster. This is the recommended environment for the tutorial because there is far less burden to download and install each software, and Minislate itself runs as a container on your local machine that can be stopped or deleted with ease. </p>
            </Lesson>

            <Divider horizontal section> OR </Divider>

            <Header as='h3'> Install Each Piece Locally </Header>

        	<Lesson title="Installing Docker" resources="https://www.docker.com/get-started">
        		<p> Docker is one of the containerizers that makes the rest of this stack possible. There are other containerizers, but Docker has the most community support and is very accessible. The "More Resources" button will lead you to the download page for various operating systems.</p>
        	</Lesson>

        	<Lesson title="Installing Kubectl and Autocomplete" resources="https://kubernetes.io/docs/tasks/tools/install-kubectl/">
        		<p> Kubectl is the command line interface (cli) used to interact with Kubernetes Clusters. Follow the "More Resources" button to access the installation page of Kubectl. There are many ways to install, including package managers like homebrew and snap. Be sure to look into the autocompletion setup for bash and zsh at the bottom of the page as well, it makes life MUCH easier. </p>
        	</Lesson>

        	<Lesson title="Installing Minikube" resources="https://github.com/kubernetes/minikube/releases">
        		<p> In order to do local testing and have a single-node Kubernetes Cluster on hand, we'll download and install Minikube. Minikube is a project directly from Kubernetes specifically designed for a testing environment, so it has a large amount of community support. Go to the "More Resources" button below and it will take you to the Minikube github page with instructions on how to install. You will also need a VM driver such as VirtualBox that Minikube can use to start a VM for the Cluster. </p>
        	</Lesson>



        	<Lesson title="Installing Helm and Setting Up Tiller" resources="https://github.com/helm/helm/blob/master/docs/install.md">
        		<p> Helm is a package manager and templating system for Kubernetes. We use Helm in SLATE to maintain a repository of SLATE apps, and to limit what settings we need to expose to the end user to deploy an app. The value of Helm comes from a file called "values.yaml". This file exposes only the settings that a user needs to interact with to customzie a deployment, removing a lot of boilerplate work, and is used as the source for templating. Follow the "More Resources" link to download and install Helm. </p>
        	</Lesson>

        	<Lesson title="SLATE Client" resources="https://portal.slateci.io/">
        		<p> Finally, we will need access to the SLATE client. To use SLATE, create an account on the SLATE portal and ask your SLATE-affiliated organization to add you to their approved users list. Once you've been added, there will be instructions for how to download the client, and save your user token. </p>
        	</Lesson>

        </Container>
      </div>
    );

  }
}

export default Setup;