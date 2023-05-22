import React, { useState, useMemo, useRef } from "react";
import {
  Container,
  Header,
  SpaceBetween,
  Grid,
  Input,
  Tiles,
  DatePicker,
  FormField,
  Checkbox,
  Button,
  Modal,
  Box,
  Select,
  Alert,
  ColumnLayout,
} from "@cloudscape-design/components";
import countryList from "react-select-country-list";
import { useNavigate } from "react-router-dom";
import Stripe from "stripe";

// write a function to add validation webhook for stripe payments

const Content = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [type, setType] = useState({ value: "1" });
  const [method, setMethod] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");
  const [cvc, setCVC] = useState(null);
  const [name, setName] = useState("");
  const [defaultCard, setDefaultCard] = useState(false);
  const [nameBilling, setNameBilling] = useState("");
  const [company, setCompany] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [country, setCountry] = useState({});
  const [routing, setRouting] = useState(null);
  const [account_type, setAccount_Type] = useState({
    value: "checking",
    label: "Checking",
  });
  const [accountNo, setAccountNo] = useState(null);
  const [reAccountNo, setReAccountNo] = useState(null);
  const [accountName, setAccountName] = useState(null);
  const [status, setStatus] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const stripe = new Stripe(
    "sk_test_51FrsMEJyECnw5rCL4g5bJkAmDbIWUonjxMQG1h6NDhCaDQ9e29456MxLFFmWRZCf30PZILvtaP0J4FXvHdieWO8e0092YqW109"
  );
  const [showModal, setShowModal] = useState(false);
  const [dirty, setDirty] = useState(false);
  const methodRef = useRef(null);
  const cardNumberRef = useRef(null);
  const dateRef = useRef(null);
  const cvcRef = useRef(null);
  const nameRef = useRef(null);
  const RoutingRef = useRef(null);
  const AccountTypeRef = useRef(null);
  const AccountNoRef = useRef(null);
  const ReAccountNoRef = useRef(null);
  const nameBillingRef = useRef(null);
  const AccountNameRef = useRef(null);
  const address1Ref = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipCodeRef = useRef(null);
  const countryRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const SUBSCRIPTION_PRICE_YEARLY = "price_1N7r8FJyECnw5rCLUwCwCja4"; // IN CENTS ($350)
  const SUBSCRIPTION_PRICE_MONTHLY = "price_1N7OjXJyECnw5rCLBmaZlSgj"; // IN CENTS ($35)
  async function handleSubmit() {
    try {
      setLoading(true);

      // Validate form fields
      if (!method) throw new Error("Please select a method to add");
      if (method === "card") {
        if (!cardNumber) throw new Error("Please enter valid card number");
        if (!date) throw new Error("Please enter the expiration date");
        if (!cvc) throw new Error("Please enter the 3 digit security code");
        if (!name) throw new Error("Please enter the name on the card");
        if (!nameBilling) throw new Error("Please enter the billing name");
        if (!country.value) throw new Error("Please select billing country");
        if (!address1) throw new Error("Please enter billing address street");
        if (!city) throw new Error("Please enter billing city");
        if (!state) throw new Error("Please enter billing state");
        if (!zipCode)
          throw new Error("Please enter billing zip code / postal code");
        if (!phone) throw new Error("Please enter billing phone number");
        if (!email) throw new Error("Please enter email address");
      } else if (method === "bank") {
        if (!account_type)
          throw new Error("Please select the bank account type");
        if (!routing) throw new Error("Please enter the bank routing number");
        if (!accountNo) throw new Error("Please enter the bank account number");
        if (!reAccountNo)
          throw new Error("Please re-enter the bank account number");
        if (!accountName) throw new Error("Please enter the bank account name");
        if (!nameBilling) throw new Error("Please enter the billing name");
        if (!country.value) throw new Error("Please select billing country");
        if (!address1) throw new Error("Please enter billing address street");
        if (!city) throw new Error("Please enter billing city");
        if (!state) throw new Error("Please enter billing state");
        if (!zipCode)
          throw new Error("Please enter billing zip code / postal code");
        if (!phone) throw new Error("Please enter billing phone number");
        if (!email) throw new Error("Please enter email address");
      } else {
        throw new Error(`Unknown payment method: ${method}`);
      }
      setErrorMessage("");
      // Create payment method
      let paymentMethod;
      if (method === "card") {
        paymentMethod = await stripe.paymentMethods.create({
          type: "card",
          card: {
            number: cardNumber,
            exp_year: date.split("-")[0],
            exp_month: date.split("-")[1],
            cvc: cvc,
          },
          billing_details: {
            address: {
              city: city,
              country: country?.value,
              line1: address1,
              line2: address2,
              postal_code: zipCode,
              state: state,
            },
            email: email,
            name: name,
            phone: phone,
          },
        });
      } else if (method === "bank") {
        paymentMethod = await stripe.paymentMethods.create({
          type: "us_bank_account",
          us_bank_account: {
            account_holder_type: "individual",
            account_number: accountNo,
            account_type: account_type?.value,
            routing_number: routing,
          },
          billing_details: {
            address: {
              city: city,
              country: country?.value,
              line1: address1,
              line2: address2,
              postal_code: zipCode,
              state: state,
            },
            email: email,
            name: accountName,
            phone: phone,
          },
        });
      }
      try {
        const planPrice =
          type === "1" ? SUBSCRIPTION_PRICE_YEARLY : SUBSCRIPTION_PRICE_MONTHLY;
        const customer = await stripe.customers.list({
          email: email,
          limit: 1,
        });
      
        if (customer.data.length > 0) {
          // Customer already exists, do not proceed with payment
          setErrorMessage("Customer already exists, login to make the payment");
          return false;
        } else {
          try {
            // Customer does not exist, proceed with payment
            // Create a new customer
            const newCustomer = await stripe.customers.create({
              email: email,
              name: name,
              payment_method: paymentMethod.id,
              invoice_settings: {
                default_payment_method: paymentMethod.id,
              },
            });
            const subscription = await stripe.subscriptions.create({
              customer: newCustomer.id,
              description: `Plan - ${type}`,
              trial_period_days: 14,
              items: [
                {
                  price: planPrice,
                },
              ],
            });
      
            // Send invoices and receipt to the customer
            const invoice = await stripe.invoices.create({
              customer: newCustomer.id,
              subscription: subscription.id,
              collection_method: "send_invoice",
              days_until_due: 2, //Number of days before invoice is due
            });
            await stripe.invoices.sendInvoice(invoice.id);
            setStatus("success");
      
            // Create a subscription object
            const subscriptions = {
              customer: newCustomer,
              subType: subscription,
              invoice: invoice,
              subscriptionStatus: "success",
            };
      
            // Send the subscription data to the server
            const response = await fetch("http://127.0.0.1:3000/api/subscribe", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ subscriptions }),
            });
      
            console.log(response)
            if (response.ok) {
              alert("Subscription successful");
              // Handle success, such as redirecting to a success page
            } else {
              alert("Subscription failed");
              // Handle failure, such as displaying an error message
            }
          } catch (error) {
            setErrorMessage("Payment failed:", error);
          }
        }
      } catch (e) {
        setErrorMessage(e.message);
      }       
    } catch (error) {
      setErrorMessage(error.message);
      setError(true);
      if (error.message === "Please enter valid card number") {
        focusOnError(cardNumberRef);
      } else if (error.message === "Please enter the expiration date") {
        focusOnError(dateRef);
      } else if (error.message === "Please enter the 3 digit security code") {
        focusOnError(cvcRef);
      } else if (error.message === "Please enter the name on the card") {
        focusOnError(nameRef);
      } else if (error.message === "Please enter the billing name") {
        focusOnError(nameBillingRef);
      } else if (error.message === "Please select billing country") {
        focusOnError(countryRef);
      } else if (error.message === "Please select the bank account type") {
        focusOnError(AccountTypeRef);
      } else if (error.message === "Please enter the bank routing number") {
        focusOnError(RoutingRef);
      } else if (error.message === "Please enter the bank account number") {
        focusOnError(AccountNoRef);
      } else if (error.message === "Please re-enter the bank account number") {
        focusOnError(ReAccountNoRef);
      } else if (error.message === "Please enter the bank account name") {
        focusOnError(AccountNameRef);
      } else if (error.message === "Please enter the billing name") {
        focusOnError(AccountNameRef);
      } else if (error.message === "Please enter billing address street") {
        focusOnError(address1Ref);
      } else if (error.message === "Please enter billing city") {
        focusOnError(cityRef);
      } else if (error.message === "Please enter billing state") {
        focusOnError(stateRef);
      } else if (
        error.message === "Please enter billing Zip code / postal code"
      ) {
        focusOnError(zipCodeRef);
      } else if (error.message === "Please enter billing phone number") {
        focusOnError(phoneRef);
      }
    } finally {
      setLoading(false);
    }
  }
  function focusOnError(ref) {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }
  const onNavigate = (evt) => {
    // keep the locked href for our demo pages
    evt.preventDefault();
    setDirty(true);
    setShowModal(true);
  };

  const capital = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <SpaceBetween size="m">
      {/* <Modal
        onDismiss={() => setVisible(false)}
        visible={visible}
        closeAriaLabel="Close modal"
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="primary" onClick={() => navigate(-1)}>
                Back to Payment preferences
              </Button>
            </SpaceBetween>
          </Box>
        }
        header={
          capital(`${confirmationData.funding || confirmationData.type}`) +
          " " +
          "card added successfully"
        }>
        <ColumnLayout columns={2}>
          <FormField label="Card Type">
            <Box>{capital(`${confirmationData.brand}`)}</Box>
          </FormField>
          <FormField label="Last 4 digits">
            <Box>
              {capital(
                `${
                  confirmationData?.last4 ||
                  confirmationData?.us_bank_account?.last4
                }`
              )}
            </Box>
          </FormField>
          <FormField label="Confirmation Number">
            <Box>{confirmationData.fingerprint}</Box>
          </FormField>
        </ColumnLayout>
      </Modal> */}
      <Grid
        gridDefinition={[
          { colspan: { l: 8, m: 8, default: 12 } },
          { colspan: { l: 4, m: 4, default: 12 } },
        ]}>
        <SpaceBetween size="m">
          <Container header={<Header variant="h2">Billing Option</Header>}>
            <Tiles
              onChange={({ detail }) => setType(detail.value)}
              value={type}
              columns={2}
              items={[
                {
                  label: "Billed annually",
                  value: "1",
                  description: "$350.00 per year",
                },
                {
                  label: "Billed monthly",
                  value: "2",
                  description: "$35.00 per month",
                },
              ]}
            />
          </Container>
          <Container
            header={<Header variant="h2">Choose a payment method type</Header>}>
            <SpaceBetween size="m">
              <Tiles
                ref={methodRef}
                onChange={({ detail }) => setMethod(detail.value)}
                value={method}
                columns={2}
                items={[
                  {
                    label: "Credit or debit card",
                    value: "card",
                    description:
                      "All major credit and debit cards are accepted.",
                  },
                  {
                    label: "Bank account (ACH)",
                    value: "bank",
                    description:
                      "Major bank account can be linked for recurring payments",
                  },
                ]}
              />
            </SpaceBetween>
          </Container>
          {method == "card" && (
            <SpaceBetween size="m">
              <Container
                header={
                  <Header variant="h2" fitHeight>
                    Card Information
                  </Header>
                }>
                <SpaceBetween size="m">
                  <FormField
                    label="Card number"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("card number") &&
                      errorMessage
                    }>
                    <Input
                      ref={cardNumberRef}
                      step={1}
                      className="input-width-card"
                      value={cardNumber}
                      type="number"
                      onChange={({ detail }) => {
                        detail.value.length <= 16
                          ? setCardNumber(detail.value)
                          : setError(false);
                      }}
                    />
                  </FormField>
                  <FormField
                    label="Expiry date"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("expiration date") &&
                      errorMessage
                    }>
                    <DatePicker
                      ref={dateRef}
                      step={2}
                      onChange={({ detail }) => {
                        setDate(detail.value);
                      }}
                      value={date}
                      openCalendarAriaLabel={(selectedDate) =>
                        "Choose certificate expiry date" +
                        (selectedDate
                          ? `, selected date is ${selectedDate}`
                          : "")
                      }
                      nextMonthAriaLabel="Next month"
                      placeholder="YYYY/MM/DD"
                      previousMonthAriaLabel="Previous month"
                      todayAriaLabel="Today"
                    />
                  </FormField>
                  <FormField
                    label="CVC"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("security code") &&
                      errorMessage
                    }>
                    <Input
                      step={3}
                      ref={cvcRef}
                      className="input-width-number"
                      value={cvc}
                      inputMode="numeric"
                      type="number"
                      onChange={({ detail }) => {
                        detail.value.length <= 4
                          ? setCVC(detail.value)
                          : setError(true);
                      }}
                    />
                  </FormField>
                  <FormField
                    label="Name on card"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("name on the card") &&
                      errorMessage
                    }>
                    <Input
                      className="input-width-name"
                      step={4}
                      ref={nameRef}
                      value={name}
                      onChange={({ detail }) => {
                        detail.value !== 0 && setName(detail.value);
                      }}
                    />
                  </FormField>
                  <Checkbox
                    checked={defaultCard}
                    onChange={({ detail }) => setDefaultCard(detail.checked)}>
                    Set as default payment method
                  </Checkbox>
                </SpaceBetween>
              </Container>

              <Container
                header={<Header variant="h2">Billing information</Header>}>
                <SpaceBetween size="m">
                  <FormField
                    label="Full name"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("billing name") &&
                      errorMessage
                    }>
                    <Input
                      className="input-width-card"
                      ref={nameBillingRef}
                      value={nameBilling}
                      step={5}
                      onChange={({ detail }) => setNameBilling(detail.value)}
                    />
                  </FormField>
                  <FormField label="Company - optional">
                    <Input
                      className="input-width-card"
                      value={company}
                      step={6}
                      onChange={({ detail }) => setCompany(detail.value)}
                    />
                  </FormField>
                  <FormField
                    label="Select Country"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("billing country") &&
                      errorMessage
                    }>
                    <Select
                      className="input-width-card"
                      options={options}
                      ref={countryRef}
                      step={7}
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
                    label="Address"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("billing address") &&
                      errorMessage
                    }>
                    <SpaceBetween size="xs">
                      <Input
                        className="input-width-card"
                        value={address1}
                        ref={address1Ref}
                        step={8}
                        onChange={({ detail }) => setAddress1(detail.value)}
                      />
                      <Input
                        className="input-width-card"
                        value={address2}
                        step={9}
                        placeholder="Apartment, suite, unit floor, etc."
                        onChange={({ detail }) => setAddress2(detail.value)}
                      />
                    </SpaceBetween>
                  </FormField>
                  <SpaceBetween size="m" direction="horizontal">
                    <FormField
                      label="City"
                      errorText={
                        errorMessage &&
                        errorMessage.includes("billing city") &&
                        errorMessage
                      }>
                      <Input
                        value={city}
                        ref={cityRef}
                        step={10}
                        onChange={({ detail }) => setCity(detail.value)}
                      />
                    </FormField>
                    <FormField
                      label="State/province/region"
                      errorText={
                        errorMessage &&
                        errorMessage.includes("billing state") &&
                        errorMessage
                      }>
                      <Input
                        value={state}
                        ref={stateRef}
                        step={11}
                        onChange={({ detail }) => setState(detail.value)}
                      />
                    </FormField>
                  </SpaceBetween>
                  <FormField
                    label="Zip code/postal code"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("billing zip code") &&
                      errorMessage
                    }>
                    <Input
                      className="input-width-card"
                      value={zipCode}
                      ref={zipCodeRef}
                      step={12}
                      onChange={({ detail }) => setZipCode(detail.value)}
                    />
                  </FormField>
                  <FormField
                    label="Phone number"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("billing phone") &&
                      errorMessage
                    }>
                    <Input
                      className="input-width-card"
                      value={phone}
                      ref={phoneRef}
                      step={13}
                      placeholder="+1 222-333-4444"
                      inputMode="tel"
                      onChange={({ detail }) => setPhone(detail.value)}
                    />
                  </FormField>
                  <FormField
                    label="Billing contact email - required"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("email address") &&
                      errorMessage
                    }>
                    <Input
                      className="input-width-card"
                      value={email}
                      step={14}
                      placeholder="abc@gmail.com"
                      ref={emailRef}
                      inputMode="email"
                      onChange={({ detail }) => setEmail(detail.value)}
                    />
                  </FormField>
                  <Box fontWeight="heavy">
                    By selecting "Start my free trial", you agree to the terms
                    below.
                  </Box>
                </SpaceBetween>
                <FormField>
                  <SpaceBetween size="m">
                    <Box>
                      You agree to our Terms and Conditions and Privacy Policy
                    </Box>
                    <Box>
                      You agree that we may charge your payment method for the
                      price stated above, plus any taxes and fees, on an
                      automatic renewal basis until you revoke this consent or
                      cancel your subscription(s). Subscription fees are charged
                      at the beginning of each subscription period. If your
                      offer includes a free trial, the free trial begins
                      immediately. To avoid the subscription fee, please visit
                      mysubscriptions.finance.yahoo.com to cancel before the
                      free trial period ends.
                    </Box>
                    <Box>
                      By subscribing to Yahoo Finance Plus, you will also
                      receive our Market Digest newsletter which you can
                      unsubscribe from at any time.
                    </Box>
                    <Box>
                      You will receive all billing and account notices online or
                      by email.
                    </Box>
                    <Box>
                      To view or manage your Privacy information, visit Privacy
                      Dashboard.
                    </Box>
                    <Box>
                      Yahoo Finance LLC is a United States domiciled company
                    </Box>
                  </SpaceBetween>
                </FormField>
              </Container>
              {errorMessage && <Alert type="error">{errorMessage}</Alert>}
              <SpaceBetween
                size="l"
                direction="horizontal"
                className="btn-right">
                <Button onClick={onNavigate}>Cancel</Button>
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  loading={loading}>
                  Start my free trial
                </Button>
              </SpaceBetween>
            </SpaceBetween>
          )}
          {method === "bank" && (
            <SpaceBetween size="m">
              <Container
                header={
                  <Header variant="h2" fitHeight>
                    Bank Details
                  </Header>
                }>
                <SpaceBetween size="m">
                  <FormField
                    label="Account type"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("account type") &&
                      errorMessage
                    }>
                    <Select
                      selectedOption={account_type}
                      ref={AccountTypeRef}
                      onChange={({ detail }) =>
                        setAccount_Type(detail.selectedOption)
                      }
                      options={[
                        {
                          value: "checking",
                          label: "Checking",
                        },
                        {
                          value: "savings",
                          label: "Savings",
                        },
                      ]}
                    />
                  </FormField>
                  <FormField
                    label="Routing number"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("routing number") &&
                      errorMessage
                    }>
                    <Input
                      value={routing}
                      ref={RoutingRef}
                      onChange={({ detail }) => setRouting(detail.value)}
                      placeholder="000000000"
                    />
                  </FormField>
                  <FormField
                    label="Account number"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("account number") &&
                      errorMessage
                    }>
                    <Input
                      value={accountNo}
                      ref={AccountNoRef}
                      onChange={({ detail }) => setAccountNo(detail.value)}
                      placeholder="000000000"
                    />
                  </FormField>
                  <FormField
                    label="Re-enter Account number"
                    errorText={
                      errorMessage &&
                      errorMessage.includes(
                        "re-enter the bank account number"
                      ) &&
                      errorMessage
                    }>
                    <Input
                      value={reAccountNo}
                      ref={ReAccountNoRef}
                      onChange={({ detail }) => setReAccountNo(detail.value)}
                      placeholder="000000000"
                    />
                  </FormField>
                  <FormField
                    label="Account holder name"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("bank account name") &&
                      errorMessage
                    }>
                    <Input
                      value={accountName}
                      ref={AccountNameRef}
                      onChange={({ detail }) => setAccountName(detail.value)}
                      placeholder="Andy Jassy"
                    />
                  </FormField>
                </SpaceBetween>
              </Container>
              <Container
                header={<Header variant="h2">Billing information</Header>}>
                <SpaceBetween size="m">
                  <FormField
                    label="Full name"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("billing name") &&
                      errorMessage
                    }>
                    <Input
                      className="input-width-card"
                      ref={nameBillingRef}
                      value={nameBilling}
                      step={5}
                      onChange={({ detail }) => setNameBilling(detail.value)}
                    />
                  </FormField>
                  <FormField label="Company - optional">
                    <Input
                      className="input-width-card"
                      value={company}
                      step={6}
                      onChange={({ detail }) => setCompany(detail.value)}
                    />
                  </FormField>
                  <FormField
                    label="Select Country"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("billing country") &&
                      errorMessage
                    }>
                    <Select
                      className="input-width-card"
                      options={options}
                      ref={countryRef}
                      step={7}
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
                    label="Address"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("billing address") &&
                      errorMessage
                    }>
                    <SpaceBetween size="xs">
                      <Input
                        className="input-width-card"
                        value={address1}
                        ref={address1Ref}
                        step={8}
                        onChange={({ detail }) => setAddress1(detail.value)}
                      />
                      <Input
                        className="input-width-card"
                        value={address2}
                        step={9}
                        placeholder="Apartment, suite, unit floor, etc."
                        onChange={({ detail }) => setAddress2(detail.value)}
                      />
                    </SpaceBetween>
                  </FormField>
                  <SpaceBetween size="m" direction="horizontal">
                    <FormField
                      label="City"
                      errorText={
                        errorMessage &&
                        errorMessage.includes("billing city") &&
                        errorMessage
                      }>
                      <Input
                        value={city}
                        ref={cityRef}
                        step={10}
                        onChange={({ detail }) => setCity(detail.value)}
                      />
                    </FormField>
                    <FormField
                      label="State/province/region"
                      errorText={
                        errorMessage &&
                        errorMessage.includes("billing state") &&
                        errorMessage
                      }>
                      <Input
                        value={state}
                        ref={stateRef}
                        step={11}
                        onChange={({ detail }) => setState(detail.value)}
                      />
                    </FormField>
                  </SpaceBetween>
                  <FormField
                    label="Zip code/postal code"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("billing zip code") &&
                      errorMessage
                    }>
                    <Input
                      className="input-width-card"
                      value={zipCode}
                      ref={zipCodeRef}
                      step={12}
                      onChange={({ detail }) => setZipCode(detail.value)}
                    />
                  </FormField>
                  <FormField
                    label="Phone number"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("billing phone") &&
                      errorMessage
                    }>
                    <Input
                      className="input-width-card"
                      value={phone}
                      ref={phoneRef}
                      step={13}
                      placeholder="+1 222-333-4444"
                      inputMode="tel"
                      onChange={({ detail }) => setPhone(detail.value)}
                    />
                  </FormField>
                  <FormField
                    label="Billing contact email - optional"
                    errorText={
                      errorMessage &&
                      errorMessage.includes("email address") &&
                      errorMessage
                    }>
                    <Input
                      className="input-width-card"
                      value={email}
                      step={14}
                      placeholder="abc@gmail.com"
                      ref={emailRef}
                      inputMode="email"
                      onChange={({ detail }) => setEmail(detail.value)}
                    />
                  </FormField>
                  <Box fontWeight="heavy">
                    By selecting "Start my free trial", you agree to the terms
                    below.
                  </Box>
                </SpaceBetween>
                <FormField>
                  <SpaceBetween size="m">
                    <Box>
                      You agree to our Terms and Conditions and Privacy Policy
                    </Box>
                    <Box>
                      You agree that we may charge your payment method for the
                      price stated above, plus any taxes and fees, on an
                      automatic renewal basis until you revoke this consent or
                      cancel your subscription(s). Subscription fees are charged
                      at the beginning of each subscription period. If your
                      offer includes a free trial, the free trial begins
                      immediately. To avoid the subscription fee, please visit
                      mysubscriptions.finance.yahoo.com to cancel before the
                      free trial period ends.
                    </Box>
                    <Box>
                      By subscribing to Yahoo Finance Plus, you will also
                      receive our Market Digest newsletter which you can
                      unsubscribe from at any time.
                    </Box>
                    <Box>
                      You will receive all billing and account notices online or
                      by email.
                    </Box>
                    <Box>
                      To view or manage your Privacy information, visit Privacy
                      Dashboard.
                    </Box>
                    <Box>
                      Yahoo Finance LLC is a United States domiciled company
                    </Box>
                  </SpaceBetween>
                </FormField>
              </Container>
              {errorMessage && <Alert type="error">{errorMessage}</Alert>}
              <SpaceBetween
                size="l"
                direction="horizontal"
                className="btn-right">
                <Button onClick={onNavigate}>Cancel</Button>
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  loading={loading}>
                  Start my free trial
                </Button>
              </SpaceBetween>
            </SpaceBetween>
          )}
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
                    }}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => navigate(-1)}>
                    Leave
                  </Button>
                </SpaceBetween>
              </Box>
            }>
            <Alert type="warning" statusIconAriaLabel="Warning">
              Are you sure that you want to leave the current page? The changes
              that you made won't be saved.
            </Alert>
          </Modal>
        </SpaceBetween>
        <div className="summary-panel">
          <Container
            header={<Header variant="h2">Yahoo Finance Plus Essential</Header>}>
            <SpaceBetween size="xs">
              <Box>Get ready to take your portfolio to the next level</Box>
              <ul>
                <li>
                  Determine the best time to trade with advanced portfolio and
                  charting tools
                </li>
                <li>
                  Discover new opportunities with expert research and investment
                  ideas
                </li>
                <li>
                  Explore company-level fundamental data and alternative data
                  insights
                </li>
              </ul>
              <Alert>
                <div style={{ display: "block" }}>
                  <SpaceBetween size="m">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}>
                      <Box fontSize="heading-s" fontWeight="bold">
                      {type == "2" ? "Annual subscription fee:" : "Monthly subscription fee"}
                      </Box>
                      <Box fontSize="heading-s" fontWeight="bold">
                        {type == "1" ? "$350.00" : "$35.00"}
                      </Box>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "#7759FF",
                      }}>
                      <Box
                        color="text-status-success"
                        fontSize="heading-s"
                        fontWeight="bold">
                        Free trial period*:
                      </Box>
                      <Box
                        color="text-status-success"
                        fontSize="heading-s"
                        fontWeight="bold">
                        14 days
                      </Box>
                    </div>
                  </SpaceBetween>
                </div>
              </Alert>
              <SpaceBetween size="l">
                <Box fontWeight="bold" color="text-status-inactive">
                  With a Yahoo Finance Plus subscription, you’ll automatically
                  qualify for added perks like fewer ads on Yahoo websites, 24/7
                  premium tech support and deep discounts with the Buy More Save
                  More program. Terms apply.
                </Box>
                <Box fontSize="body-s" color="text-status-inactive">
                  If your account was created through AT&T or Frontier, please
                  contact your applicable Internet Service Provider for
                  account-related support, including password resets and
                  updating account information. View our help article for more
                  information.
                </Box>
                <Box fontSize="body-s" color="text-status-inactive">
                  Premium data coverage is limited to US equities.
                </Box>
                <Box fontSize="body-s" color="text-status-inactive">
                  *To avoid being charged the recurring subscription fee, cancel
                  before your free-trial period ends.
                </Box>
              </SpaceBetween>
            </SpaceBetween>
          </Container>
        </div>
      </Grid>
    </SpaceBetween>
  );
};
function AddPayment(props) {
  return <Content {...props} />;
}

export default AddPayment;
