import React from 'react';
import axios from 'axios';
import { key, host } from '../../api';
import {
  ColumnLayout,
  Container,
  Header,
  Box,
  Grid,
  FormField,
  ProgressBar,
  SpaceBetween,
} from '@cloudscape-design/components';
import { InfoLink, HelpPanels } from '../components/common/InfoLink';

const BASE_URL = 'https://yh-finance.p.rapidapi.com/stock/get-esg-scores?';
const KEY_URL = `&region=US&lang=en-US&rapidapi-key=${key}&x-rapidapi-host=${host}`;
function Sustainability({ symbol, profile, loadHelpPanelContent }) {
  const [sustain, setSustain] = React.useState([]);

  const fetchSustain = async () => {
    try {
      const response = await axios.get(`${BASE_URL}symbol=${symbol}${KEY_URL}`);
      const sus = response?.data?.quoteSummary?.result[0]?.esgScores;
      setSustain(sus);
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    fetchSustain();
  }, [symbol]);

  const getValue = (action) => {
    switch (action) {
      case 'false':
        return 'No';
      case 'true':
        return 'Yes';
      default:
        return '';
    }
  };
  return (
    <SpaceBetween size="m">
      <Container
        header={
          <Header
            variant="h3"
            description="Sustainalytics’ ESG Risk Ratings assess the degree to which a company’s enterprise business value is at risk driven by environmental, social and governance issues. The rating employs a two-dimensional framework that combines an assessment of a company’s exposure to industry-specific material ESG issues with an assessment of how well the company is managing those issues. The final ESG Risk Ratings scores are a measure of unmanaged risk on an absolute scale of 0-100, with a lower score signaling less unmanaged ESG Risk."
            info={
              <InfoLink
                onFollow={() =>
                  loadHelpPanelContent(
                    <HelpPanels
                      title="Environment, Social and Governance (ESG) Risk Ratings"
                      des="View the Upgrades and Downgrades of the stock by hedge funds."
                    />
                  )
                }
              />
            }
          >
            Environment, Social and Governance (ESG) Risk Ratings
          </Header>
        }
      >
        <ColumnLayout columns={4} variant="text-grid">
          <FormField
            label="Total ESG Risk score"
            constraintText={sustain?.esgPerformance}
          >
            <SpaceBetween size="m" direction="horizontal">
              <Box variant="awsui-value-large" display="inline">
                {sustain?.totalEsg?.fmt}
              </Box>
              <Box variant="awsui-key-label" display="inline">
                {sustain?.percentile?.fmt} percentile
              </Box>
            </SpaceBetween>
          </FormField>
          <FormField label="Environment Risk Score">
            <Box variant="awsui-key-label" fontSize="heading-xl">
              {sustain?.environmentScore?.fmt}
            </Box>
          </FormField>
          <FormField label="Social Risk Score">
            <Box variant="awsui-key-label" fontSize="heading-xl">
              {sustain?.socialScore?.fmt}
            </Box>
          </FormField>
          <FormField label="Governance Risk Score">
            <Box variant="awsui-key-label" fontSize="heading-xl">
              {sustain?.governanceScore?.fmt}
            </Box>
          </FormField>
        </ColumnLayout>
      </Container>
      <Container
        header={
          <Header
            variant="h3"
            counter={`(${sustain?.peerCount}) peers`}
            info={
              <InfoLink
                onFollow={() =>
                  loadHelpPanelContent(
                    <HelpPanels
                      title="Peer Performance Environment, Social and Governance (ESG) Risk Ratings"
                      des="View the Upgrades and Downgrades of the stock by hedge funds."
                    />
                  )
                }
              />
            }
          >
            Peer Performance Environment, Social and Governance (ESG) Risk
            Ratings
          </Header>
        }
      >
        <ColumnLayout columns={4} variant="text-grid">
          <FormField label="Peer ESG Risk score" stretch>
            <SpaceBetween size="xxl" direction="horizontal">
              <FormField label="Min">
                <Box fontSize="heading-s" display="inline">
                  {sustain?.peerEsgScorePerformance?.min}
                </Box>
              </FormField>
              <FormField label="Avg">
                <Box fontSize="heading-s" display="inline">
                  {sustain?.peerGovernancePerformance?.avg.toFixed(2)}
                </Box>
              </FormField>
              <FormField label="Max">
                <Box fontSize="heading-s" display="inline">
                  {sustain?.peerGovernancePerformance?.max}
                </Box>
              </FormField>
            </SpaceBetween>
          </FormField>
          <FormField label="Peer Environment Risk Score">
            <SpaceBetween size="xxl" direction="horizontal">
              <FormField label="Min">
                <Box fontSize="heading-s" display="inline">
                  {sustain?.peerEnvironmentPerformance?.min}
                </Box>
              </FormField>
              <FormField label="Avg">
                <Box fontSize="heading-s" display="inline">
                  {sustain?.peerEnvironmentPerformance?.avg.toFixed(2)}
                </Box>
              </FormField>
              <FormField label="Max">
                <Box fontSize="heading-s" display="inline">
                  {sustain?.peerEnvironmentPerformance?.max}
                </Box>
              </FormField>
            </SpaceBetween>
          </FormField>
          <FormField label="Peer Social Risk Score">
            <SpaceBetween size="xxl" direction="horizontal">
              <FormField label="Min">
                <Box fontSize="heading-s" display="inline">
                  {sustain?.peerSocialPerformance?.min}
                </Box>
              </FormField>
              <FormField label="Avg">
                <Box fontSize="heading-s" display="inline">
                  {sustain?.peerSocialPerformance?.avg.toFixed(2)}
                </Box>
              </FormField>
              <FormField label="Max">
                <Box fontSize="heading-s" display="inline">
                  {sustain?.peerSocialPerformance?.max}
                </Box>
              </FormField>
            </SpaceBetween>
          </FormField>
          <FormField label="Peer Governance Risk Score">
            <SpaceBetween size="xxl" direction="horizontal">
              <FormField label="Min">
                <Box fontSize="heading-s" display="inline">
                  {sustain?.peerGovernancePerformance?.min}
                </Box>
              </FormField>
              <FormField label="Avg">
                <Box fontSize="heading-s" display="inline">
                  {sustain?.peerGovernancePerformance?.avg.toFixed(2)}
                </Box>
              </FormField>
              <FormField label="Max">
                <Box fontSize="heading-s" display="inline">
                  {sustain?.peerGovernancePerformance?.max}
                </Box>
              </FormField>
            </SpaceBetween>
          </FormField>
        </ColumnLayout>
      </Container>
      <Grid
        gridDefinition={[
          { colspan: { l: 7, m: 7, default: 12 } },
          { colspan: { l: 5, m: 5, default: 12 } },
        ]}
      >
        <SpaceBetween size="m">
          <Container
            header={
              <Header
                variant="h3"
                description="Sustainalytics’ Controversies Research identifies companies involved in incidents and events that may negatively impact stakeholders, the environment or the company’s operations. Controversies are rated on a scale from one to five with five denoting the most serious controversies with the largest potential impact."
                info={
                  <InfoLink
                    onFollow={() =>
                      loadHelpPanelContent(
                        <HelpPanels
                          title="Controversy Level"
                          des="View the Upgrades and Downgrades of the stock by hedge funds."
                        />
                      )
                    }
                  />
                }
              >
                Controversy Level
              </Header>
            }
          >
            <SpaceBetween size="m" direction="horizontal">
              <Box fontSize="heading-xl">{sustain?.highestControversy}</Box>
              <Box>Significant Controversy level</Box>
            </SpaceBetween>
            <ProgressBar value={36} />
            <Box variant="small">
              ESG data provided by Sustainalytics, Inc. Last updated on{' '}
              {sustain?.ratingMonth}/{sustain.ratingYear}
            </Box>
          </Container>
          <Container
            header={
              <Header
                variant="h3"
                info={
                  <InfoLink
                    onFollow={() =>
                      loadHelpPanelContent(
                        <HelpPanels
                          title="Related Controversy"
                          des="View the Upgrades and Downgrades of the stock by hedge funds."
                        />
                      )
                    }
                  />
                }
              >
                Related Controversy
              </Header>
            }
          >
            <SpaceBetween size="s">
              {sustain?.relatedControversy?.map((rel, idx) => (
                <Box fontSize="heading-m" key={idx}>
                  {rel}
                </Box>
              ))}
            </SpaceBetween>
          </Container>
        </SpaceBetween>
        <Container
          header={
            <Header
              variant="h3"
              description="Flags a company’s involvement in products, services and business activities commonly used for screening purposes."
              info={
                <InfoLink
                  onFollow={() =>
                    loadHelpPanelContent(
                      <HelpPanels
                        title="Product Involvement Areas"
                        des="View the Upgrades and Downgrades of the stock by hedge funds."
                      />
                    )
                  }
                />
              }
            >
              Product Involvement Areas
            </Header>
          }
        >
          <ColumnLayout columns={2} variant="default" borders="horizontal">
            <Box variant="small">Products and Activities</Box>
            <Box variant="small">Significant Involvement</Box>
            <Box>Adult Entertainmen</Box>
            <Box>{sustain?.adult ? 'yes' : 'No'}</Box>
            <Box>Alcoholic Beverages</Box>
            <Box>{sustain?.alcoholic ? 'yes' : 'No'}</Box>
            <Box>Gambling</Box>
            <Box>{sustain?.gambling ? 'yes' : 'No'}</Box>
            <Box>Tobacco Products</Box>
            <Box>{sustain?.tobacco ? 'yes' : 'No'}</Box>
            <Box>Animal Testing</Box>
            <Box>{sustain?.animalTesting ? 'yes' : 'No'}</Box>
            <Box>Fur and Specialty Leather</Box>
            <Box>{sustain?.furLeather ? 'yes' : 'No'}</Box>
            <Box>Controversial Weapons</Box>
            <Box>{sustain?.controversialWeapons ? 'yes' : 'No'}</Box>
            <Box>Small Arms</Box>
            <Box>{sustain?.smallArms ? 'yes' : 'No'}</Box>
            <Box>Catholic Values</Box>
            <Box>{sustain?.catholic ? 'yes' : 'No'}</Box>
            <Box>GMO</Box>
            <Box>{sustain?.gmo ? 'yes' : 'No'}</Box>
            <Box>Military Contracting</Box>
            <Box>{sustain?.militaryContract ? 'yes' : 'No'}</Box>
            <Box>Nuclear</Box>
            <Box>{sustain?.nuclear ? 'yes' : 'No'}</Box>
            <Box>Pesticides</Box>
            <Box>{sustain?.pesticides ? 'yes' : 'No'}</Box>
            <Box>Thermal Coal</Box>
            <Box>{sustain?.coal ? 'yes' : 'No'}</Box>
            <Box>Palm Oil</Box>
            <Box>{sustain?.palmOil ? 'yes' : 'No'}</Box>
          </ColumnLayout>
        </Container>
      </Grid>
    </SpaceBetween>
  );
}

export default Sustainability;
