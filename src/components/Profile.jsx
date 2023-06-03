import React from "react";
import {
  SpaceBetween,
  Container,
  Box,
  Header,
  Link,
  Alert,
  ColumnLayout,
  Table,
} from "@cloudscape-design/components";
import { InfoLink, HelpPanels } from "../components/common/InfoLink";

function Profile(props) {
  const { profile, symbol } = props;
  const [loading, setLoading] = React.useState(false);
  return (
    <>
      {profile?.summaryProfile ? (
        <SpaceBetween size="m">
          <Container
            header={<Header variant="h3">{profile?.price?.longName}</Header>}>
            <SpaceBetween size="m">
              <ColumnLayout columns={2}>
                <div>
                  <Box>{profile?.summaryProfile?.address1}</Box>
                  <Box>{profile?.summaryProfile?.address2}</Box>
                  <Box>{profile?.summaryProfile?.zip}</Box>
                  <Box>
                    {profile?.summaryProfile?.state}
                    {","} {profile?.summaryProfile?.country}
                  </Box>
                  <Box>
                    <Link href={`tel:${profile?.summaryProfile?.phone}`}>
                      {profile?.summaryProfile?.phone}
                    </Link>
                  </Box>
                  <Box>
                    <Link href={`${profile?.summaryProfile?.website}`} external>
                      {profile?.summaryProfile?.website}
                    </Link>
                  </Box>
                </div>
                <div>
                  <Box>
                    Sector(s):
                    <Box variant="span" fontWeight="bold">
                      {" "}
                      {profile?.summaryProfile?.sector}
                    </Box>
                  </Box>
                  <Box>
                    Industry:{" "}
                    <Box variant="span" fontWeight="bold">
                      {" "}
                      {profile?.summaryProfile?.industry}
                    </Box>
                  </Box>
                  <Box>
                    Full Time Employees:{" "}
                    <Box variant="span" fontWeight="bold">
                      {" "}
                      {profile?.summaryProfile?.fullTimeEmployees}
                    </Box>
                  </Box>
                </div>
              </ColumnLayout>
              <Table
                columnDefinitions={[
                  {
                    id: "name",
                    header: "Name",
                    cell: (item) => item?.name || "-",
                    sortingField: "name",
                  },
                  {
                    id: "price",
                    header: "Title",
                    cell: (item) => item.relation || "-",
                    sortingField: "price",
                  },
                  {
                    id: "change",
                    header: "Pay",
                    cell: (item) => item?.positionDirect?.fmt || "-",
                  },
                  {
                    id: "changePer",
                    header: "Stock Gained",
                    cell: (item) => item?.transactionDescription || "-",
                  },
                  {
                    id: "latestTransactionDate",
                    header: "Latest Transaction Date",
                    cell: (item) => item?.latestTransDate?.fmt || "-",
                  },
                  {
                    id: "positionDirect",
                    header: "Position Direct Date",
                    cell: (item) => item?.positionDirectDate?.fmt || "-",
                  },
                ]}
                items={profile?.insiderHolders?.holders}
                wrapLines
                stripedRows
                loading={loading}
                loadingText="Loading resources"
                sortingDisabled
                variant="embedded"
                header={
                  <Header
                    variant="h3"
                    info={
                      <InfoLink
                        onFollow={() =>
                          props.loadHelpPanelContent(
                            <HelpPanels
                              title="Key Executives"
                              des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                            />
                          )
                        }
                      />
                    }>
                    Key Executives
                  </Header>
                }
                empty={
                  <Box textAlign="center" color="inherit">
                    <b>No resources</b>
                    <Box padding={{ bottom: "s" }} variant="p" color="inherit">
                      No resources to display.
                    </Box>
                  </Box>
                }
              />
              <Header
                variant="h3"
                info={
                  <InfoLink
                    onFollow={() =>
                      props.loadHelpPanelContent(
                        <HelpPanels
                          title="Description"
                          des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                        />
                      )
                    }
                  />
                }>
                Description
              </Header>
              <Box>{profile?.summaryProfile?.longBusinessSummary}</Box>
            </SpaceBetween>
          </Container>
        </SpaceBetween>
      ) : (
        <SpaceBetween size="m">
          <ColumnLayout columns={2} borders="vertical" margin={{horizontal: 'm', vertical:'m'}}>
            <SpaceBetween size="s">
              <Box fontSize="heading-m" fontWeight="bold">
                {profile?.quoteType?.longName}
              </Box>
              <SpaceBetween size="s">
                <ColumnLayout columns={2}>
                  <SpaceBetween size="xxs">
                    <Box fontWeight="bold">Morningstar Style Box</Box>
                    <Box>
                      Yahoo partners with Morningstar a leading market research
                      and investment data group to help investors rate and
                      compare funds on Yahoo Finance. The Morningstar Category
                      is shown next to the Morningstar Style Box which
                      identifies a fund's investment focus, based on the
                      underlying securities in the fund.
                    </Box>
                  </SpaceBetween>
                  <Box textAlign="center">
                    <img src={profile?.fundProfile?.styleBoxUrl} />
                  </Box>
                </ColumnLayout>
                <SpaceBetween size="xxs">
                  <Box fontWeight="bold">Morningstar Category</Box>
                  <Box>
                    While the investment objective stated in a fund's prospectus
                    may or may not reflect how the fund actually invests, the
                    Morningstar category is assigned based on the underlying
                    securities in each portfolio. Morningstar categories help
                    investors and investment professionals make meaningful
                    comparisons between funds. The categories make it easier to
                    build well-diversified portfolios, assess potential risk,
                    and identify top-performing funds. We place funds in a given
                    category based on their portfolio statistics and
                    compositions over the past three years. If the fund is new
                    and has no portfolio history, we estimate where it will fall
                    before giving it a more permanent category assignment. When
                    necessary, we may change a category assignment based on
                    recent changes to the portfolio.
                  </Box>
                </SpaceBetween>
              </SpaceBetween>
            </SpaceBetween>
            <SpaceBetween size="xl">
              <SpaceBetween size="s">
                <Box fontSize="heading-m" fontWeight="heavy">
                  Fund Overview
                </Box>
                <ColumnLayout columns={2} borders="horizontal">
                  <Box fontWeight="bold">Category</Box>
                  <Box>{profile?.fundProfile?.categoryName}</Box>
                  <Box fontWeight="bold">Fund Family</Box>
                  <Box>{profile?.fundProfile?.family}</Box>
                  <Box fontWeight="bold">Net Assets</Box>
                  <Box>{profile?.defaultKeyStatistics?.totalAssets.fmt}</Box>
                  <Box fontWeight="bold">YTD Daily Total Return</Box>
                  <Box>{profile?.defaultKeyStatistics?.ytdReturn?.fmt}</Box>
                  <Box fontWeight="bold">Yield</Box>
                  <Box>{profile?.defaultKeyStatistics?.yield?.fmt}</Box>
                  <Box fontWeight="bold">Legal Type</Box>
                  <Box>{profile?.fundProfile?.legalType}</Box>
                </ColumnLayout>
              </SpaceBetween>
              <SpaceBetween size="s">
                <Box fontSize="heading-m" fontWeight="heavy">
                  Fund Operations
                </Box>
                <ColumnLayout columns={2} borders="horizontal">
                  <Box fontWeight="bold">Annual Report Expense Ratio (net)</Box>
                  <Box>
                    {
                      profile?.fundProfile?.feesExpensesInvestment
                        ?.annualReportExpenseRatio?.fmt
                    }
                  </Box>
                  <Box fontWeight="bold">Holdings Turnover</Box>
                  <Box>
                    {
                      profile?.fundProfile?.feesExpensesInvestment
                        ?.annualHoldingsTurnover?.fmt
                    }
                  </Box>
                  <Box fontWeight="bold">Total Net Assets</Box>
                  <Box>
                    {
                      profile?.fundProfile?.feesExpensesInvestment
                        ?.totalNetAssets?.fmt
                    }
                  </Box>
                </ColumnLayout>
              </SpaceBetween>
            </SpaceBetween>
          </ColumnLayout>
          <SpaceBetween size="xxs">
            <Header variant="h3">Fund Summary</Header>
            <Box>{profile?.assetProfile?.longBusinessSummary}</Box>
          </SpaceBetween>
        </SpaceBetween>
      )}
    </>
  );
}

export default Profile;
