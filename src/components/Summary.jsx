import React from "react";
import {
  ColumnLayout,
  SpaceBetween,
  Box,
  Grid,
  Header,
  CollectionPreferences,
} from "@cloudscape-design/components";
import {summaryContentDisplay, summaryVisibleContent} from './common/Preference.js'
import { Graph, BarGraph } from "./Graph";
import Article from "./Article";
import Movers from "./Movers";
import Table from "./Table";
import UpgradeDowngrade from "./UpgradeDowngrade";
import CompanyProfile from "./CompanyProfile";
import Outlook from "./Outlook";

const Data = (props) => {
  const {
    summary = props?.profile?.summaryDetail,
    earnings = props?.profile?.earnings,
    profile = props.profile,
  } = props;

  const [preferences, setPreferences] = React.useState({
    visibleContentPreference: {
      options: summaryVisibleContent
    },
    contentDisplayPreference: {
      options: summaryContentDisplay 
    },
  });
  
  const getOptionData = (optionId) => {
    // Your logic to retrieve option data
    return (summary && summary[optionId]?.fmt) || '-';
  }

  return (
    <SpaceBetween size="s">
      <Header
        variant="h3"
        actions={
          <CollectionPreferences
          onConfirm={(updatedPreferences) => setPreferences({ ...preferences, ...updatedPreferences })}
            cancelLabel="Cancel"
            confirmLabel="Apply"
            title="Preferences"
            preferences={preferences}
            visibleContentPreference={preferences.visibleContentPreference}
            contentDisplayPreference={preferences.contentDisplayPreference}
          />
        }>
        Key Statistics
      </Header>
      <ColumnLayout columns={2} variant="text-grid">
        {preferences.visibleContentPreference.options.map((group) => (
          <React.Fragment key={group.label}>
            {group.options.map((option) => (
              <span key={option.id}>
                {preferences.contentDisplayPreference.options.some(
                  (displayOption) => displayOption.id === option.id
                ) && (
                  <React.Fragment>
                    <Box float="left" color="text-body-secondary" fontWeight="bold">
                      {option.label}
                    </Box>
                    <Box float="right" fontWeight="bold">
                      {/* Render relevant data based on option.id */}
                      {getOptionData(option.id)}
                    </Box>
                  </React.Fragment>
                )}
              </span>
            ))}
          </React.Fragment>
        ))}
        
      </ColumnLayout>
    </SpaceBetween>
  );
};
const NewsSection = (props) => {
  return <Article {...props} />;
};
function Summary(props) {
  return (
    <SpaceBetween size="m">
      <ColumnLayout columns={2} variant="text-grid">
        <Data {...props} />
        <Graph {...props} />
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
