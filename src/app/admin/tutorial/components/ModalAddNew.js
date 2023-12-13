import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { IoIosAddCircleOutline } from "react-icons/io";
import FormAddNew from "./FormAddNew";

export default function ModalAddNew() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Button
        onPress={onOpen}
        color="primary"
        endContent={<IoIosAddCircleOutline />}
      >
        Add New
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent className="m-28">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create New Tutorial</ModalHeader>
              <ModalBody >
                <FormAddNew/>
              </ModalBody>
              
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
