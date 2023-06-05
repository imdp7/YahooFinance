import React, { useState, useEffect } from "react";
import axios from "axios";
import Tables from "./Table";
import { SpaceBetween } from "@cloudscape-design/components";
import { key, host } from "../../api";
import { useSelector, useDispatch } from "react-redux";
import { setWishlistSymbols, setRecentlyVisitedSymbols } from "../app/actions";

const KEY_URL = `&rapidapi-key=${key}&x-rapidapi-host=${host}`;
const movers = {
  method: "GET",
  url: "https://yh-finance.p.rapidapi.com/market/v2/get-movers",
  params: { region: "US", lang: "en-US", count: "6", start: "0" },
  headers: {
    "X-RapidAPI-Key": "53858f6f17msh56f101adaa014e6p175338jsn02a3e984b0ee",
    "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
  },
};
const trending = {
  method: "GET",
  url: "https://yh-finance.p.rapidapi.com/market/get-trending-tickers",
  params: { region: "US" },
  headers: {
    "X-RapidAPI-Key": "53858f6f17msh56f101adaa014e6p175338jsn02a3e984b0ee",
    "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
  },
};
const quoteType = {
  method: "GET",
  url: "https://yh-finance.p.rapidapi.com/market/get-tickers-by-quote-type",
  params: {
    region: "US",
    lang: "en-US",
  },
  headers: {
    "X-RapidAPI-Key": "53858f6f17msh56f101adaa014e6p175338jsn02a3e984b0ee",
    "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
  },
};
function Movers() {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);
  const [gain, setGain] = useState([]);
  const [loser, setLoser] = useState([]);
  const [active, setActive] = useState([]);
  const [top, setTop] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [worldIndices, setWorldIndices] = useState([]);
  const [wishlist, setWishlist] = React.useState([]);
  const [recently, setRecently] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const fetchTrending = async () => {
    try {
      const response = await axios.request(trending);
      let data = response?.data?.finance?.result[0]?.quotes;
      let tops = data.slice(0, 6);
      setTop(tops);
    } catch (error) {
      console.error(error);
    }
  };

  const extractSymbols = (quotes) => {
    return quotes.map((quote) => quote.symbol);
  };

  const fetchQuotes = (symbol) => {
    const options = {
      method: "GET",
      url: "https://yh-finance.p.rapidapi.com/market/v2/get-quotes",
      params: {
        region: "US",
        symbols: symbol.join(","), // Convert symbols array to comma-separated string
      },
      headers: {
        "X-RapidAPI-Key": "53858f6f17msh56f101adaa014e6p175338jsn02a3e984b0ee",
        "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
      },
    };
    return axios.request(options); // Return the promise
  };

  const fetchData = async () => {
    try {
      const response = await axios.request(movers);
      const gainers = extractSymbols(response.data.finance.result[0].quotes);
      const losers = extractSymbols(response.data.finance.result[1].quotes);
      const actives = extractSymbols(response.data.finance.result[2].quotes);

      const gainPromise = fetchQuotes(gainers);
      const loserPromise = fetchQuotes(losers);
      const activePromise = fetchQuotes(actives);

      const [gainResponse, loserResponse, activeResponse] = await Promise.all([
        gainPromise,
        loserPromise,
        activePromise,
      ]);

      const gain = gainResponse.data.quoteResponse.result; // Store the gainers response
      const loser = loserResponse.data.quoteResponse.result; // Store the losers response
      const active = activeResponse.data.quoteResponse.result; // Store the active stocks response

      setGain(gain);
      setLoser(loser);
      setActive(active);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchQuoteType = async () => {
    const extractSymbol = (quotes) => {
      return quotes.map((quote) => quote);
    };

    try {
      const response = await axios.request(quoteType);
      const cu = extractSymbol(response.data.finance.result.currencies.tickers)
      const co = extractSymbol(response.data.finance.result.commodities.tickers)
      const wi = extractSymbol(response.data.finance.result.world_indices.tickers)

      const currencyPromise = fetchQuotes(cu);
      const commodityPromise = fetchQuotes(co);
      const worldIndicesPromise = fetchQuotes(wi);

      const [currencyResponse, commoditiesResponse, worldIndicesResponse] = await Promise.all([
        currencyPromise,
        currencyPromise,
        worldIndicesPromise,
      ]);

      const curr = currencyResponse.data.quoteResponse.result; // Store the gainers response
      const como = commoditiesResponse.data.quoteResponse.result; // Store the losers response
      const world = worldIndicesResponse.data.quoteResponse.result; // Store the active stocks response

      setCurrencies(curr);
      setCommodities(como);
      setWorldIndices(world);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchWishlist = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8087/api/customers/${customer.sub}`
      );
      const data = await response.json();

      if (data && data.wishlist && Array.isArray(data.wishlist.symbols)) {
        dispatch(setWishlistSymbols(data.wishlist.symbols));
        const symbols = data.wishlist.symbols;
        const wishPromise = fetchQuotes(symbols);
        const [wishResponse] = await Promise.all([wishPromise]);

        const wish = wishResponse.data.quoteResponse.result; // Store the wishlist response

        dispatch(setWishlist(wish)); // Dispatch an action to set the wishlist data in Redux store
      }
    } catch (error) {
      console.error("Error fetching wishlist symbols:", error);
    }
  };
  const fetchRecentlyVisited = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8087/api/customers/${customer.sub}`
      );
      const data = await response.json();

      if (data && data.recentlyVisited && Array.isArray(data.recentlyVisited.symbols)) {
        dispatch(setRecentlyVisitedSymbols(data.recentlyVisited.symbols));
        const symbols = data.recentlyVisited.symbols;
        const recentlyPromise = fetchQuotes(symbols);
        const [recentlyResponse] = await Promise.all([recentlyPromise]);

        const recently = recentlyResponse.data.quoteResponse.result; // Store the wishlist response

        dispatch(setRecently(recently)); // Dispatch an action to set the wishlist data in Redux store
      }
    } catch (error) {
      console.error("Error fetching wishlist symbols:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTrending();
    fetchWishlist();
    fetchRecentlyVisited();
    fetchQuoteType();
  }, [customer.sub, dispatch, top, wishlist, gain, loser, active, currencies, commodities, worldIndices,recently ]);
  // customer.sub, dispatch, top, wishlist, gain, loser, active
  return (
    <SpaceBetween size="m">
      <Tables data={wishlist} header="My Wishlist" loading={loading} />
      <Tables data={recently} header="Recently Visited" loading={loading} />
      <Tables data={top} header="Trending today" loading={loading} />
      <Tables data={gain} header="Stocks: Gainers" loading={loading} />
      <Tables data={loser} header="Stocks: Losers" loading={loading} />
      <Tables data={active} header="Stocks: Actives" loading={loading} />
      <Tables data={currencies} header="Currencies" loading={loading} />
      <Tables data={commodities} header="Commodities" loading={loading} />
      <Tables data={worldIndices} header="World Index" loading={loading} />
    </SpaceBetween>
  );
}

export default Movers;
