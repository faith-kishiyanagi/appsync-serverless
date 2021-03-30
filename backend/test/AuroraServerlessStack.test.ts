import '@aws-cdk/assert/jest'
import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { AuroraServerlessStack } from '../lib/AuroraServerlessStack';

const app = new cdk.App();
const stack = new AuroraServerlessStack(app, 'AuroraServerless');

test('Stack snapshot', () => {
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

test('VPC', () => {
  expect(stack).toHaveResource('AWS::EC2::VPC');
  expect(stack).toCountResources('AWS::EC2::Subnet', 2)
});

test('Aurora Serverless', () => {
  expect(stack).toHaveResource('AWS::RDS::DBCluster', {
    ScalingConfiguration: {
      MinCapacity: 1,
      MaxCapacity: 2,
      AutoPause: true,
      SecondsUntilAutoPause: 300,
    }
  });
});
