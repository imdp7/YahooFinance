import { CfnOutput, CfnParameter, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import {
  App,
  CodeCommitSourceCodeProvider,
  RedirectStatus,
} from '@aws-cdk/aws-amplify-alpha';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repositoryName = new CfnParameter(this, 'RepositoryName', {
      type: 'String',
      default: 'my-awsui-app',
      description:
        'The name of the CodeCommit repository where source files will be stored.',
    });

    const repo = new Repository(this, 'Repository', {
      repositoryName: repositoryName.valueAsString,
      description: `CodeCommit repository that will be used as the source repository for my-awsui-app and the cdk app`,
    });

    const amplifyApp = new App(this, 'AmplifyHosting', {
      appName: repositoryName.valueAsString,
      description: 'CodeCommit repository ' + repo.repositoryName,
      sourceCodeProvider: new CodeCommitSourceCodeProvider({
        repository: repo,
      }),
    });

    const branchName = 'main';
    amplifyApp.addBranch(branchName);

    // https://docs.aws.amazon.com/amplify/latest/userguide/redirects.html#redirects-for-single-page-web-apps-spa
    amplifyApp.addCustomRule({
      source: String.raw`</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>`,
      target: '/index.html',
      status: RedirectStatus.REWRITE,
    });

    new CfnOutput(this, 'AmplifyHostingURL', {
      value: `https://${branchName}.${amplifyApp.defaultDomain}`,
      description: 'The Amplify Hosting URL for my-awsui-app',
    });

    new CfnOutput(this, 'AmplifyAppId', {
      value: amplifyApp.appId,
      description: 'The Amplify Hosting App ID',
    });
  }
}
