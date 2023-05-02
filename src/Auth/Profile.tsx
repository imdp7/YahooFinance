/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { AppFooter } from '../features/common/AppFooter';
import { AppHeader } from '../features/common/TopNavigations';
import {
  AppLayout,
  Alert,
  Button,
  Container,
  ContentLayout,
  Header,
  BreadcrumbGroup,
  SpaceBetween,
  Spinner,
  ColumnLayout,
  Box,
  Modal,
  ExpandableSection,
  FormField,
  Checkbox,
  Form,
  Input,
  Link,
  Select,
} from '@cloudscape-design/components';
import { DashboardHeader, HelpPanels } from '../features/EC2/components/header';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { appLayoutLabels } from '../features/common/labels';
import { InfoLink } from '../features/common/common';
import countryList from 'react-select-country-list';
import {
  Navigation,
  userNav,
  ProfileHeader,
} from '../features/EC2/commons/common-components';

const Account = (props) => {
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  // Refs
  const emailRef = useRef(null);
  const oldPasswordRef = useRef(null);
  const passwordRef = useRef(null);
  const rePasswordRef = useRef(null);

  const handleSubmit = async () => {
    setLoading(true);
    const timer = setTimeout(async () => {
      if (!email) {
        setErrorMessage('Please enter new email address');
        setLoading(false);
        emailRef.current.focusToolsClose();
        return;
      }
      if (!oldPassword) {
        setErrorMessage('Please enter old password');
        setLoading(false);
        oldPasswordRef.current.focus();
        return;
      }
      if (!password) {
        setErrorMessage('Please enter new password');
        setLoading(false);
        passwordRef.current.focus();
        return;
      }
      if (!rePassword) {
        setErrorMessage('Please  Re-Enter new password');
        setLoading(false);
        rePasswordRef.current.focus();
        return;
      }
      setErrorMessage('');
      setLoading(false);
      setEdit(false);
    }, 1500);
    return () => clearTimeout(timer);
  };

  const editHandler = () => {
    setEdit(true);
  };

  const CancelHandler = (evt) => {
    evt.preventDefault();
    setShowModal(true);
  };
  const defaultHandler = () => {
    setShowModal(false);
    setEdit(false);
    setEmail('');
    setOldPassword('');
    setRePassword('');
    setPassword('');
    setErrorMessage('');
  };

  return (
    <>
      <Container
        header={
          <Header
            variant="h2"
            info={
              <InfoLink
                onFollow={() =>
                  props.loadHelpPanelContent(
                    <HelpPanels
                      title="Account Settings"
                      des="Jump in where you left off and navigate to the AWS services you most recently worked with."
                      h5="To view all AWS services choose View all AWS services at the bottom of the widget."
                    />
                  )
                }
              />
            }
            actions={
              <>
                {!edit ? (
                  <Button onClick={editHandler} variant="normal">
                    Edit
                  </Button>
                ) : null}
              </>
            }
          >
            Account Settings
          </Header>
        }
      >
        {edit ? (
          <>
            <Form
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button
                    formAction="none"
                    variant="link"
                    onClick={CancelHandler}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    formAction="submit"
                    loading={loading}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </SpaceBetween>
              }
            >
              <SpaceBetween size="xs">
                <ColumnLayout borders="horizontal">
                  {errorMessage && <Alert type="error">{errorMessage}</Alert>}
                  <ColumnLayout columns={2}>
                    <FormField label="Account ID:">
                      <Input value="610741917922" disabled />
                    </FormField>
                    <FormField label="Seller:">
                      <Input value="Amazon Web Services" disabled />
                    </FormField>
                    <FormField
                      label="Enter new Email:"
                      errorText={
                        errorMessage &&
                        errorMessage.includes('new email') &&
                        errorMessage
                      }
                    >
                      <Input
                        ref={emailRef}
                        value={email}
                        inputMode="email"
                        ariaRequired
                        onChange={({ detail }) => setEmail(detail.value)}
                        placeholder="Enter New Email"
                      />
                    </FormField>
                    <FormField
                      label="Enter Old Password:"
                      errorText={
                        errorMessage &&
                        errorMessage.includes('old password') &&
                        errorMessage
                      }
                    >
                      <Input
                        ref={oldPasswordRef}
                        value={oldPassword}
                        type="password"
                        onChange={({ detail }) => setOldPassword(detail.value)}
                        placeholder="Set Old Password"
                      />
                    </FormField>
                    <FormField
                      label="Enter New Password:"
                      errorText={
                        errorMessage &&
                        errorMessage.includes('new password') &&
                        errorMessage
                      }
                    >
                      <Input
                        ref={passwordRef}
                        value={password}
                        type="password"
                        onChange={({ detail }) => setPassword(detail.value)}
                        placeholder="Set New Password"
                      />
                    </FormField>
                    <FormField
                      label="Re-Enter New Password:"
                      errorText={
                        errorMessage &&
                        errorMessage.includes('Re-Enter new password') &&
                        errorMessage
                      }
                    >
                      <Input
                        ref={rePasswordRef}
                        value={rePassword}
                        type="password"
                        onChange={({ detail }) => setRePassword(detail.value)}
                        placeholder="Re-Enter New Password"
                      />
                    </FormField>
                  </ColumnLayout>
                </ColumnLayout>
              </SpaceBetween>
            </Form>
          </>
        ) : (
          <SpaceBetween size="xs">
            <ColumnLayout borders="horizontal">
              <ColumnLayout columns={4}>
                <Box variant="awsui-key-label">Account ID:</Box>
                <Box float="left">610741917922</Box>
                <Box variant="awsui-key-label">Seller:</Box>
                <Box float="left">Amazon Web Services, Inc.</Box>
                <Box variant="awsui-key-label">Account Name:</Box>
                <Box float="left">{email || props.user}</Box>
                <Box variant="awsui-key-label">Password:</Box>
                <Box float="left">**********</Box>
              </ColumnLayout>
            </ColumnLayout>
          </SpaceBetween>
        )}
      </Container>
      <Modal
        visible={showModal}
        header="Leave page"
        closeAriaLabel="Close modal"
        onDismiss={() => setShowModal(false)}
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                variant="link"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={defaultHandler}>
                Leave
              </Button>
            </SpaceBetween>
          </Box>
        }
      >
        <Alert type="warning" statusIconAriaLabel="Warning">
          Are you sure that you want to leave the current page? The changes that
          you made won't be saved.
        </Alert>
      </Modal>
    </>
  );
};

