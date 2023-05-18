import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "./App.css";
import {
  Box,
  ColumnLayout,
  Container,
  Link,
  Header,
  LinkProps,
  Alert,
  AppLayout,
  SpaceBetween,
  Grid,
  Button,
  Spinner,
  Icon,
  ButtonDropdown,
  ContentLayout,
  ExpandableSection,
} from "@cloudscape-design/components";
import { useOutletContext } from "react-router";
import { InfoLink, ValueWithLabel } from "./features/common/common";
import { appLayoutLabels } from "./features/common/labels";
import { AppFooter } from "./features/common/AppFooter";
import CommonHeader from "./components/common/CommonHeader";
import Package from "./components/common/Package";
import Analysis from "./components/common/Analysis";
import Subscriber from "./components/common/Subscriber";

const HomeFeatures = ({ loadHelpPanelContent }): JSX.Element => {
  const [visible, setVisible] = useState(true);

  const navigate = useNavigate();

  const defaultOnFollowHandler = (
    event: CustomEvent<LinkProps.FollowDetail>
  ): void => {
    navigate(event.detail.href as string);
    event.preventDefault();
  };
  const updateTools = useOutletContext<(element: JSX.Element) => void>();
  const items1 = [
    {
      text: "Research reports from Morningstar & Argus§",
      key: "0",
      color: true,
      description:
        "Access professional reports with quality independent research.",
    },
    {
      text: "Enhanced charting with auto pattern recognition",
      key: "1",
      color: true,
      description:
        "Instantly identify chart patterns through automated pattern recognition.",
    },
    {
      text: "Historical financials & statistics with CSV export",
      key: "2",
      color: true,
      description:
        "Use reliable and transparent fundamental data to help make informed investment decisions.",
    },
    {
      text: "Unique company insights on leading indicators",
      key: "3",
      color: true,
      description:
        "Get a comprehensive overview of key alternative data sets with intuitive visualizations.",
    },
    {
      text: "Market Digest newsletter",
      key: "4",
      color: true,
      description:
        "Stay up-to-date with expert analysis on emerging market news and research, delivered to your inbox.",
    },
    {
      text: "Daily trade ideas based on your interests",
      key: "5",
      description:
        "Discover new trade ideas that are trending or relevant to the companies you follow.",
    },
    {
      text: "Fair value analysis for stocks",
      key: "6",
      description:
        "Learn whether a stock matches the Peter Lynch valuation in an intuitive interface.",
    },
    {
      text: "Advanced portfolio performance analysis tools",
      key: "7",
      description:
        "Get premium tools to analyze allocation, diversification and risk.",
    },
    {
      text: "Yahoo Finance community insights",
      key: "8",
      description:
        "See what tickers are trending on Yahoo Finance in terms of user visits, conversations and portfolio changes.",
    },
    {
      text: "Enhanced alerts",
      key: "9",
      description:
        "Get alerted whenever new research reports, analyst ratings, trade ideas, SEC filings and technical patterns are available for the companies you follow.",
    },
    {
      text: "Live chat support on desktop",
      key: "10",
      description:
        "Chat with a live agent about Finance-related questions/concerns 8 AM - 9 PM ET Monday through Friday.",
    },
    {
      text: "Ad-free Yahoo†",
      key: "11",
      description: "Enjoy your favorite Yahoo sites and apps without the ads.",
    },
    {
      text: "24/7 Account Support",
      key: "12",
      description:
        "24/7 phone support for general Yahoo account support inquiries, including billing, account recovery and updating account information.",
    },
    {
      text: "Buy More. Save More.✣",
      key: "13",
      description:
        "Unlock extra savings when you buy more subscriptions. Get up to 20% off eligible Yahoo Plus products.",
    },
  ];
  const items2 = [
    {
      text: "Daily trade ideas based on your interests",
      key: "0",
      description:
        "Discover new trade ideas that are trending or relevant to the companies you follow.",
    },
    {
      text: "Fair value analysis for stocks",
      key: "1",
      description:
        "Learn whether a stock matches the Peter Lynch valuation in an intuitive interface.",
    },
    {
      text: "Advanced portfolio performance analysis tools",
      key: "2",
      description:
        "Get premium tools to analyze allocation, diversification and risk.",
    },
    {
      text: "Yahoo Finance community insights",
      key: "3",
      description:
        "See what tickers are trending on Yahoo Finance in terms of user visits, conversations and portfolio changes.",
    },
    {
      text: "Enhanced alerts",
      key: "4",
      description:
        "Get alerted whenever new research reports, analyst ratings, trade ideas, SEC filings and technical patterns are available for the companies you follow.",
    },
    {
      text: "Live chat support on desktop",
      key: "5",
      description:
        "Chat with a live agent about Finance-related questions/concerns 8 AM - 9 PM ET Monday through Friday.",
    },
    {
      text: "Ad-free Yahoo†",
      key: "6",
      description: "Enjoy your favorite Yahoo sites and apps without the ads.",
    },
    {
      text: "24/7 Account Support",
      key: "7",
      description:
        "24/7 phone support for general Yahoo account support inquiries, including billing, account recovery and updating account information.",
    },
    {
      text: "Buy More. Save More.✣",
      key: "8",
      description:
        "Unlock extra savings when you buy more subscriptions. Get up to 20% off eligible Yahoo Plus products.",
    },
  ];

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <Grid
      gridDefinition={[
        { colspan: { l: 12, m: 12, default: 12 } },
        { colspan: { l: 12, m: 12, default: 12 } },
        { colspan: { l: 12, m: 12, default: 12 } },
        { colspan: { l: 12, m: 12, default: 12 } },
        { colspan: { l: 12, m: 12, default: 12 } },
        { colspan: { l: 12, m: 12, default: 12 } },
      ]}>
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-header">Stay ahead of the market</h1>
          <h5 className="hero-des">
            Get advanced tools and insights to navigate the markets with Yahoo
            Finance Plus.
          </h5>
          <div className="hero-btn">
            <Button variant="primary" onClick={() => navigate('/checkout')}>
              Try 14 days free <sup>*</sup>
            </Button>
          </div>
          <p className="hero-closure">
            * To avoid being charged the recurring subscription fee, cancel
            before your free-trial period ends.
          </p>
        </div>
      </div>
      <div style={{ margin: "20px" }}>
        <SpaceBetween size="l">
          <Box fontSize="display-l" fontWeight="heavy" textAlign="center">
            Yahoo Finance Plus Plans
          </Box>
          <Box fontSize="heading-m" fontWeight="normal" textAlign="center">
            Choose the plan that suits you and get started today.
          </Box>
          <ColumnLayout columns={2}>
            <Package
              title="Essential"
              price="$29.99 / month,"
              variant="primary"
              items={items1}
            />
            <Package title="Lite" price="$20.99 / month," items={items2} />
          </ColumnLayout>
          <SpaceBetween size="m">
            <Box textAlign="center" fontSize="heading-s">
              *To avoid being charged the recurring subscription fee, cancel
              before the free-trial period ends.
            </Box>
            <Box textAlign="center" fontSize="heading-s">
              § Premium data coverage is limited to US equities.
            </Box>
            <Box textAlign="center" fontSize="heading-s">
              † Due to contractual obligations related to certain ad types, you
              may encounter minimal ads from time to time on certain properties.
            </Box>
            <Box textAlign="center" fontSize="heading-s">
              ‡ If your account was created through AT&T or Frontier, please
              contact your applicable Internet Service Provider for
              account-related support, including password resets and updating
              account information. View our help article for more information.
            </Box>
            <Box textAlign="center" fontSize="heading-s">
              ✣ Buy more and save more on eligible Yahoo Plus subscriptions—get
              10%, 15% or 20% off your subscription fee. Terms apply.
            </Box>
          </SpaceBetween>
        </SpaceBetween>
      </div>
      <div style={{ margin: "20px" }}>
        <SpaceBetween size="m">
          <Box fontSize="display-l" fontWeight="heavy" textAlign="center">
            Take control of your portfolio
          </Box>
          <Box fontSize="heading-l" fontWeight="normal" textAlign="center">
            Exclusive insights, advanced analytics and detailed company profiles
            that help you take your portfolio to the next level.
          </Box>
          <ColumnLayout columns={2}>
            <div style={{ maxWidth: "640px" }}>
              <video controls width="640px" autoPlay={true} loop={true}>
                <source
                  src="https://s.aolcdn.com/membership/omp-static/biblio/projects/yahoo-plus/content/video-features/vids/yahoo-finance-plus-v10-no-rodeo-a-mixed.mp4"
                  type="video/webm"></source>
              </video>
            </div>
            <div style={{ margin: "20px" }}>
              <SpaceBetween size="m">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}>
                  <div style={{ flex: "left" }}>
                    <Icon name="unlocked" size="large" variant="success" />
                  </div>
                  <div style={{ maxWidth: "400px", flexWrap: "wrap" }}>
                    <Box float="right" fontSize="heading-l" fontWeight="light">
                      Get access to exclusive data and insights about companies
                      you care about.
                    </Box>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}>
                  <div style={{ flex: "left" }}>
                    <Icon name="suggestions" size="large" variant="success" />
                  </div>
                  <div style={{ maxWidth: "400px", flexWrap: "wrap" }}>
                    <Box float="right" fontSize="heading-l" fontWeight="light">
                      Advanced tools and charts optimize your trading strategy.
                    </Box>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}>
                  <div style={{ flex: "left" }}>
                    <Icon name="menu" size="large" variant="success" />
                  </div>
                  <div style={{ maxWidth: "400px", flexWrap: "wrap" }}>
                    <Box float="right" fontSize="heading-l" fontWeight="light">
                      Intuitive data visualizations give you an expert
                      perspective.
                    </Box>
                  </div>
                </div>
              </SpaceBetween>
            </div>
          </ColumnLayout>
        </SpaceBetween>
      </div>

      <div style={{ margin: "20px" }}>
        <SpaceBetween size="l">
          <Box fontSize="display-l" textAlign="center" fontWeight="heavy">
            Premium Features
          </Box>
          <Analysis />
        </SpaceBetween>
      </div>
      <div style={{ margin: "20px" }}>
        <SpaceBetween size="l">
          <Box fontSize="display-l" textAlign="center" fontWeight="heavy">
            Subscriber perks
          </Box>
          <Box fontSize="heading-l" textAlign="center" fontWeight="normal">
            With a Yahoo Finance Plus subscription, you'll automatically qualify
            for Yahoo Plus perks including fewer ads, premium tech support and
            deep discounts.
          </Box>
          <Subscriber />
        </SpaceBetween>
      </div>
      <div className="faqs">
        <SpaceBetween size="m">
          <Box fontSize="display-l" fontWeight="bold">Frequently asked questions</Box>
          <Box fontSize="heading-l" fontWeight="bold">Want to know more about Yahoo Finance Plus? We've provided answers to our most commonly asked questions below.</Box>
          <ExpandableSection headerText="What is Yahoo Finance Plus?" variant="footer" defaultExpanded>
            <Box>Yahoo Finance Plus is a premium subscription service that provides actionable data and advanced tools for investors to trade with confidence. Yahoo Finance Plus is integrated into Yahoo Finance's existing desktop and app products where investors can chart, screen and analyze new data sets all in one place.</Box>
          </ExpandableSection>
          <ExpandableSection headerText="Will I lose access to free content on Yahoo Finance if I don't subscribe to Yahoo Finance Plus?" variant="footer">
            <Box>Yes, Yahoo Finance Plus is available in desktop web, mobile web and mobile app.</Box>
          </ExpandableSection>
          <ExpandableSection headerText="Is Yahoo Finance Plus content personalized to my account?" variant="footer">
            <Box>Yes, your membership offers access to a personalized dashboard with both trending and relevant content. We surface trade ideas and research reports for the companies you follow and that you have visited recently.</Box>
          </ExpandableSection>
          <ExpandableSection headerText="How often is Yahoo Finance Plus data updated?" variant="footer">
            <Box>Advanced charting, fair value and portfolio analytics data are updated in real time. Research reports and trade ideas are released daily. Company Outlook data is updated on an ongoing basis.</Box>
          </ExpandableSection>
          <ExpandableSection headerText="I currently subscribe to Yahoo Finance Premium. What happens to my subscription?" variant="footer">
            <Box>We hope you're enjoying your subscription. Yahoo Finance Premium will be re-named Yahoo Finance Plus Essential. You'll get the same features you know and love plus added Yahoo Plus perks like fewer ads across the entire Yahoo network, support, and deep discounts—all for the same price as your existing subscription without lifting a finger.</Box>
          </ExpandableSection>
          <ExpandableSection headerText="How do I manage my Yahoo Finance Plus subscription?" variant="footer">
            <Box>As a Yahoo Plus subscriber with the Ad-Free perk, you may still see limited ads on search.yahoo.com, login.yahoo.com and other Yahoo properties due to contractual obligations related to certain ad types. As such, the above notwithstanding, ads that are normally displayed are removed to give you more room to focus with fewer distractions. To enable the Ad-Free experience on your Yahoo mobile apps, please make sure the latest version of the app is installed on your device.</Box>
          </ExpandableSection>
          <ExpandableSection headerText="What's included with the 24/7 general account support subscriber perk?" variant="footer">
            <Box>Yahoo Plus subscriptions include 24/7 support for general account inquiries* including billing, account recovery and updating account information. Product-specific support options and hours of operation are limited for Mail, Finance and Fantasy Sports</Box>
          </ExpandableSection>
          </SpaceBetween>
      </div>
    </Grid>
  );
};

const HomePage = (props): JSX.Element => {
  const [tools, setTools] = useState<JSX.Element>();
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
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
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  // https://reactrouter.com/docs/en/v6/api#outlet
  return (
    <>
      <div id="h" style={{ position: "sticky", top: 0, zIndex: 1002 }}>
        <CommonHeader {...props} />
      </div>
      <AppLayout
        content={
          <>
            {!loading ? (
              <SpaceBetween size="m">
                <HomeFeatures loadHelpPanelContent={loadHelpPanelContent} />
              </SpaceBetween>
            ) : (
              <Spinner size="large" className="spinner" />
            )}
          </>
        }
        headerSelector="#h"
        contentType="table"
        toolsOpen={toolsOpen}
        tools={toolsContent}
        navigationHide={true}
        toolsHide={true}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        footerSelector="#f"
      />
      <AppFooter />
    </>
  );
};

export default HomePage;
