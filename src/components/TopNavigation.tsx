import React, { useState } from "react";
import {
  TopNavigation,
  Autosuggest,
  Box,
  Toggle,
  FormField,
  Spinner,
  ColumnLayout,
  SpaceBetween,
  Modal,
} from "@cloudscape-design/components";
import classes from "../app.module.scss";
import {
  applyMode,
  Mode,
  Density,
  applyDensity,
  disableMotion,
} from "@cloudscape-design/global-styles";
import axios from "axios";
import { connect } from "react-redux";
import { setMode, setDensity, setMotion } from "../app/actions";
import { useNavigate } from "react-router-dom";
import { key, host } from "../../api";
interface State {
  user: string;
  signOut: () => void;
}
const BASE_URL = "https://yh-finance.p.rapidapi.com/auto-complete?q=";
const TRENDING_URL =
  "https://yh-finance.p.rapidapi.com/market/get-trending-tickers?";
const KEY_URL = `region=US&rapidapi-key=${key}&x-rapidapi-host=${host}`;

function TopNavigations(props: State): JSX.Element {
  const [mode, setMode] = useState(false);
  const [density, setDensity] = useState(true);
  const [motion, setMotion] = useState(true);
  const [redirectURL, setRedirectURL] = useState("");
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [trending, setTrending] = useState([]);
  const [options, setOptions] = useState([]);
  const [debounceValue, setDebounceValue] = useState("");
  const [status, setStatus] = useState("finished");

  const navigate = useNavigate();

  if (redirectURL === "signout") {
    navigate('/', { replace: true });
    props.signOut();
  } else if (redirectURL === "profile") {
    navigate("/account");
  }
  const onFollowHandler = (e) => {
    e.preventDefault();
    e.detail.id === "preferences" ? setVisible(true) : null;
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(inputValue);
    }, 2000);
    return () => clearTimeout(timer);
  }, [inputValue]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (inputValue.length > 0) {
        try {
          setStatus("loading");
          const res = await axios.get(`${BASE_URL}${inputValue}&${KEY_URL}`);
          const data = res.data;

          // Create the updated options array with the desired structure
          const updatedOptions = [
            {
              label: "Quotes",
              options: data?.quotes.map((option) => ({
                value: option?.symbol, // Replace `option.value` with the correct property name
                label: option?.symbol,
                labelTag: option?.shortname,
              })),
            },
            {
              label: "News",
              options: data?.news.map((option) => ({
                value: option?.title, // Replace `option.value` with the correct property name
                label: option?.title,
                iconUrl: option?.thumbnail?.resolutions[1]?.url,
                // iconAlt: option?.thumbnail?.resolutions[0]?.url
              })),
            },
          ];

          setOptions(updatedOptions);
          setStatus("finished");
        } catch (error) {
          setStatus("error");
        }
      } else {
        try {
          setStatus("loading");
          const res = await axios.get(`${TRENDING_URL}${KEY_URL}`);
          const data = res.data?.finance?.result[0]?.quotes;
          const updatedOptions = [
            {
              label: "Trending Quotes",
              options: data?.map((option) => ({
                value: option?.symbol, // Replace `option.value` with the correct property name
                label: option?.symbol,
                labelTag: option?.shortName,
              })),
            },
          ];
          setOptions(updatedOptions);
          setStatus("finished");
        } catch (error) {
          setStatus("error");
        }
      }
    };

    fetchData();
  }, [debounceValue]);

  const handleSelectOption = ({ detail }) => {
    const selectedValue = detail.value;
    if (selectedValue === inputValue) {
      navigate(`/stocks/${selectedValue}`);
      setInputValue("");
    }
  };

  return (
    <>
      <div
        id="h"
        style={{ position: "sticky", top: 0, zIndex: 1002 }}
        onScroll={(e) => e.preventDefault()} // Add onScroll listener with preventDefault to avoid passive event listener warning
      >
        <TopNavigation
          identity={{
            href: "/",
            logo: {
              src: "https://public.flourish.studio/uploads/4e293af7-8464-45d7-9428-a96963909e42.png",
              alt: "YH",
            },
          }}
          utilities={[
            {
              type: "button",
              iconName: "notification",
              title: "Notifications",
              ariaLabel: "Notifications (unread)",
              badge: true,
              disableUtilityCollapse: false,
            },
            {
              type: "menu-dropdown",
              text: "Account",
              description: `${props.user}`,
              iconName: "user-profile",
              onItemClick: (evt) => {
                setRedirectURL(evt.detail.id);
                onFollowHandler(evt);
              },
              items: [
                { id: "profile", text: "Profile" },
                { id: "preferences", text: "Preferences" },
                { id: "security", text: "Security" },
                {
                  id: "support-group",
                  text: "Support",
                  items: [
                    {
                      id: "documentation",
                      text: "Documentation",
                      href: "#",
                      external: true,
                      externalIconAriaLabel: " (opens in new tab)",
                    },
                    { id: "support", text: "Support" },
                    {
                      id: "feedback",
                      text: "Feedback",
                      href: "#",
                      external: true,
                      externalIconAriaLabel: " (opens in new tab)",
                    },
                  ],
                },
                { id: "signout", text: "Sign out" },
              ],
            },
          ]}
          i18nStrings={{
            searchIconAriaLabel: "Search",
            searchDismissIconAriaLabel: "Close search",
            overflowMenuTriggerText: "More",
            overflowMenuTitleText: "All",
            overflowMenuBackIconAriaLabel: "Back",
            overflowMenuDismissIconAriaLabel: "Close menu",
          }}
          search={
            <Autosuggest
              onChange={({ detail }) => setInputValue(detail.value)}
              onSelect={handleSelectOption}
              value={inputValue.toUpperCase()}
              options={options}
              enteredTextLabel={(value) => `Select the symbol: "${value}"`}
              ariaLabel="Autosuggest example with suggestions"
              placeholder="Search for news, stocks or companies"
              empty="No match found"
              filteringType="auto"
              statusType={status}
              loadingText="Loading"
              errorText="Error fetching results."
              recoveryText="Retry"
              // onRecoveryClick={() => fetchData()}
            />
          }
        />
        <Modal
          onDismiss={() => setVisible(false)}
          visible={visible}
          closeAriaLabel="Close modal"
          header="Preferences"
          size="medium">
          <SpaceBetween size="s" direction="vertical">
            <ColumnLayout columns={3}>
              <FormField description="Light or Dark." label="Theme Mode">
                <Toggle
                  onChange={({ detail }) => {
                    setMode(detail.checked);
                    applyMode(detail.checked ? Mode.Dark : Mode.Light);
                  }}
                  checked={mode}
                  className={classes.app_header_footer}>
                  <Box>{mode ? "Dark" : "Light"}</Box>
                </Toggle>
              </FormField>
              <FormField description="Comfort or Compact." label="Density">
                <Toggle
                  onChange={({ detail }) => {
                    setDensity(detail.checked);
                    applyDensity(
                      detail.checked ? Density.Comfortable : Density.Compact
                    );
                    disableMotion(density ? true : false);
                  }}
                  checked={density}
                  className={classes.app_header_footer}>
                  <Box>{density ? "Comfort" : "Compact"}</Box>
                </Toggle>
              </FormField>
              <FormField description="True or False." label="Motion">
                <Toggle
                  onChange={({ detail }) => {
                    setMotion(detail.checked);
                    disableMotion(motion ? true : false);
                  }}
                  checked={motion}
                  className={classes.app_header_footer}>
                  <Box>{motion ? "True" : "False"}</Box>
                </Toggle>
              </FormField>
            </ColumnLayout>
          </SpaceBetween>
        </Modal>
      </div>
    </>
  );
}

export default TopNavigations;
