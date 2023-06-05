import React from "react";
import TopNavigations from "../components/TopNavigation";
import {
  AppLayout,
  SpaceBetween,
  Container,
  Header,
  ContentLayout,
  Grid,
  Box,
  Link,
  Tabs,
  Button,
  Table,
} from "@cloudscape-design/components";
import PropTypes from "prop-types";
import Movers from "../components/Movers";
import Articles from "../components/Articles";
import PopularWatchlist from "../components/PopularWatchlist";
import { key, host } from "../../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Chart from "../components/common/Chart";
import Modals from "../components/common/Modals";
import MarketHolidays from "../components/Holidays";
import Status from '../components/Status';
const i18nStrings = {
  overflowMenuTriggerText: "More",
  overflowMenuTitleText: "All",
};
const BASE_URL = "https://yh-finance.p.rapidapi.com/market/v2/get-summary?";
const KEY_URL = `region=US&rapidapi-key=${key}&x-rapidapi-host=${host}`;

const Content = ({ summary, handleModalOpen }) => {
  const navigate = useNavigate();

  return (
    <SpaceBetween size="m">
      <Grid
        gridDefinition={[
          { colspan: { l: 12, m: 12, default: 12 } },
          { colspan: { l: 12, m: 12, default: 12 } },
          { colspan: { l: 8, m: 8, default: 12 } },
          { colspan: { l: 4, m: 4, default: 12 } },
          { colspan: { l: 4, m: 4, default: 12 } },
        ]}>
        <Container>
          <div className="container-items">
            {summary.map((sum) => (
              <div key={sum?.symbol} className="item-stack">
                <SpaceBetween size="s">
                  <Box fontWeight="bold">
                    <Link onFollow={() => navigate(`/stocks/${sum?.symbol}`)}>
                      {sum?.shortName}
                    </Link>
                  </Box>
                  <Box fontWeight="bold">
                    {sum?.regularMarketPreviousClose?.fmt}
                  </Box>
                  <Chart data={sum?.spark} />
                </SpaceBetween>
              </div>
            ))}
          </div>
        </Container>
        <SpaceBetween size="m" direction="horizontal">
          <Button
            onClick={() => handleModalOpen(MarketHolidays, "Market Holidays")}>
            Upcoming Holidays
          </Button>
          <Button onClick={() => handleModalOpen(Status, "Exchanges")}>Exchanges</Button>
        </SpaceBetween>
        <Articles category="generalnews" limit="50"/>
        <SpaceBetween size="m">
          <Movers />
        </SpaceBetween>
      </Grid>
    </SpaceBetween>
  );
};

function Home(props) {
  const [activeTabId, setActiveTabId] = React.useState("home");

  const handleTabChange = ({ detail }) => {
    setActiveTabId(detail.activeTabId);
  };

  const { href, ...otherProps } = props;
  const [modalState, setModalState] = React.useState({
    visible: false,
    modalTitle: null,
    modalComp: null,
  });
  const [summary, setSummary] = React.useState([]);

  const fetchSummary = async () => {
    try {
      const response = await axios.get(`${BASE_URL}${KEY_URL}`);
      const sum = response?.data?.marketSummaryAndSparkResponse?.result;
      setSummary(sum);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchSummary();
  }, []);

  const handleModalOpen = (Component, title) => {
    setModalState((prevState) => ({
      ...prevState,
      modalComp: Component,
      visible: true,
      modalTitle: title,
    }));
  };

  const handleModalDismiss = () => {
    setModalState((prevState) => ({ ...prevState, visible: false }));
  };

  return (
    <>
      <div id="h" style={{ position: "sticky", top: 0, zIndex: 1002 }}>
      <TopNavigations user={props.user} signOut={props.signOut} />
      </div>
      <AppLayout
        headerSelector="#h"
        contentType="wizard"
        navigationHide={true}
        toolsHide={true}
        content={
          <SpaceBetween size="l">
            <ContentLayout>
              <SpaceBetween size="m">
                <Tabs
                  onChange={handleTabChange}
                  activeTabId={activeTabId}
                  tabs={[
                    {
                      label: "Home",
                      id: "home",
                      content: (
                        <Content
                          handleModalOpen={handleModalOpen}
                          summary={summary}
                        />
                      ),
                    },
                    {
                      label: "Watchlist",
                      id: "watchlist",
                      content: <PopularWatchlist />,
                    },
                    {
                      label: "News",
                      id: "news",
                      content: <Articles category={"generalnews"} limit="50" />,
                    },
                  ]}
                />
              </SpaceBetween>
            </ContentLayout>
            {modalState.visible && (
              <Modals
                visible={modalState.visible}
                setVisible={setModalState}
                Component={modalState.modalComp}
                title={modalState.modalTitle}
              />
            )}
          </SpaceBetween>
        }
      />
    </>
  );
}

export default Home;
