import {createApi} from "@reduxjs/toolkit/query/react";
import {apiSlice} from "@/store/api/apiSlice";

export const analysisApiSlice  = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllAnalysis: builder.query({
            query: ({page, size, title}) => ({
                url: `analysis/?p=${page}&size=${size}&title=${title}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
            providesTags: ['analysis']
        })
    })
})

export const {useGetAllAnalysisQuery} = analysisApiSlice;