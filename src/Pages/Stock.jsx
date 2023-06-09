import React, { useState, useEffect, useRef } from "react";
import TopNavigations from "../components/TopNavigation";
import {
  AppLayout,
  SpaceBetween,
  Container,
  Header,
  ContentLayout,
  Icon,
  Button,
  Box,
  Flashbar,
  Tabs,
  FormField,
} from "@cloudscape-design/components";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
  setWishlistSymbols,
  setRecentlyVisitedSymbols,
  addToRecentlyVisited,
} from "../app/actions";
import { useParams, useNavigate } from "react-router-dom";
import { key, host, polygon } from "../../api";
import axios from "axios";
import Summary from "../components/Summary";
import Financials from "../components/Financials";
import Profile from "../components/Profile";
import Holders from "../components/Holders";
import Analysis from "../components/Analysis";
import Historical from "../components/Historical";
import Insights from "../components/Insights";
import Options from "../components/Options";
import Statistics from "../components/Statistics";
import Sustainability from "../components/Sustainability";
import Modals from '../components/common/Modals'
import RecentUpdates from '../components/RecentUpdates';
const i18nStrings = {
  overflowMenuTriggerText: "More",
  overflowMenuTitleText: "All",
};
const BASE_URL = "https://yh-finance.p.rapidapi.com/stock/v2/get-summary?";
const KEY_URL = `&region=US&rapidapi-key=${key}&x-rapidapi-host=${host}`;
const RECOMMEND_URL =
  "https://yh-finance.p.rapidapi.com/stock/v2/get-recommendations?";

