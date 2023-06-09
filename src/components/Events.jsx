import React from "react";
import axios from "axios";
import {
  Table,
  Box,
  Link,
  Header,
  Button,
  SpaceBetween,
} from "@cloudscape-design/components";
import {polygon} from '../../api'
function Events({symbol}) {

  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState([]);

  React.useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.polygon.io/vX/reference/tickers/${symbol}/events?apiKey=${polygon}`
        );
        const s = response?.data?.results?.events;
        setStatus(s);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchStatus();
  }, [symbol]);

  const capital = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };
  return (
    <Table
      columnDefinitions={[
        {
          id: "ticker_change",
          header: "Ticker Change",
          cell: (item) => item?.ticker_change.ticker || "-",
        },
        {
          id: "type",
          header: "Type",
          cell: (item) => item?.type || "-",
        },
        {
          id: "date",
          header: "Date",
          cell: (item) => item?.date || "-",
        },
      ]}
      items={status || []}
      loading={loading}
      empty={
        <Box textAlign="center" color="inherit">
          <b>No Data</b>
          <Box padding={{ bottom: "s" }} variant="p" color="inherit">
            No resources to display.
          </Box>
        </Box>
      }
    />
  );
}

export default Events;
