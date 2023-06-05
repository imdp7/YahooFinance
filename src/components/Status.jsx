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
function Status() {
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState([]);
  const [locale, setLocale] = React.useState("us");

  React.useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.polygon.io/v3/reference/exchanges?locale=${locale}&apiKey=tNspjXd0liysppgjJpI0ELqEjWWT6MoE`
        );
        const s = response?.data?.results;
        setStatus(s);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchStatus();
  }, [locale]);

  const capital = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };
  return (
    <Table
      columnDefinitions={[
        {
          id: "type",
          header: "Type",
          cell: (item) => capital(item?.type) || "-",
        },
        {
          id: "name",
          header: "Name",
          cell: (item) => item?.name || "-",
        },
        {
          id: "asset_class",
          header: "Asset Class",
          cell: (item) => capital(item?.asset_class) || "-",
        },
        {
          id: "acronym",
          header: "Acronym",
          cell: (item) => item?.acronym || "-",
        },
        {
          id: "mic",
          header: "Mic",
          cell: (item) => item?.mic || "-",
        },
        {
          id: "url",
          header: "Url",
          cell: (item) =>
            (
              <Link
                external
                href={item?.url}
                externalIconAriaLabel="Opens in a new tab"
              >Link</Link>
            ) || "-",
        },
      ]}
      items={status || []}
      loading={loading}
      header={
        <Header
          actions={
            <SpaceBetween size="m" direction="horizontal">
              <Button
                variant={locale === "us" ? "primary" : "link"}
                onClick={() => setLocale("us")}>
                US
              </Button>
              <Button
                variant={locale === "global" ? "primary" : "link"}
                onClick={() => setLocale("global")}>
                Global
              </Button>
            </SpaceBetween>
          }
        />
      }
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

export default Status;
