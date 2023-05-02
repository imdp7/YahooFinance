/* eslint-disable react/no-unescaped-entities */
import React, { Fragment } from 'react';
import {
  AppLayout,
  Box,
  Icon,
  Link,
  SpaceBetween,
  Container,
} from '@cloudscape-design/components';
import { AppHeader } from './features/common/TopNavigations';
import { AppFooter } from './features/common/AppFooter';
import { useNavigate } from 'react-router-dom';
function NotFound() {
  const navigate = useNavigate();
  return (
    <SpaceBetween size="l">
      <Box></Box>
      <Container variant="stacked">
        <SpaceBetween size="xxl" direction="vertical">
          <Box
            color="text-status-inactive"
            display="block"
            fontSize="heading-l"
            fontWeight="bold"
            textAlign="center"
            variant="awsui-value-large"
          >
            <Icon name="status-warning" size="medium" variant="subtle" />
            The page you are looking doesn't exist.
          </Box>
          <Box
            color="text-status-info"
            display="block"
            fontSize="heading-l"
            fontWeight="bold"
            textAlign="center"
            variant="awsui-value-large"
          >
            Page not Found
          </Box>
          <Box
            fontSize="display-l"
            fontWeight="bold"
            textAlign="center"
            display="block"
            variant="awsui-value-large"
          >
            {/* <Icon name="arrow-left" size="small" /> */}
            <Link onFollow={() => navigate('/')}>
              Visit Homepage for activated services{' '}
            </Link>
          </Box>
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}
function PageNotFound(props) {
  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        content={<NotFound />}
        navigationHide={true}
        contentType="table"
        headerSelector="#h"
        footerSelector="#f"
        disableBodyScroll={true}
        toolsHide={true}
      />
      <AppFooter />
    </>
  );
}

export default PageNotFound;
