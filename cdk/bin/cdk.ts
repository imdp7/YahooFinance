#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack';

const app = new cdk.App();
new CdkStack(app, 'MyAWSUIAppStack', {
  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */

  // TODO: change stackName below as required
  stackName: 'aws-ui',
});
