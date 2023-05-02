/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Box,
  ColumnLayout,
  Container,
  Header,
  Link,
  SpaceBetween,
  AppLayout,
} from '@cloudscape-design/components';
import { AppHeader } from '../common/TopNavigations';
import { InfoLink } from '../EC2/commons/common-components';
import { HelpPanels } from '../EC2/components/header';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ec2 from '../../../assets/ec2/Res_Amazon-EC2_A1-Instance_48_Dark.png';
import s3 from '../../../assets/s3/Res_Amazon-Simple-Storage-Service_Bucket_48_Dark.png';
import rds from '../../../assets/rds/Res_Amazon-Aurora_Amazon-RDS-Instance_48_Dark.png';
import classes from '../../app.module.scss';
import { appLayoutLabels } from '../common/labels';
import { AppFooter } from '../common/AppFooter';
const arrayData = [
  ['EC2 Instance', `${ec2}`, 'ec2_instance/home'],
  ['S3', `${s3}`, 's3/home'],
  ['Amazon RDS', `${rds}`, 'rds'],
  ['Cloudfront', `${ec2}`, 'cloudfront'],
  ['SQS', `${ec2}`, 'sqs'],
  ['Amazon Connect', `${ec2}`, 'connect'],
  ['VPC', `${ec2}`, 'vpc'],
  ['IAM', `${ec2}`, 'iam'],
  ['Rekognition', `${ec2}`, 'rekognition'],
  ['Cloudshell', `${ec2}`, 'cloudshell'],
  ['Amazon Kendra', `${ec2}`, 'kendra'],
  ['Route 53', `${ec2}`, 'route53'],
  ['API Gateway', `${ec2}`, 'apigateway'],
  ['AWS Amplify', `${ec2}`, 'awsamplify'],
  ['CodeStar', `${ec2}`, 'codestar'],
  ['AWS MGN', `${s3}`, 'awsmgn'],
];

const HomeHeader = ({ loadHelpPanelContent }): JSX.Element => {
  const updateTools = useOutletContext<(element: JSX.Element) => void>();
  return (
    <SpaceBetween size="m">
      <Box
        margin={{ bottom: 'l' }}
        padding={{ horizontal: 'xxxl', vertical: 'l' }}
        className={classes.home_header}
      >
        <Header
          variant="h1"
          info={
            <InfoLink
              onFollow={() =>
                loadHelpPanelContent(
                  <HelpPanels
                    title="All Services"
                    info="Console Home displays widgets with important information about your AWS environment."
                    des="Amazon EC2 allows you to create virtual machines, or instances, that run on the AWS Cloud. Quickly get started by following the simple steps below."
                    ul={[
                      {
                        h5: 'Customize your Console Home',
                        text: 'You can add a widget from the actions menu, change its size from the widget menu, or drag and drop it to change its position. Changes you make do not affect others using your shared account.',
                      },
                      {
                        h5: 'Change the language of the console',
                        text: 'You can now change the display language for the AWS Management Console in the Unified Settings page. For more information, see Changing the language of the AWS Management Console.',
                      },
                    ]}
                  />
                )
              }
            />
          }
        >
          All Services
        </Header>
        <Box
          variant="p"
          fontWeight="light"
          color="inherit"
          className={classes.home_header_secondary}
        >
          Descriptive information about all services by AWS
        </Box>
      </Box>
    </SpaceBetween>
  );
};

const Content = ({ loadHelpPanelContent }): JSX.Element => {
  return (
    <SpaceBetween size="l">
      <HomeHeader loadHelpPanelContent={loadHelpPanelContent} />
      <Container
        header={
          <Header
            variant="h2"
            info={
              <InfoLink
                onFollow={() =>
                  loadHelpPanelContent(
                    <HelpPanels
                      title="Services by category"
                      des="Jump in where you left off and navigate to the AWS services you most recently worked with."
                      h5="To view all AWS services choose View all AWS services at the bottom of the widget."
                    />
                  )
                }
              />
            }
          >
            Services by category
          </Header>
        }
      >
        <ColumnLayout columns={3}>
          {arrayData.map((d, i) => (
            <>
              <Link variant="secondary" href={`/${d[2]}`}>
                <Container key={i}>
                  <Box variant="h2">{d[0]}</Box>
                  <Box key={i}>{d[2]}</Box>
                </Container>
              </Link>
            </>
          ))}
        </ColumnLayout>
      </Container>
    </SpaceBetween>
  );
};

function AllServices(props): JSX.Element {
  const [visible, setVisible] = React.useState(true);
  const [tools, setTools] = useState<JSX.Element>();
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title="All Services"
      info="Console Home displays widgets with important information about your AWS environment."
      des="Amazon EC2 allows you to create virtimport { AppHeader } from '../common/TopNavigations';
ual machines, or instances, that run on the AWSimport props from '../../../node_modules/ramda/es/props';
 Cloud. Quickly get started by following the simple steps below."
      ul={[
        {
          h5: 'Customize your Console Home',
          text: 'You can add a widget from the actions menu, change its size from the widget menu, or drag and drop it to change its position. Changes you make do not affect others using your shared account.',
        },
        {
          h5: 'Change the language of the console',
          text: 'You can now change the display language for the AWS Management Console in the Unified Settings page. For more information, see Changing the language of the AWS Management Console.',
        },
      ]}
    />
  );
  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };
  const updateTools = (element: JSX.Element): void => {
    setTools(element);
    setToolsOpen(true);
  };
  const navigate = useNavigate();

  //   const defaultOnFollowHandler = (
  //     event: CustomEvent<LinkProps.FollowDetail>
  //   ): void => {
  //     navigate(event.detail.href as string);
  //     event.preventDefault();
  //   };

  useEffect(() => {
    document.title = 'AWS Services';
  }, []);

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        navigationHide={true}
        content={<Content loadHelpPanelContent={loadHelpPanelContent} />}
        stickyNotifications={true}
        headerSelector="#h"
        // disableContentPaddings={true}
        toolsOpen={toolsOpen}
        tools={toolsContent}
        contentType="table"
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        footerSelector="#f"
      />
      <AppFooter />
    </>
  );
}

export default AllServices;
