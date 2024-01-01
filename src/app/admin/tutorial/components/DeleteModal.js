'use client'
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, DropdownItem } from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import { useDeleteTutorialsMutation } from "@/store/features/tutorials/tutorialApiSlice";
import { toast } from "react-toastify";

export default function ModelDeleteTutorail({ deleteId }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [deleteTutorial] = useDeleteTutorialsMutation();

    const handleDeleteTutorial = async () => {
        try {
            await deleteTutorial(deleteId);
            toast.success("Delete Tutorial Success!");
        } catch (err) {
            console.log('someting cannot delete tutorial')
        }
    }

    return (
        <>
            <Button variant="solid" color="danger" className="w-full flex justify-center items-center gap-3" onClick={onOpen}><MdDelete className="text-lg" /> Delete</Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete tutorail</ModalHeader>
                            <ModalBody >
                                Are you sure you want to delete this ?
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={handleDeleteTutorial} variant="solid" color="danger">
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
