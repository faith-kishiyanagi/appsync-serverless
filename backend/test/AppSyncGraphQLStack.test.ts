import '@aws-cdk/assert/jest'
import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { AppSyncGraphQLStack } from '../lib/AppSyncGraphQLStack';
import { LambdaResolverStack } from '../lib/LambdaResolverStack';
import { AuroraServerlessStack } from "../lib/AuroraServerlessStack";

const app = new cdk.App();
const aurora = new AuroraServerlessStack(app, 'AuroraServerless');
const lambda = new LambdaResolverStack(app, 'LambdaResolver', aurora.blogDB)
const stack = new AppSyncGraphQLStack(app, 'AppSyncGraphQL', lambda.postFunction);

test('Stack snapshot', () => {
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

test('Configured AppSync GraphQL API', () => {
  expect(stack).toHaveResource('AWS::AppSync::GraphQLApi', {
    'Name': 'blog-graphql-api',
    'AuthenticationType': 'API_KEY',
  });
});
