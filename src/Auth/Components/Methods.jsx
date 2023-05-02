import React, { useState } from 'react';
import {
  Cards,
  Box,
  Button,
  TextFilter,
  Header,
  Badge,
  SpaceBetween,
  ButtonDropdown,
} from '@cloudscape-design/components';
import { useNavigate } from 'react-router-dom';

export function Methods() {
  const [selectedItems, setSelectedItems] = React.useState([
    {
      card: 'Mastercard ••••9441',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/989px-Mastercard-logo.svg.png',
      name: 'Darshan Patel',
      id_m: '123dass112a',
      expiry: '2025/02',
      type: 'Default',
    },
  ]);
  const navigate = useNavigate();
  return (
    <SpaceBetween size="m">
      <Cards
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        selectedItems={selectedItems}
        ariaLabels={{
          itemSelectionLabel: (e, n) => `select ${n.name}`,
          selectionGroupLabel: 'Item selection',
        }}
        cardDefinition={{
          header: (item) => item.card,
          sections: [
            {
              id: 'image',
              content: (item) => (
                <div>
                  <img className="card-section-image" src={item?.image} />
                </div>
              ),
            },
            {
              id: 'name',
              content: (item) => item.name,
            },
            {
              id: 'expiry',
              content: (item) => item.expiry,
            },
            {
              id: 'type',
              content: (item) =>
                item.type === 'Default' ? (
                  <Badge color="blue">{item.type}</Badge>
                ) : null,
            },
          ],
        }}
        cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 3 }]}
        items={[
          {
            card: 'Mastercard ••••9441',
            id_m: '123dass112a',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/989px-Mastercard-logo.svg.png',
            name: 'Darshan Patel',
            expiry: '2025/02',
            type: 'Default',
          },
          {
            card: 'Visa ••••6031',
            id_m: 'ajkd123jkda',
            name: 'Andy Jassy',
            expiry: '2035/01',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/2560px-Visa.svg.png',
            type: 'null',
          },
        ]}
        loadingText="Loading Payment methods"
        selectionType="single"
        trackBy="name"
        visibleSections={['card', 'image', 'name', 'expiry', 'type']}
        empty={
          <Box textAlign="center" color="inherit">
            <b>No payment methods</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              No payment methods.
            </Box>
            <Button>Add payment method</Button>
          </Box>
        }
        filter={<TextFilter filteringPlaceholder="Find payment method" />}
        header={
          <Header
            counter={
              selectedItems.length ? '(' + selectedItems.length + '/2)' : '(0)'
            }
            actions={
              <SpaceBetween direction="horizontal" size="s">
                <Button disabled={selectedItems[0].type === 'Default'}>
                  Set as default
                </Button>
                <Button
                  onClick={() =>
                    navigate(`${selectedItems[0].id_m}/edit`, {
                      state: {
                        title: 'Edit payment Details',
                        details: selectedItems[0],
                      },
                    })
                  }
                >
                  Edit
                </Button>
                <Button disabled={selectedItems[0].type === 'Default'}>
                  Delete
                </Button>
                <Button
                  variant="primary"
                  onClick={() =>
                    navigate('paymentMethod/add', {
                      state: { title: 'Add payment method' },
                    })
                  }
                >
                  Add payment method
                </Button>
              </SpaceBetween>
            }
          >
            Payment methods
          </Header>
        }
      />
    </SpaceBetween>
  );
}

export default Methods;
