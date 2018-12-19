import React, { Component } from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import Lesson from './components/Lesson';
import Code from './components/Code';

class Kubernetes extends Component {

    volumeMD = `
    spec:
      template:
        spec:
          containers:
          - name: nginx
    +       volumeMounts:
    +       - name: nginx-mounted-volume
    +         mountPath: /usr/share/nginx/html
          [...]
    +     volumes:
    +     - name: nginx-mounted-volume
    +       emptyDir: {}
    `

    configMapMD = `
    volumes:
    - name: nginx-mounted-volume
      configMap:
        name: demo-nginx-configmap
    `

  render() {

    return (
      <div>
        <Header as='h2'>Navigating Kubernetes</Header>
        <Container textAlign='left'>

        	<Lesson title="Containers vs Pods vs Deployments" resources="https://stackoverflow.com/questions/41325087/in-kubernetes-what-is-the-difference-between-a-pod-and-a-deployment">
                <p> We have taken a look at containers, but Kubernetes uses descriptions of how containers should operate and interact with one another at a higher level. </p>
                <p> A Pod is one level of abstraction above a container. The Pod is host to one or more containers, a private local network, and some ephemeral storage that the container maintains. These are the resources necessary to allow proper function of a set of containers and provide them the ability to communicate with one another. </p>
                <p> The Deployment is another level of abstraction, and exists above the Pod. Deployments contain templates for Pods, and instructions for the desired state of each Pod. Under the Deployment, replicas of Pods may exist, and there are some self-healing properties. For example, if a replica set of 3 (3 copies of one Pod) is requested, and one gets destroyed, the Deployment will do its best to return to 3 copies. </p>
                <p> In addition to maintaining the the state of one or more Pods, deployments are used to define how other resources are connected to the container, including local files, configurations, and network devices such as load balancers. For this reason, Deployments are the resource type that are most used in Kubernetes for orchestrating applications. </p>
            </Lesson>

            <Lesson title="A Quick Look at Kubectl" resources="https://kubernetes.io/docs/reference/kubectl/cheatsheet/">
        		<p> The first tool we're going to look at within Kubernetes is the Command Line Interface (CLI) titled 'kubectl' (pronounced cube-cuttle or cube-control). Kubectl lets users interact with the Kubernetes Cluster and its various components locally or remotely. </p>

                <Header as='h5'> Start Minikube </Header>
                <p> In order to play around with kubectl, let's start minikube up. If you've installed it as outlined in the 'Setting up Your Environment' page, you should just be able to run <Code> $ minikube start</Code>. This will initialize a VM, and start Kubernetes within it that we can play with. </p>

                <Header as='h5'> Get Resources </Header>
                <p> The first, and maybe most important command is <Code> $ kubectl get pods</Code>. This command will fetch all resources of a certain type, and report some relevant infromation about them. In this case we've chosen pods, which will report back all pods in the current namespace, the readiness of the containers within the pod, the status of the pod as a whole, the number of times it has restarted, and the age of the pod. </p>
                <p> If you've justart started your minikube Cluster to try this, you'll note that no pods yet. This is because all of the default pods run in the kube-system namespace. To see all pods running in your Cluster, run <Code> $ kubectl get pods --all-namespaces</Code>. </p>
                <p> Try to observe different types of resources like services, or deployments this way.</p>
               
                <Header as='h5'> Describe Resources </Header>
                <p> The next powerful tool we'll use is describing a resource. To describe a pod, choose one of the pods you discovered from your get call, and run <Code> $ kubectl describe pod [pod-name] -n kube-system</Code>. The -n defines which namespace you are looking into, and is only needed if it does not match the current namespace you're working in. Once you've described the pod, you should see all of its attributes such as labels, status, event log, and more. Scroll through and see if you can make sense of any of it, but if you can't that's entirely okay at this point. We'll get there later. </p>

                <Header as='h5'> Creation and Deletion </Header>
                <p> Creation and Deletion are the last two pieces we need to get started. To create a resource, run <Code> $ kubectl apply -f [your yaml(s)]</Code>. the yaml pointed at after the -f flag can be local or web hosted, and will describe to Kubernetes the state that you want the system to reach. To delete an object, you can run <Code> $ kubectl delete [resource type] [resource name]</Code> to delete elements one at a time, or you can mass delete using <Code> $ kubectl delete -f [your yaml(s)]</Code>. That can delete resources using yaml descriptors. In both of these calls, you can also point the -f at a directory of yaml files to create or destroy all of them in bulk.</p>
        	</Lesson>

        	<Lesson title="Deploying and Observing Applications" resources="https://kubernetes.io/docs/tasks/debug-application-cluster/debug-application-introspection/">
        		<p> Now that we've gone over some kubectl basics, and what Deployments and Pods are, let's try to get something up and running within Kubernetes. Navigate to the kubernetes sub-directory that you've downloaded from github, and run 
        		<Code> $ kubectl apply -f firstDeployment.yaml </Code> </p>
        		<p> The deployment here is an nginx container. Nginx serves files, but right now there is nothing for it to serve. Later in this tutorial we will build upon this to make a fully functional application with a purpose. For now, observe its status with <Code> $ kubectl get pods </Code>. If the container isn't ready yet, try running the same command with a -w flag, which will put it in "watch" mode so you can see changes as they happen. To escape watch mode, press control-c.</p>
        		<p> If the pod titled first-deployment shows that 1/1 container is ready, it was successful. There will be a hash of random characters following the title, that is assigned by the replicaSet and managed by the deployment to ensure unique instances of the pods. </p>
        		<p> You can leave this running, we will return to the deployment later. </p>
        	</Lesson>

        	<Lesson title="Resource Definitions">
        		<p> Resources are a cornerstone idea of Kubernetes. Resources, such as pods or deployments, are pre-defined ways in which components should interact within Kubernetes. These serve as primitive types for the rest of the system, building up to something greater much like the idea of a container vs a pod vs a deployment.</p>
            <p> There are many types of resources a user could interact with, but we will go over some of the most important in the lessons to come. The biggest takeaway from the existence of resources is that they are the basic units of orchestration, intended to be layered upon. For some companies Custom Resource Definitions (CRDs) build further on top of these to create fluid workflows that reduce "boilerplate" work. At this time, SLATE does not use any CRDs, but they are a useful concept to be aware of.</p>
        	</Lesson>

        	<Lesson title="Services" resources="https://medium.com/google-cloud/kubernetes-nodeport-vs-loadbalancer-vs-ingress-when-should-i-use-what-922f010849e0">
        		<p> The Service resource type is among the most important within Kubernetes, as it provides networking components to containers that allow end-user interaction. There are a few different types of services that we will outline briefly. </p>
                <List divided relaxed>
                    <List.Item>
                        <List.Content>
                            <List.Header> NodePort </List.Header>
                            <List.Description> The NodePort service type exposes a TCP port on the Node host that it is scheduled on, causing it to share the IP address of the Node. This is good for local testing or brief availability, but because IP addresses may change and each service uses a whole port, it isn't advised for production.</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header> ClusterIP </List.Header>
                            <List.Description> ClusterIP service types are an internal service. It creates an IP that is only accessible within the Cluster by other resources. This is very useful for local communication or internal debugging, but since it doesn't actually outwardly expose anything it's not entirely useful for making a service accessible. </List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header> LoadBalancer </List.Header>
                            <List.Description> LoadBalancers are the default answer for exposing your service to the public. The LoadBalancer requests a public IP address, and assigns it exclusively to the service. Since you have an entire IP, you may expose whatever port you need to for various types of services like HTTP, gRPC, or more. This provides a lot of freedom, but is best used alongside cloud providers who have large IP pools to assign. Using this with on-premises Clusters can be very expensive, because usually there is a very limited pool of public IPv4 addresses available to the system.</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header> Ingress </List.Header>
                            <List.Description> Though not technically a service, Ingress controllers are closely related. They act as a router for your services, while only requiring one entry point. Therefore, you can put an Ingress controller behind one LoadBalancer IP address and have it redirect to many services by subdomain. For related services, this helps scale service availability without demanding a huge (and expensive) number of public IP addresses.</List.Description>
                        </List.Content>
                    </List.Item>
                </List>
                <Header as='h5'> Demo Service </Header>
                <p> Let's take a look at a service. The service linked below is designed to target the Nginx deployment from above. Take a look at the yaml, and compare it to the firstDeployment.yaml. What do you notice? There are some shared elements of the service and deployment to link the two, namely the labels. Matching the labels of the pods with the selector in the service is how a service knows what to target and provide connection to. </p>
                <p> Go ahead and install this service into your cluster with <Code> $ kubectl apply -f firstService.yaml</Code>. Once it's created, run <Code> kubectl get services</Code> to view the state of it. You can now connect to the service by running <Code> $ minikube service demo-nginx</Code>. This is a built in minikube function that will launch your default browser with the IP address of your Node and the port that demo-nginx exposed. You should see a welcome to nginx page if everything is running properly. We'll serve something more interesting later. </p>
        	</Lesson>

        	<Lesson title="Volumes" resources="https://kubernetes.io/docs/concepts/storage/volumes/">
        		<p> Volumes are a deeply useful tool in Kubernetes, that is, once you know how to use them properly. Because filesystems of containers are not by default accessible within other containers, they provide a new level of interaction. These volumes enable containers to mount files that are pre-existing on a host system, from the cloud, or just from other containers in the same pod. There are too many types of volumes to cover all of them, but let's go over a few and why one may use them. </p>
                <List divided relaxed>
                    <List.Item>
                        <List.Content>
                            <List.Header> EmptyDir </List.Header>
                            <List.Description> Among the most simple of volumes. EmptyDir is mounted quite literally as an empty directory within a container. The value of this type is that it can be the same empty directory shared by multiple containers, each hosting the directory in different places within their own file system. This is kind of like static linking these directories together. A common example of what one might do with this is mount the log directory of one container to another container that will ship those logs elsewhere. </List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header> HostPath </List.Header>
                            <List.Description> HostPath volumes are both very powerful, and difficult to scale. The HostPath will mount a directory that pre-exists on the Node, or can create a directory on the Node at a defined location. These are useful for mounting certain containers to different types of storage, or to large pools of disk for things like caches, but they run the risk of being scheduled on a pod that doesn't have the directory allocated. Because of this, there is a high level of system administrator interaction that needs to happen for these types of volumes, and often is not used beyond local testing. </List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header> Cloud Providers </List.Header>
                            <List.Description> Nearly all the rest of the volume types are cloud provider specific, such as AWS's EBS volumes, Azure's AzureDisks, etc. These all allow dynamic provisioning of cloud provider storage when connected to an account with proper credentials, and are very useful for production scaling of storage as needed.</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <List.Header> The Container Storage Interface </List.Header>
                            <List.Description> The defined Container Storage Interface (CSI) is a standard that is slowly overtaking the Kubernetes volumes space. It is a standard that lets an out-of-kubernetes operation happen to provision storage somewhere and mount into the pod. This is growing in popularity because it can be maintained by the storage providers outside of Kubernetes, and it also works with other platforms like Mesos or Docker Compose.</List.Description>
                        </List.Content>
                    </List.Item>
                </List>
                <Header as='h5'> Integrating a Volume </Header>
                <p> Let's make some changes to the original firstDeployment.yaml file that we created. We are going to add an emptyDir volume as a placeholder for our next lesson. If this is your first time creating or editing yaml, be aware of your spacing. Yaml is a strict 2-spaces tab system. For these demos I will be sure to indicate which categories you should be editing within so that you can properly nest your changes.</p>
                <p> In order to mount the volume in the container, we need to specify two things. One is the set of volumes we would like to include in our deployment, and of what type each is. The other is that we would like to mount one of the volumes from our volume set into our container, and there it doesn't matter what type the volume is. We will add two sections of code to accomplish this. </p>
                <p>
                    <Code block>
                      {this.volumeMD}
                    </Code>
                </p> 
        	</Lesson>

        	<Lesson title="ConfigMaps and Secrets" resources="https://medium.com/google-cloud/kubernetes-configmaps-and-secrets-68d061f7ab5b">
        		<p> Two special types of volumes are ConfigMaps and Secrets. These two types have some data, defined either by an imported file or by information entered into a yaml file. Once the data is present, it can be mounted into a container either as a volume, where it will exist as a file, or as an evironment variable. </p>
            <p> The biggest difference in these two types is that while a ConfigMap is raw data, a secret is base64 encoded. Secrets are often used for storing sensitive data like certificates and tokens for paid services, while ConfigMaps are used primarily for mounting general use configuration files into the filesystem. </p>
            <Header as='h5'> Creating a ConfigMap </Header>
            <p> Our next goal is going to be to create a ConfigMap that we will later mount into our Deployment. To get started, navigate to the demoConfigMap.yaml file and look it over. You should see that there is a section called "data". Any key-value pair within the data section can be mounted either as an environment variable or file. Many people choose to mount all key-value pairs as files titled by their key into one directory, which is the default behavior unless specified otherwise.</p>
            <p> Go ahead and fill in the body of this HTML to make it slightly exciting, or just to carry your own message. Note that after the index.html key, there is a bar-dash pair. That pair defines that the value will be multi-line, allowing for the freedom of well structured files. Once you're ready, run <Code> $ kubectl apply -f demoConfigMap.yaml</Code> and check to make sure it deployed (hint, you can get this type of resource). Now that this exists, we can put it all together in the next step and see the result of all the pieces. </p>
        	</Lesson>

        	<Lesson title="Putting it All Together">
        		<p> We have each individual piece to see the results running now. We have a Deployment creating Pods that have the Nginx container running in them. We have a Service that exposes a NodePort so that we can access the Nginx server. We have a volume mounted to the serving directory. And we have a ConfigMap with some data to serve. Let's put this together and see the HTML from the ConfigMap. To do this, we only need to make one small change to the code.</p>
            <p> The only thing we need to change is the type of the volume in our deployment. Let's change it from an emptyDir to a configMap. ConfigMap type volumes also need to specify the name of the ConfigMap as it exists in your Cluster, so we will add that as well. The deployment should now include this block of text.</p>
            <Code block>
              { this.configMapMD }
            </Code>
            <p> Now that you've made the change, appy it with <Code> $ kubectl apply -f firstDeployment.yaml</Code>. If all has gone correctly, the container should restart with the index.html file mounted, and will be serving it. Try to recall how we accessed the NodePort service using minikube, and give it a try! </p>
        	</Lesson>

          <Lesson title="Cleaning it Up">
            <p> Now it's time to clean everything up. With kubectl, this can be a bit of a hassle if you choose to delete by name. You have to specify each type of resource one at a time such as <Code> $ kubectl delete deployment demo-nginx </Code>. Instead, we'll use the advantage of having all of our files in one directory. Go ahead and run <Code> $ kubectl delete -f . | grep "deleted"</Code> from within the directory you downloaded the examples to. This should clean everything up behind us, and let us start fresh. Please note that this is not always safe to do, and should only be run for all files in a directory when you are very certain of what resources it is targeting. </p>
          </Lesson>

        	<Lesson title="Debugging Strategies" resrouces="https://kubernetes.io/docs/tasks/debug-application-cluster/">
        		<p> Now we will do a small excercise in debugging. Deploy the debugging file by running <Code> $ kubectl apply -f kubernetesDebug.yaml </Code>. Inspect the deployment, pods, and service using get and describe, and see if you notice anything. </p>
            <p> Everything should at this point look like it's working properly and there are no issues, but what happens if you try to connect to the server using <Code> $ minikube service demo-nginx </Code> again? There's definitely something awry here. </p>
            <p> Take a close look at the yaml file, and see if there are any discrepencies. If you're stuck, review the lesson on services and how they know which pods to give connections to. Once you've found the issue and made the changes, go ahead and update the resources by running <Code> $ kubectl apply -f kubernetesDebug.yaml</Code> again and try to connect once more!</p>
            <p> Kubernetes is a fabulous and powerful tool for managing distributed systems, but because of the complexity it has a lot of points where things can go wrong. Often errors will be given before you can create the resource, usually using describe and looking at the events is very helpful for those that make it past creation but fall into an error state, though there are a few examples, like the one you just worked through, that will just take some kuberknowledge. When in doubt, look at events, and check the labels. </p>
        	</Lesson>

        </Container>
      </div>
    );

  }
}

export default Kubernetes;