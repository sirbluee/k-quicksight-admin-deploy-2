'use client'
import React, {useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {
    useGetRequestTutorialByIdQuery,
    useUpdateTutorialStatusMutation
} from "@/store/features/tutorials/tutorialApiSlice";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
} from "@nextui-org/react";
import {HiOutlineDotsVertical} from "react-icons/hi";

export default function Detail({item}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    // const {data:detail} = useGetRequestTutorialByIdQuery({id: id});
    // const [read, setRead] = useState(false);
    const [updateRead] = useUpdateTutorialStatusMutation();
    const handleRead = async () => {
        let data = {
            is_read: true
        }
        const response = await updateRead({data: data, id: item?.id})
    }
    const handleUnRead = async () => {
        let data = {
            is_read: false
        }
        const response = await updateRead({data: data, id: item?.id})
    }

    return (
        <>
            <Button variant={'light'} className={'h-fit text-left p-2 flex justify-between items-center'} onPress={onOpen}>
                <Dropdown className={'w-fit'}>
                    <DropdownTrigger>
                        <Button
                            variant="light"
                        >
                            <HiOutlineDotsVertical />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="detail" color={'primary'} onPress={onOpen}>View detail</DropdownItem>
                        <DropdownItem key="new" color={'primary'}
                            onClick={handleRead}
                        >make as read</DropdownItem>
                        <DropdownItem key="copy" color={'danger'} onClick={handleUnRead}>make as unread</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{item?.request_by.username}</ModalHeader>
                            <ModalBody>
                                <p className={'text-xl'}>{item?.subject}</p>
                                <p>
                                    {item?.message}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" variant="light" onPress={onClose}>
                                    Read
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
