import * as React from 'react';
import { Cards, Header, Box, Link } from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

const fixedDigit = (str) => str?.toFixed(2);
const Card = ({ complete }) => {
  const navigate = useNavigate();
  return (
    <Cards
      cardDefinition={{
        header: (item) => (
          <Link
            onFollow={() =>
              navigate(`/watchlist/${item?.slug}`, {
                state: { pfId: item?.pfId, userId: item?.userId, state: item },
              })
            }
          >
            {item.name}
          </Link>
        ),
        sections: [
          {
            id: 'image',
            content: (e) => (
              <img
                src={e?.iconUrl}
                alt={e.name}
                style={{ maxWidth: '200px', borderRadius: '10px' }}
              />
            ),
          },
          {
            id: 'dailyPercentGain',
            header: `Today's change %`,
            content: (e) => (
              <span
                style={{
                  color: e.dailyPercentGain < 0 ? 'red' : 'green',
                }}
              >
                {fixedDigit(e.dailyPercentGain)}
              </span>
            ),
          },
          {
            id: 'symbolCount',
            header: 'Total Symbols',
            content: (e) => e.symbolCount,
          },
          {
            id: 'followerCount',
            header: 'People Following',
            content: (e) => e.followerCount,
          },
        ],
      }}
      cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 4 }]}
      items={complete}
      loadingText="Loading resources"
      trackBy="name"
      visibleSections={[
        'dailyPercentGain',
        'followerCount',
        'image',
        'symbolCount',
      ]}
      empty={
        <Box textAlign="center" color="inherit">
          <b>No resources</b>
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            No resources to display.
          </Box>
        </Box>
      }
      header={<Header>Similar Lists</Header>}
    />
  );
};

export default Card;
