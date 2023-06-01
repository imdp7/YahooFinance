/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Amplify, I18n, Auth } from "aws-amplify";
import { withAuthenticator, translations } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import HomePage from "./HomPage";
import PageNotFound from "./PageNotFound";
import Home from "./Pages/Home";
import Stock from "./Pages/Stock";
import WatchlistDetail from "./components/WatchlistDetail";
import News from "./Pages/News";
import Payment from "./components/common/Payment";
import Account from "./Auth/Components/Account";
import { useDispatch } from "react-redux";
import { addCustomer } from "./app/actions";

I18n.putVocabularies(translations);
I18n.setLanguage("en");

Amplify.configure(awsExports);

const App = ({ user, signOut }) => {
  const dispatch = useDispatch();
  const [subscriptionStatus, setSubscriptionStatus] = useState("");

  useEffect(() => {
    document.title = "Yahoo Finance";

    const fetchUserAttributes = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        const userData = currentUser.attributes;

        const customer = {
          email: userData.email,
          email_verified: userData.email_verified,
          sub: userData.sub,
          wishlist: {
            symbols: [],
          },
          recentlyVisited: {
            symbols: [],
          },
        };

        dispatch(addCustomer(customer));

        axios
          .get(`http://localhost:8087/api/subscribe/q?email=${customer.email}`)
          .then((response) => {
            const subscription = response.data;

            if (subscription && subscription.subscriptionStatus === "success") {
              setSubscriptionStatus("success");
            } else {
              setSubscriptionStatus("failure");
            }
          })
          .catch((error) => {
            console.error("Error fetching customer:", error);
            setSubscriptionStatus("failure");
          });
      } catch (error) {
        console.error("Error retrieving user attributes:", error);
      }
    };

    fetchUserAttributes();
  }, [dispatch,subscriptionStatus]);

  return (
    <Router>
      <Routes>
        {subscriptionStatus === "success" && (
          <>
            <Route path="/" element={<Home user={user.username} signOut={signOut} />}  />
            <Route path="/news/:slug" element={<News user={user.username} signOut={signOut} />} />
            <Route
              path="/watchlist/:slug"
              element={<WatchlistDetail user={user.username} signOut={signOut} />}
            />
            <Route path="/stocks/:symbol" element={<Stock user={user.username} signOut={signOut} />} />
            <Route path="/account" element={<Account user={user.username} signOut={signOut} />} />
          </>
        )}
        {subscriptionStatus === "failure" && (
          <>
            <Route path="/home" element={<HomePage user={user.username} signOut={signOut} />} />
            <Route path="/checkout" element={<Payment user={user.username} signOut={signOut} />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </>
        )}
        {/* <Route path="*" element={<PageNotFound user={user.username} signOut={signOut} />} /> */}
      </Routes>
    </Router>  
  );
};

export default withAuthenticator(App);
