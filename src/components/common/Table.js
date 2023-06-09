export const visibleWatchListColumns = [
  { id: "symbol", visible: true },
  { id: "name", visible: true },
  { id: "price", visible: true },
  { id: "change", visible: true },
  { id: "changePer", visible: true },
  { id: "marketTime", visible: true },
  { id: "volume", visible: true },
  { id: "avg3Month", visible: true },
  { id: "marketCap", visible: true },
];
export const watchListPreferences = [
  { id: "symbol", label: "Symbol", alwaysVisible: true },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "price",
    label: "Price",
  },
  {
    id: "change",
    label: "Change",
  },
  { id: "changePer", label: "Change %" },
  {
    id: "marketTime",
    label: "Market Time",
  },
  {
    id: "volume",
    label: "Volume",
  },
  {
    id: "avg3Month",
    label: "Avg 3 Month",
  },
  {
    id: "marketCap",
    label: "Market Cap",
  },
  { id: "region", label: "Region" },
  { id: "quoteType", label: "Quote Type" },
  {
    id: "quoteSourceName",
    label: "Quote Source Name",
  },
  { id: "priceHint", label: "Price Hint" },
  { id: "bid", label: "Bid" },
  { id: "ask", label: "Ask" },
  {
    id: "bidSize",
    label: "Bid Size",
  },
  { id: "askSize", label: "Ask Size" },
  {
    id: "fullExchangeName",
    label: "Full Exchange Name",
  },
  {
    id: "averageDailyVolume10Day",
    label: "Average Daily Volume 10 Day",
  },
  {
    id: "fiftyTwoWeekLowChange",
    label: "Fifty Two Week Low Change",
  },
  {
    id: "fiftyTwoWeekHighChangePercent",
    label: "Fifty Two Week High Change Percent",
  },
  {
    id: "fiftyTwoWeekRange",
    label: "Fifty Two Week Range",
  },
  {
    id: "fiftyTwoWeekHighChange",
    label: "Fifty Two Week High Change",
  },
  {
    id: "fiftyTwoWeekLowChangePercent",
    label: "Fifty Two Week Low Change Percent",
  },
  {
    id: "fiftyTwoWeekLow",
    label: "Fifty Two Week Low",
  },
  {
    id: "fiftyTwoWeekHigh",
    label: "Fifty Two Week High",
  },
  {
    id: "dividendDate",
    label: "Dividend Date",
  },
  {
    id: "trailingPE",
    label: "Trailing PE",
  },
  {
    id: "twoHundredDayAverageChangePercent",
    label: "Two Hundred Day Average Change Percent",
  },
  {
    id: "forwardPE",
    label: "forwardFPE",
  },
  {
    id: "priceToBook",
    label: "Price To Book",
  },
  {
    id: "exchangeTimezoneName",
    label: "Exchange Timezone Name",
  },
  {
    id: "fiftyDayAverage",
    label: "Fifty Day Average",
  },
  {
    id: "fiftyDayAverageChange",
    label: "Fifty Day Average Change",
  },
  {
    id: "fiftyDayAverageChangePercent",
    label: "Fifty Day Average Change Percent",
  },
  {
    id: "twoHundredDayAverage",
    label: "Two Hundred Day Average",
  },
  {
    id: "twoHundredDayAverageChange",
    label: "Two Hundred Day Average Change",
  },
];

