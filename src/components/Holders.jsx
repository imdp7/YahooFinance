import React from "react";
import {
  SpaceBetween,
  Container,
  Box,
  Header,
  Link,
  ColumnLayout,
  SegmentedControl,
  Table,
} from "@cloudscape-design/components";
import { InfoLink, HelpPanels } from "../components/common/InfoLink";

const Content_1 = ({ profile, loadHelpPanelContent, loading }) => {
  return (
    <SpaceBetween size="m">
      <Header
        variant="h3"
        description="Breakdown"
        info={
          <InfoLink
            onFollow={() =>
              loadHelpPanelContent(
                <HelpPanels
                  title="Major Holders"
                  des="View the Major Holders of the stock by hedge funds or institution or entity."
                />
              )
            }
          />
        }>
        Major Holders
      </Header>

      <SpaceBetween size="m">
        <div style={{ maxWidth: "550px" }}>
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
              id: "name",
              header: "Holder",
              cell: (item) => item?.organization || "-",
              sortingField: "name",
            },
            {
              id: "shares",
              header: "Shares",
              cell: (item) => item?.position?.longFmt || "-",
              sortingField: "price",
            },
            {
              id: "reportDate",
              header: "Date Reported",
              cell: (item) => item?.reportDate?.fmt || "-",
            },
            {
              id: "change",
              header: "% Out",
              cell: (item) => item?.pctHeld?.fmt || "-",
            },
            {
              id: "changePer",
              header: "% Change",
              cell: (item) => item?.pctChange?.fmt || "-",
            },
            {
              id: "value",
              header: "Value",
              cell: (item) => item?.value?.longFmt || "-",
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
                    loadHelpPanelContent(
                      <HelpPanels
                        title="Top Institutional Holders"
                        des="View the Top Institutional Holders of the stock by institutions."
                      />
                    )
                  }
                />
              }>
              Top Institutional Holders
            </Header>
          }
          empty={
            <Box textAlign="center" color="inherit">
              <b>No resources</b>
              <Box padding={{ bottom: "s" }} variant="p" color="inherit">
                No resources to display.
              </Box>
            </Box>
          }
        />
        <Table
          columnDefinitions={[
            {
              id: "name",
              header: "Holder",
              cell: (item) => item?.organization || "-",
              sortingField: "name",
            },
            {
              id: "shares",
              header: "Shares",
              cell: (item) => item?.position?.longFmt || "-",
              sortingField: "price",
            },
            {
              id: "reportDate",
              header: "Date Reported",
              cell: (item) => item?.reportDate?.fmt || "-",
            },
            {
              id: "change",
              header: "% Out",
              cell: (item) => item?.pctHeld?.fmt || "-",
            },
            {
              id: "changePer",
              header: "% Change",
              cell: (item) => item?.pctChange?.fmt || "-",
            },
            {
              id: "value",
              header: "Value",
              cell: (item) => item?.value?.longFmt || "-",
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
                    loadHelpPanelContent(
                      <HelpPanels
                        title="Top Mutual Fund Holders"
                        des="View the Top Mutual Fund Holders of the stock by hedge funds."
                      />
                    )
                  }
                />
              }>
              Top Mutual Fund Holders
            </Header>
          }
          empty={
            <Box textAlign="center" color="inherit">
              <b>No resources</b>
              <Box padding={{ bottom: "s" }} variant="p" color="inherit">
                No resources to display.
              </Box>
            </Box>
          }
        />
      </SpaceBetween>
    </SpaceBetween>
  );
};

const Content_2 = ({ profile, loadHelpPanelContent, loading }) => {
  return (
    <Table
      columnDefinitions={[
        {
          id: "name",
          header: "Individual or Entity",
          cell: (item) => item?.name || "-",
          sortingField: "name",
        },
        {
          id: "position",
          header: "Position",
          cell: (item) => item?.relation || "-",
          sortingField: "price",
        },
        {
          id: "transactionDescription",
          header: "Transaction Description",
          cell: (item) => item?.transactionDescription || "-",
        },
        {
          id: "latestTransDate",
          header: "Date",
          cell: (item) => item?.latestTransDate?.fmt || "-",
        },
        {
          id: "positionDirect",
          header: "Position Direct",
          cell: (item) => item?.positionDirect?.longFmt || "-",
        },
        {
          id: "positionDirectDate",
          header: "Position Direct Date",
          cell: (item) => item?.positionDirectDate?.fmt || "-",
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
                loadHelpPanelContent(
                  <HelpPanels
                    title="Insider Roster"
                    des="View the Insider Roaster of the stock by individuals or entity."
                  />
                )
              }
            />
          }>
          Insider Roster
        </Header>
      }
      footer={
        <Box textAlign="center" color="text-body-secondary" fontSize="body-s">
          *Insider roster data is derived solely from the last 24 months of Form
          3 & Form 4 SEC filings.
        </Box>
      }
      empty={
        <Box textAlign="center" color="inherit">
          <b>No resources</b>
          <Box padding={{ bottom: "s" }} variant="p" color="inherit">
            No resources to display.
          </Box>
        </Box>
      }
    />
  );
};

