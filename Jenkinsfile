pipeline {
    agent any

    environment {
        DOCKER_REPO = 'thenu8175'
    }

    stages {
        stage('Build Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Tag and Push Images') {
            steps {
                sh '''
                docker tag microservices-docker-cicd-user-service:latest $DOCKER_REPO/user-service:latest
                docker tag microservices-docker-cicd-product-service:latest $DOCKER_REPO/product-service:latest
                docker tag microservices-docker-cicd-order-service:latest $DOCKER_REPO/order-service:latest

                docker push $DOCKER_REPO/user-service:latest
                docker push $DOCKER_REPO/product-service:latest
                docker push $DOCKER_REPO/order-service:latest
                '''
            }
        }
    }
}