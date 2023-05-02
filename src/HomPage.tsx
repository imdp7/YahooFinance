import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { AppHeader } from './features/common/TopNavigations';
import './App.css';
import classes from './app.module.scss';
import ec2 from '../assets/ec2/Res_Amazon-EC2_A1-Instance_48_Dark.png';
import s3 from '../assets/s3/Res_Amazon-Simple-Storage-Service_Bucket_48_Dark.png';
import rds from '../assets/rds/Res_Amazon-Aurora_Amazon-RDS-Instance_48_Dark.png';
import {
  Box,
  ColumnLayout,
  Container,
  Link,
  Header,
  LinkProps,
  Alert,
  AppLayout,
  SpaceBetween,
  Grid,
  Button,
  Spinner,
  Modal,
  ButtonDropdown,
} from '@cloudscape-design/components';
import { Board, BoardItem } from '@cloudscape-design/board-components';
import { useOutletContext } from 'react-router';
import { InfoLink, ValueWithLabel } from './features/common/common';
import { appLayoutLabels } from './features/common/labels';
import { AppFooter } from './features/common/AppFooter';
import Card from './components/Trending';

const arrayData = [
  ['EC2 Instance', `${ec2}`, 'ec2_instance/home'],
  ['S3', `${s3}`, 's3/home'],
  ['CloudWatch', `${s3}`, 'cloudwatch/home'],
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
  const [visible, setVisible] = useState(false);

  const onDismissHandler = () => {
    setVisible(false);
  };
  const onSubmit = () => {
    setVisible(false);
  };

  return (
    <SpaceBetween size="s">
      <Box
        margin={{ bottom: 's' }}
        padding={{ horizontal: 'xxl', vertical: 'm' }}
        className={classes.home_header}
      >
        <Modal
          onDismiss={onDismissHandler}
          visible={visible}
          closeAriaLabel="Close modal"
          size="large"
          footer={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" onClick={onDismissHandler}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                  Ok
                </Button>
              </SpaceBetween>
            </Box>
          }
          header="Add Widgets"
        >
          <Card />
        </Modal>
        <Header
          variant="h1"
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button>Reset to default layout</Button>
              <Button
                ariaLabel="AddWidget"
                variant="primary"
                iconName="add-plus"
                loadingText="loading"
                onClick={() => setVisible(true)}
              >
                Add Widgets
              </Button>
            </SpaceBetween>
          }
          info={<InfoLink />}
        >
          Console Home
        </Header>
      </Box>
    </SpaceBetween>
  );
};

function strReduce(string = '') {
  return string.substring(0, length);
}

