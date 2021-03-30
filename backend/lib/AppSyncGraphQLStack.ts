import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as lambda from '@aws-cdk/aws-lambda';

export class AppSyncGraphQLStack extends cdk.Stack {

  readonly api: appsync.GraphqlApi;

  constructor(scope: cdk.Construct, id: string, resolver: lambda.Function, props?: cdk.StackProps) {
    super(scope, id, props);

    this.api = new appsync.GraphqlApi(this, 'GqlApi', {
      name: 'blog-graphql-api',
      schema: appsync.Schema.fromAsset('graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(2)),
          }
        }
      }
    })

    const postResolver = this.api.addLambdaDataSource('PostResolver', resolver)

    postResolver.createResolver({
      typeName: 'Query',
      fieldName: 'allPosts'
    });
    postResolver.createResolver({
      typeName: 'Query',
      fieldName: 'findOnePostBy'
    });
    postResolver.createResolver({
      typeName: 'Mutation',
      fieldName: 'createPost'
    });
    postResolver.createResolver({
      typeName: 'Mutation',
      fieldName: 'updatePost'
    });
    postResolver.createResolver({
      typeName: 'Mutation',
      fieldName: 'deletePost'
    });

    new cdk.CfnOutput(this, 'AppSyncUrl', {
      value: this.api.graphqlUrl
    });
    new cdk.CfnOutput(this, 'AppSyncApiKey', {
      value: this.api.apiKey || ''
    });
    new cdk.CfnOutput(this, 'ProjectRegion', {
      value: this.region
    });
  }
}
