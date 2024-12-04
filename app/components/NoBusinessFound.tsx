"use client";
import { Modal } from "@mui/material";
import * as React from "react";
import { BusinessForm } from "./BusinessForm";

const NoBusinessFound = () => {
  // deleted showAddBusinessForm state
  // create isOpen state for modal component
  // create a modal component
  // import modal and render where commented out below
  // add onClick to 'add business' button to toggle modal isOpen state
  // render AddBusiness form in modal component when isOpen true
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="text-center min-h-screen mt-12">
      <h2 className="text-lg">No Business found with that name.</h2>
      <button onClick={handleOpen}>Add Business</button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        classes={{
          root: "flex justify-center items-center",
        }}
      >
        <BusinessForm />
      </Modal>
    </div>
  );
};

export default NoBusinessFound;