const HomeFeatures = ({ loadHelpPanelContent }): JSX.Element => {
  const [visible, setVisible] = useState(true);

  const navigate = useNavigate();

  const defaultOnFollowHandler = (
    event: CustomEvent<LinkProps.FollowDetail>
  ): void => {
    navigate(event.detail.href as string);
    event.preventDefault();
  };
  const updateTools = useOutletContext<(element: JSX.Element) => void>();

  const RecentlyVisited = () => {
    return (
      <>
        <ColumnLayout columns={4} borders="horizontal">
          {arrayData.map((d) => (
            <div
              key={d[0]}
              style={{
                display: 'flex',
                justifyItems: 'center',
                textAlign: 'center',
                fontSize: '10px',
              }}
            >
              <img src={`${d[1]}`} alt="logo" height="35" width="35" />
              <Box variant="div" padding={{ top: 'n', left: 'xs' }}>
                <Link
                  variant="secondary"
                  href={`${d[2]}`}
                  onFollow={defaultOnFollowHandler}
                >
                  {d[0]}
                </Link>{' '}
              </Box>
            </div>
          ))}
        </ColumnLayout>
      </>
    );
  };

  const Health = () => {
    return (
      <>
        <ColumnLayout>
          <Box variant="awsui-key-label" color="text-status-inactive">
            Open Issues
          </Box>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box color="text-status-info" variant="h1" textAlign="center">
              0
            </Box>
            <Box float="right" textAlign="center">
              7 days ago
            </Box>
          </Grid>
          <Box variant="awsui-key-label" color="text-status-inactive">
            Scheduled changes
          </Box>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box color="text-status-info" variant="h1" textAlign="center">
              0
            </Box>
            <Box float="right" textAlign="center">
              7 days ago
            </Box>
          </Grid>
          <Box variant="awsui-key-label" color="text-status-inactive">
            Other notifications
          </Box>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box color="text-status-info" variant="h1" textAlign="center">
              0
            </Box>
            <Box float="right" textAlign="center">
              7 days ago
            </Box>
          </Grid>
        </ColumnLayout>
      </>
    );
  };

  const CostUsage = () => {
    return (
      <>
        <SpaceBetween size="s">
          <Box variant="awsui-key-label" color="text-status-inactive">
            Open Issues
          </Box>
          <ColumnLayout columns={4}>
            {arrayData.map((d) => (
              <div
                key={d[0]}
                style={{
                  display: 'flex',
                  justifyItems: 'center',
                  textAlign: 'center',
                }}
              >
                <img src={`${d[1]}`} alt="logo" height="35" width="35" />
                <Box variant="div" padding={{ top: 'n', left: 'xs' }}>
                  <Link
                    variant="secondary"
                    href={`${d[2]}`}
                    onFollow={defaultOnFollowHandler}
                  >
                    {d[0]}
                  </Link>{' '}
                </Box>
              </div>
            ))}
          </ColumnLayout>
        </SpaceBetween>
      </>
    );
  };

  const BuildSolution = () => {
    return (
      <>
        <SpaceBetween size="s">
          <Box variant="awsui-key-label" color="text-status-inactive">
            Open Issues
          </Box>
          <ColumnLayout columns={4} variant="text-grid">
            {arrayData.map((d) => (
              <div
                key={d[0]}
                style={{
                  display: 'flex',
                  justifyItems: 'center',
                  textAlign: 'center',
                }}
              >
                <img src={`${d[1]}`} alt="logo" height="35" width="35" />
                <Box variant="div" padding={{ top: 'n', left: 'xs' }}>
                  <Link
                    variant="secondary"
                    href={`${d[2]}`}
                    onFollow={defaultOnFollowHandler}
                  >
                    {d[0]}
                  </Link>{' '}
                </Box>
              </div>
            ))}
          </ColumnLayout>
        </SpaceBetween>
      </>
    );
  };

  const TrustedAdviser = () => {
    return (
      <>
        <ColumnLayout>
          <Box variant="awsui-key-label" color="text-status-error">
            Action recommended
          </Box>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box color="text-status-error" variant="h1" textAlign="center">
              0
            </Box>
            <Box float="right" textAlign="center">
              <Link href="#" variant="primary">
                Details
              </Link>
            </Box>
          </Grid>
          <Box variant="awsui-key-label" color="text-status-info">
            Investigation recommended
          </Box>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box color="text-status-info" variant="h1" textAlign="center">
              0
            </Box>
            <Box float="right" textAlign="center">
              <Link href="#" variant="primary">
                Details
              </Link>
            </Box>
          </Grid>
          <Box variant="awsui-key-label" color="text-status-success">
            Other notifications
          </Box>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box color="text-status-success" variant="h1" textAlign="center">
              0
            </Box>
            <Box float="right" textAlign="center">
              <Link href="#" variant="primary">
                Details
              </Link>
            </Box>
          </Grid>
        </ColumnLayout>
      </>
    );
  };

  const ExlporeAWS = () => {
    return (
      <>
        <SpaceBetween size="m">
          <Box variant="awsui-key-label" color="text-status-inactive">
            <Link external fontSize="heading-s">
              {' '}
              AWS Certifications
            </Link>
            <Box>Propel your career forward with AWS Certification.</Box>
          </Box>
          <Box variant="awsui-key-label" color="text-status-inactive">
            <Link external fontSize="heading-s">
              {' '}
              Free AWS Training
            </Link>
            <Box>
              Advance your career with AWS Cloud Practitioner Essentials—a free,
              six-hour, foundational course.
            </Box>
          </Box>
          <Box variant="awsui-key-label" color="text-status-inactive">
            <Link external fontSize="heading-s">
              AWS Training
            </Link>
            <Box>Free digital courses to help you develop your skills.</Box>
          </Box>
          <Box variant="awsui-key-label" color="text-status-inactive">
            <Link external fontSize="heading-s">
              Free AWS Digital Training
            </Link>
            <Box>
              Learn the AWS Cloud today to create opportunities tomorrow: find
              out how.
            </Box>
          </Box>
        </SpaceBetween>
      </>
    );
  };

  const LatestAnnouncement = () => {
    return (
      <>
        <Container
          header={
            <Header
              variant="h2"
              info={
                <InfoLink
                  onFollow={() =>
                    loadHelpPanelContent(
                      <HelpPanels
                        title="Latest announcements"
                        des="View the latest announcement for the AWS services you're using. Learn about new capabilities that you can use to experiment and innovate. These announcements are personalized to your account."
                      />
                    )
                  }
                />
              }
            >
              Latest Announcements
            </Header>
          }
          footer={
            <Box
              variant="h5"
              tagOverride="h5"
              //padding={{ bottom: 's', top: 'l' }}
              textAlign="center"
            >
              <Link href="/console/services">View all Announcements</Link>
            </Box>
          }
        >
          <Box color="text-status-info" variant="h2">
            <Link>
              {strReduce(
                'Amazon AppFlow now supports Microsoft SharePoint Online as a source'
              )}
            </Link>
            <Link>
              {strReduce(
                'Amazon AppFlow now supports Microsoft SharePoint Online as a source'
              )}
            </Link>
          </Box>
        </Container>
      </>
    );
  };

  const AWSBlogs = () => {
    return (
      <>
        <ColumnLayout>
          <Box variant="awsui-key-label" color="text-status-inactive">
            Open Issues
          </Box>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box color="text-status-info" variant="h1" textAlign="center">
              0
            </Box>
            <Box float="right" textAlign="center">
              7 days ago
            </Box>
          </Grid>
          <Box variant="awsui-key-label" color="text-status-inactive">
            Scheduled changes
          </Box>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box color="text-status-info" variant="h1" textAlign="center">
              0
            </Box>
            <Box float="right" textAlign="center">
              7 days ago
            </Box>
          </Grid>
          <Box variant="awsui-key-label" color="text-status-inactive">
            Other notifications
          </Box>
          <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
            <Box color="text-status-info" variant="h1" textAlign="center">
              0
            </Box>
            <Box float="right" textAlign="center">
              7 days ago
            </Box>
          </Grid>
        </ColumnLayout>
      </>
    );
  };
  const [items, setItems] = useState([
    {
      id: '1',
      rowSpan: 4,
      columnSpan: 3,
      data: {
        title: 'Recently Visited',
        footer: (
          <Box textAlign="center">
            <Link href="/console/services">View all AWS services</Link>
          </Box>
        ),
        content: <RecentlyVisited />,
      },
    },
    {
      id: '2',
      rowSpan: 4,
      columnSpan: 1,
      data: { title: 'AWS Blogs', content: <AWSBlogs /> },
    },
    {
      id: '3',
      rowSpan: 4,
      columnSpan: 1,
      data: { title: 'AWS Health', content: <Health /> },
    },
    {
      id: '4',
      rowSpan: 4,
      columnSpan: 2,
      data: { title: 'Cost and Usage', content: <CostUsage /> },
    },
    {
      id: '5',
      rowSpan: 4,
      columnSpan: 1,
      data: { title: 'Trusted Advisor', content: <TrustedAdviser /> },
    },
    {
      id: '6',
      rowSpan: 4,
      columnSpan: 2,
      data: { title: 'Build a Solution', content: <BuildSolution /> },
    },
    {
      id: '7',
      rowSpan: 4,
      columnSpan: 1,
      data: { title: 'Explore AWS', content: <ExlporeAWS /> },
    },
    {
      id: '8',
      rowSpan: 4,
      columnSpan: 1,
      data: { title: 'AWS Blogs', content: <AWSBlogs /> },
    },
  ]);
  return (
    <>
      <HomeHeader loadHelpPanelContent={loadHelpPanelContent} />
      <SpaceBetween size="l">
        <Alert
          onDismiss={() => setVisible(false)}
          visible={visible}
          dismissAriaLabel="Close alert"
          dismissible
          header="Introducing the new widgets Applications."
        >
          {' '}
        </Alert>

        <Board
          renderItem={(item, actions) => (
            <BoardItem
              header={<Header>{item.data.title}</Header>}
              footer={item.data.footer}
              i18nStrings={{
                dragHandleAriaLabel: 'Drag handle',
                dragHandleAriaDescription:
                  'Use Space or Enter to activate drag, arrow keys to move, Space or Enter to submit, or Escape to discard.',
                resizeHandleAriaLabel: 'Resize handle',
                resizeHandleAriaDescription:
                  'Use Space or Enter to activate resize, arrow keys to move, Space or Enter to submit, or Escape to discard.',
              }}
              settings={
                <ButtonDropdown
                  items={[{ id: 'remove', text: 'Remove' }]}
                  ariaLabel="Board item settings"
                  variant="icon"
                  onItemClick={() => actions.removeItem()}
                />
              }
            >
              {item.data.content}
            </BoardItem>
          )}
          onItemsChange={(event) => setItems(event.detail.items)}
          items={items}
          i18nStrings={(() => {
            function createAnnouncement(
              operationAnnouncement,
              conflicts,
              disturbed
            ) {
              const conflictsAnnouncement =
                conflicts.length > 0
                  ? `Conflicts with ${conflicts
                      .map((c) => c.data.title)
                      .join(', ')}.`
                  : '';
              const disturbedAnnouncement =
                disturbed.length > 0
                  ? `Disturbed ${disturbed.length} items.`
                  : '';
              return [
                operationAnnouncement,
                conflictsAnnouncement,
                disturbedAnnouncement,
              ]
                .filter(Boolean)
                .join(' ');
            }
            return {
              liveAnnouncementDndStarted: (operationType) =>
                operationType === 'resize' ? 'Resizing' : 'Dragging',
              liveAnnouncementDndItemReordered: (operation) => {
                const columns = `column ${operation.placement.x + 1}`;
                const rows = `row ${operation.placement.y + 1}`;
                return createAnnouncement(
                  `Item moved to ${
                    operation.direction === 'horizontal' ? columns : rows
                  }.`,
                  operation.conflicts,
                  operation.disturbed
                );
              },
              liveAnnouncementDndItemResized: (operation) => {
                const columnsConstraint = operation.isMinimalColumnsReached
                  ? ' (minimal)'
                  : '';
                const rowsConstraint = operation.isMinimalRowsReached
                  ? ' (minimal)'
                  : '';
                const sizeAnnouncement =
                  operation.direction === 'horizontal'
                    ? `columns ${operation.placement.width}${columnsConstraint}`
                    : `rows ${operation.placement.height}${rowsConstraint}`;
                return createAnnouncement(
                  `Item resized to ${sizeAnnouncement}.`,
                  operation.conflicts,
                  operation.disturbed
                );
              },
              liveAnnouncementDndItemInserted: (operation) => {
                const columns = `column ${operation.placement.x + 1}`;
                const rows = `row ${operation.placement.y + 1}`;
                return createAnnouncement(
                  `Item inserted to ${columns}, ${rows}.`,
                  operation.conflicts,
                  operation.disturbed
                );
              },
              liveAnnouncementDndCommitted: (operationType) =>
                `${operationType} committed`,
              liveAnnouncementDndDiscarded: (operationType) =>
                `${operationType} discarded`,
              liveAnnouncementItemRemoved: (op) =>
                createAnnouncement(
                  `Removed item ${op.item.data.title}.`,
                  [],
                  op.disturbed
                ),
              navigationAriaLabel: 'Board navigation',
              navigationAriaDescription:
                'Click on non-empty item to move focus over',
              navigationItemAriaLabel: (item) =>
                item ? item.data.title : 'Empty',
            };
          })()}
          empty={
            <Box textAlign="center" color="inherit">
              <SpaceBetween size="xxs">
                <div>
                  <Box variant="strong" color="inherit">
                    No items
                  </Box>
                  <Box variant="p" color="inherit">
                    There are no items on the dashboard.
                  </Box>
                </div>
                <Button iconName="add-plus">Add an item</Button>
              </SpaceBetween>
            </Box>
          }
        />
      </SpaceBetween>
    </>
  );
};

const HomePage = (props): JSX.Element => {
  const [tools, setTools] = useState<JSX.Element>();
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [toolsContent, setToolsContent] = useState();
  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };
  const updateTools = (element: JSX.Element): void => {
    setTools(element);
    setToolsOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  // https://reactrouter.com/docs/en/v6/api#outlet
  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        content={
          <>
            {!loading ? (
              <SpaceBetween size="s">
                <HomeFeatures loadHelpPanelContent={loadHelpPanelContent} />
              </SpaceBetween>
            ) : (
              <Spinner size="large" className="spinner" />
            )}
          </>
        }
        headerSelector="#h"
        contentType="table"
        toolsOpen={toolsOpen}
        tools={toolsContent}
        navigationHide={true}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        footerSelector="#f"
      />
      <AppFooter />
    </>
  );
};

export default HomePage;
