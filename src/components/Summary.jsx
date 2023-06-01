import React from 'react';
import {
  ColumnLayout,
  SpaceBetween,
  Box,
  Grid,
} from '@cloudscape-design/components';
import { Graph, BarGraph } from './Graph';
import Article from './Article';
import Movers from './Movers';
import Table from './Table';
import UpgradeDowngrade from './UpgradeDowngrade';
import CompanyProfile from './CompanyProfile';
import Outlook from './Outlook';

const Data = (props) => {
  const {
    summary = props?.profile?.summaryDetail,
    earnings = props?.profile?.earnings,
    profile = props.profile,
  } = props;

  return (
    <SpaceBetween size="s">
      <ColumnLayout columns={2} variant="text-grid">
        <span>
          <Box float="left" color="text-body-secondary">
            Previous Close
          </Box>
          <Box float="right" fontWeight="bold">
            {summary?.regularMarketPreviousClose?.fmt
              ? summary?.regularMarketPreviousClose?.fmt
              : '-'}
          </Box>
        </span>
        <span>
          <Box float="left" color="text-body-secondary">
            Market Cap
          </Box>
          <Box float="right" fontWeight="bold">
            {summary?.marketCap?.fmt ? summary?.marketCap?.fmt : '-'}
          </Box>
        </span>
        <span>
          <Box float="left" color="text-body-secondary">
            Open
          </Box>
          <Box float="right" fontWeight="bold">
            {summary?.regularMarketOpen?.fmt
              ? summary?.regularMarketOpen?.fmt
              : '-'}
          </Box>
        </span>
        <span>
          <Box float="left" color="text-body-secondary">
            Beta (5Y Monthly)
          </Box>
          <Box float="right" fontWeight="bold">
            {summary?.beta?.fmt ? summary?.beta?.fmt : '-'}
          </Box>
        </span>
        <span>
          <Box float="left" color="text-body-secondary">
            Bid
          </Box>
          <Box float="right" fontWeight="bold">
            {summary?.bid?.fmt ? (
              <>
                {summary?.bid?.fmt} {'x'} {summary?.bidSize?.raw}{' '}
              </>
            ) : (
              '-'
            )}
          </Box>
        </span>
        <span>
          <Box float="left" color="text-body-secondary">
            PE Ratio (TTM)
          </Box>
          <Box float="right" fontWeight="bold">
            {summary?.payoutRatio?.fmt ? summary?.payoutRatio?.fmt : '-'}
          </Box>
        </span>
        <span>
          <Box float="left" color="text-body-secondary">
            Ask
          </Box>
          <Box float="right" fontWeight="bold">
            {summary?.ask?.fmt ? (
              <>
                {summary?.ask?.fmt} x {summary?.askSize?.raw}
              </>
            ) : (
              '-'
            )}
          </Box>
        </span>
        <span>
          <Box float="left" color="text-body-secondary">
            EPS (TTM)
          </Box>
          <Box float="right" fontWeight="bold">
            {profile?.defaultKeyStatistics?.trailingEps?.fmt
              ? profile?.defaultKeyStatistics?.trailingEps?.fmt
              : '-'}
          </Box>
        </span>
        <span>
          <Box float="left" color="text-body-secondary">
            Day's Range
          </Box>
          <Box float="right" fontWeight="bold">
            {summary?.dayLow?.fmt ? (
              <>
                {summary?.dayLow?.fmt} - {summary?.dayHigh?.fmt}
              </>
            ) : (
              '-'
            )}
          </Box>
        </span>
        <span>
          <Box float="left" color="text-body-secondary">
            Earnings Date
          </Box>
          <Box float="right" fontWeight="bold">
            {earnings?.earningsDate?.fmt ? earnings?.earningsDate?.fmt : '-'}
          </Box>
        </span>
        <span>
          <Box float="left" color="text-body-secondary">
            52 Week Range
          </Box>
          <Box float="right" fontWeight="bold">
            {summary?.fiftyTwoWeekLow?.fmt ? (
              <>
                {summary?.fiftyTwoWeekLow?.fmt} -{' '}
                {summary?.fiftyTwoWeekHigh?.fmt}
              </>
            ) : (
              '-'
            )}
          </Box>
        </span>
        <span>
          <Box float="left" color="text-body-secondary">
            Forward Dividend & Yield
          </Box>
          <Box float="right" fontWeight="bold">
            {summary?.dividendYield?.fmt ? summary?.dividendYield?.fmt : '-'}
          </Box>
        </span>
        <span>
          <Box float="left" color="text-body-secondary">
            Volume
          </Box>
          <Box float="right" fontWeight="bold">
            {summary?.volume?.longFmt ? summary?.volume?.longFmt : '-'}
          </Box>
        </span>
        <span>
          <Box float="left" color="text-body-secondary">
            Ex Dividend Date
          </Box>
          <Box float="right" fontWeight="bold">
            {summary?.exDividendDate?.fmt ? summary?.exDividendDate?.fmt : '-'}
          </Box>
        </span>
        <span>
          <Box float="left" color="text-body-secondary">
            Avg. Volume
          </Box>
          <Box float="right" fontWeight="bold">
            {summary?.averageVolume?.fmt ? summary?.averageVolume?.fmt : '-'}
          </Box>
        </span>
        <span>
          <Box float="left" color="text-body-secondary">
            1y Target Est
          </Box>
          <Box float="right" fontWeight="bold">
            {profile?.financialData?.targetMeanPrice?.fmt
              ? profile?.financialData?.targetMeanPrice?.fmt
              : '-'}
          </Box>
        </span>
      </ColumnLayout>
    </SpaceBetween>
  );
};
const NewsSection = ({ symbol }) => {
  return <Article category={`${symbol}`} />;
};
function Summary(props) {
  return (
    <SpaceBetween size="m">
      <ColumnLayout columns={2} variant="text-grid">
        <Data {...props} />
        <Graph {...props} />
      </ColumnLayout>
      <Grid
        gridDefinition={[
          { colspan: { l: 8, m: 8, default: 12 } },
          { colspan: { l: 4, m: 4, default: 12 } },
          { colspan: { l: 4, m: 4, default: 12 } },
          { colspan: { l: 4, m: 4, default: 12 } },
          { colspan: { l: 4, m: 4, default: 12 } },
          { colspan: { l: 4, m: 4, default: 12 } },
        ]}
      >
        <NewsSection
          {...props}
          loadHelpPanelContent={props.loadHelpPanelContent}
        />
        <SpaceBetween size="m">
          <Table
            header="Recommended Stocks"
            data={props.recommend}
            loadHelpPanelContent={props.loadHelpPanelContent}
          />
          <BarGraph
            {...props}
            loadHelpPanelContent={props.loadHelpPanelContent}
          />
          {/* <BarGraph
            {...props}
            loadHelpPanelContent={props.loadHelpPanelContent}
          /> */}
          <Outlook
            {...props}
            loadHelpPanelContent={props.loadHelpPanelContent}
          />
          <UpgradeDowngrade
            {...props}
            loadHelpPanelContent={props.loadHelpPanelContent}
          />
          <CompanyProfile
            {...props}
            loadHelpPanelContent={props.loadHelpPanelContent}
          />
        </SpaceBetween>
      </Grid>
    </SpaceBetween>
  );
}

export default Summary;
