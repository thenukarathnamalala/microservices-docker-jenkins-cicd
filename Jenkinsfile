pipeline {
    agent any

    stages {
        stage('Test SSH to EC2') {
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'ec2-ssh-key',
                    keyFileVariable: 'EC2_KEY',
                    usernameVariable: 'EC2_USER'
                )]) {
                    sh '''
                    ssh -i "$EC2_KEY" -o StrictHostKeyChecking=no "$EC2_USER@13.215.157.176" "echo Jenkins connected to EC2"
                    '''
                }
            }
        }
    }
}