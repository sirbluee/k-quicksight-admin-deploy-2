'use client'
import React from 'react';
import {useGetAllAnalysisQuery} from "@/store/features/analysis/Analysis";
import {useGetAllUserQuery, useGetUserQuery} from "@/store/features/user/userApiSlice";

const Analysis = () => {
    const {data:user} = useGetUserQuery();
    const {data:analysis} = useGetAllAnalysisQuery({page: 1, size: 1234, title: '', userId: user?.data.id});

    // Api is not for admin!

    return (
        <div className={'p-10'}>

        </div>
    );
};

export default Analysis;