export const visibleIncomeColumns = [
  { id: "endDate", visible: true },
  { id: "researchDevelopment", visible: true },
  { id: "effectOfAccountingCharges" },
  { id: "incomeBeforeTax", visible: true },
  { id: "netIncome", visible: true },
  { id: "sellingGeneralAdministrative", visible: true },
  { id: "grossProfit", visible: true },
  { id: "ebit", visible: true },
  { id: "operatingIncome", visible: true },
  { id: "interestExpense", visible: true },
  { id: "totalRevenue", visible: true },
  { id: "totalOperatingExpenses", visible: true },
  { id: "costOfRevenue", visible: true },
  { id: "totalOtherIncomeExpenseNet", visible: true },
  { id: "netIncomeFromContinuingOps", visible: true },
  { id: "netIncomeApplicableToCommonShares", visible: true },
  { id: "minorityInterest" },
  { id: "otherOperatingExpenses" },
  { id: "discontinuedOperations" },
  { id: "extraordinaryItems" },
  { id: "nonRecurring" },
  { id: "otherItems" },
];
export const visibleBalanceSheetColumns = [
  "endDate",
  "totalLiab",
  "totalStockholderEquity",
  "otherCurrentLiab",
  "totalAssets",
  "commonStock",
  "otherCurrentAssets",
  "retainedEarnings",
  "otherLiab",
  "treasuryStock",
  "otherAssets",
  "cash",
  "totalCurrentLiabilities",
  "propertyPlantEquipment",
  "totalCurrentAssets",
  "longTermInvestments",
  "netTangibleAssets",
  "shortTermInvestments",
  "netReceivables",
  "inventory",
  "accountsPayable",
];
export const visibleCashFlowColumns = [
  "endDate",
  "investments",
  "changeToLiabilities",
  "totalCashflowsFromInvestingActivities",
  "netBorrowings",
  "totalCashFromFinancingActivities",
  "changeToOperatingActivities",
  "issuanceOfStock",
  "netIncome",
  "changeInCash",
  "repurchaseOfStock",
  "totalCashFromOperatingActivities",
  "depreciation",
  "changeToInventory",
  "changeToAccountReceivables",
  "otherCashflowsFromFinancingActivities",
  "changeToNetincome",
  "capitalExpenditures",
];
export const columnDefinitionsEPSRevisions = [
  {
    id: "nameRevisions",
    header: "EPS Revisions",
    cell: (item) => item?.endDate || item?.period || "-",
    sortingField: "name",
  },
  {
    id: "upLast7days",
    header: "Up Last 7 Days",
    cell: (item) => item?.epsRevisions?.upLast7days?.fmt || "N/A",
  },
  {
    id: "upLast30days",
    header: "Up Last 30 Days",
    cell: (item) => item?.epsRevisions?.upLast30days?.fmt || "N/A",
  },
  {
    id: "downLast7Days",
    header: "Down Last 30 Days",
    cell: (item) => item?.epsRevisions?.downLast30days?.fmt || "N/A",
  },
  {
    id: "downLast30Days",
    header: "Down Last 90 Days",
    cell: (item) => item?.epsRevisions?.downLast90Days?.fmt || "N/A",
  },
];
export const columnDefinitionsEarningsTrend = [
  {
    id: "nameRevenue",
    header: "EPS Trend",
    cell: (item) => item?.endDate || item?.period || "-",
    sortingField: "name",
  },
  {
    id: "epsCurrent",
    header: "Current Estimate	",
    cell: (item) => item?.epsTrend?.current?.fmt || "-",
  },
  {
    id: "7daysAgo",
    header: "7 Days Ago",
    cell: (item) => item?.epsTrend?.low?.fmt || "-",
  },
  {
    id: "30daysAgo",
    header: "30 Days Ago	",
    cell: (item) => item?.epsTrend?.high?.fmt || "-",
  },
  {
    id: "60daysAgo",
    header: "60 Days Ago",
    cell: (item) => item?.epsTrend.high?.fmt || "-",
  },
  {
    id: "90daysAgo",
    header: "90 Days Ago",
    cell: (item) => item?.epsTrend?.yearAgoRevenue?.fmt || "-",
  },
  {
    id: "growth",
    header: "Sales Growth (year/est)",
    cell: (item) => item?.epsTrend?.growth?.fmt || "-",
  },
];
export const columnDefinitionsEarningsHistory = [
  {
    id: "nameRevenue",
    header: "Earnings History",
    cell: (item) => item?.quarter?.fmt || "-",
    sortingField: "name",
  },
  {
    id: "epsEst",
    header: "EPS Est.",
    cell: (item) => item?.epsEstimate?.fmt || "-",
  },
  {
    id: "epsActual",
    header: "EPS Actual",
    cell: (item) => item?.epsActual?.fmt || "-",
  },
  {
    id: "difference",
    header: "Difference",
    cell: (item) => item?.epsDifference?.fmt || "-",
  },
  {
    id: "surprise%",
    header: "Surprise %",
    cell: (item) => item?.surprisePercent?.fmt || "-",
  },
];
export const columnDefinitionsRevenueEstimate = [
  {
    id: "nameRevenue",
    header: "Revenue Estimate",
    cell: (item) => item.endDate || "-",
    sortingField: "name",
  },
  {
    id: "noAnalystRevenue",
    header: "Number of analyst",
    cell: (item) => item?.revenueEstimate?.numberOfAnalysts?.fmt || "-",
  },
  {
    id: "avgRevenue",
    header: "Avg. Estimate",
    cell: (item) => item?.revenueEstimate?.avg?.fmt || "-",
  },
  {
    id: "lowRevenue",
    header: "Low Estimate",
    cell: (item) => item?.revenueEstimate?.low?.fmt || "-",
  },
  {
    id: "highRevenue",
    header: "High Estimate",
    cell: (item) => item?.revenueEstimate.high?.fmt || "-",
  },
  {
    id: "yearAgoRevenue",
    header: "Year Ago EPS",
    cell: (item) => item?.revenueEstimate?.yearAgoRevenue?.fmt || "-",
  },
  {
    id: "growth",
    header: "Sales Growth (year/est)",
    cell: (item) => item?.revenueEstimate?.growth?.fmt || "-",
  },
];
export const columnDefinitionsEarningsEstimate = [
  {
    id: "nameEarnings",
    header: "Earnings Estimate",
    cell: (item) => item.endDate || item.period || "-",
    sortingField: "name",
  },
  {
    id: "noAnalystEarnings",
    header: "Number of analyst",
    cell: (item) => item?.earningsEstimate?.numberOfAnalysts?.fmt || "-",
  },
  {
    id: "avgEarnings",
    header: "Avg. Estimate",
    cell: (item) => item?.earningsEstimate?.avg?.fmt || "-",
  },
  {
    id: "lowEarnings",
    header: "Low Estimate",
    cell: (item) => item?.earningsEstimate?.low?.fmt || "-",
  },
  {
    id: "highEarnings",
    header: "High Estimate",
    cell: (item) => item?.earningsEstimate.high?.fmt || "-",
  },
  {
    id: "yearAgoEarnings",
    header: "Year Ago EPS",
    cell: (item) => item?.earningsEstimate.yearAgoEps?.fmt || "-",
  },
  {
    id: "yearAgoEarnings",
    header: "Less than 5 yrs",
    cell: (item) => item?.earningsEstimate.yearAgoEps?.fmt || "-",
  },
  {
    id: "yearAgoEarnings",
    header: "Year Ago EPS",
    cell: (item) => item?.earningsEstimate.yearAgoEps?.fmt || "-",
  },
];
export const columnDefinitionsCashFlow = [
  {
    id: "endDate",
    header: "Date",
    cell: (e) => e?.endDate?.fmt,
  },
  {
    id: "investments",
    header: "Investments",
    cell: (e) => e?.investments?.longFmt,
  },
  {
    id: "changeToLiabilities",
    header: "Change To Liabilities",
    cell: (e) => e?.changeToLiabilities?.longFmt,
  },
  {
    id: "totalCashflowsFromInvestingActivities",
    header: "Total Cashflows From Investing Activities",
    cell: (e) => e?.totalCashflowsFromInvestingActivities?.longFmt,
  },
  {
    id: "netBorrowings",
    header: "Net Borrowings",
    cell: (e) => e?.netBorrowings?.longFmt,
  },
  {
    id: "totalCashFromFinancingActivities",
    header: "Total Cash From Financing Activities",
    cell: (e) => e?.totalCashFromFinancingActivities?.longFmt,
  },
  {
    id: "changeToOperatingActivities",
    header: "Change To Operating Activities",
    cell: (e) => e?.changeToOperatingActivities?.longFmt,
  },
  {
    id: "issuanceOfStock",
    header: "Issuance Of Stock",
    cell: (e) => e?.issuanceOfStock?.longFmt,
  },
  {
    id: "netIncome",
    header: "Net Income",
    cell: (e) => e?.netIncome?.longFmt,
  },
  {
    id: "changeInCash",
    header: "Change In Cash",
    cell: (e) => e?.changeInCash?.longFmt,
  },
  {
    id: "repurchaseOfStock",
    header: "Repurchase Of Stock",
    cell: (e) => e?.repurchaseOfStock?.longFmt,
  },
  {
    id: "totalCashFromOperatingActivities",
    header: "Total Cash From Operating Activities",
    cell: (e) => e?.totalCashFromOperatingActivities?.longFmt,
  },
  {
    id: "depreciation",
    header: "Depreciation",
    cell: (e) => e?.depreciation?.longFmt,
  },
  {
    id: "changeToInventory",
    header: "Change To Inventory",
    cell: (e) => e?.changeToInventory?.longFmt,
  },
  {
    id: "changeToAccountReceivables",
    header: "Change To Account Receivables",
    cell: (e) => e?.changeToAccountReceivables?.longFmt || "-",
  },
  {
    id: "otherCashflowsFromFinancingActivities",
    header: "Other Cashflows From Financing Activities",
    cell: (e) => e?.otherCashflowsFromFinancingActivities?.longFmt || "-",
  },
  {
    id: "changeToNetincome",
    header: "Change To Net Income",
    cell: (e) => e?.changeToNetincome?.longFmt || "-",
  },
  {
    id: "capitalExpenditures",
    header: "Capital Expenditures",
    cell: (e) => e?.capitalExpenditures?.longFmt || "-",
  },
];
export const columnDefinitionsBalanceSheet = [
  {
    id: "endDate",
    header: "Date",
    cell: (e) => e?.endDate?.fmt,
  },
  {
    id: "totalLiab",
    header: "Total Liability",
    cell: (e) => e?.totalLiab?.longFmt,
  },
  {
    id: "totalStockholderEquity",
    header: "Total Stockholder Equity",
    cell: (e) => e?.totalStockholderEquity?.longFmt,
  },
  {
    id: "otherCurrentLiab",
    header: "Other Current Liability",
    cell: (e) => e?.otherCurrentLiab?.longFmt,
  },
  {
    id: "totalAssets",
    header: "Total Assets",
    cell: (e) => e?.totalAssets?.longFmt,
  },
  {
    id: "commonStock",
    header: "Common Stock",
    cell: (e) => e?.commonStock?.longFmt,
  },
  {
    id: "otherCurrentAssets",
    header: "Other Current Assets",
    cell: (e) => e?.otherCurrentAssets?.longFmt,
  },
  {
    id: "retainedEarnings",
    header: "Retained Earnings",
    cell: (e) => e?.retainedEarnings?.longFmt,
  },
  {
    id: "otherLiab",
    header: "Other Liability",
    cell: (e) => e?.otherLiab?.longFmt,
  },
  {
    id: "treasuryStock",
    header: "Treasury Stock",
    cell: (e) => e?.treasuryStock?.longFmt,
  },
  {
    id: "otherAssets",
    header: "Other Assets",
    cell: (e) => e?.otherAssets?.longFmt,
  },
  {
    id: "cash",
    header: "Cash",
    cell: (e) => e?.cash?.longFmt,
  },
  {
    id: "totalCurrentLiabilities",
    header: "Total Current Liabilities",
    cell: (e) => e?.totalCurrentLiabilities?.longFmt,
  },
  {
    id: "propertyPlantEquipment",
    header: "Property Plant Equipment",
    cell: (e) => e?.propertyPlantEquipment?.longFmt,
  },
  {
    id: "totalCurrentAssets",
    header: "Total Current Assets",
    cell: (e) => e?.totalCurrentAssets?.longFmt || "-",
  },
  {
    id: "longTermInvestments",
    header: "Long Term Investments",
    cell: (e) => e?.longTermInvestments?.longFmt || "-",
  },
  {
    id: "netTangibleAssets",
    header: "Net Tangible Assets",
    cell: (e) => e?.netTangibleAssets?.longFmt || "-",
  },
  {
    id: "shortTermInvestments",
    header: "Short Term Investments",
    cell: (e) => e?.shortTermInvestments?.longFmt || "-",
  },
  {
    id: "netReceivables",
    header: "Net Receivables",
    cell: (e) => e?.netReceivables?.longFmt || "-",
  },
  {
    id: "inventory",
    header: "Inventory",
    cell: (e) => e?.inventory?.longFmt || "-",
  },
  {
    id: "accountsPayable",
    header: "Accounts Payable",
    cell: (e) => e?.accountsPayable?.longFmt || "-",
  },
  {
    id: "intangibleAssets",
    header: "Intangible Assets",
    cell: (e) => e?.intangibleAssets?.longFmt || "-",
  },
  {
    id: "capitalSurplus",
    header: `Capital Surplus`,
    cell: (e) => e?.capitalSurplus?.longFmt || "-",
  },
];
export const columnDefinitionsIncome = [
  {
    id: "endDate",
    header: "Date",
    cell: (e) => e?.endDate?.fmt,
  },
  {
    id: "researchDevelopment",
    header: "Research Development",
    cell: (e) => e?.researchDevelopment?.longFmt || "-",
  },
  {
    id: "effectOfAccountingCharges",
    header: "Effect Of Accounting Charges",
    cell: (e) => e?.effectOfAccountingCharges?.longFmt || "-",
  },
  {
    id: "incomeBeforeTax",
    header: "Income Before Tax",
    cell: (e) => e?.incomeBeforeTax?.longFmt,
  },
  {
    id: "netIncome",
    header: "Net Income",
    cell: (e) => e?.netIncome?.longFmt,
  },
  {
    id: "sellingGeneralAdministrative",
    header: "Selling General Administrative",
    cell: (e) => e?.sellingGeneralAdministrative?.longFmt,
  },
  {
    id: "grossProfit",
    header: "Gross Profit",
    cell: (e) => e?.grossProfit?.longFmt,
  },
  {
    id: "ebit",
    header: "EBIT",
    cell: (e) => e?.ebit?.longFmt,
  },
  {
    id: "operatingIncome",
    header: "Operating Income",
    cell: (e) => e?.operatingIncome?.longFmt,
  },
  {
    id: "interestExpense",
    header: "Interest Expense",
    cell: (e) => e?.interestExpense?.longFmt,
  },
  {
    id: "totalRevenue",
    header: "Total Revenue",
    cell: (e) => e?.totalRevenue?.longFmt,
  },
  {
    id: "totalOperatingExpenses",
    header: "Total Operating Expenses",
    cell: (e) => e?.totalOperatingExpenses?.longFmt,
  },
  {
    id: "costOfRevenue",
    header: "Cost Of Revenue",
    cell: (e) => e?.costOfRevenue?.longFmt,
  },
  {
    id: "totalOtherIncomeExpenseNet",
    header: "Total Other Income Expense Net",
    cell: (e) => e?.totalOtherIncomeExpenseNet?.longFmt,
  },
  {
    id: "netIncomeFromContinuingOps",
    header: "Net Income From Continuing Ops",
    cell: (e) => e?.netIncomeFromContinuingOps?.longFmt,
  },
  {
    id: "netIncomeApplicableToCommonShares",
    header: "Net Income Applicable To Common Shares",
    cell: (e) => e?.netIncomeApplicableToCommonShares?.longFmt,
  },
  {
    id: "minorityInterest",
    header: "Minority Interest",
    cell: (e) => e?.minorityInterest?.longFmt || "-",
  },
  {
    id: "otherOperatingExpenses",
    header: "Other Operating Expenses",
    cell: (e) => e?.otherOperatingExpenses?.longFmt || "-",
  },
  {
    id: "extraordinaryItems",
    header: "Extraordinary Items",
    cell: (e) => e?.extraordinaryItems?.longFmt || "-",
  },
  {
    id: "nonRecurring",
    header: "Non Recurring",
    cell: (e) => e?.nonRecurring?.longFmt || "-",
  },
  {
    id: "otherItems",
    header: "Other Items",
    cell: (e) => e?.otherItems?.longFmt || "-",
  },
  {
    id: "discontinuedOperations",
    header: "Discontinued Operations",
    cell: (e) => e?.discontinuedOperations?.longFmt || "-",
  },
];

