'use client'

import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useDeleteSampleAnalysisMutation } from "@/store/features/sample/sampleApiSlice";
import { toast } from "react-toastify";

export default function DeleteModalSampleAnalysis({fileId, filename}) {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [deleteSampleAnalysis] = useDeleteSampleAnalysisMutation();

    const handleDelete = async (fileId) => {
        const response = await deleteSampleAnalysis({id: fileId})
        toast.success("Delete Sample Analysis Successfully.")
    }

    return (
        <>
            <div className="flex flex-wrap gap-3">
                <Button onPress={onOpen} size={'sm'} color={'danger'} variant={'ghost'}>Delete file</Button>
            </div>
            <Modal
                size={'2xl'}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{filename}</ModalHeader>
                            <ModalBody>
                                <p>Are you sure to delete this file?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button onClick={() => handleDelete(fileId)} color="primary">
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
