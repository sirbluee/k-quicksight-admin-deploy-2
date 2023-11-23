"use client"
import React from "react";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

export default function UserTables() {
    //const res = await fetch('')
    return(
        <Table aria-label="Example static collection table">
            <TableHeader>
                <TableColumn className={'bg-blue-50'}>No</TableColumn>
                <TableColumn className={'bg-blue-50'}>Name</TableColumn>
                <TableColumn className={'bg-blue-50'}>State</TableColumn>
                <TableColumn className={'bg-blue-50'}>Date</TableColumn>
                <TableColumn className={'bg-blue-50'}>Action</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow key="1">
                    <TableCell>1</TableCell>
                    <TableCell>Sobon</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>12/02/2023</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
};