const Information = (props) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postal, setPostal] = useState('');
  const [country, setCountry] = useState(null);
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const options = useMemo(() => countryList().getData(), []);

  // Refs
  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const postalRef = useRef(null);
  const countryRef = useRef(null);
  const phoneRef = useRef(null);

  const editHandler = () => {
    setEdit(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const timer = setTimeout(async () => {
      if (!name) {
        setErrorMessage('Please enter name');
        setLoading(false);
        nameRef.current.focus();
        return;
      }
      if (!address) {
        setErrorMessage('Please enter address');
        setLoading(false);
        addressRef.current.focus();
        return;
      }
      if (!city) {
        setErrorMessage('Please enter city');
        setLoading(false);
        cityRef.current.focus();
        return;
      }
      if (!state) {
        setErrorMessage('Please enter state');
        setLoading(false);
        stateRef.current.focus();
        return;
      }
      if (!postal) {
        setErrorMessage('Please enter postal/zip code');
        setLoading(false);
        postalRef.current.focus();
        return;
      }
      if (!country) {
        setErrorMessage('Please enter the country');
        setLoading(false);
        countryRef.current.focus();
        return;
      }
      if (!phone) {
        setErrorMessage('Please enter phone number');
        setLoading(false);
        phoneRef.current.focus();
        return;
      }
      setErrorMessage('');
      setLoading(false);
      setEdit(false);
    }, 1500);
    return () => clearTimeout(timer);
  };

  return (
    <>
      <Container
        header={
          <Header
            variant="h2"
            info={
              <InfoLink
                onFollow={() =>
                  props.loadHelpPanelContent(
                    <HelpPanels
                      title="Contact Information"
                      des="Jump in where you left off and navigate to the AWS services you most recently worked with."
                      h5="To view all AWS services choose View all AWS services at the bottom of the widget."
                    />
                  )
                }
              />
            }
            actions={
              <>
                {!edit ? (
                  <Button onClick={editHandler} variant="normal">
                    Edit
                  </Button>
                ) : null}
              </>
            }
          >
            Contact Information
          </Header>
        }
      >
        {edit ? (
          <>
            <Form
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button
                    formAction="none"
                    variant="link"
                    onClick={() => {
                      setEdit(false);
                      setName('');
                      setAddress('');
                      setCity('');
                      setState('');
                      setPostal('');
                      setCountry(null);
                      setPhone('');
                      setCompany('');
                      setWebsite('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    formAction="submit"
                    loading={loading}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </SpaceBetween>
              }
            >
              <SpaceBetween size="xs">
                <ColumnLayout borders="horizontal">
                  {errorMessage && <Alert type="error">{errorMessage}</Alert>}
                  <ColumnLayout columns={3}>
                    <FormField
                      label="Account Name:"
                      errorText={
                        errorMessage &&
                        errorMessage.includes('name') &&
                        errorMessage
                      }
                    >
                      <Input
                        value={name}
                        inputMode="text"
                        ref={nameRef}
                        ariaRequired
                        onChange={({ detail }) => setName(detail.value)}
                        placeholder="Enter Name"
                      />
                    </FormField>
                    <FormField
                      label="Address:"
                      errorText={
                        errorMessage &&
                        errorMessage.includes('address') &&
                        errorMessage
                      }
                    >
                      <Input
                        value={address}
                        ref={addressRef}
                        inputMode="text"
                        ariaRequired
                        onChange={({ detail }) => setAddress(detail.value)}
                        placeholder="Enter Address"
                      />
                    </FormField>
                    <FormField
                      label="City:"
                      errorText={
                        errorMessage &&
                        errorMessage.includes('city') &&
                        errorMessage
                      }
                    >
                      <Input
                        value={city}
                        ref={cityRef}
                        inputMode="text"
                        ariaRequired
                        onChange={({ detail }) => setCity(detail.value)}
                        placeholder="Enter City"
                      />
                    </FormField>
                    <FormField
                      label="State:"
                      errorText={
                        errorMessage &&
                        errorMessage.includes('state') &&
                        errorMessage
                      }
                    >
                      <Input
                        value={state}
                        ref={cityRef}
                        inputMode="text"
                        ariaRequired
                        onChange={({ detail }) => setState(detail.value)}
                        placeholder="Enter State"
                      />
                    </FormField>

                    <FormField
                      label="Postal Code:"
                      errorText={
                        errorMessage &&
                        errorMessage.includes('postal') &&
                        errorMessage
                      }
                    >
                      <Input
                        value={postal}
                        ref={postalRef}
                        inputMode="numeric"
                        ariaRequired
                        onChange={({ detail }) => setPostal(detail.value)}
                        placeholder="Enter Postal"
                      />
                    </FormField>
                    <FormField
                      label="Select Country"
                      errorText={
                        errorMessage &&
                        errorMessage.includes('country') &&
                        errorMessage
                      }
                    >
                      <Select
                        className="input-width-card"
                        options={options}
                        ref={countryRef}
                        errorText="Error fetching countries."
                        placeholder="Choose a country"
                        recoveryText="Retry"
                        filteringType="auto"
                        selectedAriaLabel="Selected"
                        triggerVariant="option"
                        selectedOption={country}
                        onChange={({ detail }) =>
                          setCountry(detail.selectedOption)
                        }
                      />
                    </FormField>
                    <FormField
                      label="Phone Number:"
                      errorText={
                        errorMessage &&
                        errorMessage.includes('phone') &&
                        errorMessage
                      }
                    >
                      <Input
                        value={phone}
                        inputMode="tel"
                        ref={phoneRef}
                        ariaRequired
                        onChange={({ detail }) => setPhone(detail.value)}
                        placeholder="Enter Phone"
                      />
                    </FormField>
                    <FormField label="Company Name:">
                      <Input
                        value={company}
                        inputMode="text"
                        ariaRequired
                        onChange={({ detail }) => setCompany(detail.value)}
                        placeholder="Enter Company"
                      />
                    </FormField>
                    <FormField label="Website URL:">
                      <Input
                        value={website}
                        inputMode="url"
                        ariaRequired
                        onChange={({ detail }) => setWebsite(detail.value)}
                        placeholder="Enter Website URL"
                      />
                    </FormField>
                  </ColumnLayout>
                </ColumnLayout>
              </SpaceBetween>
            </Form>
          </>
        ) : (
          <SpaceBetween size="xs">
            <ColumnLayout borders="horizontal">
              <ColumnLayout columns={4}>
                <Box variant="awsui-key-label">Full Name:</Box>
                <Box float="left">{name || '-'}</Box>
                <Box variant="awsui-key-label">Address:</Box>
                <Box float="left">{address || '-'}</Box>
                <Box variant="awsui-key-label">City:</Box>
                <Box float="left">{city || '-'}</Box>
                <Box variant="awsui-key-label">State:</Box>
                <Box float="left">{state || '-'}</Box>
                <Box variant="awsui-key-label">Postal Code:</Box>
                <Box float="left">{postal || '-'}</Box>
                <Box variant="awsui-key-label">Country:</Box>
                <Box float="left">{country?.value || '-'}</Box>
                <Box variant="awsui-key-label">Phone Number:</Box>
                <Box float="left">{phone || '-'}</Box>
                <Box variant="awsui-key-label">Company Name:</Box>
                <Box float="left">{company || '-'}</Box>
                <Box variant="awsui-key-label">Website URL:</Box>
                <Box float="left">
                  {website ? (
                    <Link href={website} external>
                      {website}
                    </Link>
                  ) : (
                    '-'
                  )}
                </Box>
              </ColumnLayout>
            </ColumnLayout>
          </SpaceBetween>
        )}
      </Container>
    </>
  );
};

const Payment = (props) => {
  const [edit, setEdit] = useState(false);
  const [currency, setCurrency] = useState({ label: 'US Dollar', value: '1' });
  const [loading, setLoading] = useState(false);

  const editHandler = () => {
    setEdit(true);
  };
  const fakeDataFetch = (delay) =>
    new Promise<void>((resolve) => setTimeout(() => resolve(), delay));

  const handleSubmit = async () => {
    setLoading(true);
    await fakeDataFetch(2500);
    setLoading(false);
    setEdit(false);
  };

  return (
    <>
      <Container
        header={
          <Header
            variant="h2"
            info={
              <InfoLink
                onFollow={() =>
                  props.loadHelpPanelContent(
                    <HelpPanels
                      title="Payment Currency Preference"
                      des="Jump in where you left off and navigate to the AWS services you most recently worked with."
                      h5="To view all AWS services choose View all AWS services at the bottom of the widget."
                    />
                  )
                }
              />
            }
            actions={
              <>
                {!edit ? (
                  <Button onClick={editHandler} variant="normal">
                    Edit
                  </Button>
                ) : null}
              </>
            }
          >
            Payment Currency Preference
          </Header>
        }
      >
        {edit ? (
          <>
            <Form
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button
                    formAction="none"
                    variant="link"
                    onClick={() => {
                      setEdit(false);
                      setCurrency(currency);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    formAction="submit"
                    loading={loading}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </SpaceBetween>
              }
            >
              <SpaceBetween size="xs">
                <ColumnLayout borders="horizontal">
                  <ColumnLayout columns={4}>
                    <FormField label="Currency:">
                      <Select
                        ariaRequired
                        onChange={({ detail }) =>
                          setCurrency(detail.selectedOption)
                        }
                        selectedOption={currency}
                        options={[
                          { label: 'US Dollar', value: '1' },
                          { label: 'Europe Euro', value: '2' },
                          { label: 'Canada CA', value: '3' },
                          { label: 'China YEN', value: '4' },
                          { label: 'India RS', value: '5' },
                        ]}
                        selectedAriaLabel="Selected"
                      />
                    </FormField>
                  </ColumnLayout>
                </ColumnLayout>
              </SpaceBetween>
            </Form>
          </>
        ) : (
          <>
            <SpaceBetween size="xs">
              <ColumnLayout borders="horizontal">
                <ColumnLayout columns={4}>
                  <Box variant="awsui-key-label">Selected Currency:</Box>
                  <Box float="left">{currency.label}</Box>
                  <Box></Box>
                </ColumnLayout>
              </ColumnLayout>
            </SpaceBetween>
          </>
        )}
      </Container>
    </>
  );
};

const CloseAccount = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [loading, setLoading] = useState(false);

  const fakeDataFetch = (delay) =>
    new Promise<void>((resolve) => setTimeout(() => resolve(), delay));

  const AlertPop = () => {
    return (
      <Alert statusIconAriaLabel="Info" header="Account Closed">
        Your account has been closed !!!
      </Alert>
    );
  };

  const closeAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fakeDataFetch(2500);
    setLoading(false);
    // AlertPop();
  };
  return (
    <SpaceBetween size="l">
      <ExpandableSection
        variant="container"
        defaultExpanded
        headerText="Close Account"
      >
        <SpaceBetween size="xs">
          <Checkbox
            onChange={({ detail }) => setChecked1(detail.checked)}
            checked={checked1}
          >
            I understand that by clicking this checkbox, I am closing my AWS
            account. The closure of my AWS account serves as notice to AWS that
            I wish to terminate the AWS Customer Agreement or any other
            agreement with AWS that governs my AWS account, solely with repect
            to that AWS account.
          </Checkbox>
          <Box>
            Monthly usage of certain AWS services is calculated and billed at
            the begninning of the following month. If I have used these types of
            services this month, then at the beginning of next month I will
            recieve a bill for usage that occurred prior to termination of my
            account. In addition, if I have any active subscriptions (such as a
            Reserved Instance for which bI have elected to pay in monthly
            installements), then even after my account is closed I may continue
            to be billed for the subscription until the subscription expires or
            is sold in accordance with the terms governing the subscription.
          </Box>
          <Box>
            I acknowledge that I may reopen my AWS account only within 90 days
            of my account closure (the "Post-Closure Period"). If I reopen my
            account during the Post-Closure Period, I may be charged for any AWS
            services thast werer not terminated beforen I closed my account. If
            I reopen my AWS account, I agree that the same terms will govern my
            access to and use of AWS services through my reopened AWS account.
          </Box>
          <Box>
            If I choose not to reopen my account the Post_Closure Period, any
            content remaining in my AWS account will be deleted. For more
            information, please see the beginning{' '}
            <Link>Amazon Web Services Account Closure page.</Link>
          </Box>
          <Checkbox
            onChange={({ detail }) => setChecked2(detail.checked)}
            checked={checked2}
          >
            I understand that after the Post-Closure Period I will no longer be
            able to reopen my closed account.
          </Checkbox>
          <Checkbox
            onChange={({ detail }) => setChecked3(detail.checked)}
            checked={checked3}
          >
            I understand that after the Post-Closure Period I will no longer be
            able to access the Billing Console to download pasts bills and tax
            invoices.
          </Checkbox>
          <Box>
            If you wish to{' '}
            <Link>download any statements you can do so here. </Link> Select the
            month and expand the summary section to download the payment
            invoices and/or tax documents.
          </Box>
          <Checkbox
            onChange={({ detail }) => setChecked4(detail.checked)}
            checked={checked4}
          >
            I understand that after the Post-Closure Period I will not be able
            to create a new AWS account with the email address currently
            associated with this account.
          </Checkbox>
          <Box>
            If you wish to update your e-mail address.{' '}
            <Link>follow the directions here. </Link>
          </Box>
          <Button
            variant="primary"
            disabled={!checked1 || !checked2 || !checked3 || !checked4}
            onClick={closeAccount}
            loading={loading}
          >
            Close Account
          </Button>
        </SpaceBetween>
      </ExpandableSection>
    </SpaceBetween>
  );
};

const Profiler = (props) => {
  return (
    <>
      <SpaceBetween size="m">
        <Account {...props} />
        <Information {...props} />
        <Payment {...props} />
        <CloseAccount {...props} />
      </SpaceBetween>
    </>
  );
};

function Profile(props) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const [toolsContent, setToolsContent] = useState(
    <HelpPanels
      title="Profile"
      des="Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides
        resizeable computing capacity&mdash;literally, servers in Amazon's data
        centers&mdash;that you use to build and host your software systems."
    />
  );

  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };
  useEffect(() => {
    document.title = 'AWS Console Profile';
  }, [location]);

  return (
    <>
      <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
        <AppHeader {...props} />
      </div>
      <AppLayout
        content={
          <Provider store={store}>
            {!loading ? (
              <ContentLayout
                header={
                  <DashboardHeader
                    loadHelpPanelContent={loadHelpPanelContent}
                    title="Profile"
                    des="Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides
                         resizeable computing capacity&mdash;literally, servers in Amazon's data
                         centers&mdash;that you use to build and host your software systems."
                  />
                }
              >
                <SpaceBetween size={'m'}>
                  <Profiler
                    loadHelpPanelContent={loadHelpPanelContent}
                    {...props}
                  />
                </SpaceBetween>
              </ContentLayout>
            ) : (
              <Spinner size="large" className="spinner" />
            )}
          </Provider>
        }
        headerSelector="#h"
        footerSelector="#f"
        navigation={
          <Navigation
            activeHref={activeHref}
            onFollow={(event) => {
              if (!event.detail.external) {
                event.preventDefault();
                setActiveHref(event.detail.href);
              }
            }}
            items={userNav}
            header={ProfileHeader}
          />
        }
        tools={toolsContent}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        contentType="table"
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Account', href: '/account' },
              { text: 'Profile', href: '/profile' },
            ]}
          />
        }
      />
      <AppFooter />
    </>
  );
}

export default Profile;
