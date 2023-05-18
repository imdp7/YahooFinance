import React from "react";
import {
  SpaceBetween,
  Container,
  Box,
  Button,
  ColumnLayout,
  Icon,
  Popover,
} from "@cloudscape-design/components";
import { useNavigate } from 'react-router-dom';
function Package({ title, price, variant, items }) {
  const navigate = useNavigate();
  return (
    <>
      <Container fitHeight>
        <SpaceBetween size="s">
          <ColumnLayout columns={1} borders="horizontal">
            <Box fontSize="heading-xl" fontWeight="light" textAlign="center">
              {title}
            </Box>
            <Box fontSize="heading-l" fontWeight="heavy" textAlign="center">
              {price}
            </Box>
          </ColumnLayout>
          <Box fontSize="heading-s" fontWeight="heavy" textAlign="center">
            billed annually
          </Box>
          <Box fontSize="heading-s" fontWeight="heavy" textAlign="center">
            <Button variant={variant} onClick={() => navigate('/checkout')}>
              Try 14 days free <sup>*</sup>
            </Button>
          </Box>
          <ColumnLayout columns={1} borders="horizontal">
            {items?.map((item) => (
              <div
                key={item.key}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
		  justifyItems: 'flex-start',
                  maxWidth: "80%",
                }}>
                <div>
                  <Icon name="check" variant="subtle" />
                </div>
                <Box
                  color={item?.color && "text-status-info"}
                  fontSize="heading-s">
                  {item.text}
                </Box>
                <div>
                  <Popover
                    dismissButton={false}
                    triggerType="custom"
                    content={item.description}>
                    <Icon name="status-info" variant="subtle" />
                  </Popover>
                </div>
              </div>
            ))}
          </ColumnLayout>
        </SpaceBetween>
      </Container>
    </>
  );
}

export default Package;
