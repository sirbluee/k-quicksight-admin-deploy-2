'use client'
import React, { useEffect, useState } from "react";
import { useGetTutorialsQuery, useDeleteTutorialsMutation } from "@/store/features/tutorials/tutorialApiSlice";
import { CircularProgress } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import ModalAddNew from "@/app/admin/tutorial/components/ModalAddNew";
import { Pagination } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { FiSearch } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function TutorialsTable() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = React.useState('opaque')
    const [deleteId, setDeleteId] = React.useState(null)
    const [isDeleteModalTutorialOpen, setDeleteModalTutorial] = useState(false);

    const handleOpen = (backdrop, id) => {
        setDeleteId(id);
        setBackdrop(backdrop)
        onOpen();
    }

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [title, setTitle] = useState("");

    const {
        data: tutorials,
        isLoading,
        isError,
        isSuccess,
    } = useGetTutorialsQuery({ page, size, title });

    const [deleteTutorial,
        { isLoading: isLoadingDeleteTutorials,
            isError: isDeleteError,
            isSuccess: isSuccessDeleteTutorial
        }] = useDeleteTutorialsMutation();



    if (isLoading || isLoadingDeleteTutorials) {
        return <h1>Loading</h1>
    }
    if (isError) {
        return <h1>Error</h1>
    }

    const handlePageChange = (page) => {
        setPage(page);
    }

    const handleSetPage = (size) => {
        setSize(size.target.value)
    }

    const handleChangeTitle = (title) => {
        setTitle(title.target.value)
    }
    const handleDeleteTutorial = async () => {
        await deleteTutorial(deleteId);
    }


    return (
        <>
            {/* delete modal */}
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
            {/* inser modal */}
            <div className="rounded-2xl flex items-center justify-between w-full mb-5 ">
                <Input
                    label="Search"
                    isClearable
                    onChange={handleChangeTitle}
                    radius="lg"
                    classNames={{
                        label: "text-black/50 dark:text-white/90",
                        input: [
                            "bg-transparent",
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                            "shadow-xl",
                            "bg-default-200/50",
                            "dark:bg-default/60",
                            "backdrop-blur-xl",
                            "backdrop-saturate-200",
                            "hover:bg-default-200/70",
                            "dark:hover:bg-default/70",
                            "group-data-[focused=true]:bg-default-200/50",
                            "dark:group-data-[focused=true]:bg-default/60",
                            "!cursor-text",
                            "w-80"
                        ],
                    }}
                    placeholder="Type to search..."
                    startContent={
                        <FiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    }
                />
                <div className="flex gap-4 items-center">
                    <ModalAddNew />
                </div>

            </div>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>TITLE</TableColumn>
                    <TableColumn>DESCRIPTION</TableColumn>
                    <TableColumn>CREATED_BY</TableColumn>
                    <TableColumn>CREATED_AT</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>

                </TableHeader>
                <TableBody>
                    {tutorials?.results.map((item, index) =>
                    (
                        <TableRow key={index}>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.published_by.username}</TableCell>
                            <TableCell>{item.published_by.username}</TableCell>
                            <TableCell>{item.created_at}</TableCell>
                            <TableCell>{item.is_deleted.toString()}</TableCell>
                            <TableCell>
                                <Dropdown >
                                    <DropdownTrigger>
                                        <Button
                                            variant="bordered"
                                        >
                                            Action
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Example with disabled actions" >
                                        <DropdownItem key="update">UPDATE</DropdownItem>
                                        <DropdownItem
                                            className="text-danger"
                                            color="danger"
                                            onPress={() => handleOpen("blur", item.id)}
                                            key={"blur"}
                                        >
                                            DELETE
                                        </DropdownItem>

                                    </DropdownMenu>
                                </Dropdown>
                            </TableCell>
                        </TableRow>
                    )
                    )}

                </TableBody>
            </Table>
            <div className="flex w-auto justify-center items-center mt-5">

                <Pagination
                    className=""
                    isCompact
                    showControls total={tutorials.pages.length}
                    initialPage={page}
                    onChange={handlePageChange}
                />
                <Select labelPlacement="1" className="max-w-xs w-28 ml-14" onChange={handleSetPage}>
                    <SelectItem key="10" value={10} defaultSelected>
                        10
                    </SelectItem>
                    <SelectItem key="20" value={20}>
                        20
                    </SelectItem>
                    <SelectItem key="30" value={30}>
                        30
                    </SelectItem>
                    <SelectItem key="40" value={40}>
                        40
                    </SelectItem>
                    <SelectItem key="50" value={50}>
                        50
                    </SelectItem>
                </Select>
            </div>

        </>
    )
}
