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
import { MdDelete } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
import ModalUpdateTutorial from "@/app/admin/tutorial/components/ModalUpdateTutorial";
import moment from "moment";
import {BiSearch} from "react-icons/bi";


export default function TutorialsTable() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = React.useState('opaque')
    const [deleteId, setDeleteId] = React.useState(null)

    const handleOpen = (backdrop, id) => {
        console.log("id: ", id);
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

    const [deleteTutorial,{ 
            isLoading: isLoadingDeleteTutorials,
            isError: isDeleteError,
            isSuccess: isSuccessDeleteTutorial
        }] = useDeleteTutorialsMutation();

    const handlePageChange = (page) => {
        setPage(page);
    }

    const handleSetPage = (size) => {
        console.log(size.target.value)
        setSize(size.target.value)
    }

    const handleChangeTitle = (title) => {
        setTitle(title.target.value)
    }

    const handleDeleteTutorial = async () => {
        await deleteTutorial(deleteId);
        toast.success("Delete Tutorial Success!");
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete tutorial</ModalHeader>
                            <ModalBody className="flex justify-center items-center">
                                Are you sure you want to delete this tutorial?
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
                <Input startContent={<BiSearch />} placeholder={'Search users ...'} value={title} onValueChange={setTitle} className={'w-1/3 my-3'}
                       classNames={{
                           inputWrapper: [
                               'rounded-3xl'
                           ]
                       }}
                       variant={'bordered'} size={'sm'} color={'primary'} />
                <div className="flex gap-4 items-center">
                    <ModalAddNew />
                </div>

            </div>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>TITLE</TableColumn>
                    <TableColumn>CREATED_BY</TableColumn>
                    <TableColumn>DESCRIPTION</TableColumn>
                    <TableColumn>CREATED_AT</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>

                </TableHeader>
                <TableBody>
                    {tutorials?.results.map((item, index) =>
                    (
                        <TableRow key={index}>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.published_by.username}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>
                                {moment(item.created_at).format("YYYY-MM-DD")}
                            </TableCell>
                            <TableCell className={'grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1'}>
                                <ModalUpdateTutorial tutorialId={item.id}/>
                                <Button color="danger" className="ml-4" variant="bordered" onPress={() => handleOpen("blur", item.id)}>
                                    <MdDelete />
                                </Button>
                               
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
                    showControls total={tutorials?.pages?.length}
                    initialPage={page}
                    onChange={handlePageChange}
                />
                <Select labelPlacement="1" className="max-w-xs w-28 ml-14" onChange={handleSetPage} defaultSelectedKeys={["10"]}>
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
