import React from "react";
import axios from "axios";
import { key, host } from "../../api";

import { convertUnixTimestamp } from "./Historical";
import {
  Container,
  SpaceBetween,
  Header,
  Box,
  Table,
  Button,
  Select,
} from "@cloudscape-design/components";

function Options(props) {
  const [options, setOptions] = React.useState([]);
  const [type, setType] = React.useState("call");
  const [selectedOption, setSelectedOption] = React.useState(""); // Initialize as null
  const [expirationDates, setExpirationDates] = React.useState([]); // Declare expirationDates state
  const [loading, setLoading] = React.useState(false);

  const fetchOptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${props.symbol}&contract_type=${type}&limit=1000&order=asc&sort=expiration_date&apiKey=tNspjXd0liysppgjJpI0ELqEjWWT6MoE`
      );
      const datas = response?.data?.results;
      // Extract expiration dates from options and set as options for Select component
      const expirationDates = Array.from(
        new Set(datas.map((option) => option.expiration_date))
      ).map((date) => {
        return {
          label: date,
          value: date,
        };
      });
      setOptions(datas);
      setExpirationDates(expirationDates); // Update expirationDates state
      setSelectedOption(expirationDates[0]); // Set the default selected option
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    fetchOptions();
  }, [props.symbol, type]);

  const capital = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };
  return (
    <SpaceBetween size="m">
      <SpaceBetween size="m" direction="horizontal">
        <Button
          variant={type === "call" ? "primary" : "link"}
          onClick={() => setType("call")}>
          Call
        </Button>
        <Button
          variant={type === "put" ? "primary" : "link"}
          onClick={() => setType("put")}>
          Put
        </Button>
        <Select
          selectedOption={selectedOption}
          onChange={({ detail }) => setSelectedOption(detail.selectedOption)}
          options={expirationDates} // Use expirationDates as the options for Select
          selectedAriaLabel="Selected"
        />
      </SpaceBetween>
      <Table
        columnDefinitions={[
          {
            id: "ticker",
            header: "Contract Name",
            cell: (item) => <Box fontWeight="bold"> {item.ticker}</Box>,
            sortingField: "ticker",
          },
          {
            id: "contract_type",
            header: "Type",
            cell: (item) => capital(item.contract_type) || "-",
          },
          {
            id: "strike_price",
            header: "Strike Price",
            cell: (item) => item.strike_price || "-",
          },
          {
            id: "expiration_date",
            header: "Expiration Date",
            cell: (item) => item.expiration_date || "-",
          },
          {
            id: "shares_per_contract",
            header: "Shares Per Contract",
            cell: (item) => item.shares_per_contract || "-",
          },
          {
            id: "primary_exchange",
            header: "Primary Exchange",
            cell: (item) => item.primary_exchange || "-",
          },
        ]}
        items={options.filter((item) => item.expiration_date === selectedOption.value) || []}
        wrapLines
        stripedRows
        loading={loading}
        loadingText="Loading resources"
        sortingDisabled
        variant="embedded"
        header={
          <Header variant="h3">{`${capital(type)} for ${
            selectedOption.label
          }`}</Header>
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
}

export default Options;
