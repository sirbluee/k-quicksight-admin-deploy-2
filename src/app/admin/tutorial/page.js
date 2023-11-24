"use client"
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { CkEditorComponent } from "./components/CkEditorComponent";
export default function tutorial() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className="w-full">
      <Button onPress={onOpen} className="flex justify-center items-center ml-96">Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"5xl"}  >
      <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <CkEditorComponent/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
