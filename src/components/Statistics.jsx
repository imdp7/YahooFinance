import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { key, host } from '../../api';
import {
  ColumnLayout,
  Container,
  Header,
  Box,
  SpaceBetween,
} from '@cloudscape-design/components';
import { InfoLink, HelpPanels } from '../components/common/InfoLink';
const BASE_URL = 'https://yh-finance.p.rapidapi.com/stock/v4/get-statistics?';
const KEY_URL = `&region=US&lang=en-US&rapidapi-key=${key}&x-rapidapi-host=${host}`;

function Statistics({ symbol, profile, loadHelpPanelContent }) {
  const [statistics, setStatistics] = useState([]);
  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`${BASE_URL}symbol=${symbol}${KEY_URL}`);
      const stat =
        response?.data?.quoteSummary?.result[0]?.defaultKeyStatistics;
      setStatistics(stat);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchStatistics();
  }, []);
  return (
    <SpaceBetween size="m" direction="horizontal">
      <ColumnLayout columns={2} borders="horizontal">
        <Container
          header={
            <Header
              variant="h2"
              info={
                <InfoLink
                  onFollow={() =>
                    loadHelpPanelContent(
                      <HelpPanels
                        title="Financial Highlights"
                        des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                      />
                    )
                  }
                />
              }
            >
              Financial Highlights
            </Header>
          }
        >
          <SpaceBetween size="m">
            <Box fontSize="heading-m" fontWeight="bold">
              Fiscal Year
            </Box>
            <ColumnLayout columns={2} borders="horizontal">
              <Box>Fiscal Year Ends</Box>
              <Box variant="awsui-key-label">
                {statistics?.lastFiscalYearEnd?.fmt}
              </Box>
              <Box>Most recent Quarter</Box>
              <Box variant="awsui-key-label">
                {statistics?.mostRecentQuarter?.fmt}
              </Box>
            </ColumnLayout>
            <Box fontSize="heading-m" fontWeight="bold">
              Profitability
            </Box>
            <ColumnLayout columns={2} borders="horizontal">
              <Box>Profit Margin</Box>
              <Box variant="awsui-key-label">
                {profile?.financialData?.profitMargins?.fmt}
              </Box>
              <Box>Operating Margin (ttm)</Box>
              <Box variant="awsui-key-label">
                {profile?.financialData?.operatingMargins?.fmt}
              </Box>
            </ColumnLayout>
            <Box fontSize="heading-m" fontWeight="bold">
              Management Effectiveness
            </Box>
            <ColumnLayout columns={2} borders="horizontal">
              <Box>Return on Assets (ttm)</Box>
              <Box variant="awsui-key-label">
                {profile?.financialData?.returnOnAssets?.fmt}
              </Box>
              <Box>Return on Equity (ttm)</Box>
              <Box variant="awsui-key-label">
                {profile?.financialData?.returnOnEquity?.fmt}
              </Box>
            </ColumnLayout>
            <Box fontSize="heading-m" fontWeight="bold">
              Income Statement
            </Box>
            <ColumnLayout columns={2} borders="horizontal">
              <Box>Revenue (ttm)</Box>
              <Box variant="awsui-key-label">
                {profile?.financialData?.totalRevenue?.fmt}
              </Box>
              <Box>Revenue Per Share (ttm)</Box>
              <Box variant="awsui-key-label">
                {profile?.financialData?.revenuePerShare?.fmt}
              </Box>
              <Box>Quarterly Revenue Growth (yoy)</Box>
              <Box variant="awsui-key-label">
                {profile?.financialData?.revenueGrowth?.fmt}
              </Box>
              <Box>Gross Profit (ttm)</Box>
              <Box variant="awsui-key-label">
                {profile?.financialData?.grossProfits?.fmt}
              </Box>
              <Box>EBITDA</Box>
              <Box variant="awsui-key-label">
                {profile?.financialData?.ebitda?.fmt}
              </Box>
              <Box>Net Income Avi to Common (ttm)</Box>
              <Box variant="awsui-key-label">
                {profile?.defaultKeyStatistics?.netIncomeToCommon?.fmt}
              </Box>
              <Box>Diluted EPS (ttm)</Box>
              <Box variant="awsui-key-label">
                {profile?.defaultKeyStatistics?.trailingEps?.fmt}
              </Box>
              <Box>Quarterly Earnings Growth (yoy)</Box>
              <Box variant="awsui-key-label">
                {profile?.defaultKeyStatistics?.earningsQuarterlyGrowth?.fmt}
              </Box>
            </ColumnLayout>
            <Box fontSize="heading-m" fontWeight="bold">
              Balance Sheet
            </Box>
            <ColumnLayout columns={2} borders="horizontal">
              <Box>Total Cash (mrq)</Box>
              <Box variant="awsui-key-label">
                {profile?.financialData?.totalCash?.fmt}
              </Box>
              <Box>Total Cash Per Share (mrq)</Box>
              <Box variant="awsui-key-label">
                {profile?.financialData?.totalCashPerShare?.fmt}
              </Box>
              <Box>Total Debt (mrq)</Box>
              <Box variant="awsui-key-label">
                {profile?.financialData?.totalDebt?.fmt}
              </Box>
              <Box>Total Debt/Equity (mrq)</Box>
              <Box variant="awsui-key-label">
                {profile?.financialData?.debtToEquity?.fmt}
              </Box>
              <Box>Current Ratio (mrq)</Box>
              <Box variant="awsui-key-label">
                {profile?.financialData?.currentRatio?.fmt}
              </Box>
              <Box>Book Value Per Share (mrq)</Box>
              <Box variant="awsui-key-label">
                {profile?.defaultKeyStatistics?.bookValue?.fmt}
              </Box>
            </ColumnLayout>
            <Box fontSize="heading-m" fontWeight="bold">
              Cash Flow Statement
            </Box>
            <ColumnLayout columns={2} borders="horizontal">
              <Box>Operating Cash Flow (ttm)</Box>
              <Box variant="awsui-key-label">
                {profile?.financialData?.operatingCashflow?.fmt}
              </Box>
              <Box>Levered Free Cash Flow (ttm)</Box>
              <Box variant="awsui-key-label">
                {profile?.financialData?.freeCashflow?.fmt}
              </Box>
            </ColumnLayout>
          </SpaceBetween>
        </Container>
        <Container
          header={
            <Header
              variant="h2"
              info={
                <InfoLink
                  onFollow={() =>
                    loadHelpPanelContent(
                      <HelpPanels
                        title="Trading Information"
                        des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                      />
                    )
                  }
                />
              }
            >
              Trading Information
            </Header>
          }
        >
          <SpaceBetween size="m">
            <Box fontSize="heading-m" fontWeight="bold">
              Stock Price History
            </Box>
            <ColumnLayout columns={2} borders="horizontal">
              <Box>Stock Price History</Box>
              <Box variant="awsui-key-label">
                {profile?.summaryDetail?.beta?.fmt}
              </Box>
              <Box>52-Week Change</Box>
              <Box variant="awsui-key-label">
                {/* {profile?.defaultKeyStatistics?.52WeekChange?.fmt} */}
              </Box>
              <Box>S&P500 52-Week Change</Box>
              <Box variant="awsui-key-label">
                {profile?.defaultKeyStatistics?.SandP52WeekChange?.fmt}
              </Box>
              <Box>52 Week High</Box>
              <Box variant="awsui-key-label">
                {profile?.summaryDetail?.fiftyTwoWeekHigh?.fmt}
              </Box>
              <Box>52 Week Low</Box>
              <Box variant="awsui-key-label">
                {profile?.summaryDetail?.fiftyTwoWeekLow?.fmt}
              </Box>
              <Box>50-Day Moving Average</Box>
              <Box variant="awsui-key-label">
                {profile?.summaryDetail?.fiftyDayAverage?.fmt}
              </Box>
              <Box>200-Day Moving Average</Box>
              <Box variant="awsui-key-label">
                {profile?.summaryDetail?.twoHundredDayAverage?.fmt}
              </Box>
            </ColumnLayout>
            <Box fontSize="heading-m" fontWeight="bold">
              Share Statistics
            </Box>
            <ColumnLayout columns={2} borders="horizontal">
              <Box>Avg Vol (3 month)</Box>
              <Box variant="awsui-key-label">
                {profile?.price?.averageDailyVolume3Month?.fmt}
              </Box>
              <Box>Avg Vol (10 day)</Box>
              <Box variant="awsui-key-label">
                {profile?.price?.averageDailyVolume10Day?.fmt}
              </Box>
              <Box>Shares Outstanding</Box>
              <Box variant="awsui-key-label">
                {profile?.defaultKeyStatistics?.sharesOutstanding?.fmt}
              </Box>
              <Box>Implied Shares Outstanding</Box>
              <Box variant="awsui-key-label">
                {profile?.defaultKeyStatistics?.impliedSharesOutstanding?.fmt ||
                  'N/A'}
              </Box>
              <Box>Float</Box>
              <Box variant="awsui-key-label">
                {profile?.defaultKeyStatistics?.floatShares?.fmt}
              </Box>
              <Box>% Held by Insiders</Box>
              <Box variant="awsui-key-label">
                {profile?.majorHoldersBreakdown?.insidersPercentHeld?.fmt}
              </Box>
              <Box>% Held by Institutions</Box>
              <Box variant="awsui-key-label">
                {profile?.majorHoldersBreakdown?.institutionsPercentHeld?.fmt}
              </Box>
              <Box>
                Shares Short (
                {profile?.defaultKeyStatistics?.dateShortInterest?.fmt})
              </Box>
              <Box variant="awsui-key-label">
                {profile?.defaultKeyStatistics?.sharesShort?.fmt}
              </Box>
              <Box>
                Short Ratio (
                {profile?.defaultKeyStatistics?.dateShortInterest?.fmt})
              </Box>
              <Box variant="awsui-key-label">
                {profile?.defaultKeyStatistics?.shortRatio?.fmt}
              </Box>
              <Box>
                Short % of Float (
                {profile?.defaultKeyStatistics?.dateShortInterest?.fmt})
              </Box>
              <Box variant="awsui-key-label">
                {profile?.defaultKeyStatistics?.shortPercentOfFloat?.fmt}
              </Box>
              <Box>
                Short % of Shares Outstanding (
                {profile?.defaultKeyStatistics?.dateShortInterest?.fmt})
              </Box>
              <Box variant="awsui-key-label">
                {profile?.defaultKeyStatistics?.shortPercentOfFloat?.fmt}
              </Box>
              <Box>Shares Short</Box>
              <Box variant="awsui-key-label">
                {profile?.defaultKeyStatistics?.sharesShortPriorMonth?.fmt}
              </Box>
            </ColumnLayout>
            <Box fontSize="heading-m" fontWeight="bold">
              Dividends & Splits
            </Box>
            <ColumnLayout columns={2} borders="horizontal">
              <Box>Forward Annual Dividend Rate</Box>
              <Box variant="awsui-key-label">
                {profile?.summaryDetail?.dividendRate?.fmt || 'N/A'}
              </Box>
              <Box>Forward Annual Dividend Yield</Box>
              <Box variant="awsui-key-label">
                {profile?.summaryDetail?.dividendYield?.fmt || 'N/A'}
              </Box>
              <Box>Trailing Annual Dividend Rate</Box>
              <Box variant="awsui-key-label">
                {profile?.summaryDetail?.trailingAnnualDividendRate?.fmt ||
                  'N/A'}
              </Box>
              <Box>Trailing Annual Dividend Yield</Box>
              <Box variant="awsui-key-label">
                {profile?.summaryDetail?.trailingAnnualDividendYield?.fmt ||
                  'N/A'}
              </Box>
              <Box>5 Year Average Dividend Yield</Box>
              <Box variant="awsui-key-label">
                {profile?.summaryDetail?.fiveYearAvgDividendYield?.fmt || 'N/A'}
              </Box>
              <Box>Payout Ratio</Box>
              <Box variant="awsui-key-label">
                {profile?.summaryDetail?.payoutRatio?.fmt || 'N/A'}
              </Box>
              <Box>Dividend Date</Box>
              <Box variant="awsui-key-label">
                {profile?.defaultKeyStatistics?.lastDividendDate?.fmt || 'N/A'}
              </Box>
              <Box>Ex-Dividend Date</Box>
              <Box variant="awsui-key-label">
                {profile?.defaultKeyStatistics?.exDividendDate?.fmt || 'N/A'}
              </Box>
              <Box>Last Split Factor</Box>
              <Box variant="awsui-key-label">
                {profile?.defaultKeyStatistics?.lastSplitFactor || 'N/A'}
              </Box>
              <Box>Last Split Date</Box>
              <Box variant="awsui-key-label">
                {profile?.defaultKeyStatistics?.lastDividendDate?.fmt || 'N/A'}
              </Box>
            </ColumnLayout>
          </SpaceBetween>
        </Container>
      </ColumnLayout>
    </SpaceBetween>
  );
}

export default Statistics;
