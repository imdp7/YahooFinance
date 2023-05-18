import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  Box,
  ColumnLayout,
  Container,
  Header,
  AppLayout,
  SpaceBetween,
  Grid,
  Spinner,
  ContentLayout,
  Alert,
} from "@cloudscape-design/components";
import { useOutletContext } from "react-router";
import countryList from "react-select-country-list";
import { appLayoutLabels } from "../../features/common/labels";
import { AppFooter } from "../../features/common/AppFooter";
import CommonHeader from "./CommonHeader";
import Stripe from "stripe";
import AddPayment from "../../Auth/Components/AddPayment";

function Payment(props) {
  const [tools, setTools] = useState<JSX.Element>();
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [toolsContent, setToolsContent] = useState();
  const loadHelpPanelContent = (toolsContent) => {
    setToolsOpen(true);
    setToolsContent(toolsContent);
  };
  const updateTools = (element: JSX.Element): void => {
    setTools(element);
    setToolsOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div id="h" style={{ position: "sticky", top: 0, zIndex: 1002 }}>
        <CommonHeader {...props} />
      </div>
      <AppLayout
        content={
          <>
            {!loading ? (
              <SpaceBetween size="m">
                <ContentLayout header={<Header variant="h1">Checkout</Header>}>
                    <AddPayment {...props}/>
                </ContentLayout>
              </SpaceBetween>
            ) : (
              <Spinner size="large" className="spinner" />
            )}
          </>
        }
        headerSelector="#h"
        contentType="table"
        toolsOpen={toolsOpen}
        tools={toolsContent}
        navigationHide={true}
        toolsHide={true}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        ariaLabels={appLayoutLabels}
        footerSelector="#f"
        breadcrumbs={[]}
      />
      <AppFooter />
    </>
  );
}

export default Payment;