const Content_3 = ({ profile, loadHelpPanelContent, loading }) => {
  const getType = (str) => {
    if(str=== 'D'){
      return "Direct";
    } 
    return "Indirect";
  }
  return (
    <SpaceBetween size="m">
      <Header
        variant="h3"
        description="Breakdown"
        actions={<Box color="text-status-inactive">Currency in USD</Box>}
        info={
          <InfoLink
            onFollow={() =>
              loadHelpPanelContent(
                <HelpPanels
                  title="Insider Transactions"
                  des="View the Insider Transactions of the stock by entity or an individual."
                />
              )
            }
          />
        }>
        Insider Transactions ({profile?.netSharePurchaseActivity?.period})
      </Header>
        <div style={{ maxWidth: "550px" }}>
          <ColumnLayout borders="horizontal" columns={2}>
            <Box fontWeight="bold">
              {profile?.netSharePurchaseActivity?.netPercentInsiderShares?.fmt}
            </Box>
            <Box float="left">% of Shares Held by All Insider</Box>
            <Box fontWeight="bold">
              {profile?.netSharePurchaseActivity?.netInfoCount?.fmt}
            </Box>
            <Box>Net Info Count</Box>
            <Box fontWeight="bold">
              {
                profile?.netSharePurchaseActivity?.totalInsiderShares
                  ?.longFmt
              }
            </Box>
            <Box>Total shares Held by Insiders</Box>
            <Box fontWeight="bold">
              {profile?.netSharePurchaseActivity?.buyInfoShares?.longFmt}
            </Box>
            <Box>Number of Buy Insider Shares</Box>
            <Box fontWeight="bold">
              {profile?.netSharePurchaseActivity?.buyPercentInsiderShares?.fmt}
            </Box>
            <Box>% of Buy Info Shares</Box>
            <Box fontWeight="bold">
              {profile?.netSharePurchaseActivity?.sellInfoCount?.longFmt}
            </Box>
            <Box>Number of Sell Info Count</Box>
            <Box fontWeight="bold">
              {profile?.netSharePurchaseActivity?.sellInfoShares?.longFmt}
            </Box>
            <Box>Number of Sell Info Shares</Box>
            <Box fontWeight="bold">
              {profile?.netSharePurchaseActivity?.sellPercentInsiderShares?.fmt}
            </Box>
            <Box>% of Sell Insider Shares</Box>
            <Box fontWeight="bold">
              {profile?.netSharePurchaseActivity?.buyInfoCount?.longFmt}
            </Box>
            <Box>Number of Buy Insider</Box>
            <Box fontWeight="bold">
              {profile?.netSharePurchaseActivity?.netInfoShares?.longFmt}
            </Box>
            <Box>Net Info Shares</Box>
          </ColumnLayout>
        </div>
      <Table
        columnDefinitions={[
          {
            id: "name",
            header: "Insider",
            cell: (item) => item?.filerName || "-",
            sortingField: "name",
          },
          {
            id: "filerRelation",
            header: "Relation",
            cell: (item) => item?.filerRelation || "-",
          },
          {
            id: "transactionText",
            header: "Transaction",
            cell: (item) => item?.transactionText || "-",
          },
          {
            id: "ownership",
            header: "Type",
            cell: (item) => getType(item?.ownership),
          },
          {
            id: "value",
            header: "Value",
            cell: (item) => item?.value?.longFmt || "-",
          },
          {
            id: "startDate",
            header: "Date",
            cell: (item) => item?.startDate?.fmt || "-",
          },
          {
            id: "shares",
            header: "Shares",
            cell: (item) => item?.shares?.longFmt || "-",
          },
          
        ]}
        items={profile?.insiderTransactions?.transactions}
        wrapLines
        stripedRows
        loading={loading}
        loadingText="Loading resources"
        sortingDisabled
        variant="embedded"
        header={
          <Header variant="h3">
            Insider Transactions Reported - Last Two Years
          </Header>
        }
        empty={
          <Box textAlign="center" color="inherit">
            <b>No resources</b>
            <Box padding={{ bottom: "s" }} variant="p" color="inherit">
              No resources to display.
            </Box>
          </Box>
        }
      />
    </SpaceBetween>
  );
};

function Holders(props) {
  const [selectedId, setSelectedId] = React.useState("seg-1");
  console.log(selectedId);
  return (
    <SpaceBetween size="m">
      <SegmentedControl
        selectedId={selectedId}
        onChange={({ detail }) => setSelectedId(detail.selectedId)}
        label="Default segmented control"
        options={[
          { text: "Major Holders", id: "seg-1" },
          { text: "Insider Roster", id: "seg-2" },
          { text: "Insider Transaction", id: "seg-3" },
        ]}
      />
      {selectedId == "seg-1" && (
        <Content_1
          profile={props.profile}
          loadHelpPanelContent={props.loadHelpPanelContent}
          loading={props.loading}
        />
      )}
      {selectedId == "seg-2" && (
        <Content_2
          profile={props.profile}
          loadHelpPanelContent={props.loadHelpPanelContent}
          loading={props.loading}
        />
      )}
      {selectedId == "seg-3" && (
        <Content_3
          profile={props.profile}
          loadHelpPanelContent={props.loadHelpPanelContent}
          loading={props.loading}
        />
      )}
    </SpaceBetween>
  );
}

export default Holders;
