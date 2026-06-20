pipeline {
    agent any

    stages {
        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Run Tests Inside Containers') {
            steps {
                sh 'docker compose run --rm user-service npm test'
                sh 'docker compose run --rm product-service npm test'
                sh 'docker compose run --rm order-service npm test'
            }
        }
    }
}