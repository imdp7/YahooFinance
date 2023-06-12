import React from "react";
import axios from "axios";
import { key, host } from "../../api";
import {
  Container,
  SpaceBetween,
  Header,
  ColumnLayout,
  Link,
  Box,
  Table,
  Button,
  Pagination,
  CollectionPreferences,
} from "@cloudscape-design/components";
import { useCollection } from "@cloudscape-design/collection-hooks";
import {
  getMatchesCountText,
  paginationLabels,
  collectionPreferencesProps,
} from "../common/table-config";
import { convertUnixTimestamp, upgdngDefinitions } from "./common/Table";
import { BarGraph } from "./Graph";
import { InfoLink, HelpPanels } from "../components/common/InfoLink";

function RecentUpdates({ symbol, loadHelpPanelContent }) {
  const options = {
    method: "GET",
    url: "https://yh-finance.p.rapidapi.com/stock/get-recent-updates",
    params: {
      symbol: symbol,
      region: "US",
      lang: "en-US",
    },
    headers: {
      "X-RapidAPI-Key": key,
      "X-RapidAPI-Host": host,
    },
  };
  const [updates, setUpdates] = React.useState([]);
  const [filings, setFilings] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [preferences, setPreferences] = React.useState({
    pageSize: 20,
    visibleContent: [
      "epochGradeDate",
      "firm",
      "toGrade",
      "fromGrade",
    ],
  });
  const { items, actions, collectionProps, paginationProps } = useCollection(
    updates,
    {
      pagination: { pageSize: preferences.pageSize },
    }
  );
  React.useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        const response = await axios.request(options);
        const data = response.data?.quoteSummary?.result[0];
        setUpdates(data?.upgradeDowngradeHistory?.history);
        setFilings(data?.secFilings?.filings);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUpdates();
  }, [symbol]);

  return (
    <SpaceBetween size="m">
      <Header
        variant="h3"
        info={
          <InfoLink
            onFollow={() =>
              loadHelpPanelContent(
                <HelpPanels title="Earnings" des="View the Earnings" />
              )
            }
          />
        }>
        Earnings
      </Header>
      <ColumnLayout columns={2}></ColumnLayout>
      <Table
        {...collectionProps}
        items={items}
        columnDefinitions={upgdngDefinitions}
        visibleColumns={preferences.visibleContent}
        header={
          <Header
            variant="h3"
            counter={`(${updates?.length})`}
            info={
              <InfoLink
                onFollow={() =>
                  loadHelpPanelContent(
                    <HelpPanels
                      title="Upgrade & Downgrade"
                      des="View the summary profile of the company and its information (i.e, metadata)."
                    />
                  )
                }
              />
            }>
            Upgrade & Downgrade
          </Header>
        }
        pagination={<Pagination {...paginationProps} />}
        loading={loading}
        stripedRows
        loadingText="Loading resources"
        variant="embedded"
        preferences={
          <CollectionPreferences
            {...collectionPreferencesProps}
            visibleContentPreference={{
              title: "Select visible content",
              options: [
                {
                  label: "Main properties",
                  options: upgdngDefinitions.map(({ id, header }) => ({
                    id,
                    label: header,
                    editable: id !== "id",
                  })),
                },
              ],
            }}
            preferences={preferences}
            onConfirm={({ detail }) => setPreferences(detail)}
          />
        }
      />
      <Header
        variant="h3"
        counter={`(${filings?.length})`}
        info={
          <InfoLink
            onFollow={() =>
              loadHelpPanelContent(
                <HelpPanels
                  title="Filings"
                  des="View the summary profile of the company and its information (i.e, metadata)."
                />
              )
            }
          />
        }>
        Filings
      </Header>
      {filings?.map((filing, idx) => (
        <div key={idx}>
          <SpaceBetween size="m">
            <Container
              header={
                <Header
                  variant="h3"
                  description={
                    <Box fontSize="body-m">Type - {filing?.type}</Box>
                  }
                  actions={
                    <SpaceBetween size="m" direction="horizontal">
                      <Box fontWeight="bold">{filing?.date}</Box>
                      <Box fontWeight="bold">
                        {convertUnixTimestamp(filing?.epochDate)}
                      </Box>
                    </SpaceBetween>
                  }>
                  <Link fontSize="heading-s" external href={filing?.edgarUrl}>
                    {filing?.title}
                  </Link>
                </Header>
              }>
              <SpaceBetween size="l" direction="horizontal">
                {filing?.exhibits.map((exb, inx) => (
                  <div key={idx}>
                    <Link external href={exb?.url}>
                      {exb?.type}
                    </Link>
                  </div>
                ))}
              </SpaceBetween>
            </Container>
          </SpaceBetween>
        </div>
      ))}
    </SpaceBetween>
  );
}

export default RecentUpdates;
