# ADR009 - Use AWS Amplify for hosting

## Status

Proposed

## Decision

Pre-configure `amplify.yml` and `customHttp.yml` to support
[AWS Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html) Hosting.
Include a [AWS Cloud Development Kit (CDK)](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
stack in the `cdk` folder that will create and configure the Amplify App.

## Context

This template was envisioned to help jump start web UIs for Solution Architect demos of AWS services.
To demo outside of a local development requirements requires web hosting.

## Options Considered

Amplify Hosting provides a git-based workflow for hosting full-stack serverless web apps with continuous deployment.

- `+` Straightforward solution for web hosting and build pipeline
- `-` Coupled to feature set of Amplify

Amazon S3 bucket and CloudFront distribution

- `+` More well-known solution to static website hosting
- `-` Doesn't include default build pipeline, requiring additional development

## Consequences

- `+` Providing CDK stack source accelerates deployment
- `-` The APIs of higher level constructs in the [@aws-cdk/aws-amplify-alpha module](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-amplify-alpha-readme.html) are experimental and under active development.
- `-` Hard-coded values in the CDK source require editing
- `-` Deleting the stack will also delete the AWS CodeCommit repository

## Advice

None provided
