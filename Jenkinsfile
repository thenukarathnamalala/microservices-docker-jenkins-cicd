pipeline {
    agent any

    stages {
        stage('Run Tests') {
            steps {
                sh 'cd user-service && npm test'
                sh 'cd product-service && npm test'
                sh 'cd order-service && npm test'
            }
        }
    }
}