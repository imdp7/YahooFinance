import React from 'react';
import { useLocation } from 'react-router-dom';
import TopNavigations from '../components/TopNavigation';
import {
  AppLayout,
  SpaceBetween,
  Container,
  Header,
  ContentLayout,
  Button,
  BreadcrumbGroup,
  Grid,
  Badge,
  CollectionPreferences,
  Box,
  Link,
  Tabs,
  Table,
  FormField,
} from '@cloudscape-design/components';
import { convertUnixTimestamp } from '../components/Historical';
const i18nStrings = {
  overflowMenuTriggerText: 'More',
  overflowMenuTitleText: 'All',
};
const Content = ({ state }) => {
  const getTicker = (obj) => {
    const { term, label, score } = obj;
    const ticker = term.split(':')[1];
    return ticker;
  };
  return (
    <SpaceBetween size="m">
      <SpaceBetween size="xxs">
        <SpaceBetween size="l" direction="horizontal">
          <Box fontSize="heading-m" fontWeight="bold">
            {state.author}
          </Box>
          <Box fontSize="heading-m" fontWeight="bold">
            {state.publisher}
          </Box>
        </SpaceBetween>
        <Box color="text-status-inactive">
          {convertUnixTimestamp(state.published_at)}
        </Box>
      </SpaceBetween>
      <FormField label="In this article:">
        <Container>
          <SpaceBetween size="xs" direction="horizontal">
            {state?.entities.map((e) => (
              <div key={e?.term}>
                <Link href={`/stocks/${getTicker(e)}`}>
                  <Badge className="badge-style" color="blue">
                    {getTicker(e)}
                  </Badge>
                </Link>
              </div>
            ))}
          </SpaceBetween>
        </Container>
      </FormField>
      {state?.streams?.map((s) => (
        <div className="video-stream" key={s.uuid}>
          <video width="680" height="450" controls>
            <source src={s?.url} type={s?.mime_type} />
          </video>
        </div>
      ))}
      <div
        className="contentHtml"
        dangerouslySetInnerHTML={{ __html: state?.content }}
      />
    </SpaceBetween>
  );
};
function News(props) {
  const location = useLocation();
  React.useLayoutEffect(() => {
    document.title = `${location?.state?.state?.title}`;
  }, []);

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <TopNavigations
          identity={{ href: '#' }}
          i18nStrings={i18nStrings}
          {...props}
        />
      </div>
      <AppLayout
        headerSelector="#h"
        contentType="wizard"
        navigationHide={true}
        toolsHide={true}
        breadcrumbs={<BreadcrumbGroup items={[]} ariaLabel="Breadcrumbs" />}
        content={
          <SpaceBetween size="l">
            <ContentLayout header={<Header variant="h2" />}>
              <Container
                header={
                  <Header
                    variant="h1"
                    //     description={location.state.state.publisher}
                  >
                    {location.state.state.title}
                  </Header>
                }
              >
                <Content state={location.state.state} />
              </Container>
            </ContentLayout>
          </SpaceBetween>
        }
      />
    </>
  );
}

export default News;
