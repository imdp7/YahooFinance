import React, { useState } from 'react';
import {
  TopNavigation,
  Input,
  Box,
  Toggle,
  FormField,
  Spinner,
  ColumnLayout,
  SpaceBetween,
  Modal,
} from '@cloudscape-design/components';
import classes from '../app.module.scss';
import {
  applyMode,
  Mode,
  Density,
  applyDensity,
  disableMotion,
} from '@cloudscape-design/global-styles';
import { connect } from 'react-redux';
import { setMode, setDensity, setMotion } from '../app/actions';
import { useNavigate } from 'react-router-dom';

interface State {
  user: string;
  signOut: () => void;
}

const mapStateToProps = (state) => {
  return {
    mode: state.mode,
    density: state.density,
    motion: state.motion,
  };
};
const mapDispatchToProps = {
  setMode,
  setDensity,
  setMotion,
};
function TopNavigations(props: State): JSX.Element {
  const [mode, setMode] = useState(false);
  const [density, setDensity] = useState(true);
  const [motion, setMotion] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [redirectURL, setRedirectURL] = useState('');
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  if (redirectURL == 'signout') {
    navigate('/');
    props.signOut();
  } else if (redirectURL == 'profile') {
    navigate('/account');
  }
  const onFollowHandler = (e) => {
    e.preventDefault();
    e.detail.id === 'preferences' ? setVisible(true) : null;
  };

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <Modal
          onDismiss={() => setVisible(false)}
          visible={visible}
          closeAriaLabel="Close modal"
          header="Preferences"
          size="medium"
        >
          <SpaceBetween size="s" direction="vertical">
            <ColumnLayout columns={3}>
              <FormField description="Light or Dark." label="Theme Mode">
                <Toggle
                  onChange={({ detail }) => {
                    setMode(detail.checked);
                    applyMode(detail.checked ? Mode.Dark : Mode.Light);
                  }}
                  checked={mode}
                  className={classes.app_header_footer}
                >
                  <Box>{mode ? 'Dark' : 'Light'}</Box>
                </Toggle>
              </FormField>
              <FormField description="Comfort or Compact." label="Density">
                <Toggle
                  onChange={({ detail }) => {
                    setDensity(detail.checked);
                    applyDensity(
                      detail.checked ? Density.Comfortable : Density.Compact
                    );
                    disableMotion(density ? true : false);
                  }}
                  checked={density}
                  className={classes.app_header_footer}
                >
                  <Box>{density ? 'Comfort' : 'Compact'}</Box>
                </Toggle>
              </FormField>
              <FormField description="True or False." label="Motion">
                <Toggle
                  onChange={({ detail }) => {
                    setMotion(detail.checked);
                    disableMotion(motion ? true : false);
                  }}
                  checked={motion}
                  className={classes.app_header_footer}
                >
                  <Box>{motion ? 'True' : 'False'}</Box>
                </Toggle>
              </FormField>
            </ColumnLayout>
          </SpaceBetween>
        </Modal>
        <TopNavigation
          identity={{
            href: '/',
            logo: {
              src: 'https://public.flourish.studio/uploads/4e293af7-8464-45d7-9428-a96963909e42.png',
              alt: 'YH',
            },
          }}
          utilities={[
            {
              type: 'button',
              iconName: 'notification',
              title: 'Notifications',
              ariaLabel: 'Notifications (unread)',
              badge: true,
              disableUtilityCollapse: false,
            },
            {
              type: 'menu-dropdown',
              text: 'Account',
              description: `${props.user}`,
              iconName: 'user-profile',
              onItemClick: (evt) => {
                setRedirectURL(evt.detail.id);
                onFollowHandler(evt);
              },
              items: [
                { id: 'profile', text: 'Profile' },
                { id: 'preferences', text: 'Preferences' },
                { id: 'security', text: 'Security' },
                {
                  id: 'support-group',
                  text: 'Support',
                  items: [
                    {
                      id: 'documentation',
                      text: 'Documentation',
                      href: '#',
                      external: true,
                      externalIconAriaLabel: ' (opens in new tab)',
                    },
                    { id: 'support', text: 'Support' },
                    {
                      id: 'feedback',
                      text: 'Feedback',
                      href: '#',
                      external: true,
                      externalIconAriaLabel: ' (opens in new tab)',
                    },
                  ],
                },
                { id: 'signout', text: 'Sign out' },
              ],
            },
          ]}
          i18nStrings={{
            searchIconAriaLabel: 'Search',
            searchDismissIconAriaLabel: 'Close search',
            overflowMenuTriggerText: 'More',
            overflowMenuTitleText: 'All',
            overflowMenuBackIconAriaLabel: 'Back',
            overflowMenuDismissIconAriaLabel: 'Close menu',
          }}
          search={
            <Input
              type="search"
              placeholder="Search for news, symbols or companies"
              ariaLabel="Search"
              value={searchValue}
              onChange={({ detail }) => setSearchValue(detail.value)}
            />
          }
        />
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNavigations);
