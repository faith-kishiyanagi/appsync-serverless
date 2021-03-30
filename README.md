# CDK API with GraphQL and Aurora Serverless MySQL

This CDK stack deploys a real-time GraphQL API built with AWS AppSync, Amazon Aurora Serverless PostgreSQL, and AWS Lambda.

## Getting started

1. Clone the project
2. Change into the `backend/` directory and install dependencies
   ```bash
   cd backend
   npm install
   ```
3. Change into the `backend/functions/` directory and install the dependencies for the Lambda function package:
   ```bash
   cd functions
   npm install
   cd ..
   ```
4. Run the build
   ```bash
   npm run build
   ```
5. Deploy the stack
   ```bash
   cdk deploy --O cdk-exports.json
   ```
6. Create the posts table
   Visit the [RDS console](https://console.aws.amazon.com/rds/home) and to sign in, you will use the ARN from the secret that was created by CDK.  
   Once signed in, create the table by executing the following query:
   ```mysql
   CREATE TABLE posts (
    id varchar(255) UNIQUE,
    title varchar(255),
    content text
   );
   ```
7. Testing the API
   Next, visit the [AppSync console](https://console.aws.amazon.com/appsync/home) and we can test out the API by running the queries and mutations.

## Useful commands

- `npm run build`   compile typescript to js
- `npm run watch`   watch for changes and compile
- `npm run test`    perform the jest unit tests
- `npx cdk deploy`      deploy this stack to your default AWS account/region
- `npx cdk diff`        compare deployed stack with current state
- `npx cdk synth`       emits the synthesized CloudFormation template

## Testing

if the source code has been modified, run `npm test -- -u` to update it.
