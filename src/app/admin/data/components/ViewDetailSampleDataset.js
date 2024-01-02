"use client";

import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
  Button,
  SelectItem,
  Select,
} from "@nextui-org/react";
import { useGetFileDetailQuery } from "@/store/features/sample/sampleApiSlice";
export default function FileDetailSampleDataset({ uuid }) {

  const [size, setSize] = useState(100);
  const [page, setPage] = useState(1);

  const {
    data: fileDetail,
    refetch: refetchDetail,
    isLoading,
  } = useGetFileDetailQuery({ uuid: uuid, size: size, page: page });

  const handleSelectionChange = (e) => {
    setSize(e.target.value);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className={"relative rounded-xl w-full overflow-hidden"}>
      
      {fileDetail !== undefined ? (
        <>
          <Table
            className={"max-h-[450px] overflow-hidden"}
            aria-label="Example static collection table"
          >
            <TableHeader>
              {fileDetail?.headers?.map((header, index) => (
                <TableColumn key={index}>{header}</TableColumn>
              ))}
            </TableHeader>
            <TableBody
              loadingContent={<Spinner label={"Loading dataset"} />}
              emptyContent={"No rows to display."}
            >
              {fileDetail?.results?.map((row, index) => (
                <TableRow key={index} className={'dark:text-white'}>
                  {fileDetail?.headers.map((header, index) => (
                    <TableCell key={index}>{row[header]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className={"flex justify-end items-center"}>
            <Select
              aria-label="Select number of rows to display"
              size={"sm"}
              variant={"bordered"}
              defaultSelectedKeys={["100"]}
              className="w-20 dark:text-white"
              onChange={handleSelectionChange}
            >
              <SelectItem textValue="100" key={100} value={100}>
                <span className={'dark:text-white'}>100</span>
              </SelectItem>
              <SelectItem textValue="200" key={200} value={200}>
                <span className={'dark:text-white'}>200</span>
              </SelectItem>
              <SelectItem textValue="300" key={300} value={300}>
                <span className={'dark:text-white'}>300</span>
              </SelectItem>
              <SelectItem textValue="400" key={400} value={400}>
                <span className={'dark:text-white'}>400</span>
              </SelectItem>
              <SelectItem textValue="500" key={500} value={500}>
                <span className={'dark:text-white'}>500</span>
              </SelectItem>
              <SelectItem
                key={fileDetail?.count}
                textValue={fileDetail?.count}
                value={fileDetail?.count}
              >
                <span className={'dark:text-white'}>{fileDetail?.count}</span>
              </SelectItem>
            </Select>
            <Pagination
              isCompact
              showControls
              total={fileDetail?.pages.length}
              initialPage={1}
              onChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <div className={"flex justify-center items-center w-full"}>
          <Spinner size={"lg"} label={"Loading dataset"} />
        </div>
      )}
    </div>
  );
}
