import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import Lesson from './components/Lesson';
import Code from './components/Code';

class Slate extends Component {

  render() {

    return (
      <div>
        <Header as='h2'>Navigating SLATE</Header>
        <Container textAlign='left'>

        	<Lesson title="Where does SLATE Fit In?">
        		<p> SLATE is a tool that wraps Helm and Kubernetes to make deployment and management a little bit more streamlined, for those who are not familiar with the full scope of Kubernetes and Helm. The goal is to accellerate scientific discovery by minimizing the learning curve to access powerful services. </p>
                <p> SLATE manages Kubernetes Clusters, Namespaces, and some other settings for the devices linked to the system to accomodate for Virtual Organizations (VOs) who have connected their hardware to our platform. Additionally, SLATE manages deployment and orchestration of applciations by calling upon specific tools of Helm to interact with Kubernetes on SLATE's behalf. </p>
                <p> SLATE also has a catalog of vetted applciations that exist in our SLATE repository, and users can only install charts from this repository. This makes sure that applications within SLATE follow a methodology that can best advance scientific discovery, and keep the hardware components of VOs safe in the process. </p>
        	</Lesson>

        	<Lesson title="The SLATE Portal" resources="https://portal.slateci.io/">
        		<p> The portal is the organizational tool in which users can manage their SLATE accounts, and organizations can grant or remove privileges to users. The link to this can be found under "More Resources", where you can register an account for your virtual organization to grant you access, as well as download the SLATE client and download your access token. </p>
        	</Lesson>

        	<Lesson title="Deploying an App with SLATE">
        		<p> Lets do a quick overview of how to deploy an app within SLATE, now that you have an access token and a better idea of what is going on under the hood. We will continue to use the Nginx example for this. </p>
                <p> The first thing we want to do is download our customization parameters, so that we aren't just installing a default settings application. Run <Code> $ slate app get-conf nginx > nginxConf.yaml</Code> to generate the values file to your local directory. Then open it, edit what you'd like, and let's install it with our new settings. </p>
                <p> To install the app, run <Code> $ slate app install nginx --conf nginxConf.yaml --vo [your vo] --cluster [cluster you can access]</Code> to install this app onto an authorized cluster as a representative of your organization. For a list of which clusters there are, run <Code> $ slate cluster list</Code>, select a cluster, and run <Code> $ slate cluster list-allowed-vos [cluster name]</Code> to ensure that your VO has access rights. </p>
        	</Lesson>

        	<Lesson title="Observing and Managing Apps in SLATE">
        		<p> Now that your Nginx deployment is out there, let's take a look at it and find it on the internet. To locate your instance of Nginx run <Code> $ slate instance list --vo [your vo]</Code> and look for the instance you deployed. There will be an instance tag associated with that, which is your key to access information about your new service. </p>
                <p> You have the instance key, so let'srun <Code> $ slate instance info [instance key]</Code> to get all kinds of information regarding the resources being managed. In this case, we are concerned with the "External IP" and the second part of "Ports". If you visit <Code>[External IP]:[NodePort]</Code> in a browser, you should see the data being served as you defined it.</p>
                <p> The final step is to delete your application. Go ahead and run <Code> $ slate instance delete [instance key]</Code> to remove your app from SLATE. </p>
                <p> Hopefully it was fast and easy to deploy your app to SLATE, get the necessary info to access it, and clean it up. If it wasn't, let us know how we can improve that experience. From here, you can deploy apps to multiple clusters with just a few strings of text, or manage a service for multiple VOs fluidly. We hope that this makes scientific discovery more possible for those providing and those using the services needed to make it happen. </p>
        	</Lesson>

        </Container>
      </div>
    );

  }
}

export default Slate;