export const incomePreferences = [
  { id: "endDate", label: "End Date", alwaysVisible: true },
  {
    id: "researchDevelopment",
    label: "Research Development",
  },
  {
    id: "effectOfAccountingCharges",
    label: "Effect Of Accounting Charges",
  },
  { id: "minorityInterest", label: "Minority Interest" },
  { id: "netIncome", label: "Net Income" },
  {
    id: "sellingGeneralAdministrative",
    label: "Selling General Administrative",
  },
  { id: "grossProfit", label: "Gross Profit" },
  {
    id: "otherOperatingExpenses",
    label: "Other Operating Expenses",
  },
  {
    id: "discontinuedOperations",
    label: "Discontinued Operations",
  },
  { id: "ebit", label: "EBIT" },
  { id: "operatingIncome", label: "Operating Income" },
  { id: "interestExpense", label: "Interest Expense" },
  { id: "totalRevenue", label: "Total Revenue" },
  { id: "extraordinaryItems", label: "Extraordinary Items" },
  { id: "nonRecurring", label: "Non Recurring" },
  { id: "otherItems", label: "Other Items" },
  {
    id: "totalOperatingExpenses",
    label: "Total Operating Expenses",
  },
  { id: "costOfRevenue", label: "Cost Of Revenue" },
  {
    id: "totalOtherIncomeExpenseNet",
    label: "Total Other Income Expense Net",
  },
  {
    id: "netIncomeFromContinuingOps",
    label: "Net Income From Continuing Ops",
  },
  {
    id: "netIncomeApplicableToCommonShares",
    label: "Net Income Applicable To Common Shares",
  },
];
export const balanceSheetPreferences = [
  { id: "endDate", label: "End Date", alwaysVisible: true },
  {
    id: "intangibleAssets",
    label: "Intangible Assets",
  },
  {
    id: "capitalSurplus",
    label: "Capital Surplus",
  },
  { id: "totalLiab", label: "Total Liab" },
  { id: "totalStockholderEquity", label: "Total Stockholder Equity" },
  {
    id: "otherCurrentLiab",
    label: "Other Current Liability",
  },
  { id: "totalAssets", label: "Total Assets" },
  {
    id: "commonStock",
    label: "Common Stock",
  },
  {
    id: "otherCurrentAssets",
    label: "Other Current Assets",
  },
  { id: "retainedEarnings", label: "Retained Earnings" },
  { id: "otherLiab", label: "Other Liability" },
  { id: "treasuryStock", label: "Treasury Stock" },
  { id: "otherAssets", label: "Other Assets" },
  { id: "cash", label: "Cash" },
  { id: "totalCurrentLiabilities", label: "Total Current Liabilities" },
  { id: "propertyPlantEquipment", label: "Property Plant Equipment" },
  {
    id: "totalCurrentAssets",
    label: "Total Current Assets",
  },
  { id: "longTermInvestments", label: "Long Term Investments" },
  {
    id: "netTangibleAssets",
    label: "Net Tangible Assets",
  },
  {
    id: "shortTermInvestments",
    label: "Short Term Investments",
  },
  {
    id: "netReceivables",
    label: "Net Receivables",
  },
  {
    id: "inventory",
    label: "Inventory",
  },
  {
    id: "accountsPayable",
    label: "Accounts Payable",
  },
];
export const cashFlowPreferences = [
  { id: "endDate", label: "End Date", alwaysVisible: true },
  {
    id: "investments",
    label: "Investments",
  },
  {
    id: "changeToLiabilities",
    label: "Change To Liabilities",
  },
  {
    id: "totalCashflowsFromInvestingActivities",
    label: "Total Cashflows From Investing Activities",
  },
  { id: "netBorrowings", label: "Net Borrowings" },
  {
    id: "totalCashFromFinancingActivities",
    label: "Total Cash From Financing Activities",
  },
  {
    id: "changeToOperatingActivities",
    label: "Change To Operating Activities",
  },
  {
    id: "issuanceOfStock",
    label: "Issuance Of Stock",
  },
  {
    id: "netIncome",
    label: "Net Income",
  },
  { id: "changeInCash", label: "Change In Cash" },
  { id: "repurchaseOfStock", label: "Repurchase Of Stock" },
  {
    id: "totalCashFromOperatingActivities",
    label: "Total Cash From Operating Activities",
  },
  { id: "depreciation", label: "Depreciation" },
  { id: "changeToInventory", label: "Change To Inventory" },
  { id: "changeToAccountReceivables", label: "Change To Account Receivables" },
  {
    id: "otherCashflowsFromFinancingActivities",
    label: "Other Cashflows From Financing Activities",
  },
  { id: "changeToNetincome", label: "Change To Net income" },
  {
    id: "capitalExpenditures",
    label: "Capital Expenditures",
  },
];


