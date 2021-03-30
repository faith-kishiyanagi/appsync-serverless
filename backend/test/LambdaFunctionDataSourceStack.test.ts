import '@aws-cdk/assert/jest'
import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { LambdaResolverStack } from '../lib/LambdaResolverStack';
import { AuroraServerlessStack } from "../lib/AuroraServerlessStack";

const app = new cdk.App();
const aurora = new AuroraServerlessStack(app, 'AuroraServerless');
const stack = new LambdaResolverStack(app, 'LambdaFunctionDataSource', aurora.blogDB);

test('Stack snapshot', () => {
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

test('Lambda Function', () => {
  expect(stack).toHaveResource('AWS::Lambda::Function');
});
