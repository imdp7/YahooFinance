import {
  Container,
  Box,
  Header,
  SpaceBetween,
  Badge,
} from "@cloudscape-design/components";
import React from "react";
import { InfoLink, HelpPanels } from "../components/common/InfoLink";
import axios from "axios";
import { key, host } from "../../api";
const BASE_URL = "https://yh-finance.p.rapidapi.com/stock/get-company-outlook?";
const KEY_URL = `&region=US&lang=en-US&rapidapi-key=${key}&x-rapidapi-host=${host}`;

function Outlook(props) {
  const [outlook, setOutlook] = React.useState([]);

  const fetchOutlook = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}symbol=${props.symbol}${KEY_URL}`
      );
      const d = response?.data?.finance?.result;
      setOutlook(d);
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    fetchOutlook();
  }, [outlook]);
  return (
    <div>
      {outlook && (
        <Container
          header={
            <Header
              variant="h3"
              info={
                <InfoLink
                  onFollow={() =>
                    props.loadHelpPanelContent(
                      <HelpPanels
                        title="Company Outlook"
                        des="View the summary profile of the company and its information (i.e, metadata)."
                      />
                    )
                  }
                />
              }>
              Outlook
            </Header>
          }>
          <SpaceBetween size="m">
            {outlook?.significantDevelopments?.map((develop) => (
              <div key={develop?.id}>
              <SpaceBetween size="xs">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <Box fontWeight="bold">{develop?.headline}</Box>
                  <Box float="right">{develop?.date}</Box>
                </div>
                <Badge color="blue">{develop.symbol}</Badge>
                </SpaceBetween>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}>
              <div
                style={{
                  flexBasis: "50%",
                  textAlign: "center",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "10px",
                }}>
                <Box color="text-body-secondary">Innovation Performance</Box>
                <Box fontWeight="bold">{outlook?.innovations?.text}</Box>
              </div>
              <div
                style={{
                  flexBasis: "50%",
                  textAlign: "center",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "10px",
                }}>
                <Box color="text-body-secondary">Sector Avg</Box>
                <Box fontWeight="bold">
                  {outlook?.innovations?.sectorAvg?.toFixed(2)}
                </Box>
              </div>
              <div
                style={{
                  flexBasis: "50%",
                  textAlign: "center",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "10px",
                }}>
                <Box color="text-body-secondary">Score</Box>
                <Box fontWeight="bold">{outlook?.innovations?.score}</Box>
              </div>
              <div
                style={{
                  flexBasis: "50%",
                  textAlign: "center",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "10px",
                }}>
                <Box color="text-body-secondary">Innovation Trend</Box>
                <Box fontWeight="bold">
                  {outlook?.companyOutlookSummary?.innovationTrend}
                </Box>
              </div>
              <div
                style={{
                  flexBasis: "50%",
                  textAlign: "center",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "10px",
                }}>
                <Box color="text-body-secondary">Innovation Score</Box>
                <Box fontWeight="bold">
                  {outlook?.companyOutlookSummary?.innovationScore}
                </Box>
              </div>
              <div
                style={{
                  flexBasis: "50%",
                  textAlign: "center",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "10px",
                }}>
                <Box color="text-body-secondary">Innovation Performance</Box>
                <Box fontWeight="bold">
                  {outlook?.companyOutlookSummary?.innovationPerformance}
                </Box>
              </div>
            </div>
          </SpaceBetween>
        </Container>
      )}
    </div>
  );
}

export default Outlook;
