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
function Holders(props) {
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
        header={
          <Header
            variant="h3"
            description="Breakdown"
            info={
              <InfoLink
                onFollow={() =>
                  props.loadHelpPanelContent(
                    <HelpPanels
                      title="Major Holders"
                      des="View the Upgrades and Downgrades of the stock by hedge funds."
                    />
                  )
                }
              />
            }
          >
            Major Holders
          </Header>
        }
      >
        <SpaceBetween size="m">
          <div style={{ maxWidth: '550px' }}>
            <ColumnLayout borders="horizontal" columns={2}>
              <Box fontWeight="bold">
                {profile?.majorHoldersBreakdown?.insidersPercentHeld?.fmt}
              </Box>
              <Box float="left">% of Shares Held by All Insider</Box>
              <Box fontWeight="bold">
                {profile?.majorHoldersBreakdown?.institutionsPercentHeld?.fmt}
              </Box>
              <Box>% of Shares Held by Institutions</Box>
              <Box fontWeight="bold">
                {
                  profile?.majorHoldersBreakdown?.institutionsFloatPercentHeld
                    ?.fmt
                }
              </Box>
              <Box>% of Float Held by Institutions</Box>
              <Box fontWeight="bold">
                {profile?.majorHoldersBreakdown?.institutionsCount?.longFmt}
              </Box>
              <Box>Number of Institutions Holding Shares</Box>
            </ColumnLayout>
          </div>
          <Table
            columnDefinitions={[
              {
                id: 'name',
                header: 'Holder',
                cell: (item) => item?.organization || '-',
                sortingField: 'name',
              },
              {
                id: 'shares',
                header: 'Shares',
                cell: (item) => item?.position?.longFmt || '-',
                sortingField: 'price',
              },
              {
                id: 'reportDate',
                header: 'Date Reported',
                cell: (item) => item?.reportDate?.fmt || '-',
              },
              {
                id: 'change',
                header: '% Out',
                cell: (item) => item?.pctHeld?.fmt || '-',
              },
              {
                id: 'changePer',
                header: '% Change',
                cell: (item) => item?.pctChange?.fmt || '-',
              },
              {
                id: 'value',
                header: 'Value',
                cell: (item) => item?.value?.longFmt || '-',
              },
            ]}
            items={profile?.institutionOwnership?.ownershipList}
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
                          title="Top Institutional Holders"
                          des="View the Upgrades and Downgrades of the stock by hedge funds."
                        />
                      )
                    }
                  />
                }
              >
                Top Institutional Holders
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
          <Table
            columnDefinitions={[
              {
                id: 'name',
                header: 'Holder',
                cell: (item) => item?.organization || '-',
                sortingField: 'name',
              },
              {
                id: 'shares',
                header: 'Shares',
                cell: (item) => item?.position?.longFmt || '-',
                sortingField: 'price',
              },
              {
                id: 'reportDate',
                header: 'Date Reported',
                cell: (item) => item?.reportDate?.fmt || '-',
              },
              {
                id: 'change',
                header: '% Out',
                cell: (item) => item?.pctHeld?.fmt || '-',
              },
              {
                id: 'changePer',
                header: '% Change',
                cell: (item) => item?.pctChange?.fmt || '-',
              },
              {
                id: 'value',
                header: 'Value',
                cell: (item) => item?.value?.longFmt || '-',
              },
            ]}
            items={profile?.fundOwnership?.ownershipList}
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
                          title="Top Mutual Fund Holders"
                          des="View the Upgrades and Downgrades of the stock by hedge funds."
                        />
                      )
                    }
                  />
                }
              >
                Top Mutual Fund Holders
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
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}

export default Holders;
