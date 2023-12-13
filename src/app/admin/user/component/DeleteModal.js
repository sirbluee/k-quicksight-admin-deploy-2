import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {MdDeleteSweep} from "react-icons/md";
import {useDeleteUserMutation} from "@/store/features/user/userApiSlice";

export default function DeleteModal({username, userId}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [deleteUser] = useDeleteUserMutation();

    const handleDeleteUser = () => {
        const deleteUserid = deleteUser({userId: userId})
        onOpenChange(false)
    }

    return (
        <>
            <Button size={'sm'} color={'danger'} variant={'bordered'} onPress={onOpen}>
                <MdDeleteSweep />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete</ModalHeader>
                            <ModalBody>

                                <p className={'text-text-color text-center'}> Are you sure to delete <span className={'text-red-500 font-medium'}>{username}</span> ?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={handleDeleteUser} color="danger" className={'w-full'} onPress={onClose}>
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
