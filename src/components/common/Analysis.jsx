import React from "react";
import { SpaceBetween, Tabs, Box, Button } from "@cloudscape-design/components";
import { useNavigate } from 'react-router-dom';
function Analysis() {
  const [activeTabId, setActiveTabId] = React.useState("first");

  const Content = ({ src, title, description }) => {
    const navigate = useNavigate();
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
	  textAlign:'center',
	  padding: '10px'
        }}>
	<div>
	<SpaceBetween size="m">
          <Box fontSize="heading-m" fontWeight="bold">
            {title}
          </Box>
          <img src={src} style={{ maxWidth: "720px"}} alt={title} />
	  </SpaceBetween>
	  </div>
	  <SpaceBetween size="m">
          <Box fontSize="heading-m" fontWeight="normal">{description}</Box>
	  <Button onClick={() => navigate('/checkout')}>Try 14 days free</Button>
	  </SpaceBetween>
      </div>

    );
  };
  return (
    <div>
      <Tabs
        onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
        activeTabId={activeTabId}
        tabs={[
          {
            label: "Portfolio Analytics",
            id: "first",
            content: (
              <Content
                src="https://s.aolcdn.com/membership/omp-static/biblio/plus/finance/img/features/Analytics_portfolio@2x.jpg"
                title="Portfolio Analytics"
                description="Measure your investing performance against industry benchmarks and model portfolios by time frame. Evaluate sector and security-level contributions to return in list or heat map view. Monitor your portfolio's characteristics, diversification and risk profile to identify concentrated positions and actively rebalance assets."
              />
            ),
          },
          {
            label: "Research Reports",
            id: "second",
            content:  
	    <Content
                src="https://s.aolcdn.com/membership/omp-static/biblio/plus/finance/img/features/Research_report@2x.jpg"
                title="Research Reports"
                description="Unlock trusted independent research to help you invest with confidence. Read analyst assessments on hundreds of stocks, market and economic commentary, portfolio ideas and more. New reports are released daily and can be searched or filtered by date range, frequency, report type and sector."
              />,
          },
          {
            label: "Investment Ideas",
            id: "third",
            content: 
	    <Content
                src="https://s.aolcdn.com/membership/omp-static/biblio/plus/finance/img/features/investment_idea@2x.jpg"
                title="Investment Ideas"
                description="Discover new investment opportunities relevant to companies you follow. Explore top bullish or bearish trade ideas identified through technical and fundamental analysis, making them suitable for all investor types. Compare the current price to the price target for the relevant term. Featured ideas are updated daily."
              />,
          },
          {
            label: "Enhanced Charting",
            id: "fourth",
            content:  
	    <Content
                src="https://s.aolcdn.com/membership/omp-static/biblio/plus/finance/img/features/Enhanced_charting@2x.jpg"
                title="Enhanced Charting"
                description="Technical and event analysis—simplified. You can instantly identify chart patterns and plot significant developments with the click of a button. Determine when to buy or sell with patented pattern recognition technology applied to a broad range of technical indicators. Find, validate and time trades with ease with our interactive charts."
              />,
          },
          {
            label: "Company Insights",
            id: "fifth",
            content: 
	     <Content
                src="https://s.aolcdn.com/membership/omp-static/biblio/plus/finance/img/features/Company_insights@2x.jpg"
                title="Company"
                description="Track how well a company is performing against its sector or market with exclusive alternative data sets. Intuitive visualizations help you examine key leading indicators of company or industry performance. Metrics include hiring, insider sentiment, earnings, dividend yield and more."
              />,
          },
          {
            label: "Community Insights",
            id: "sixth",
            content: 
	    <Content
                src="https://s.aolcdn.com/membership/omp-static/biblio/plus/finance/img/features/Community_insights@2x.jpg"
                title="Community Insights"
                description="Make informed decisions based on real-time user activity within the Yahoo Finance community. See what tickers are trending overall and by sector each trading day. Track changes in community conversation with percent change and bullish/bearish indicators. See what tickers users are adding and deleting the most in their portfolios.

"
              />,
          },
        ]}
      />
    </div>
  );
}

export default Analysis;
