#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AuroraServerlessStack } from "../lib/AuroraServerlessStack";
import { LambdaResolverStack } from "../lib/LambdaResolverStack";
import { AppSyncGraphQLStack } from '../lib/AppSyncGraphQLStack';

const app = new cdk.App();
const aurora = new AuroraServerlessStack(app, 'AuroraServerless');
const lambda = new LambdaResolverStack(app, 'LambdaResolverStack', aurora.blogDB);
const appsync = new AppSyncGraphQLStack(app, 'AppSyncGraphQL', lambda.postFunction);
