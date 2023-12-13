import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, DropdownItem } from "@nextui-org/react";

export default function ModalDeleteTutorial() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = React.useState('opaque')

    const handleOpen = (backdrop, id) => {
        setDeleteId(id);
        setBackdrop(backdrop)
        onOpen();
    }
    return (
        <>
            <DropdownItem
                className="text-danger"
                color="danger"
                // onPress={() => handleOpen("blur", item.id)}
                key={"blur"}

            >
                DELETE
            </DropdownItem>      
            <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="danger" onPress={onClose} onClick={() => handleDeleteTutorial()}
                                >
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
