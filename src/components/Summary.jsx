import React, { useState } from "react";
import axios from  'axios';
import { key, host } from "../../api";
import {
  ColumnLayout,
  SpaceBetween,
  Box,
  Grid,
  Header,
  CollectionPreferences,
  FormField,
  Icon,
} from "@cloudscape-design/components";
import {
  summaryContentDisplay,
  summaryVisibleContent,
} from "./common/Preference.js";
import { InfoLink, HelpPanels } from "../components/common/InfoLink";
import { Graph, BarGraph } from "./Graph";
import Article from "./Article";
import Movers from "./Movers";
import Table from "./Table";
import UpgradeDowngrade from "./UpgradeDowngrade";
import CompanyProfile from "./CompanyProfile";
import Outlook from "./Outlook";
import { useCollection } from "@cloudscape-design/collection-hooks";
import {
  getMatchesCountText,
  paginationLabels,
  collectionPreferencesProps,
} from "../common/table-config";

const KEY_URL = `&region=US&rapidapi-key=${key}&x-rapidapi-host=${host}`;

const Data = (props) => {
  const {
    summary = props?.profile?.summaryDetail,
    earnings = props?.profile?.earnings,
    profile = props.profile,
  } = props;

  const [preferences, setPreferences] = useState({
    visibleContentPreference: summaryVisibleContent,
    contentDisplayPreference: summaryContentDisplay,
  });

  const { items, actions, collectionProps, paginationProps } = useCollection(
    summary,
    {}
  );

  const getOptionData = (optionId) => {
    // Your logic to retrieve option data
    return (summary && summary[optionId]?.fmt) || "-";
  };

  const handleContentDisplayChange = (selectedOptions) => {
    const filteredOptions = summaryVisibleContent.filter((content) =>
      selectedOptions.some((option) => option.id === content.id)
    );
    setFilteredContentDisplay(filteredOptions);
  };

  const [filteredContentDisplay, setFilteredContentDisplay] = useState(
    summaryContentDisplay
  );

  return (
    <SpaceBetween size="s">
      <Header
        variant="h3"
        info={
          <InfoLink
            onFollow={() =>
              props.loadHelpPanelContent(
                <HelpPanels
                  title="Key Statistics"
                  des="View the summary profile of the company and its information (i.e, metadata)."
                />
              )
            }
          />
        }
        actions={
          <CollectionPreferences
            title="Preferences"
            confirmLabel="Confirm"
            cancelLabel="Cancel"
            visibleContentPreference={{
              title: "Select visible content",
              options: [
                {
                  label: "Main properties",
                  options: summaryContentDisplay.map(({ id, label }) => ({
                    id,
                    label,
                    editable: id !== "id",
                  })),
                },
              ],
            }}
            contentDisplayPreference={preferences.summaryContentDisplay}
            preferences={preferences}
            onConfirm={({ detail }) => {
              setPreferences(detail);
              handleContentDisplayChange(detail.visibleContentPreference);
            }}
          />
        }>
        Key Statistics
      </Header>
      <ColumnLayout columns={2} variant="text-grid">
        {filteredContentDisplay.map((content) => (
          <span key={content.id}>
            <React.Fragment>
              <Box float="left" color="text-body-secondary" fontWeight="bold">
                {content.label}
              </Box>
              <Box float="right" fontWeight="bold">
                {/* Render relevant data based on content.id */}
                {getOptionData(content.id)}
              </Box>
            </React.Fragment>
          </span>
        ))}
      </ColumnLayout>
    </SpaceBetween>
  );
};

function getIcon(str) {
  if (str === "UP") {
    return (
      <Box textAlign="center">
        <Icon name="caret-up-filled" size="medium" variant="success" />
        <Box>{str}</Box>
      </Box>
    );
  } else if (str === "DOWN") {
    return (
      <Box textAlign="center">
        <Icon name="caret-down-filled" size="medium" variant="error" />
        <Box>{str}</Box>
      </Box>
    );
  } else if (str === "NEUTRAL") {
    return (
      <Box textAlign="center">
        <Icon name="status-pending" size="medium" variant="subtle" />
        <Box>{str}</Box>
      </Box>
    );
  } else {
    return (
      <Box textAlign="center">
        <Box>{str}</Box>
      </Box>
    );
  }
}