const Content = ({ symbol, loadHelpPanelContent, handleModalOpen, onItemsChange, setItems, setLoadings, loadings}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customer = useSelector((state) => state.customer);
  const [profile, setProfile] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [news, setNews] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const observer = useRef();
  const [recommend, setRecommend] = useState([]);
  const [activeTabId, setActiveTabId] = useState("summary");
  const [loading, setLoading] = useState(false);
   const [loadChart, setLoadingChart] = React.useState("finished");
  const [earnings, setEarnings] = React.useState([]);
  const [graphData, setGraphData] = React.useState([]);
  const [range, setRange] = React.useState("1d"); // Track the selected range
  const [interval, setInterval] = React.useState("15m");
  const [isLoading, setIsLoading] = useState(false);


  const ear = {
    method: 'GET',
    url: 'https://yh-finance.p.rapidapi.com/stock/get-earnings',
    params: {
      symbol: symbol,
      region: 'US',
      lang: 'en-US'
    },
    headers: {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
    }
  };

  const chartData = {
    method: 'GET',
    url: 'https://yh-finance.p.rapidapi.com/stock/v3/get-chart',
    params: {
      interval: interval,
      symbol: symbol,
      range: range,
      region: 'US',
      includePrePost: 'false',
      useYfid: 'true',
      includeAdjustedClose: 'true',
    },
    headers: {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
    }
  };

  const fetchChart = async () => {
    try {
      setLoadingChart("loading");
      const response = await axios.request(chartData);
      const data = response?.data?.chart?.result[0];
      setGraphData(data);
      setLoadingChart("finished");
    } catch (e) {
      console.log(e);
      setLoadingChart("error");
    }
  };

  const fetchEarnings = async () => {
    try {
      setLoadingChart("loading");
      const response = await axios.request(ear);
      const data = response?.data?.quoteSummary?.result[0]?.earnings;
      setEarnings(data);
      setLoadingChart("finished");
    } catch (e) {
      console.log(e);
      setLoadingChart("error");
    }
  };
  const fetchPolygon = async () => {
    try {
      const res = await axios.get(
        `https://api.polygon.io/v3/reference/tickers/${symbol}?apiKey=${polygon}`, {mode:'cors'}
      );
      const data = res.data.results;
      setPolygons(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNews = async (url) => {
    try {
      setIsLoading(true);
      const res = await axios.get(url);
      const data = res.data?.results;
      setNews((prevNews) => [...prevNews, ...data]);
      setNextUrl(res.data?.next_url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && nextUrl && !isLoading) {
      fetchNews(nextUrl);
    }
  };
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}symbol=${symbol}${KEY_URL}`);
      const data = res.data;
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecommend = async () => {
    try {
      const res = await axios.get(`${RECOMMEND_URL}symbol=${symbol}${KEY_URL}`);
      const data = res.data?.finance?.result[0]?.quotes;
      setRecommend(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      fetchData();
    }, 1000);
    return () => clearTimeout(timer);
  };
  

  const convertUnixTimestampToTime = (unixTimestamp) => {
    const dateObj = new Date(unixTimestamp * 1000);
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const seconds = dateObj.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const addItemToWishlist = (symbol) => {
    let success = true; // Declare success variable outside the fetch block
    setLoadings(true)
    const newItem = {
      type: success ? "success" : "error",
      content: success ? "Item added to wishlist" : "Failed to add item to wishlist",
      dismissible: true,
      dismissLabel: "Dismiss message",
      onDismiss: () => setItems([]),
      id: `message_${Date.now()}`,
    };
  
    dispatch(addToWishlist(symbol));
  
    fetch(`https://rich-blue-chimpanzee-hose.cyclic.app/api/customers/${customer.sub}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sub: customer.sub,
        symbol,
        email: customer.email,
        email_verified: customer.email_verified,
        recentlyVisited: customer.recentlyVisited,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.wishlist.symbols)) {
          dispatch(setWishlistSymbols(data.wishlist.symbols));
          success = true; // Update the success value based on the API request result
          onItemsChange([newItem]); // Update with an array containing newItem
        }
        setLoadings(false); // Set loading to false after successful API request

      })
      .catch((error) => {
        console.error("Error adding item to wishlist:", error);
      });
  }; 

  const removeItemFromWishlist = (symbol) => {
    let success = true; // Declare success variable outside the fetch block
    setLoadings(true) 
    const newItem = {
      type: success ? "success" : "error",
      content: success ? "Item removed from wishlist" : "Failed to remove item from wishlist",
      dismissible: true,
      dismissLabel: "Dismiss message",
      onDismiss: () => setItems([]),
      id: `message_${Date.now()}`,
    };
    dispatch(removeFromWishlist(symbol));
    // Make API request to remove the symbol from the wishlist
    fetch(`https://rich-blue-chimpanzee-hose.cyclic.app/api/customers/${customer.sub}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sub: customer.sub,
        symbol,
        email: customer.email,
        email_verified: customer.email_verified,
        recentlyVisited: customer.recentlyVisited,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the wishlist in the Redux store with the updated data
        if (Array.isArray(data.wishlist.symbols)) {
          // Check if data.wishlist.symbols is an array
          dispatch(setWishlistSymbols(data.wishlist.symbols));
          success = true; // Set the value based on the success of the API request
          onItemsChange([newItem]); // Update with an array containing newItem
        }
        setLoadings(false); // Set loading to false after successful API request

      })
      .catch((error) => {
        console.error("Error removing item from wishlist:", error);
      });
  };

  const addRecentlyVisited = (symbol) => {
    dispatch(addToRecentlyVisited(symbol));
    // Make API request to remove the symbol from the wishlist
    fetch(`https://rich-blue-chimpanzee-hose.cyclic.app/api/customers/${customer.sub}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sub: customer.sub,
        symbol,
        email: customer.email,
        email_verified: customer.email_verified,
        recentlyVisited: customer.recentlyVisited,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the wishlist in the Redux store with the updated data
        if (Array.isArray(data.recentlyVisited.symbols)) {
          // Check if data.wishlist.symbols is an array
          dispatch(addToRecentlyVisited(data.recentlyVisited.symbols));
        }
      })
      .catch((error) => {
        console.error("Error removing item from wishlist:", error);
      });
  };

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(handleObserver, { threshold: 1 });
    if (nextUrl && !isLoading) observer.current.observe(document.querySelector('.observer-element'));

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [nextUrl]);

  useEffect(() => {
    navigate(`?tabId=${activeTabId}`, { replace: true });
    const initialUrl = `https://api.polygon.io/v2/reference/news?ticker=${symbol}&apiKey=${polygon}`;
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchProfile(),
          fetchRecommend(),
          fetchNews(initialUrl),
          fetchPolygon(),
          fetchEarnings(),
          fetchChart(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const fetchWishlistSymbols = async () => {
      const savedSymbols = JSON.parse(localStorage.getItem("wishlistSymbols")) || [];
  
      if (savedSymbols.length > 0) {
        dispatch(setWishlistSymbols(savedSymbols));
      } else {
        const response = await fetch(
          `https://rich-blue-chimpanzee-hose.cyclic.app/api/customers/${customer.sub}`
        );
        const data = await response.json();
  
        if (Array.isArray(data.wishlist?.symbols)) {
          dispatch(setWishlistSymbols(data?.wishlist?.symbols));
        }
      }
    };
  
    const fetchRecentlyVisitedSymbols = async () => {
      const recentSymbols = JSON.parse(localStorage.getItem("recentlyVisitedSymbols")) || [];
  
      if (recentSymbols.length > 0) {
        dispatch(addToRecentlyVisited(recentSymbols));
      } else {
        const response = await fetch(
          `https://rich-blue-chimpanzee-hose.cyclic.app/api/customers/${customer.sub}`
        );
        const data = await response.json();
  
        if (Array.isArray(data.recentlyVisited?.symbols)) {
          dispatch(setRecentlyVisitedSymbols(data?.recentlyVisited?.symbols));
        }
      }
    };
    document.title = `${profile?.price?.shortName} (${symbol})`
    // addRecentlyVisited(symbol);
    fetchRecentlyVisitedSymbols();
    fetchWishlistSymbols();
    fetchData();
  }, [symbol, loading, profile?.price?.shortName]);

  return (
    <SpaceBetween size="m">
      <Container
        header={
          <Header
            variant="h2"
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
                      {"Currency in"} {profile?.price?.currency}
                    </Box>
                  )}
                  {profile?.price?.marketState && (
                    <Box variant="span">
                      Market State - {profile?.price?.marketState}
                    </Box>
                  )}
                </SpaceBetween>
              </>
            }
            actions={
              <SpaceBetween size="xl" direction="horizontal">
              <div>
              {polygons?.branding?.logo_url && (
                <img
                  src={`${polygons?.branding?.logo_url}?apiKey=${polygon}`}
                  height="50"
                  width="100"
                />
                )}
                </div>
                <div>
                  {Array.isArray(customer.wishlist.symbols) &&
                  customer.wishlist.symbols.includes(symbol) ? (
                    <>
                      <Button
                        iconName="heart"
                        iconAlt="watchlist"
                        onClick={() => removeItemFromWishlist(`${symbol}`)}
                        loading={loadings}>
                        Remove from watchlist
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        iconName="heart"
                        iconAlt="watchlist"
                        variant="primary"
                        onClick={() => addItemToWishlist(`${symbol}`)}
                        loading={loadings}>
                        Add to watchlist
                      </Button>
                    </>
                  )}
                </div>
                <Button
                  iconName="refresh"
                  variant="primary"
                  onClick={handleRefresh}
                  loading={loading}
                />
              </SpaceBetween>
            }>
            <SpaceBetween size="xl" direction="horizontal">
            <div>
            {polygons?.branding?.icon_url && (
              <img
                src={`${polygons?.branding?.icon_url}?apiKey=${polygon}`}
                height="50"
                width="50"
              />
              )}
              </div>
              <div>
                {profile?.quoteType?.longName} ({symbol})
              </div>
            </SpaceBetween>
          </Header>
        }>
        <SpaceBetween size="m">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <SpaceBetween size="xxl" direction="horizontal">
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
                    profile?.price?.regularMarketChange?.fmt < "0"
                      ? "text-status-error"
                      : "text-status-success"
                  }>
                  {profile?.price?.regularMarketChange?.fmt}
                </Box>
                <Box
                  fontSize="heading-xl"
                  fontWeight="normal"
                  color={
                    profile?.price?.regularMarketChangePercent?.fmt < "0"
                      ? "text-status-error"
                      : "text-status-success"
                  }>
                  {profile?.price?.regularMarketChangePercent?.fmt &&
                    `(${profile?.price?.regularMarketChangePercent?.fmt})`}
                </Box>
              </SpaceBetween>
              <Box color="text-body-secondary">
                As of{" "}
                {convertUnixTimestampToTime(profile?.price?.regularMarketTime)}{" "}
                EDT. Market open.
              </Box>
            </SpaceBetween>
            {profile?.price?.pretMarketPrice?.fmt && (
              <SpaceBetween size="s">
                <SpaceBetween size="m" direction="horizontal">
                  <Box fontSize="heading-xl" fontWeight="bold">
                    {profile?.price?.currencySymbol}
                    {profile?.price?.preMarketPrice?.fmt}
                  </Box>
                  <Box
                    fontSize="heading-xl"
                    fontWeight="normal"
                    color={
                      profile?.price?.preMarketChange?.fmt < "0"
                        ? "text-status-error"
                        : "text-status-success"
                    }>
                    {profile?.price?.preMarketChange?.fmt}
                  </Box>
                  <Box
                    fontSize="heading-xl"
                    fontWeight="normal"
                    color={
                      profile?.price?.preMarketChangePercent?.fmt < "0"
                        ? "text-status-error"
                        : "text-status-success"
                    }>
                    {profile?.price?.preMarketChangePercent?.fmt &&
                      `(${profile?.price?.preMarketChangePercent?.fmt})`}
                  </Box>
                </SpaceBetween>
                <Box color="text-body-secondary">
                  After hours{" "}
                  {convertUnixTimestampToTime(profile?.price?.preMarketTime)}{" "}
                  EDT.
                </Box>
              </SpaceBetween>
            )}
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
                      profile?.price?.postMarketChange?.fmt < "0"
                        ? "text-status-error"
                        : "text-status-success"
                    }>
                    {profile?.price?.postMarketChange?.fmt}
                  </Box>
                  <Box
                    fontSize="heading-xl"
                    fontWeight="normal"
                    color={
                      profile?.price?.postMarketChangePercent?.fmt < "0"
                        ? "text-status-error"
                        : "text-status-success"
                    }>
                    {profile?.price?.postMarketChangePercent?.fmt &&
                      `(${profile?.price?.postMarketChangePercent?.fmt})`}
                  </Box>
                </SpaceBetween>
                <Box color="text-body-secondary">
                  After hours{" "}
                  {convertUnixTimestampToTime(profile?.price?.postMarketTime)}{" "}
                  EDT.
                </Box>
              </SpaceBetween>
            )}
          </SpaceBetween>
        </div>
        
        </SpaceBetween>
      </Container>
      <Tabs
        onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
        activeTabId={activeTabId}
        variant="stacked"
        tabs={[
          {
            label: "Summary",
            id: "summary",
            content: (
              <Summary
                symbol={symbol}
                profile={profile}
                recommend={recommend}
                news={news}
                loadHelpPanelContent={loadHelpPanelContent}
                graphData={graphData}
                earning={earnings}
                loadings={loadChart}
                fetchEarnings={fetchEarnings}
                fetchChart={fetchChart}
                setRange={setRange}
                setInterval={setInterval}
                range={range}
                isLoading={isLoading}
                
              />
            ),
          },
          {
            label: "Company Insights",
            id: "company-insights",
            content: (
              <Insights
                symbol={symbol}
                profile={profile}
                loadHelpPanelContent={loadHelpPanelContent}
              />
            ),
          },
          {
            label: "Chart",
            id: "chart",
            content: "Third tab content area",
          },
          {
            label: "Recent Updates",
            id: "recent-updates",
            content: (
              <RecentUpdates
                profile={profile}
                symbol={symbol}
                loadHelpPanelContent={loadHelpPanelContent}
                loading={loading}
                setLoading={setLoading}
              />
            ),
          },
          {
            label: "Statistics",
            id: "statistics",
            content: (
              <Statistics
                profile={profile}
                symbol={symbol}
                loadHelpPanelContent={loadHelpPanelContent}
              />
            ),
          },
          {
            label: "Historical Data",
            id: "historical-data",
            content: (
              <Historical
                symbol={symbol}
                profile={profile}
                loadHelpPanelContent={loadHelpPanelContent}
              />
            ),
          },
          {
            label: "Profile",
            id: "profile",
            content: (
              <Profile
                symbol={symbol}
                profile={profile}
                loadHelpPanelContent={loadHelpPanelContent}
              />
            ),
          },
          {
            label: "Financials",
            id: "financials",
            content: (
              <Financials
                symbol={symbol}
                loadHelpPanelContent={loadHelpPanelContent}
              />
            ),
          },
          {
            label: "Analysis",
            id: "analysis",
            content: (
              <Analysis
                profile={profile}
                symbol={symbol}
                loadHelpPanelContent={loadHelpPanelContent}
              />
            ),
          },
          {
            label: "Options",
            id: "options",
            content: (
              <Options
                symbol={symbol}
                profile={profile}
                loadHelpPanelContent={loadHelpPanelContent}
              />
            ),
          },
          {
            label: "Holders",
            id: "holders",
            content: (
              <Holders
                symbol={symbol}
                profile={profile}
                loadHelpPanelContent={loadHelpPanelContent}
                loading={loading}
              />
            ),
          },
          {
            label: "Sustainability",
            id: "sustainability",
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
  const [tools, setTools] = useState();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolsContent, setToolsContent] = useState();
  const [items, setItems] = React.useState([]);
  const [loadings, setLoadings] = React.useState(false);

  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };
  const updateTools = (element) => {
    setTools(element);
    setToolsOpen(true);
  };

  const [modalState, setModalState] = React.useState({
    visible: false,
    modalTitle: null,
    modalComp: null,
  });

  useEffect(() => {
    setTimeout(() => {
      if (topRef.current !== null) {
        topRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  }, [symbol]);

  const handleModalOpen = (Component, title, symbol) => {
    setModalState((prevState) => ({
      ...prevState,
      modalComp: Component,
      visible: true,
      modalTitle: title,
      symbol: symbol
    }));
  };
  const onItemsChange = (newItems) => {
    setItems(newItems);
  };

  return (
    <div ref={topRef}>
      <div id="h" style={{ position: "sticky", top: 0, zIndex: 1002 }}>
        <TopNavigations
          identity={{ href: "#" }}
          i18nStrings={i18nStrings}
          {...props}
        />
      </div>
      <AppLayout
        headerSelector="#h"
        contentType="dashboard"
        toolsOpen={toolsOpen}
        tools={toolsContent}
        navigationHide={true}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        notifications={<Flashbar items={loadings ? [{ type: "success", content: "Pending Operation...", loading: {loadings}, }] : items} />}
        content={
          
          <ContentLayout header={<Header variant="h3" />}>
            <Content
              symbol={symbol}
              loadHelpPanelContent={loadHelpPanelContent}
              handleModalOpen={handleModalOpen}
              onItemsChange={onItemsChange}
              setItems={setItems}
              setLoadings={setLoadings}
              loadings={loadings}
            />
          </ContentLayout>
        }
      />
      {modalState.visible && (
              <Modals
                visible={modalState.visible}
                setVisible={setModalState}
                Component={modalState.modalComp}
                title={modalState.modalTitle}
                symbol={modalState.symbol}
              />
            )}
    </div>
  );
}

export default Stock;
