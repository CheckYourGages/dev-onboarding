import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import Lesson from './components/Lesson';
import Code from './components/Code';

class Helm extends Component {

  templatingMD = `
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: {{ template "nginx.fullname" . }}
    labels:
      app: {{ template "nginx.name" . }}
      chart: {{ template "nginx.chart" . }}
      release: {{ .Release.Name }}
      instance: {{ .Values.Instance }}
  spec:
  `

  render() {

    return (
      <div>
        <Header as='h2'>Navigating Helm</Header>
        <Container textAlign='left'>

        	<Lesson title="Let's Talk Tiller" resources="https://github.com/helm/helm/blob/master/docs/rbac.md">
        		<p> Helm has a server-side component called "Tiller". Tiller is the tool used by the Helm command line interface to actually deploy objects through Helm. Tiller may require additional permissions within your Minikube cluster. If you have issues with permissions when installing or deploying with Helm, this is because of Tiller's role based access control. Follow the "More Resources" link and do the "Example: Service account with cluster-admin role" part of the instructions. </p>
                <p> In order to get a Tiller instance started and be able to start deploying with Helm, run <Code> $ helm init </Code>. This will start tiller in your kube-system namespace and let you start interacting with Kubernetes. </p>
                <p> One thing to be wary of is that Tiller in this setup has super-privelages on your Cluster. It can create and destroy anything, and must follow a trust model. For this reason, it is not great for production clusters but works well for local testing. </p>
        	</Lesson>

        	<Lesson title="Helm Repositories" resources="https://hub.helm.sh/">
        		<p> One of Helm's great values is the support for repositories. Within these repostories, there are charts available that are built by the community. Charts are the collection of resources needed to support a single app, so it may include a few pods and a few configmaps and some services, etc. To see a sample of the charts available, type <Code> $ helm search</Code> and look at all the stable repostories included by default. You can install any of these with their default settings by running <Code> $ helm install stable/[chart-name]</Code>. We can clean anything you install now up later.</p>
                <p> Helm announced the Helm Hub project at Kubecon 2018, making way for third-party repositories to be found and accessible through this official vendor. To browse Helm Hub, click the link under "More Resources". </p>
        	</Lesson>

        	<Lesson title="Templating with Helm" resources="https://docs.helm.sh/chart_template_guide/#getting-started-with-a-chart-template">
        		<p> Where the majority of Helm's value lies for SLATE is in templating. For each chart, there exists a values.yaml file. The values.yaml file is the source of user-specified settings for templating. This is a location where you only need to expose what the user will want to adjust or customize, and only have to specify it once. Many times when writing Kubernetes deployments there is a lot of copy/pasting to do things like match labels across resources or create a unique name, so minimizing that can save a lot of time and debugging. </p>
                <p> Templating in Helm is simple and uses the Go templating language. There are some pre-defined objects like the Chart name, the namespace it will be installed into, and the release name. Everything else that is defined by the user is defined through the values file. Using templating to inject values into a Kubernetes deployment looks something like this: </p>
                <Code block>
                    { this.templatingMD }
                </Code>
                <p> There are a number of things going on here. The <Code>.Release</Code> object is pre-defined, and we are just inserting the value here under the label "release". The <Code>.Values</Code> object is where the user is defining things, in this case they have defined the "instance" name. There is also the <Code>template "nginx.fullname"</Code> that defines the use of a templating function. Templating functions can do things like take one value and append or prepend to it, replace characters, or even more intensive functions. Those are beyond the scope of this tutorial, but you can read about them under "More Resources". </p>
        	</Lesson>

        	<Lesson title="Installing a Helm Chart" resources="https://docs.helm.sh/using_helm/#using-helm">
        		<p> Let's do a quick example of Helm. Navigate to the helm/ directory of the downloaded files to begin. </p>
                <p> We are going to customize and install the same Nginx deployment from the Kubernetes section of this tutorial, but we will highlight ways in which there are fewer interactions. </p>
                <Header as='h5'> Values.yaml </Header>
                <p> As covered, the values file is where we go to interact with the application. So let's navigate into the nginx/ folder and open values.yaml. You should see exactly two objects to define, the instance name and the data. If you'd like to see how these are used, look into the templates/ directory and poke through deployment.yaml, configmap.yaml, and service.yaml. Being able to narrow all of what we did in the Kubernetes section into just this one file with two values is pretty incredible for the end user. Go ahead and define what you would like to have, and we'll get it installed. </p>
                <Header as='h5'> Installing Your Chart </Header>
                <p> Charts can be installed from repositories, but in this case we have a local directory and that's okay, too. Let's make sure we are in helm/nginx with all the values we want in our values.yaml set accordingly, and run <Code> $ helm install . -n helm-nginx </Code>. The dot will tell it to look locally, and the -n flag will name the release "helm-nginx". If you don't specify a release name, it will randomly assign an adjective-animal pair. </p>
                <Header as='h5'> Viewing Your Resources </Header>
                <p> Now that you've deployed nginx, let's take a look at what you just did. To see the release within Helm, run <Code> $ helm list</Code>, or to look at each resource within Kubernetes run normal Kubenetes commands like <Code> $ kubectl get pods</Code>. All resources exist seperately within Kubernetes but are managed as one release through Helm. You can connect to the service at this point as well, using our minikube services example from the Kubernetes section if you wish.</p>
                <Header as='h5'> Deleting the Resources </Header>
                <p> Now it is time to delete your Releases and clean up the resources. To do this, make sure you know your release name (run helm list if you don't), and type <Code> $ helm delete --purge [release name]</Code>. If run without the purge flag, it will hold onto some metadata about the release in case you want to redeploy it in the future, but this also means you can't reuse the same release name until it is purged. </p>
        	</Lesson>

        </Container>
      </div>
    );

  }
}

export default Helm;