namespace = "cabonerf-dev"
serviceName = "cabonerf-gateway"
service = "Cabonerf Gateway"

def groovyMethods

m1 =  System.currentTimeMillis()

pipeline {
	agent {
		label "Jenkins-Agent"
	}

	tools {
		nodejs "NodeJS"
		dockerTool "Docker"
	}

	environment {
		DOCKER_CREDENTIALS = credentials("dockerhub")
		IMAGE_NAME = "13guccj" + "/" + "cabonerf-gateway"
		IMAGE_TAG = "stable-${BUILD_NUMBER}"
	}

	stages {
		// Cleanup workspace
		stage("Cleaup Workspace") {
			steps {
				cleanWs()
			}
		}

		// Prepare environment
		stage("Prepare Environment") {
			steps {
				sh "[-d pipeline] || mkdir pipeline"
				dir("pipeline") {
					git branch: 'minh/minikube', credentialsId: 'github', url: 'https://github.com/FA24SE161-Cabonerf/jenkins-automations'
					script {
						groovyMethods = load("functions.groovy")
					}
				}
				sh "npm install"
			}
		}

		stage("Lint Check") {
			steps {
				sh "npm run lint:check"
			}
		}

		stage("Code Format Check") {
			steps {
				sh "npm run prettier:check"
			}
		}

		stage("Build and Push") {
			steps {
				sh "docker login -u $DOCKER_CREDENTIALS_URS --password $DOCKERHUB_CREDENTIALS_PSW"
				sh "docker build -t $IMAGE_NAME ."
				sh "docker tag $IMAGE_NAME $IMAGE_NAME:$IMAGE_TAG"
				sh "docker tag $IMAGE_NAME $IMAGE_NAME"
				sh "docker push $IMAGE_NAME:stable"
			}
		}

		stage("Clean Artifacts") {
			steps {
				sh "docker rmi $IMAGE_NAME $IMAGE_NAME"
				sh "docker rmi $IMAGE_NAME:stable"
			}
		}

		stage("Create new pods") {
			step {
				withKubeConfig(caCertificate: '', clusterName: 'minikube', contextName: 'minikube', credentialsId: 'jenkins-kubernetes-token', namespace: '', restrictKubeConfigAccess: false, serverUrl: 'https://192.168.105.3:8443') {
					script {
						def pods = groovyMethods.findPodsFromName("${namespace}", "${serviceName}")
						for (podName in pods) {
							sh """
								kubectl delete -n ${namespace} pod ${podName}
								sleep 10s
							"""
						}
					}
				}
			}
		}
	}

	// post {
	// 	success {
	// 		script {
	// 			m2 = System.currentTimeMillis()
	// 			def durationTime = groovyMethods.durationTime(m1, m2)
	// 			def author = groovyMethods.readCommitAuthor()
	// 		}
	// 	}
	// }
}
