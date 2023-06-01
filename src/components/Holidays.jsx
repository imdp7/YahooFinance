import React from "react";
import axios from 'axios'
import {Table, Box} from '@cloudscape-design/components'
function MarketHolidays() {
  const [loading, setLoading] = React.useState(false);
  const [holidays, setHolidays] = React.useState([]);

  React.useEffect(() => {
	setLoading(true)
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(
          "https://api.polygon.io/v1/marketstatus/upcoming?apiKey=tNspjXd0liysppgjJpI0ELqEjWWT6MoE"
        );
        const sum = response?.data;
        setHolidays(sum);
        console.log(holidays);
      } catch (e) {
        console.log(e);
      }
    };

    fetchHolidays();
    setLoading(false)
  }, []);
  return (
    <Table
      columnDefinitions={[
        {
          id: "date",
          header: "Date",
          cell: (item) => item?.date || "-",
        },
        {
          id: "exchange",
          header: "Exchange",
          cell: (item) => item?.exchange || "-",
        },
        {
          id: "name",
          header: "Name",
          cell: (item) => (
		<Box fontWeight="bold">

		{item?.name || "-"}
		</Box>
	  ),
        },
        {
          id: "status",
          header: "Status",
          cell: (item) => item?.status || "-",
        },
        {
          id: "open",
          header: "Open",
          cell: (item) => item?.open || "-",
        },
      ]}
      items={holidays || []}
      loadingText="Loading Resources"
      loading={loading}
    />
  );
}

export default MarketHolidays;