const NewsSection = (props) => {
  return <Article {...props} />;
};
function Summary(props) {

  const [insights, setInsights] = React.useState([])
  const fetchInsights = async () => {
    try {
      const response = await axios.get(
        `https://yh-finance.p.rapidapi.com/stock/v3/get-insights?symbol=${props.symbol}${KEY_URL}`
      );
      const datas = response?.data?.finance?.result;
      setInsights(datas);
      console.log(insights)
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    fetchInsights();
  }, [props.symbol]);

  return (
    <SpaceBetween size="m">
      <ColumnLayout columns={2} variant="text-grid">
        <Data {...props} />
        <SpaceBetween size="m">
          <Graph {...props} />
          <ColumnLayout columns={2} variant="text-grid">
            <div>
              <Header
                variant="h3"
                info={
                  <InfoLink
                    onFollow={() =>
                      props.loadHelpPanelContent(
                        <HelpPanels
                          title="Fair Value recommendation of the stock"
                          des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                        />
                      )
                    }
                  />
                }>
                Price Target
              </Header>
              <ColumnLayout columns={3} variant="text-grid">
                <FormField label="Target Price">
                <Box fontWeight="bold">
                  {insights?.recommendation?.targetPrice || "N/A"}
                  </Box>
                </FormField>
                <FormField label="Provider">
                  {insights?.recommendation?.provider || "N/A"}
                </FormField>
                <FormField label="Rating">
                <Box color={insights?.recommendation?.rating === "BUY" ?  "text-status-success" : "text-status-warning"} fontWeight="bold">
                  {insights?.recommendation?.rating || "N/A"}
                  </Box>
                </FormField>
              </ColumnLayout>
            </div>
            {props.profile?.pageViews && (
              <div>
                <Header
                  variant="h3"
                  info={
                    <InfoLink
                      onFollow={() =>
                        props.loadHelpPanelContent(
                          <HelpPanels
                            title="Page Views"
                            des="View the summary profile of the company and its information (i.e, metadata)."
                          />
                        )
                      }
                    />
                  }>
                  Page Views
                </Header>
                <SpaceBetween size="m">
                <SpaceBetween size="l" direction="horizontal">
                  <FormField label="Short Term">
                    <Box>
                      {getIcon(props?.profile?.pageViews?.shortTermTrend)}
                    </Box>
                  </FormField>
                  <FormField label="Mid Term">
                    <Box>
                      {getIcon(props?.profile?.pageViews?.midTermTrend)}
                    </Box>
                  </FormField>
                  <FormField label="Long Term">
                    <Box>
                      {getIcon(props?.profile?.pageViews?.longTermTrend)}
                    </Box>
                  </FormField>
                </SpaceBetween>
                <Box color="text-status-inactive">Page viewed by people in short term, intermediate and long term.</Box>
                </SpaceBetween>
              </div>
            )}
          </ColumnLayout>
        </SpaceBetween>
      </ColumnLayout>
      <Grid
        gridDefinition={[
          { colspan: { l: 8, m: 8, default: 12 } },
          { colspan: { l: 4, m: 4, default: 12 } },
          { colspan: { l: 4, m: 4, default: 12 } },
          { colspan: { l: 4, m: 4, default: 12 } },
          { colspan: { l: 4, m: 4, default: 12 } },
          { colspan: { l: 4, m: 4, default: 12 } },
        ]}>
        <NewsSection {...props} />
        <SpaceBetween size="m">
          <Table header="Recommended Stocks" data={props.recommend} />
          <BarGraph {...props} />
          <Outlook {...props} />
          <UpgradeDowngrade {...props} />
          <CompanyProfile {...props} />
        </SpaceBetween>
      </Grid>
    </SpaceBetween>
  );
}

export default Summary;
