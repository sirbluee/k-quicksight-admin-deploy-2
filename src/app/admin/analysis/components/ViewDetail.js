import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { MdRemoveRedEye } from "react-icons/md";

export default function ViewDetail({recommneded}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button className="bg-white" onPress={onOpen}><MdRemoveRedEye /></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">View Detail Recommendation: </ModalHeader>
              <ModalBody>
                <b>Recommended:</b>
                <p> 
                  {recommneded?recommneded:"Not Available"}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
