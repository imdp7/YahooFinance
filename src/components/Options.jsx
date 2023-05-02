import React from 'react';
import axios from 'axios';
import { key, host } from '../../api';

import { convertUnixTimestamp } from './Historical';
import {
  Container,
  SpaceBetween,
  Box,
  Table,
} from '@cloudscape-design/components';

const KEY_URL = `&region=US&lang=en-US&rapidapi-key=${key}&x-rapidapi-host=${host}`;
function Options(props) {
  const [options, setOptions] = React.useState([]);
  const fetchOptions = async () => {
    try {
      const response = await axios.get(
        `https://yh-finance.p.rapidapi.com/stock/v3/get-options?symbol=${props.symbol}&straddle=true${KEY_URL}`
      );
      const datas = response?.data?.optionChain?.result[0];
      setOptions(datas);
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    fetchOptions();
  }, [props.symbol]);
  return (
    <SpaceBetween size="m">
      <Table
        columnDefinitions={[
          {
            id: 'date',
            header: 'Date',
            cell: (item) => (
              <Box fontWeight="bold"> {convertUnixTimestamp(item) || '-'}</Box>
            ),
            sortingField: 'name',
          },
          //   {
          //     id: 'date',
          //     header: 'Expiration Dates',
          //     cell: (item) => item || '-',
          //   },
          {
            id: 'strike',
            header: 'Strike',
            cell: (item) => item || '-',
          },
        ]}
        items={options?.strikes || options?.expirationDates}
        wrapLines
        stripedRows
        loadingText="Loading resources"
        sortingDisabled
        variant="embedded"
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
  );
}

export default Options;
