'use client'

import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";
import {useGetAllUserQuery} from "@/store/features/user/userApiSlice";
import {getTrimIntoColumnOnlyDate} from "@/utils/generateURL";
import {FaPencilAlt} from "react-icons/fa";
import {MdDeleteSweep} from "react-icons/md";


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
    const {data:allUser} = useGetAllUserQuery();
    console.log(allUser)
    return (
        <Table aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>USERNAME</TableColumn>
                <TableColumn>EMAIL</TableColumn>
                <TableColumn>GENDER</TableColumn>
                <TableColumn>PHONE NUMBER</TableColumn>
                <TableColumn>ADDRESS</TableColumn>
                <TableColumn>CREATED AT</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    allUser?.data?.data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.username}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell className={'text-primary-color'}>{item.gender || 'unKnown'}</TableCell>
                            <TableCell>{item.phone_number || 'unKnown'}</TableCell>
                            <TableCell>{item.address || 'unKnown'}</TableCell>
                            <TableCell>{getTrimIntoColumnOnlyDate(item.created_at)}</TableCell>
                            <TableCell className={'flex gap-3'}>
                                <Button size={'sm'} color={'success'} variant={'flat'}>
                                    <FaPencilAlt />
                                </Button>
                                <Button size={'sm'} color={'danger'} variant={'bordered'}>
                                    <MdDeleteSweep />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}
