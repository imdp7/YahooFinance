import React from 'react';
import {
  SpaceBetween,
  Box,
  Link,
  Container,
  Header,
} from '@cloudscape-design/components';
import { InfoLink, HelpPanels } from '../components/common/InfoLink';
function CompanyProfile(props) {
  const { data = props?.profile?.summaryProfile } = props;
  return (
    <>
      {data && (
        <Container
          header={
            <Header
              variant="h3"
              info={
                <InfoLink
                  onFollow={() =>
                    props.loadHelpPanelContent(
                      <HelpPanels
                        title="Company Profile"
                        des="View the summary profile of the company and its information (i.e, metadata)."
                      />
                    )
                  }
                />
              }
            >
              Company Profile
            </Header>
          }
        >
          <SpaceBetween size="xxs">
            <Box>{data?.address1}</Box>
            <Box>{data?.address2}</Box>
            <Box>{data?.zip}</Box>
            <Box>
              {data?.state}
              {','} {data?.country}
            </Box>
            <Link href={`tel:${data?.phone}`}>{data?.phone}</Link>
            <Link href={`${data?.website}`} external>
              {data?.website}
            </Link>
            <Box>Sector(s): {data?.sector}</Box>
            <Box>Industry: {data?.industry}</Box>
            <Box>Full Time Employees: {data?.fullTimeEmployees}</Box>
            <Box padding={{ top: 'l' }}>{data?.longBusinessSummary}</Box>
          </SpaceBetween>
        </Container>
      )}
    </>
  );
}

export default CompanyProfile;
