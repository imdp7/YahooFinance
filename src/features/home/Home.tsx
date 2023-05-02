import * as React from 'react';
import ec2 from '../../../assets/ec2/Res_Amazon-EC2_A1-Instance_48_Light.png';
import s3 from '../../../assets/s3/Res_Amazon-Simple-Storage-Service_Bucket_48_Dark.png';
import rds from '../../../assets/rds/Res_Amazon-Aurora_Amazon-RDS-Instance_48_Dark.png';
import {
  Box,
  ColumnLayout,
  Container,
  Link,
  Alert,
  LinkProps,
} from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';
import classes from './home.module.scss';

const HomeHeader = (): JSX.Element => {
  return (
    <Box
      margin={{ bottom: 'l' }}
      padding={{ horizontal: 'xxxl', vertical: 'l' }}
      className={classes.home_header}
    >
      <Box
        variant="h1"
        fontWeight="heavy"
        padding="n"
        fontSize="display-l"
        color="inherit"
      >
        AWS Cloud Services
      </Box>
      <Box
        variant="p"
        fontWeight="light"
        color="inherit"
        className={classes.home_header_secondary}
      >
        Descriptive sentence about the impressive AWS UI App
      </Box>
    </Box>
  );
};

const HomeFeatures = (): JSX.Element => {
  const [visible, setVisible] = React.useState(true);

  const navigate = useNavigate();

  const defaultOnFollowHandler = (
    event: CustomEvent<LinkProps.FollowDetail>
  ): void => {
    navigate(event.detail.href as string);
    event.preventDefault();
  };

  return (
    <div>
      <Box variant="h1" tagOverride="h2" padding={{ bottom: 's', top: 'l' }}>
        Console Home
      </Box>
      <Alert
        onDismiss={() => setVisible(false)}
        visible={visible}
        dismissAriaLabel="Close alert"
        dismissible
        header="Introducing the new widgets Applications."
      >
        {' '}
      </Alert>
      <Box variant="h1" tagOverride="h2" padding={{ bottom: 's', top: 'l' }}>
        Benefits and features
      </Box>
      <Container>
        <ColumnLayout columns={2} variant="text-grid">
          <div
            style={{
              display: 'block',
              justifyItems: 'center',
              textAlign: 'center',
            }}
          >
            <img src={ec2} alt="logo" />
            <Box variant="h2" padding={{ top: 'n', left: 'l' }}>
              EC2 Instance
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/ec2_instance"
                onFollow={defaultOnFollowHandler}
              >
                EC2 Instance
              </Link>{' '}
            </Box>
          </div>
          <div
            style={{
              display: 'block',
              justifyItems: 'center',
              textAlign: 'center',
            }}
          >
            <img src={s3} alt="logo" />
            <Box variant="h2" padding={{ top: 'n' }}>
              S3
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/s3"
                onFollow={defaultOnFollowHandler}
              >
                S3
              </Link>{' '}
            </Box>
          </div>
          <div
            style={{
              display: 'block',
              justifyItems: 'center',
              textAlign: 'center',
            }}
          >
            <img src={ec2} alt="logo" />
            <Box variant="h2" padding={{ top: 'n' }}>
              CloudFront
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/cloudfront"
                onFollow={defaultOnFollowHandler}
              >
                CloudFront
              </Link>{' '}
            </Box>
          </div>
          <div
            style={{
              display: 'block',
              justifyItems: 'center',
              textAlign: 'center',
            }}
          >
            <img src={ec2} alt="logo" />
            <Box variant="h2" padding={{ top: 'n' }}>
              SQS
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/sqs"
                onFollow={defaultOnFollowHandler}
              >
                SQS
              </Link>{' '}
            </Box>
          </div>
          <div
            style={{
              display: 'block',
              justifyItems: 'center',
              textAlign: 'center',
            }}
          >
            <img src={ec2} alt="logo" />
            <Box variant="h2" padding={{ top: 'n' }}>
              Amazon Connect
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/connect"
                onFollow={defaultOnFollowHandler}
              >
                Amazon Connect
              </Link>{' '}
            </Box>
          </div>
          <div
            style={{
              display: 'block',
              justifyItems: 'center',
              textAlign: 'center',
            }}
          >
            <img src={ec2} alt="logo" />
            <Box variant="h2" padding={{ top: 'n' }}>
              VPC
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/vpc"
                onFollow={defaultOnFollowHandler}
              >
                VPC
              </Link>{' '}
            </Box>
          </div>
          <div
            style={{
              display: 'block',
              justifyItems: 'center',
              textAlign: 'center',
            }}
          >
            <img src={ec2} alt="logo" />
            <Box variant="h2" padding={{ top: 'n' }}>
              IAM
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/iam"
                onFollow={defaultOnFollowHandler}
              >
                IAM
              </Link>{' '}
            </Box>
          </div>
          <div
            style={{
              display: 'block',
              justifyItems: 'center',
              textAlign: 'center',
            }}
          >
            <img src={ec2} alt="logo" />
            <Box variant="h2" padding={{ top: 'n' }}>
              Amazon Rekognition
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/rekognition"
                onFollow={defaultOnFollowHandler}
              >
                Amazon Rekognition
              </Link>{' '}
            </Box>
          </div>
          <div
            style={{
              display: 'block',
              justifyItems: 'center',
              textAlign: 'center',
            }}
          >
            <img src={ec2} alt="logo" />
            <Box variant="h2" padding={{ top: 'n' }}>
              Cloudshell
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/cloudshell"
                onFollow={defaultOnFollowHandler}
              >
                Cloudshell
              </Link>{' '}
            </Box>
          </div>
          <div
            style={{
              display: 'block',
              justifyItems: 'center',
              textAlign: 'center',
            }}
          >
            <img src={rds} alt="logo" />
            <Box variant="h2" padding={{ top: 'n' }}>
              RDS
            </Box>
            <Box variant="p">
              Call to action sentence about benefits of{' '}
              <Link
                variant="primary"
                href="/rds"
                onFollow={defaultOnFollowHandler}
              >
                RDS
              </Link>{' '}
            </Box>
          </div>
        </ColumnLayout>
      </Container>
    </div>
  );
};

export const Home = (): JSX.Element => {
  return (
    <>
      <HomeHeader />

      <Box margin={{ bottom: 'l' }} padding={{ horizontal: 'xxxl' }}>
        <Box padding={{ horizontal: 'xl' }}>
          <HomeFeatures />
        </Box>
      </Box>
    </>
  );
};
