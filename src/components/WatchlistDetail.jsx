import React from 'react';
import TopNavigations from '../components/TopNavigation';
import {
  AppLayout,
  SpaceBetween,
  Container,
  Header,
  ContentLayout,
  Button,
  BreadcrumbGroup,
  Grid,
  Badge,
  CollectionPreferences,
  Box,
  Link,
  Tabs,
  Table,
} from '@cloudscape-design/components';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { key, host } from '../../api';
import { useNavigate } from 'react-router-dom';
import { visibleWatchListColumns, watchListPreferences } from './common/Table';
import Card from './common/Card';
const i18nStrings = {
  overflowMenuTriggerText: 'More',
  overflowMenuTitleText: 'All',
};

const BASE_URL =
  'https://yh-finance.p.rapidapi.com/market/get-watchlist-detail?';
const KEY_URL = `&rapidapi-key=${key}&x-rapidapi-host=${host}`;
const PERFORMANCE_URL =
  'https://yh-finance.p.rapidapi.com/market/get-watchlist-performance?';
const AUTOCOMPLETE_URL = 'https://yh-finance.p.rapidapi.com/auto-complete?';
function WatchlistDetail(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [detail, setDetail] = React.useState([]);
  const [performance, setPerformance] = React.useState([]);
  const [complete, setComplete] = React.useState([]);
  const fetchWatchlistDetail = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}userId=${location.state.userId}&pfId=${location.state.pfId}${KEY_URL}`
      );
      const watch = response?.data?.finance?.result[0];
      setDetail(watch);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchPerformance = async () => {
    try {
      const response = await axios.get(
        `${PERFORMANCE_URL}userId=${location.state.userId}&pfId=${location.state.pfId}&symbols=^GSPC${KEY_URL}`
      );
      const performances = response?.data?.finance?.result[0]?.portfolio;
      setPerformance(performances);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchAutoComplete = async () => {
    try {
      const response = await axios.get(
        `${AUTOCOMPLETE_URL}q=${location.state.state.name}${KEY_URL}`
      );
      const auto = response?.data;
      setComplete(auto);
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    fetchWatchlistDetail();
    fetchPerformance();
    fetchAutoComplete();
  }, [performance, complete, detail, location]);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }
  const Content = ({ state, detail }) => {
    const quoteValues =
      detail && detail.quotes ? Object.values(detail.quotes) : [];
    const newArray = quoteValues.map((obj) => obj);
    //     const PerformanceArray = performance
    //       ? Object.values(performance.portfolio).map((obj) => obj)
    //       : [];
    //     console.log(PerformanceArray);
    performance['symbol'] = state.name;
    const performanceArray = [performance];
    const [preferences, setPreferences] = React.useState({
      wrapLines: true,
      contentDensity: false,
      stripedRows: true,
      visibleContent: visibleWatchListColumns,
    });
    const fixedDigit = (str) => str?.toFixed(2);
    return (
      <SpaceBetween size="m">
        <div>
          <div
          //     style={{ backgroundImage: url(state?.originalImageURL) }}
          >
            <div>
              <h1>Welcome to the site</h1>
              <h5>Sign up for free today</h5>
              <Button>Get started</Button>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: state?.description }} />
        </div>
        <Table
          items={performanceArray || []}
          header={<Header variant="h3">Performance</Header>}
          columnDefinitions={[
            {
              id: 'watchlist',
              header: 'Watchlist',
              cell: (e) => e?.symbol || '-',
            },

            {
              id: 'oneDayPercentChange',
              header: 'Change Today',
              cell: (e) => (
                <span
                  style={{
                    color: e.oneDayPercentChange < 0 ? 'red' : 'green',
                  }}
                >
                  {fixedDigit(e?.oneDayPercentChange) || '-'}
                </span>
              ),
            },
            {
              id: 'oneMonthPercentChange',
              header: '1 Month Return',
              cell: (e) => (
                <span
                  style={{
                    color: e.oneMonthPercentChange < 0 ? 'red' : 'green',
                  }}
                >
                  {fixedDigit(e?.oneMonthPercentChange) || '-'}
                </span>
              ),
            },
            {
              id: 'oneYearPercentChange',
              header: '1 Year Return	',
              cell: (e) => (
                <span
                  style={{
                    color: e.oneYearPercentChange < 0 ? 'red' : 'green',
                  }}
                >
                  {fixedDigit(e?.oneYearPercentChange) || '-'}
                </span>
              ),
            },
            {
              id: 'lifetimePercentChange',
              header: 'Total Return',
              cell: (e) => (
                <span
                  style={{
                    color: e.lifetimePercentChange < 0 ? 'red' : 'green',
                  }}
                >
                  {fixedDigit(e?.lifetimePercentChange) || '-'}
                </span>
              ),
            },
          ]}
          loadingText="Loading resources"
          empty={
            <Box textAlign="center" color="inherit">
              <b>No resources</b>
              <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                No resources to display.
              </Box>
            </Box>
          }
        />
        <Table
          items={newArray || []}
          visibleColumns={preferences.visibleContent}
          stripedRows={preferences.stripedRows}
          contentDensity={preferences.contentDensity}
          header={
            <Header variant="h3">
              {location.state.state.symbolCount &&
                `${location.state.state.symbolCount} Symbols`}
            </Header>
          }
          loadingText="Loading resources"
          empty={
            <Box textAlign="center" color="inherit">
              <b>No resources</b>
              <Box padding={{ bottom: 's' }} variant="p" color="inherit">
                No resources to display.
              </Box>
            </Box>
          }
          columnDefinitions={[
            {
              id: 'symbol',
              header: 'Symbol',
              cell: (e) => (
                <Link onFollow={() => navigate(`/stocks/${e.symbol}`)}>
                  {e.symbol}
                </Link>
              ),
            },
            {
              id: 'name',
              header: 'Company Name',
              cell: (e) => e.longName,
            },
            {
              id: 'price',
              header: 'Last Price',
              cell: (e) => e.regularMarketPrice,
            },
            {
              id: 'change',
              header: 'Change',
              cell: (e) => (
                <span
                  style={{
                    color: e.regularMarketChange < 0 ? 'red' : 'green',
                  }}
                >
                  {fixedDigit(e?.regularMarketChange) || '-'}
                </span>
              ),
            },
            {
              id: 'changePer',
              header: 'Change %',
              cell: (e) => (
                <span
                  style={{
                    color: e.regularMarketChangePercent < 0 ? 'red' : 'green',
                  }}
                >
                  {fixedDigit(e?.regularMarketChangePercent) || '-'}
                </span>
              ),
            },
            {
              id: 'marketTime',
              header: 'Market Time',
              cell: (e) => e.regularMarketTime,
            },
            {
              id: 'volume',
              header: 'Volume',
              cell: (e) => e.regularMarketVolume,
            },
            {
              id: 'volume3Month',
              header: 'Avg Vol (3 month)',
              cell: (e) => e.averageDailyVolume3Month,
            },
            {
              id: 'marketCap',
              header: 'Market cap',
              cell: (e) => e.marketCap,
            },
            {
              id: 'region',
              header: 'Region',
              cell: (e) => e.region,
            },
            {
              id: 'quoteType',
              header: 'Quote Type',
              cell: (e) => e.quoteType,
            },
            {
              id: 'quoteSourceName',
              header: 'Quote Source Name',
              cell: (e) => e.quoteSourceName,
            },
            {
              id: 'priceHint',
              header: 'Price Hint',
              cell: (e) => e.priceHint,
            },
            {
              id: 'bid',
              header: 'Bid',
              cell: (e) => e.bid,
            },
            {
              id: 'ask',
              header: 'ask',
              cell: (e) => e.ask,
            },
            {
              id: 'bidSize',
              header: 'Bid Size',
              cell: (e) => e.bidSize,
            },
            {
              id: 'askSize',
              header: 'Ask Size',
              cell: (e) => e.askSize,
            },
            {
              id: 'fullExchangeName',
              header: 'Exchange Name',
              cell: (e) => e.fullExchangeName,
            },
            {
              id: 'averageDailyVolume10Day',
              header: 'Average Daily Volume 10 Day',
              cell: (e) => e.averageDailyVolume10Day,
            },
            {
              id: 'fiftyTwoWeekLowChange',
              header: 'Fifty Two Week Low Change',
              cell: (e) => e.fiftyTwoWeekLowChange,
            },
            {
              id: 'fiftyTwoWeekLowChangePercent',
              header: 'Fifty Two Week Low Change Percent',
              cell: (e) => e.fiftyTwoWeekLowChangePercent,
            },
            {
              id: 'fiftyTwoWeekRange',
              header: 'Fifty Two Week Range',
              cell: (e) => e.fiftyTwoWeekRange,
            },
            {
              id: 'fiftyTwoWeekHighChange',
              header: 'Fifty Two Week High Change',
              cell: (e) => e.fiftyTwoWeekHighChange,
            },
            {
              id: 'fiftyTwoWeekHighChangePercent',
              header: 'Fifty Two Week High Change Percent',
              cell: (e) => e.fiftyTwoWeekHighChangePercent,
            },
            {
              id: 'fiftyTwoWeekLow',
              header: 'Fifty Two Week Low',
              cell: (e) => e.fiftyTwoWeekLow,
            },
            {
              id: 'fiftyTwoWeekHigh',
              header: 'Fifty Two Week High',
              cell: (e) => e.fiftyTwoWeekHigh,
            },
            {
              id: 'dividendDate',
              header: 'Dividend Date',
              cell: (e) => e.dividendDate || '-',
            },
            {
              id: 'trailingPE',
              header: 'Trailing PE',
              cell: (e) => e.trailingPE,
            },
            {
              id: 'twoHundredDayAverageChangePercent',
              header: 'Two Hundred Day Average Change Percent',
              cell: (e) => e.twoHundredDayAverageChangePercent,
            },
            {
              id: 'forwardPE',
              header: 'Forward PE',
              cell: (e) => e.forwardPE,
            },
            {
              id: 'priceToBook',
              header: 'Price To Book',
              cell: (e) => e.priceToBook,
            },
            {
              id: 'exchangeTimezoneName',
              header: 'Exchange Timezone Name',
              cell: (e) => e.exchangeTimezoneName,
            },
            {
              id: 'fiftyDayAverage',
              header: 'Fifty Day Average',
              cell: (e) => e.fiftyDayAverage,
            },
            {
              id: 'fiftyDayAverageChange',
              header: 'Fifty Day Average Change',
              cell: (e) => e.fiftyDayAverageChange,
            },
            {
              id: 'fiftyDayAverageChangePercent',
              header: 'Fifty Day Average Change Percent',
              cell: (e) => e.fiftyDayAverageChangePercent,
            },
            {
              id: 'twoHundredDayAverage',
              header: 'Two Hundred Day Average',
              cell: (e) => e.twoHundredDayAverage,
            },
            {
              id: 'twoHundredDayAverageChange',
              header: 'Two Hundred Day Average Change',
              cell: (e) => e.twoHundredDayAverageChange,
            },
          ]}
          preferences={
            <CollectionPreferences
              title="Preferences"
              confirmLabel="Confirm"
              cancelLabel="Cancel"
              onConfirm={({ detail }) => setPreferences(detail)}
              preferences={preferences}
              wrapLinesPreference={{
                label: 'Wrap lines',
                description: 'Select to see all the text and wrap the lines',
              }}
              stripedRowsPreference={{
                label: 'Striped rows',
                description: 'Select to add alternating shaded rows',
              }}
              contentDensityPreference={{
                label: 'Compact mode',
                description:
                  'Select to display content in a denser, more compact mode',
              }}
              visibleContentPreference={{
                title: 'Select visible content',
                options: [
                  {
                    label: 'Main distribution properties',
                    options: watchListPreferences,
                  },
                ],
              }}
            />
          }
        />
        {complete?.news && (
          <Container header={<Header variant="h3">News</Header>}>
            <SpaceBetween size="m">
              {complete?.news?.map((n) => (
                <Container key={n?.uuid}>
                  <SpaceBetween size="s" direction="vertical">
                    <div>
                      <Box float="right">{n.publisher}</Box>
                      <Link
                        href={n.link}
                        external
                        externalIconAriaLabel="external"
                      >
                        <Box fontSize="heading-m" fontWeight="bold">
                          {n?.title}
                        </Box>
                      </Link>
                    </div>
                    <Grid
                      gridDefinition={[
                        { colspan: 9, push: { s: 3 } },
                        { colspan: 3, pull: { s: 9 } },
                      ]}
                    >
                      <Box>{truncate(n.summary, 400)}</Box>
                      <img
                        src={n?.main_image?.original_url}
                        style={{ maxWidth: '100%' }}
                        alt={n?.reference_id}
                        className="article-image"
                      />
                    </Grid>
                    <SpaceBetween size="m" direction="horizontal">
                      {n.entities &&
                        n?.entities.map((e) => (
                          <div key={e?.term}>
                            <Link href={`/stocks/${getTicker(e)}`}>
                              <Badge className="badge-style" color="blue">
                                {getTicker(e)}
                              </Badge>
                            </Link>
                          </div>
                        ))}
                    </SpaceBetween>
                  </SpaceBetween>
                </Container>
              ))}
            </SpaceBetween>
          </Container>
        )}
        <Card complete={complete?.lists} />
      </SpaceBetween>
    );
  };
  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <TopNavigations
          identity={{ href: '#' }}
          i18nStrings={i18nStrings}
          {...props}
        />
      </div>
      <AppLayout
        headerSelector="#h"
        contentType="wizard"
        navigationHide={true}
        toolsHide={true}
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Explore', href: '/' },
              { text: `${location.state.state.name}`, href: '#' },
            ]}
            ariaLabel="Breadcrumbs"
          />
        }
        content={
          <SpaceBetween size="l">
            <ContentLayout header={<Header variant="h3" />}>
              <Container
                header={
                  <Header
                    variant="h2"
                    description={location.state.state.shortDescription}
                  >
                    {location.state.state.name}
                  </Header>
                }
              >
                <Content detail={detail} state={location.state.state} />
              </Container>
            </ContentLayout>
          </SpaceBetween>
        }
      />
    </>
  );
}

export default WatchlistDetail;