export function convertUnixTimestamp(unixTimestamp) {
  const dateObj = new Date(unixTimestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const year = dateObj.getFullYear();
  const month = months[dateObj.getMonth()];
  const date = dateObj.getDate().toString().padStart(2, "0");
  const dayOfWeek = daysOfWeek[dateObj.getDay()];
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  return `${dayOfWeek}, ${month} ${date}, ${year} at ${hours}:${minutes} EST`;
}

function decimal(number) {
  return number?.toFixed(2);
}
export const historicalDefinition = [
  {
    id: "date",
    header: "Date",
    cell: (item) => convertUnixTimestamp(item?.date) || "-",
    sortingField: "name",
  },
  {
    id: "open",
    header: "Open",
    cell: (item) => decimal(item?.open) || "-",
  },
  {
    id: "high",
    header: "High",
    cell: (item) => decimal(item?.high) || "-",
  },
  {
    id: "low",
    header: "Low",
    cell: (item) => decimal(item?.low) || "-",
  },
  {
    id: "close",
    header: "Close*",
    cell: (item) => decimal(item?.close) || "-",
  },
  {
    id: "adjClose",
    header: "AdjClose**",
    cell: (item) => decimal(item?.adjclose) || "-",
  },
  {
    id: "volume",
    header: "Volume",
    cell: (item) => item?.volume || "-",
  },
];
