namespace = "cabonerf-dev"
serviceName = "cabonerf-gateway"
service = "Cabonerf Gateway"

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
				git branch: 'minh/minikube', credentialsId: 'github', url: 'https://github.com/FA24SE161-Cabonerf/cabonerf-api-gateway'
				sh "npm install"
			}
		}
	}
}
