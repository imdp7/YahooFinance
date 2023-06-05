import React from "react";
import {
  Modal,
  Box,
  SpaceBetween,
  Button,
} from "@cloudscape-design/components";
function Modals({ visible, setVisible, title,Component, symbol }) {
  if(!visible){
    return null;
  }
  return (
    <Modal
    header={title}
    visible={visible}
    onDismiss={() => setVisible((prevState) => ({ ...prevState, visible: false }))}
    closeAriaLabel="Close modal"
    size="max"
    footer={
      <Box float="right">
        <SpaceBetween direction="horizontal" size="m">
          <Button variant="link" onClick={() => setVisible((prevState) => ({ ...prevState, visible: false }))}>
            Cancel
          </Button>
        </SpaceBetween>
      </Box>
    }
  >
    <Component symbol={symbol} />
  </Modal>
  
  );
}

export default Modals;
