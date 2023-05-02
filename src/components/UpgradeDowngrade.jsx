import React from 'react';
import {
  SpaceBetween,
  Box,
  Container,
  Header,
  Grid,
} from '@cloudscape-design/components';
import { InfoLink, HelpPanels } from '../components/common/InfoLink';
function UpgradeDowngrade(props) {
  const {
    updown = props?.profile?.upgradeDowngradeHistory?.history?.slice(0, 6),
  } = props;
  function getActionString(action) {
    switch (action) {
      case 'main':
        return 'Maintains';
      case 'up':
        return 'Upgraded';
      case 'down':
        return 'Downgraded';
      case 'reit':
        return 'Reiterates';
      default:
        return '';
    }
  }
  return (
    <>
      {updown && (
        <Container
          header={
            <Header
              variant="h3"
              info={
                <InfoLink
                  onFollow={() =>
                    props.loadHelpPanelContent(
                      <HelpPanels
                        title="Upgrades & Downgrades"
                        des="View the Upgrades and Downgrades of the stock by hedge funds."
                      />
                    )
                  }
                />
              }
            >
              Upgrades & Downgrades
            </Header>
          }
        >
          <SpaceBetween size="m">
            {updown?.map((ud) => {
              return (
                <div
                  key={ud?.firm}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    borderBottom: '1px solid gray',
                  }}
                >
                  <div
                    style={{
                      flexBasis: '30%', // adjust the percentage as needed
                      fontWeight: 'bold',
                    }}
                  >
                    {getActionString(ud?.action)}
                  </div>
                  <div
                    style={{
                      flexBasis: '30%', // adjust the percentage as needed
                    }}
                  >
                    {ud?.firm}: {ud?.toGrade}{' '}
                  </div>
                  <div
                    style={{
                      flexBasis: '30%', // adjust the percentage as needed
                    }}
                  >
                    {new Date(ud?.epochGradeDate * 1000).toLocaleDateString()}
                  </div>
                </div>
              );
            })}
          </SpaceBetween>
        </Container>
      )}
    </>
  );
}

export default UpgradeDowngrade;
