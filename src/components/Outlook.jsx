import {
  FormField,
  Container,
  Box,
  Header,
  SpaceBetween,
  ColumnLayout,
} from '@cloudscape-design/components';
import React from 'react';
import { InfoLink, HelpPanels } from '../components/common/InfoLink';
import axios from 'axios';
import { key, host } from '../../api';
const BASE_URL = 'https://yh-finance.p.rapidapi.com/stock/get-company-outlook?';
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
  }, []);
  console.log(outlook);
  return (
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
          }
        >
          Outlook
        </Header>
      }
    >
      <SpaceBetween size="m">
        <SpaceBetween size="xs">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              borderBottom: '1px solid gray',
            }}
          >
            <FormField label="Innovation Performance">
              <Box fontWeight="bold">{outlook?.innovations?.text}</Box>
            </FormField>
            <FormField label="Sector Avg">
              <Box fontWeight="bold">
                {outlook?.innovations?.sectorAvg.toFixed(2)}
              </Box>
            </FormField>
            <FormField label="Score">
              <Box fontWeight="bold">{outlook?.innovations?.score}</Box>
            </FormField>
          </div>
        </SpaceBetween>
      </SpaceBetween>
    </Container>
  );
}

export default Outlook;
