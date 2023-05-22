import React, { useState, useEffect, useRef } from 'react';
import TopNavigations from '../components/TopNavigation';
import {
  AppLayout,
  SpaceBetween,
  Container,
  Header,
  ContentLayout,
  Grid,
  Button,
  Box,
  Link,
  Tabs,
} from '@cloudscape-design/components';
import { useParams, useLocation } from 'react-router-dom';
import { key, host } from '../../api';
import axios from 'axios';
import { InfoLink, HelpPanels } from '../components/common/InfoLink';
import Summary from '../components/Summary';
import Financials from '../components/Financials';
import Profile from '../components/Profile';
import Holders from '../components/Holders';
import Analysis from '../components/Analysis';
import Historical from '../components/Historical';
import Insights from '../components/Insights';
import Options from '../components/Options';
import Statistics from '../components/Statistics';
import Sustainability from '../components/Sustainability';

const i18nStrings = {
  overflowMenuTriggerText: 'More',
  overflowMenuTitleText: 'All',
};
const BASE_URL = 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary?';
const KEY_URL = `&region=US&rapidapi-key=${key}&x-rapidapi-host=${host}`;
const RECOMMEND_URL =
  'https://yh-finance.p.rapidapi.com/stock/v2/get-recommendations?';

const Content = ({ symbol, loadHelpPanelContent }) => {
  const [profile, setProfile] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [activeTabId, setActiveTabId] = useState('first');
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.request(`${BASE_URL}symbol=${symbol}${KEY_URL}`);
      const data = res.data;
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchRecommend = async () => {
    try {
      const res = await axios.get(
        `${RECOMMEND_URL}symbol=${symbol}${KEY_URL}`
      );
      const data = res.data?.finance?.result[0]?.quotes;
      setRecommend(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleRefresh = () => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  };
  useEffect(() => {
    fetchProfile();
    fetchRecommend();
  }, [symbol, loading, recommend, profile]);

  function convertUnixTimestampToTime(unixTimestamp) {
    const dateObj = new Date(unixTimestamp * 1000);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const seconds = dateObj.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <SpaceBetween size="m">
      <Container
        header={
          <Header
            variant="h2"
            info={
              <InfoLink
                onFollow={() =>
                  loadHelpPanelContent(
                    <HelpPanels
                      title="Stock Details"
                      des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                    />
                  )
                }
              />
            }
            description={
              <>
                <SpaceBetween size="s" direction="horizontal">
                  <Box color="text-body-secondary">
                    {profile?.price?.exchangeName}
                  </Box>
                  <Box color="text-body-secondary">
                    {profile?.price?.quoteSourceName}
                  </Box>
                  {profile?.price?.currency && (
                    <Box color="text-body-secondary">
                      {'Currency in'} {profile?.price?.currency}
                    </Box>
                  )}
                </SpaceBetween>
              </>
            }
            actions={
              <Button
                iconName="refresh"
                variant="icon"
                onClick={handleRefresh}
                loading={loading}
              />
            }
          >
            {profile?.quoteType?.longName} ({symbol})
          </Header>
        }
      >
        <SpaceBetween size="xl" direction="horizontal">
          <SpaceBetween size="s">
            <SpaceBetween size="m" direction="horizontal">
              <Box fontSize="heading-xl" fontWeight="bold">
                {profile?.price?.currencySymbol}
                {profile?.price?.regularMarketPrice?.fmt}
              </Box>
              <Box
                fontSize="heading-xl"
                fontWeight="normal"
                color={
                  profile?.price?.regularMarketChange?.fmt < '0'
                    ? 'text-status-error'
                    : 'text-status-success'
                }
              >
                {profile?.price?.regularMarketChange?.fmt}
              </Box>
              <Box
                fontSize="heading-xl"
                fontWeight="normal"
                color={
                  profile?.price?.regularMarketChangePercent?.fmt < '0'
                    ? 'text-status-error'
                    : 'text-status-success'
                }
              >
                {profile?.price?.regularMarketChangePercent?.fmt &&
                  `(${profile?.price?.regularMarketChangePercent?.fmt})`}
              </Box>
            </SpaceBetween>
            <Box color="text-body-secondary">
              As of{' '}
              {convertUnixTimestampToTime(profile?.price?.regularMarketTime)}{' '}
              EDT. Market open.
            </Box>
          </SpaceBetween>
            {profile?.price?.postMarketPrice?.fmt && (
          <SpaceBetween size="s">
            <SpaceBetween size="m" direction="horizontal">
              <Box fontSize="heading-xl" fontWeight="bold">
                {profile?.price?.currencySymbol}
                {profile?.price?.postMarketPrice?.fmt}
              </Box>
              <Box
                fontSize="heading-xl"
                fontWeight="normal"
                color={
                  profile?.price?.postMarketChange?.fmt < '0'
                    ? 'text-status-error'
                    : 'text-status-success'
                }
              >
                {profile?.price?.postMarketChange?.fmt}
              </Box>
              <Box
                fontSize="heading-xl"
                fontWeight="normal"
                color={
                  profile?.price?.postMarketChangePercent?.fmt < '0'
                    ? 'text-status-error'
                    : 'text-status-success'
                }
              >
                {profile?.price?.postMarketChangePercent?.fmt &&
                  `(${profile?.price?.postMarketChangePercent?.fmt})`}
              </Box>
            </SpaceBetween>
            <Box color="text-body-secondary">
              After hours{' '}
              {convertUnixTimestampToTime(profile?.price?.postMarketTime)} EDT.
            </Box>
          </SpaceBetween>
            )}
        </SpaceBetween>
      </Container>
      <Tabs
        onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
        activeTabId={activeTabId}
        variant="container"
        tabs={[
          {
            label: 'Summary',
            id: 'first',
            content: (
              <Summary
                symbol={symbol}
                profile={profile}
                recommend={recommend}
                loadHelpPanelContent={loadHelpPanelContent}
              />
            ),
          },
          {
            label: 'Company Insights',
            id: 'second',
            content: (
              <Insights
                symbol={symbol}
                profile={profile}
                loadHelpPanelContent={loadHelpPanelContent}
              />
            ),
          },
          {
            label: 'Chart',
            id: 'third',
            content: 'Third tab content area',
          },
          {
            label: 'Conversation',
            id: 'fourth',
            content: 'Third tab content area',
          },
          {
            label: 'Statistics',
            id: 'fifth',
            content: (
              <Statistics
                profile={profile}
                symbol={symbol}
                loadHelpPanelContent={loadHelpPanelContent}
              />
            ),
          },
          {
            label: 'Historical Data',
            id: 'sixth',
            content: (
              <Historical
                symbol={symbol}
                profile={profile}
                loadHelpPanelContent={loadHelpPanelContent}
              />
            ),
          },
          {
            label: 'Profile',
            id: 'seventh',
            content: (
              <Profile
                symbol={symbol}
                profile={profile}
                loadHelpPanelContent={loadHelpPanelContent}
              />
            ),
          },
          {
            label: 'Financials',
            id: 'eight',
            content: (
              <Financials
                symbol={symbol}
                loadHelpPanelContent={loadHelpPanelContent}
              />
            ),
          },
          {
            label: 'Analysis',
            id: 'ninth',
            content: (
              <Analysis
                profile={profile}
                symbol={symbol}
                loadHelpPanelContent={loadHelpPanelContent}
              />
            ),
          },
          {
            label: 'Options',
            id: 'tenth',
            content: (
              <Options
                symbol={symbol}
                profile={profile}
                loadHelpPanelContent={loadHelpPanelContent}
              />
            ),
          },
          {
            label: 'Holders',
            id: 'eleventh',
            content: (
              <Holders
                symbol={symbol}
                profile={profile}
                loadHelpPanelContent={loadHelpPanelContent}
              />
            ),
          },
          {
            label: 'Sustainability',
            id: 'twelth',
            content: (
              <Sustainability
                symbol={symbol}
                profile={profile}
                loadHelpPanelContent={loadHelpPanelContent}
              />
            ),
          },
        ]}
      />
    </SpaceBetween>
  );
};

function Stock(props) {
  const { symbol } = useParams();
  const topRef = useRef(null);
  const [tools, setTools] = useState<JSX.Element>();
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const [toolsContent, setToolsContent] = useState();
  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };
  const updateTools = (element: JSX.Element): void => {
    setTools(element);
    setToolsOpen(true);
  };

  useEffect(() => {
    setTimeout(() => {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }, [symbol]);

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
        ref={topRef}
        headerSelector="#h"
        contentType="dashboard"
        toolsOpen={toolsOpen}
        tools={toolsContent}
        navigationHide={true}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        // toolsHide={true}
        content={
          <SpaceBetween size="m">
            <ContentLayout header={<Header variant="h3" />}>
              <Content
                symbol={symbol}
                loadHelpPanelContent={loadHelpPanelContent}
              />
            </ContentLayout>
          </SpaceBetween>
        }
      />
    </>
  );
}

export default Stock;
