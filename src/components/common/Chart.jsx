import React from 'react';
import { AreaChart, Box, Button } from '@cloudscape-design/components';
function Chart({ data }) {
  return (
    <AreaChart
      series={[
        {
          title: "",
          type: "area",
          data: [
            { x: new Date(1601006400000), y: 10413 },
            { x: new Date(1601007300000), y: 26582 },
            { x: new Date(1601008200000), y: 45593 },
            { x: new Date(1601009100000), y: 65918 },
            { x: new Date(1601010000000), y: 76223 },
            { x: new Date(1601010900000), y: 62385 },
            { x: new Date(1601011800000), y: 83330 },
            { x: new Date(1601012700000), y: 127209 },
            { x: new Date(1601013600000), y: 104802 },
            { x: new Date(1601014500000), y: 145899 },
            { x: new Date(1601015400000), y: 121375 },
            { x: new Date(1601016300000), y: 112968 },
            { x: new Date(1601017200000), y: 145263 },
            { x: new Date(1601018100000), y: 139562 },
            { x: new Date(1601019000000), y: 128343 },
            { x: new Date(1601019900000), y: 122774 },
            { x: new Date(1601020800000), y: 145396 },
            { x: new Date(1601021700000), y: 176509 },
            { x: new Date(1601022600000), y: 201006 },
            { x: new Date(1601023500000), y: 196538 },
            { x: new Date(1601024400000), y: 213773 },
            { x: new Date(1601025300000), y: 205076 },
            { x: new Date(1601026200000), y: 216369 },
            { x: new Date(1601027100000), y: 159386 },
            { x: new Date(1601028000000), y: 238852 },
            { x: new Date(1601028900000), y: 207500 },
            { x: new Date(1601029800000), y: 187110 },
            { x: new Date(1601030700000), y: 314165 },
            { x: new Date(1601031600000), y: 165653 },
            { x: new Date(1601032500000), y: 175584 },
            { x: new Date(1601033400000), y: 230042 },
            { x: new Date(1601034300000), y: 293879 }
          ],
          valueFormatter: function l(e) {
            return Math.abs(e) >= 1e9
              ? (e / 1e9).toFixed(1).replace(/\.0$/, "") +
                  "G"
              : Math.abs(e) >= 1e6
              ? (e / 1e6).toFixed(1).replace(/\.0$/, "") +
                "M"
              : Math.abs(e) >= 1e3
              ? (e / 1e3).toFixed(1).replace(/\.0$/, "") +
                "K"
              : e.toFixed(2);
          }
        }
      ]}
      xDomain={[
        new Date(1601006400000),
        new Date(1601034300000)
      ]}
      yDomain={[0, 500000]}
      i18nStrings={{
        detailPopoverDismissAriaLabel: "Dismiss",
        chartAriaRoleDescription: "line chart",
        xTickFormatter: e =>
          e
            .toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: !1
            })
            .split(",")
            .join("\n"),
        yTickFormatter: function l(e) {
          return Math.abs(e) >= 1e9
            ? (e / 1e9).toFixed(1).replace(/\.0$/, "") +
                "G"
            : Math.abs(e) >= 1e6
            ? (e / 1e6).toFixed(1).replace(/\.0$/, "") +
              "M"
            : Math.abs(e) >= 1e3
            ? (e / 1e3).toFixed(1).replace(/\.0$/, "") +
              "K"
            : e.toFixed(2);
        }
      }}
      ariaLabel="Stacked area chart"
      errorText="Error loading data."
      height={25}
      hideFilter
      hideLegend
      loadingText="Loading chart"
      recoveryText="Retry"
      xScaleType="time"
      xTitle=""
      yTitle=""
      empty={
        <Box textAlign="center" color="inherit">
          <b>No data available</b>
          <Box variant="p" color="inherit">
            There is no data available
          </Box>
        </Box>
      }
    />
  );
}

export default Chart;
