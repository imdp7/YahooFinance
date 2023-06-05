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
  Link,
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
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { key, host, polygon } from "../../api";
import axios from "axios";
import { InfoLink, HelpPanels } from "../components/common/InfoLink";
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
import Dividends from '../components/Dividends';
import Modals from '../components/common/Modals'
const i18nStrings = {
  overflowMenuTriggerText: "More",
  overflowMenuTitleText: "All",
};
const BASE_URL = "https://yh-finance.p.rapidapi.com/stock/v2/get-summary?";
const KEY_URL = `&region=US&rapidapi-key=${key}&x-rapidapi-host=${host}`;
const RECOMMEND_URL =
  "https://yh-finance.p.rapidapi.com/stock/v2/get-recommendations?";

const Content = ({ symbol, loadHelpPanelContent, handleModalOpen}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customer = useSelector((state) => state.customer);
  const [profile, setProfile] = useState([]);
  const [polygon, setPolygon] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [activeTabId, setActiveTabId] = useState("summary");
  const [loading, setLoading] = useState(false);

  const fetchPolygon = async () => {
    try {
      const res = await axios.get(
        `https://api.polygon.io/v3/reference/tickers/${symbol}?apiKey=${polygon}`
      );
      const data = res.data.results;
      setPolygon(data);
    } catch (error) {
      console.error(error);
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
    const timer = setTimeout(() => setLoading(false), 1000);
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
    dispatch(addToWishlist(symbol));
    // Make API request to add the symbol to the wishlist
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
        }
      })
      .catch((error) => {
        console.error("Error adding item to wishlist:", error);
      });
  };

  const removeItemFromWishlist = (symbol) => {
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
          dispatch(setWishlist(data.wishlist.symbols));
        }
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
    const fetchData = async () => {
      try {
        await Promise.all([fetchProfile(), fetchRecommend()]);

        const savedSymbols =
          JSON.parse(localStorage.getItem("wishlistSymbols")) || [];
        const recentSymbols =
          JSON.parse(localStorage.getItem("recentlyVisitedSymbols")) || [];

        if (savedSymbols.length > 0) {
          dispatch(setWishlistSymbols(savedSymbols));
        } else {
          const response = await fetch(
            `https://rich-blue-chimpanzee-hose.cyclic.app/api/customers/${customer.sub}`
          );
          const data = await response.json();
          if (Array.isArray(data.wishlist.symbols)) {
            dispatch(setWishlistSymbols(data.wishlist.symbols));
          }
        }
        if (recentSymbols) {
          dispatch(addToRecentlyVisited(recentSymbols));
        } else {
          const response = await fetch(
            `https://rich-blue-chimpanzee-hose.cyclic.app/api/customers/${customer.sub}`
          );
          const data = await response.json();
          if (Array.isArray(data.recentlyVisited.symbols)) {
            dispatch(setRecentlyVisitedSymbols(data.recentlyVisited.symbols));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPolygon()
    navigate(`?tabId=${activeTabId}`, { replace: true });
    fetchData();
    addRecentlyVisited(`${symbol}`);
  }, [activeTabId, customer.sub, dispatch, navigate, symbol, polygon]);

  function getIcon(str) {
    if (str === "UP") {
      return (
        <Box textAlign="center">
          <Icon name="caret-up-filled" size="medium" variant="success" />
          <Box>{str}</Box>
        </Box>
      );
    } else if (str === "DOWN") {
      return (
        <Box textAlign="center">
          <Icon name="caret-down-filled" size="medium" variant="error" />
          <Box>{str}</Box>
        </Box>
      );
    } else if (str === "NEUTRAL") {
      return (
        <Box textAlign="center">
          <Icon name="status-pending" size="medium" variant="subtle" />
          <Box>{str}</Box>
        </Box>
      );
    } else {
      return (
        <Box textAlign="center">
          <Box>{str}</Box>
        </Box>
      );
    }
  }

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
              {polygon?.branding?.logo_url && (
                <img
                  src={`${polygon?.branding?.logo_url}?apiKey=${polygon}`}
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
                        onClick={() => removeItemFromWishlist(`${symbol}`)}>
                        Remove from watchlist
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        iconName="heart"
                        iconAlt="watchlist"
                        variant="primary"
                        onClick={() => addItemToWishlist(`${symbol}`)}>
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
            {polygon?.branding?.icon_url && (
              <img
                src={`${polygon?.branding?.icon_url}?apiKey=${polygon}`}
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
          <div>
        {profile?.pageViews && (
            <SpaceBetween size="xl" direction="horizontal">
              <FormField label="Short Term">
                <Box>{getIcon(profile?.pageViews?.shortTermTrend)}</Box>
              </FormField>
              <FormField label="Mid Term">
                <Box>{getIcon(profile?.pageViews?.midTermTrend)}</Box>
              </FormField>
              <FormField label="Long Term">
                <Box>{getIcon(profile?.pageViews?.longTermTrend)}</Box>
              </FormField>
            </SpaceBetween>
            )}
          </div>
        </div>
        <Button onClick={() => handleModalOpen(Dividends, "Dividends History", symbol)}>Dividends</Button>
        </SpaceBetween>
      </Container>
      <Tabs
        onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
        activeTabId={activeTabId}
        variant="container"
        tabs={[
          {
            label: "Summary",
            id: "summary",
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
            label: "Conversation",
            id: "conversation",
            content: "Third tab content area",
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
      topRef.current.scrollIntoView({ behavior: "smooth" });
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

  return (
    <>
      <div id="h" style={{ position: "sticky", top: 0, zIndex: 1002 }}>
        <TopNavigations
          identity={{ href: "#" }}
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
          <ContentLayout header={<Header variant="h3" />}>
            <Content
              symbol={symbol}
              loadHelpPanelContent={loadHelpPanelContent}
              handleModalOpen={handleModalOpen}
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
    </>
  );
}

export default Stock;
