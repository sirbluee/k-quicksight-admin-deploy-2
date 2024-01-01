'use client'
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, DropdownItem } from "@nextui-org/react";
import FormAddNew from "./FormAddNew";
import { FaRegEdit } from "react-icons/fa";
import UpdateForm from "./FormUpdateTutorial";

export default function ModalUpdateTutorial({ tutorialId }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button variant="solid" color='primary' className="w-full flex justify-center items-center gap-3" onClick={onOpen}><FaRegEdit /> edit</Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
                <ModalContent className="m-28">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Update Tutorial</ModalHeader>
                            <ModalBody >
                                <UpdateForm tutorialId={tutorialId} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
