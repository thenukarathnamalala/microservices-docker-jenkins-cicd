pipeline {
    agent any

    environment {
        DOCKER_REPO = 'thenu8175'
        EC2_HOST = '13.215.157.176'
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

        stage('Deploy to EC2') {
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'ec2-ssh-key',
                    keyFileVariable: 'EC2_KEY',
                    usernameVariable: 'EC2_USER'
                )]) {
                    sh '''
                    ssh -i "$EC2_KEY" -o StrictHostKeyChecking=no "$EC2_USER@$EC2_HOST" "
                      cd ~/microservices-app &&
                      docker compose -f docker-compose.prod.yml pull &&
                      docker compose -f docker-compose.prod.yml down &&
                      docker compose -f docker-compose.prod.yml up -d &&
                      docker ps
                    "
                    '''
                }
            }
        }
    }
}