'use client'

import React, {useState} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Pagination,
    SelectItem, Select, Input
} from "@nextui-org/react";

import {getTrimIntoColumnOnlyDate} from "@/utils/generateURL";
import {FaPencilAlt} from "react-icons/fa";
import {MdDeleteSweep} from "react-icons/md";
import ModalUpdateUserDetail from "@/app/admin/user/component/modalUpdateUserDetail";
import {BiSearch} from "react-icons/bi";
import DeleteModal from "@/app/admin/user/component/DeleteModal";
import AddNewModal from "@/app/admin/user/component/addNewModal";
import { useGetAllUserSearchQuery } from "@/store/features/user/userApiSlice";


const data = {
    "id": 30,
    "username": "sobonphon375",
    "gender": null,
    "dob": null,
    "uuid": "b1b61893-478a-41c7-a272-557fa6f3843d",
    "email": "phon.sobon03@gmail.com",
    "phone_number": null,
    "full_name": "sobon phon",
    "address": null,
    "biography": null,
    "avatar": "https://lh3.googleusercontent.com/a/ACg8ocJqK8ZJG90BTUu4qYK40tPhm3NwrSXTEtyhYsbnwE8vjg=s96-c",
    "storage_data": 0.0,
    "created_at": "2023-11-22T09:56:57.611566+07:00",
    "auth_provider": "google",
    "is_deleted": false,
    "is_confirmed": false
}

export default function TableUser() {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [username, setUsername] = useState("");

    const {data:allUser, isLoading} = useGetAllUserSearchQuery({page: page, size: size, username: username});

    const handlePageChange = (page) => {
        setPage(page);
    }

    const handleSetPage = (size) => {
        setSize(size.target.value)
    }

    return (
        <>
            <h3 className={'py-3 text-primary-color'}>Total users: {allUser?.count}</h3>
            <div className={'flex justify-between items-center'}>
                <Input startContent={<BiSearch />} placeholder={'Search users ...'} value={username} onValueChange={setUsername} className={'w-1/3 my-3'}
                       classNames={{
                           inputWrapper: [
                               'rounded-full'
                           ]
                       }}
                       variant={'bordered'} size={'sm'} color={'primary'} />
                <AddNewModal />
            </div>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>USERNAME</TableColumn>
                    <TableColumn>EMAIL</TableColumn>
                    <TableColumn>GENDER</TableColumn>
                    <TableColumn>ADDRESS</TableColumn>
                    <TableColumn>ROLES</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                    {
                        allUser?.results?.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.username}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell className={'text-primary-color'}>{item.gender || 'unKnown'}</TableCell>
                                <TableCell>{item.address || 'unKnown'}</TableCell>
                                <TableCell>
                                    {
                                        item.roles.map((item, index) => (
                                            <span key={index} className={`mx-2 px-2 py-1 rounded-full ${item.name === 'subscriber' ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'}`}>{item.name}</span>
                                        ))
                                    }
                                </TableCell>
                                <TableCell className={'flex gap-3'}>
                                    <ModalUpdateUserDetail userInfo={item} />
                                    <DeleteModal username={item.username} userId={item.id} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

            <div className="flex w-auto justify-center items-center mt-5">

                <Pagination
                    className=""
                    isCompact
                    showControls total={allUser?.pages?.length}
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
    );
}
