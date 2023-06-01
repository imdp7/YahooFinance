import React from "react";
import {
  Modal,
  Box,
  SpaceBetween,
  Button,
} from "@cloudscape-design/components";
function Modals({ visible, setVisible, title,Component }) {
  if(!visible){
    return null;
  }
  return (
    <Modal
    header={title}
    visible={visible}
    onDismiss={() => setVisible((prevState) => ({ ...prevState, visible: false }))}
    closeAriaLabel="Close modal"
    size="large"
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
    <Component />
  </Modal>
  
  );
}

export default Modals;
