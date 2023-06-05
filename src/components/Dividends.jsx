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
function Dividends({symbol}) {
  console.log(symbol)
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState([]);

  React.useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.polygon.io/v3/reference/dividends?ticker=${symbol}&apiKey=tNspjXd0liysppgjJpI0ELqEjWWT6MoE`
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
          id: "declaration_date",
          header: "Declaration Date",
          cell: (item) => item?.declaration_date || "-",
        },
        {
          id: "ex_dividend_date",
          header: "ex-Dividend Date",
          cell: (item) => item?.ex_dividend_date || "-",
        },
        {
          id: "frequency",
          header: "Frequency",
          cell: (item) => item?.frequency || "-",
        },
        {
          id: "pay_date",
          header: "Pay Date",
          cell: (item) => item?.pay_date || "-",
        },
        {
          id: "record_date",
          header: "Record Date",
          cell: (item) => item?.record_date || "-",
        },
        {
          id: "cash_amount",
          header: "Cash Amount",
          cell: (item) => item?.cash_amount || "-",
        },
        {
          id: "dividend_type",
          header: "Dividend Type",
          cell: (item) => item?.dividend_type || "-",
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

export default Dividends;
