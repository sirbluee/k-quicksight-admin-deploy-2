import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import FileDetailSampleDataset from "./ViewDetailSampleDataset";

export default function ViewDetailSampleDataset({uuid}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} size={'sm'} variant={'ghost'} color={'primary'}>View Detail</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">View Detail Sample Dataset</ModalHeader>
              <ModalBody className="overflow-hidden">
                <FileDetailSampleDataset  uuid={uuid} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
