import {createApi} from "@reduxjs/toolkit/query/react";
import {apiSlice} from "@/store/api/apiSlice";

export const visualizationApiSlice  = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllVisualization: builder.query({
            query: ({page, size, title}) => ({
                url: `dashboards/?p=${page}&size=${size}&title=${title}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
            providesTags: ['visualization']
        })
    })
})

export const {useGetAllVisualizationQuery} = visualizationApiSlice;

