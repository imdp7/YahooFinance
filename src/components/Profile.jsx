import React from 'react';
import {
  SpaceBetween,
  Container,
  Box,
  Header,
  Link,
  ColumnLayout,
  Table,
} from '@cloudscape-design/components';
import { InfoLink, HelpPanels } from '../components/common/InfoLink';

function Profile(props) {
  const { profile } = props;
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      return () => clearTimeout(timer);
    }, 1500);
  }, [props]);
  return (
    <SpaceBetween size="m">
      <Container
        header={<Header variant="h3">{profile?.price?.longName}</Header>}
      >
        <SpaceBetween size="m">
          <ColumnLayout columns={2}>
            <div>
              <Box>{profile?.summaryProfile?.address1}</Box>
              <Box>{profile?.summaryProfile?.address2}</Box>
              <Box>{profile?.summaryProfile?.zip}</Box>
              <Box>
                {profile?.summaryProfile?.state}
                {','} {profile?.summaryProfile?.country}
              </Box>
              <Box>
                <Link href={`tel:${profile?.summaryProfile?.phone}`}>
                  {profile?.summaryProfile?.phone}
                </Link>
              </Box>
              <Box>
                <Link href={`${profile?.summaryProfile?.website}`} external>
                  {profile?.summaryProfile?.website}
                </Link>
              </Box>
            </div>
            <div>
              <Box>
                Sector(s):
                <Box variant="span" fontWeight="bold">
                  {' '}
                  {profile?.summaryProfile?.sector}
                </Box>
              </Box>
              <Box>
                Industry:{' '}
                <Box variant="span" fontWeight="bold">
                  {' '}
                  {profile?.summaryProfile?.industry}
                </Box>
              </Box>
              <Box>
                Full Time Employees:{' '}
                <Box variant="span" fontWeight="bold">
                  {' '}
                  {profile?.summaryProfile?.fullTimeEmployees}
                </Box>
              </Box>
            </div>
          </ColumnLayout>
          <Table
            columnDefinitions={[
              {
                id: 'name',
                header: 'Name',
                cell: (item) => item?.name || '-',
                sortingField: 'name',
              },
              {
                id: 'price',
                header: 'Title',
                cell: (item) => item.relation || '-',
                sortingField: 'price',
              },
              {
                id: 'change',
                header: 'Pay',
                cell: (item) => item?.positionDirect?.fmt || '-',
              },
              {
                id: 'changePer',
                header: 'Stock Gained',
                cell: (item) => item?.transactionDescription || '-',
              },
              {
                id: 'latestTransactionDate',
                header: 'Latest Transaction Date',
                cell: (item) => item?.latestTransDate?.fmt || '-',
              },
              {
                id: 'positionDirect',
                header: 'Position Direct Date',
                cell: (item) => item?.positionDirectDate?.fmt || '-',
              },
            ]}
            items={profile?.insiderHolders?.holders}
            wrapLines
            stripedRows
            loading={loading}
            loadingText="Loading resources"
            sortingDisabled
            variant="embedded"
            header={
              <Header
                variant="h3"
                info={
                  <InfoLink
                    onFollow={() =>
                      props.loadHelpPanelContent(
                        <HelpPanels
                          title="Key Executives"
                          des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                        />
                      )
                    }
                  />
                }
              >
                Key Executives
              </Header>
            }
            empty={
              <Box textAlign="center" color="inherit">
                <b>No resources</b>
                <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                  No resources to display.
                </Box>
              </Box>
            }
          />
          <Header
            variant="h3"
            info={
              <InfoLink
                onFollow={() =>
                  props.loadHelpPanelContent(
                    <HelpPanels
                      title="Description"
                      des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                    />
                  )
                }
              />
            }
          >
            Description
          </Header>
          <Box>{profile?.summaryProfile?.longBusinessSummary}</Box>
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}

export default Profile;
