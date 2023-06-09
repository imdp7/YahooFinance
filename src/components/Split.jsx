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
function Split({symbol}) {

  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState([]);

  React.useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.polygon.io/v3/reference/splits?ticker=${symbol}&apiKey=${polygon}`
        );
        const s = response?.data?.results;
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
          id: "execution_date",
          header: "Execution Date",
          cell: (item) => item?.execution_date || "-",
        },
        {
          id: "split_from",
          header: "Split From",
          cell: (item) => item?.split_from || "-",
        },
        {
          id: "split_to",
          header: "Split To",
          cell: (item) => item?.split_to || "-",
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

export default Split;
