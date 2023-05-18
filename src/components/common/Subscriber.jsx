import React from 'react'
import {Cards, Box,SpaceBetween} from '@cloudscape-design/components'
function Subscriber() {
  return (
    <SpaceBetween size="m">
	<Cards
      cardDefinition={{
        sections: [
		{
            id: "image",
            content: (e) => (
		<img src={e.image} width="50%" style={{display: 'block', marginLeft:'auto',marginRight:'auto'}} />
            )
          },
          {
            id: "description",
            content: e => (
		<Box textAlign='center'>
		{e.description}
		</Box>
		)
          },
          {
            id: "type",
            header: "Type",
            content: e => e.type
          },
          {
            id: "size",
            header: "Size",
            content: e => e.size
          }
        ]
      }}
      cardsPerRow={[
        { cards: 1 },
        { minWidth: 500, cards: 3 }
      ]}
      items={[
        {
          name: "Ad-Free",
          alt: "Second",
          description: "Enjoy your favorite Yahoo sites and apps without the ads.†",
	  image: 'https://www.pinclipart.com/picdir/big/382-3823744_ipad-clipart-transparent-background-computer-icon-png.png',
        },
	{
          name: "24/7 Account Support",
          alt: "second",
	  description: 'Around-the-clock access to live support for general Yahoo account issues.',
	  image: 'https://www.svgrepo.com/show/86397/question-mark-button.svg',
        },
        {
          name: "Buy More. Save More.",
          alt: "Third",
          description: "Unlock extra savings when you buy more subscriptions. Get up to 20% off eligible Yahoo Plus products.",
	  image: 'https://www.svgrepo.com/show/86397/question-mark-button.svg',
        },
      ]}
      loadingText="Loading resources"
      visibleSections={["image","description"]}
      empty={
        <Box textAlign="center" color="inherit">
          <b>No resources</b>
          <Box
            padding={{ bottom: "s" }}
            variant="p"
            color="inherit"
          >
            No resources to display.
          </Box>
        </Box>
      }
    />
    <SpaceBetween size="m">
            <Box textAlign="center" fontSize="heading-s">
	    †Due to contractual obligations related to certain ad types, you may encounter minimal ads from time to time on certain properties
            </Box>
            <Box textAlign="center" fontSize="heading-s">
              ‡ If your account was created through AT&T or Frontier, please
              contact your applicable Internet Service Provider for
              account-related support, including password resets and updating
              account information. View our help article for more information.
            </Box>
            <Box textAlign="center" fontSize="heading-s">
              ✣ Buy more and save more on eligible Yahoo Plus subscriptions—get
              10%, 15% or 20% off your subscription fee. Terms apply.
            </Box>
          </SpaceBetween>
    </SpaceBetween>
  )
}

export default Subscriber