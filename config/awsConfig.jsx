import * as AWS from 'aws-sdk'

AWS.config.update({
	region: 'us-east-1',
	endpoint: 'dynamodb.us.east-1.amazonaws.com',
	accessId: '',
	secretAccessKey: ''
});

this.dynamodb = new AWS.DynamoDB();
this.docClient = new AWS.DynamoDB.DocumentClient();
