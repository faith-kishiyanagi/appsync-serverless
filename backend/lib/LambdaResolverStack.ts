import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as rds from '@aws-cdk/aws-rds';

export class LambdaResolverStack extends cdk.Stack {

  readonly postFunction: lambda.Function;

  constructor(scope: cdk.Construct, id: string, db: rds.ServerlessCluster, props?: cdk.StackProps) {
    super(scope, id, props);

    this.postFunction = new lambda.Function(this, 'PostFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: new lambda.AssetCode('functions/post'),
      handler: 'src/index.handler',
      memorySize: 256,
      timeout: cdk.Duration.seconds(30),
      environment: {
        CLUSTER_ARN: db.clusterArn,
        SECRET_ARN: db.secret?.secretArn || '',
        DB_NAME: 'BlogDB',
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1'
      }
    })

    db.grantDataApiAccess(this.postFunction);
  }
}
