import React from 'react';
import axios from 'axios';
import { key, host } from '../../api';
import {
  SpaceBetween,
  Table,
  Box,
  Badge,
  Container,
  Grid,
  Header,
  Link,
  SideNavigation,
  FormField,
  PieChart,
  ColumnLayout,
  ExpandableSection,
  Icon,
} from '@cloudscape-design/components';
import {
  colorChartsStatusNeutral,
  colorChartsStatusHigh,
  colorChartsStatusPositive,
} from '@cloudscape-design/design-tokens';
import { useNavigate } from 'react-router-dom';
import { convertUnixTimestamp } from './Historical';
import { InfoLink, HelpPanels } from '../components/common/InfoLink';

const KEY_URL = `&region=US&rapidapi-key=${key}&x-rapidapi-host=${host}`;
function Insights(props) {
  const [insights, setInsights] = React.useState([]);
  const [activeHref, setActiveHref] = React.useState('page1');
  const [loading, setLoading] = React.useState('finished');
  const fetchInsights = async () => {
    try {
      const response = await axios.get(
        `https://yh-finance.p.rapidapi.com/stock/v3/get-insights?symbol=${props.symbol}${KEY_URL}`
      );
      const datas = response?.data?.finance?.result;
      setInsights(datas);
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    fetchInsights();
    setLoading('loading');
    const timer = setTimeout(() => {
      setLoading('finished');
    }, 1500);
    return () => clearTimeout(timer);
  }, [props.symbol]);
  const navigate = useNavigate();

  function getActionString(action) {
    switch (action) {
      case 'Bullish':
        return (
          <Box
            variant="awsui-key-label"
            color="text-status-success"
            fontSize="heading-m"
            textAlign="center"
          >
            <SpaceBetween size="s" direction="horizontal">
              <Icon name="caret-up-filled" size="medium" />
              {insights?.upsellSearchDD?.researchReports?.investmentRating}
            </SpaceBetween>
          </Box>
        );
      case 'Bearish':
        return (
          <Box
            variant="awsui-key-label"
            color="text-status-success"
            fontSize="heading-m"
            textAlign="center"
          >
            <SpaceBetween size="s" direction="horizontal">
              <Icon name="caret-down-filled" size="medium" />
              {insights?.upsellSearchDD?.researchReports?.investmentRating}
            </SpaceBetween>
          </Box>
        );
      case 'Neutral':
        return (
          <Box
            variant="awsui-key-label"
            color="text-status-inactive"
            fontSize="heading-m"
            textAlign="center"
          >
            <SpaceBetween size="s" direction="horizontal">
              <Icon name="status-pending" size="medium" />
              {insights?.upsellSearchDD?.researchReports?.investmentRating}
            </SpaceBetween>
          </Box>
        );
      default:
        return '';
    }
  }

  const Pie = (props) => {
    return (
      <Container
        footer={<Box textAlign="center">Sector Avg. {props?.footer * 10}</Box>}
        variant="stacked"
        fitHeight
      >
        <PieChart
          data={[
            {
              title: props.title,
              percentage: (props?.value * 100).toFixed(2),
              value: (props?.value * 100).toFixed(2),
              color: props?.color
                ? colorChartsStatusHigh
                : colorChartsStatusPositive,
            },
            {
              percentage: (100 - props?.value * 100).toFixed(2),
              value: (100 - props?.value * 100).toFixed(2),
              color: colorChartsStatusNeutral,
            },
          ]}
          i18nStrings={{
            detailsValue: 'Value',
            detailsPercentage: 'Percentage',
            filterLabel: 'Filter displayed data',
            filterPlaceholder: 'Filter data',
            filterSelectedAriaLabel: 'selected',
            detailPopoverDismissAriaLabel: 'Dismiss',
            legendAriaLabel: 'Legend',
            chartAriaRoleDescription: 'pie chart',
            segmentAriaRoleDescription: 'segment',
          }}
          ariaDescription="Donut chart showing generic progress."
          ariaLabel="Small donut chart"
          errorText="Error loading data."
          statusType={loading}
          hideFilter
          hideLegend
          hideTitles
          innerMetricValue={`${props?.value * 100}%`}
          loadingText="Loading chart"
          recoveryText="Retry"
          size={props?.size}
          variant="donut"
          empty={
            <Box textAlign="center" color="inherit">
              <b>No data available</b>
              <Box variant="p" color="inherit">
                There is no data available
              </Box>
            </Box>
          }
        />
        <Box textAlign="center" fontSize="heading-s" fontWeight="bold">
          {props?.title}
        </Box>
        <Box textAlign="center">{props?.des}</Box>
      </Container>
    );
  };
  return (
    <>
      <SpaceBetween size="m">
        <Grid gridDefinition={[{ colspan: 2 }, { colspan: 10 }]}>
          <SideNavigation
            activeHref={activeHref}
            onFollow={(event) => {
              if (!event.detail.external) {
                event.preventDefault();
                setActiveHref(event.detail.href);
              }
            }}
            items={[
              {
                type: 'link',
                text: 'Overview',
                href: 'page1',
                id: 'overview',
              },
              {
                type: 'link',
                text: 'Corporate Events',
                href: 'page2',
                id: 'corporate',
              },
              {
                type: 'link',
                text: 'Research Reports',
                href: 'page3',
                id: 'reports',
              },
              {
                type: 'link',
                text: 'Fair Value',
                href: 'page4',
                id: 'fairValue',
              },
              {
                type: 'link',
                text: 'Dividends',
                href: 'page5',
                id: 'dividends',
              },
              {
                type: 'link',
                text: 'Innovation',
                href: 'page6',
                id: 'innovation',
              },
              {
                type: 'link',
                text: 'Hiring Trends',
                href: 'page7',
                id: 'hiringTrend',
              },
              {
                type: 'link',
                text: 'Insider Sentiment',
                href: 'page8',
                id: 'sentiment',
              },
            ]}
          />
          {activeHref === 'page1' && (
            <Container
              header={
                <Header
                  variant="h3"
                  description="Overall score is calculated based on proprietary scores based on sector averages in key company indicators: fair value, dividends, innovation, hiring, and insider sentiment. Note: if you don't see a key indicator sub score below it is because this company's data is not currently available for that area."
                  info={
                    <InfoLink
                      onFollow={() =>
                        props.loadHelpPanelContent(
                          <HelpPanels
                            title="Company Insights"
                            des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                          />
                        )
                      }
                    />
                  }
                >
                  Company Insights Score for {props.symbol}
                </Header>
              }
            >
              <SpaceBetween size="s">
                <ColumnLayout columns={4}>
                  <Pie
                    size="medium"
                    value={insights?.companySnapshot?.company?.sustainability}
                    title="Overall Score"
                    des={'Range 0-100'}
                    footer={insights?.companySnapshot?.sector?.sustainability}
                  />
                  <Pie
                    size="medium"
                    value={insights?.companySnapshot?.company?.innovativeness}
                    title="Innovativeness"
                    footer={insights?.companySnapshot?.sector?.innovativeness}
                  />
                  <Pie
                    size="medium"
                    value={insights?.companySnapshot?.company?.hiring}
                    title="Hiring Score"
                    footer={insights?.companySnapshot?.sector?.hiring}
                  />
                  <Pie
                    size="medium"
                    value={insights?.companySnapshot?.company?.dividends}
                    color={true}
                    title="Dividend Score"
                    footer={insights?.companySnapshot?.sector?.dividends}
                  />
                  <Pie
                    size="medium"
                    value={insights?.companySnapshot?.company?.earningsReports}
                    title="Earning Reports"
                    footer={insights?.companySnapshot?.sector?.earningsReports}
                  />

                  <Pie
                    size="medium"
                    value={
                      insights?.companySnapshot?.company?.insiderSentiments
                    }
                    title="Insider Sentiment"
                    footer={
                      insights?.companySnapshot?.sector?.insiderSentiments
                    }
                  />
                </ColumnLayout>
                <Header
                  variant="h3"
                  info={
                    <InfoLink
                      onFollow={() =>
                        props.loadHelpPanelContent(
                          <HelpPanels
                            title="Fair Value recommendation of the stock"
                            des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                          />
                        )
                      }
                    />
                  }
                >
                  Recommendation
                </Header>
                <ColumnLayout columns={3} borders="all" variant="text-grid">
                  <FormField label="Target Price">
                    {insights?.recommendation?.targetPrice}
                  </FormField>
                  <FormField label="Provider">
                    {insights?.recommendation?.provider}
                  </FormField>
                  <FormField label="Rating">
                    {insights?.recommendation?.rating}
                  </FormField>
                </ColumnLayout>
              </SpaceBetween>
            </Container>
          )}
          {activeHref === 'page2' && (
            <Container
              header={
                <Header
                  variant="h2"
                  info={
                    <InfoLink
                      onFollow={() =>
                        props.loadHelpPanelContent(
                          <HelpPanels
                            title="Corporate Events"
                            des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                          />
                        )
                      }
                    />
                  }
                >
                  Corporate Events
                </Header>
              }
            >
              <SpaceBetween size="m">
                {insights?.secReports?.map((sec) => (
                  <div key={sec?.id}>
                    <Container
                      header={
                        <Header
                          variant="h3"
                          description={
                            <SpaceBetween size="m" direction="horizontal">
                              <Box float="left" fontSize="body-m">
                                {convertUnixTimestamp(sec?.filingDate)}
                              </Box>
                              <Box float="right" fontWeight="bold">
                                {sec?.type}
                              </Box>
                            </SpaceBetween>
                          }
                        >
                          <Link
                            external
                            href={sec.snapshotUrl}
                            externalIconAriaLabel="Opens in a new tab"
                            variant="primary"
                          >
                            {sec?.title}
                          </Link>
                        </Header>
                      }
                    >
                      <Box>{sec?.description}</Box>
                    </Container>
                  </div>
                ))}
              </SpaceBetween>
            </Container>
          )}
          {activeHref === 'page3' && (
            <SpaceBetween size="s">
              {insights?.upsellSearchDD?.researchReports && (
                <ExpandableSection
                  variant="container"
                  headerText="Research Reports"
                  info={
                    <InfoLink
                      onFollow={() =>
                        props.loadHelpPanelContent(
                          <HelpPanels
                            title="Research Reports"
                            des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                          />
                        )
                      }
                    />
                  }
                  defaultExpanded
                >
                  <SpaceBetween size="s">
                    <Container
                      footer={getActionString(
                        insights?.upsellSearchDD?.researchReports
                          ?.investmentRating
                      )}
                    >
                      <SpaceBetween size="xs">
                        <Box>
                          <Box
                            fontSize="heading-m"
                            fontWeight="bold"
                            float="left"
                          >
                            {insights?.upsellSearchDD?.researchReports?.title}
                          </Box>
                          <Box float="right">
                            {
                              insights?.upsellSearchDD?.researchReports
                                ?.provider
                            }
                          </Box>
                        </Box>
                        <Box>
                          {insights?.upsellSearchDD?.researchReports?.summary}
                        </Box>
                      </SpaceBetween>
                    </Container>
                  </SpaceBetween>
                </ExpandableSection>
              )}
              {insights?.reports && (
                <ExpandableSection
                  variant="container"
                  headerText="Reports"
                  defaultExpanded
                >
                  <SpaceBetween size="s">
                    {insights?.reports?.map((report) => (
                      <Container key={report?.id}>
                        <SpaceBetween size="xs">
                          <Box>
                            <Box
                              fontSize="heading-m"
                              fontWeight="bold"
                              float="left"
                            >
                              {report?.headHtml}
                            </Box>
                            <Box float="right">{report?.provider}</Box>
                          </Box>
                          <Box>{report?.reportTitle}</Box>
                          <SpaceBetween size="m" direction="horizontal">
                            {report.tickers.map((ticker) => (
                              <div key={Object.values(ticker)}>
                                <Link href={`/stocks/${ticker}`}>
                                  <Badge className="badge-style" color="blue">
                                    {ticker}
                                  </Badge>
                                </Link>
                              </div>
                            ))}
                          </SpaceBetween>
                        </SpaceBetween>
                      </Container>
                    ))}
                  </SpaceBetween>
                </ExpandableSection>
              )}
            </SpaceBetween>
          )}
          {activeHref === 'page4' && (
            <SpaceBetween size="m">
              <Container
                header={
                  <Header
                    variant="h3"
                    info={
                      <InfoLink
                        onFollow={() =>
                          props.loadHelpPanelContent(
                            <HelpPanels
                              title="Technical Events"
                              des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                            />
                          )
                        }
                      />
                    }
                  >
                    Technical Events
                  </Header>
                }
              >
                <SpaceBetween size="s">
                  <ColumnLayout columns={2} borders="all">
                    <FormField label="Provider">
                      <Box>
                        {insights?.instrumentInfo?.technicalEvents?.provider
                          ? insights?.instrumentInfo?.technicalEvents?.provider
                          : '-'}
                      </Box>
                    </FormField>
                    <FormField label="Sector">
                      <Box>
                        {insights?.instrumentInfo?.technicalEvents?.sector
                          ? insights?.instrumentInfo?.technicalEvents?.sector
                          : '-'}
                      </Box>
                    </FormField>
                  </ColumnLayout>
                </SpaceBetween>
              </Container>
              <Container
                header={
                  <Header
                    variant="h3"
                    info={
                      <InfoLink
                        onFollow={() =>
                          props.loadHelpPanelContent(
                            <HelpPanels
                              title="Short Term Outlook"
                              des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                            />
                          )
                        }
                      />
                    }
                  >
                    Short Term Outlook
                  </Header>
                }
              >
                <ColumnLayout columns={4} borders="all" variant="text-grid">
                  <FormField label="State Description">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.shortTermOutlook?.stateDescription
                    }
                  </FormField>
                  <FormField label="Direction">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.shortTermOutlook?.direction
                    }
                  </FormField>
                  <FormField label="Score">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.shortTermOutlook?.score
                    }
                  </FormField>
                  <FormField label="Score Description">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.shortTermOutlook?.scoreDescription
                    }
                  </FormField>
                  <FormField label="Sector Direction">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.shortTermOutlook?.sectorDirection
                    }
                  </FormField>
                  <FormField label="Sector Score">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.shortTermOutlook?.sectorScore
                    }
                  </FormField>
                  <FormField label="Sector Score Description">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.shortTermOutlook?.sectorScoreDescription
                    }
                  </FormField>
                  <FormField label="Index Direction">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.shortTermOutlook?.indexDirection
                    }
                  </FormField>
                  <FormField label="Index Score">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.shortTermOutlook?.indexScore
                    }
                  </FormField>
                  <FormField label="Index Score Description">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.shortTermOutlook?.indexScoreDescription
                    }
                  </FormField>
                </ColumnLayout>
              </Container>
              <Container
                header={
                  <Header
                    variant="h3"
                    info={
                      <InfoLink
                        onFollow={() =>
                          props.loadHelpPanelContent(
                            <HelpPanels
                              title="Intermediate Term Outlook"
                              des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                            />
                          )
                        }
                      />
                    }
                  >
                    Intermediate Term Outlook
                  </Header>
                }
              >
                <ColumnLayout columns={4} borders="all" variant="text-grid">
                  <FormField label="State Description">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.intermediateTermOutlook?.stateDescription
                    }
                  </FormField>
                  <FormField label="Direction">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.intermediateTermOutlook?.direction
                    }
                  </FormField>
                  <FormField label="Score">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.intermediateTermOutlook?.score
                    }
                  </FormField>
                  <FormField label="Score Description">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.intermediateTermOutlook?.scoreDescription
                    }
                  </FormField>
                  <FormField label="Sector Direction">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.intermediateTermOutlook?.sectorDirection
                    }
                  </FormField>
                  <FormField label="Sector Score">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.intermediateTermOutlook?.sectorScore
                    }
                  </FormField>
                  <FormField label="Sector Score Description">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.intermediateTermOutlook?.sectorScoreDescription
                    }
                  </FormField>
                  <FormField label="Index Direction">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.intermediateTermOutlook?.indexDirection
                    }
                  </FormField>
                  <FormField label="Index Score">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.intermediateTermOutlook?.indexScore
                    }
                  </FormField>
                  <FormField label="Index Score Description">
                    {
                      insights?.instrumentInfo?.technicalEvents
                        ?.intermediateTermOutlook?.indexScoreDescription
                    }
                  </FormField>
                </ColumnLayout>
              </Container>
              <Container
                header={
                  <Header
                    variant="h3"
                    info={
                      <InfoLink
                        onFollow={() =>
                          props.loadHelpPanelContent(
                            <HelpPanels
                              title="Long Term Outlook"
                              des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                            />
                          )
                        }
                      />
                    }
                  >
                    Long Term Outlook
                  </Header>
                }
              >
                <ColumnLayout columns={4} borders="all" variant="text-grid">
                  <FormField label="State Description">
                    {
                      insights?.instrumentInfo?.technicalEvents?.longTermOutlook
                        ?.stateDescription
                    }
                  </FormField>
                  <FormField label="Direction">
                    {
                      insights?.instrumentInfo?.technicalEvents?.longTermOutlook
                        ?.direction
                    }
                  </FormField>
                  <FormField label="Score">
                    {
                      insights?.instrumentInfo?.technicalEvents?.longTermOutlook
                        ?.score
                    }
                  </FormField>
                  <FormField label="Score Description">
                    {
                      insights?.instrumentInfo?.technicalEvents?.longTermOutlook
                        ?.scoreDescription
                    }
                  </FormField>
                  <FormField label="Sector Direction">
                    {
                      insights?.instrumentInfo?.technicalEvents?.longTermOutlook
                        ?.sectorDirection
                    }
                  </FormField>
                  <FormField label="Sector Score">
                    {
                      insights?.instrumentInfo?.technicalEvents?.longTermOutlook
                        ?.sectorScore
                    }
                  </FormField>
                  <FormField label="Sector Score Description">
                    {
                      insights?.instrumentInfo?.technicalEvents?.longTermOutlook
                        ?.sectorScoreDescription
                    }
                  </FormField>
                  <FormField label="Index Direction">
                    {
                      insights?.instrumentInfo?.technicalEvents?.longTermOutlook
                        ?.indexDirection
                    }
                  </FormField>
                  <FormField label="Index Score">
                    {
                      insights?.instrumentInfo?.technicalEvents?.longTermOutlook
                        ?.indexScore
                    }
                  </FormField>
                  <FormField label="Index Score Description">
                    {
                      insights?.instrumentInfo?.technicalEvents?.longTermOutlook
                        ?.indexScoreDescription
                    }
                  </FormField>
                </ColumnLayout>
              </Container>
              <Container
                header={
                  <Header
                    variant="h3"
                    info={
                      <InfoLink
                        onFollow={() =>
                          props.loadHelpPanelContent(
                            <HelpPanels
                              title="Key Technicals"
                              des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                            />
                          )
                        }
                      />
                    }
                  >
                    Key techincals
                  </Header>
                }
              >
                <ColumnLayout columns={4} borders="all">
                  <FormField label="Provider">
                    <Box>
                      {insights?.instrumentInfo?.keyTechnicals?.provider
                        ? insights?.instrumentInfo?.keyTechnicals?.provider
                        : '-'}
                    </Box>
                  </FormField>
                  <FormField label="Support">
                    <Box>
                      {insights?.instrumentInfo?.keyTechnicals?.support
                        ? insights?.instrumentInfo?.keyTechnicals?.support
                        : '-'}
                    </Box>
                  </FormField>
                  <FormField label="Resistance">
                    <Box>
                      {insights?.instrumentInfo?.keyTechnicals?.resistance
                        ? insights?.instrumentInfo?.keyTechnicals?.resistance
                        : '-'}
                    </Box>
                  </FormField>
                  <FormField label="Stop Loss">
                    <Box>
                      {insights?.instrumentInfo?.keyTechnicals?.stopLoss
                        ? insights?.instrumentInfo?.keyTechnicals?.stopLoss
                        : '-'}
                    </Box>
                  </FormField>
                </ColumnLayout>
              </Container>
              <Container
                header={
                  <Header
                    variant="h3"
                    info={
                      <InfoLink
                        onFollow={() =>
                          props.loadHelpPanelContent(
                            <HelpPanels
                              title="Valuation"
                              des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                            />
                          )
                        }
                      />
                    }
                  >
                    Valuation
                  </Header>
                }
              >
                <ColumnLayout columns={4} borders="all">
                  <FormField label="Provider">
                    <Box>
                      {insights?.instrumentInfo?.valuation?.provider
                        ? insights?.instrumentInfo?.valuation?.provider
                        : '-'}
                    </Box>
                  </FormField>
                  <FormField label="Description">
                    <Box>
                      {insights?.instrumentInfo?.valuation?.description
                        ? insights?.instrumentInfo?.valuation?.description
                        : '-'}
                    </Box>
                  </FormField>
                  <FormField label="Discount">
                    <Box>
                      {insights?.instrumentInfo?.valuation?.discount
                        ? insights?.instrumentInfo?.valuation?.discount
                        : '-'}
                    </Box>
                  </FormField>
                  <FormField label="Relative Value">
                    <Box>
                      {insights?.instrumentInfo?.valuation?.relativeValue
                        ? insights?.instrumentInfo?.valuation?.relativeValue
                        : '-'}
                    </Box>
                  </FormField>
                </ColumnLayout>
              </Container>
            </SpaceBetween>
          )}
          {activeHref === 'page7' && (
            <SpaceBetween size="s">
              {insights?.sigDevs && (
                <Container
                  header={
                    <Header
                      variant="h3"
                      info={
                        <InfoLink
                          onFollow={() =>
                            props.loadHelpPanelContent(
                              <HelpPanels
                                title="Hiring Trends"
                                des="View the Stock profile data of Summary, Insights, Chart, Statistics, Historical data, Profile, Financials, Analysis, Options, Holders, Sustainability."
                              />
                            )
                          }
                        />
                      }
                    >
                      Hiring Trends
                    </Header>
                  }
                >
                  <SpaceBetween size="m">
                    {insights?.sigDevs?.map((hiring, idx) => (
                      <div key={idx}>
                        <Container
                          header={<Header variant="h4">{hiring?.date}</Header>}
                        >
                          {hiring?.headline}
                        </Container>
                      </div>
                    ))}
                  </SpaceBetween>
                </Container>
              )}
            </SpaceBetween>
          )}
        </Grid>
      </SpaceBetween>
    </>
  );
}

export default Insights;
