import React from 'react'
import {TopNavigation} from "@cloudscape-design/components";

function CommonHeader(props) {
  return (
    <div>
	<TopNavigation
      identity={{
        href: "/",
        logo: {
          src:
            "https://public.flourish.studio/uploads/4e293af7-8464-45d7-9428-a96963909e42.png",
          alt: "YH"
        }
      }}
      utilities={[
	{
          type: "button",
          text: "Plans",
          href: "#",
        },
	{
          type: "button",
          text: "Features",
          href: "#",
        },
	{
          type: "button",
          text: "Yahoo Plus Perks",
          href: "#",
        },
	{
          type: "button",
          text: "FAQ",
          href: "#",
        },
	{
          type: "button",
          text: "Try 14 days free",
	        variant:`primary-button`,
          href: "/checkout",
        },
        {
          type: "menu-dropdown",
          text: "Account",
          description: props.user,
          iconName: "user-profile",
          items: [
            { id: "profile", text: "Profile" },
            { id: "preferences", text: "Preferences" },
            {
              id: "support-group",
              text: "Support",
              items: [
                { id: "support", text: "Support" },
                {
                  id: "feedback",
                  text: "Feedback",
                  href: "#",
                  external: true,
                  externalIconAriaLabel:
                    " (opens in new tab)"
                }
              ]
            },
            { id: "signout", text: "Sign out" }
          ]
        }
      ]}
      i18nStrings={{
        searchIconAriaLabel: "Search",
        searchDismissIconAriaLabel: "Close search",
        overflowMenuTriggerText: "More",
        overflowMenuTitleText: "All",
        overflowMenuBackIconAriaLabel: "Back",
        overflowMenuDismissIconAriaLabel: "Close menu"
      }}
    />
    </div>
  )
}

export default CommonHeader