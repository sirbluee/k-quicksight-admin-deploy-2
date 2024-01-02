// this the extended slice for auth
import { apiSlice } from "@/store/api/apiSlice";

export const SampleSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getSampleDataset: builder.query({
            query: ({page, size, title}) => ({
                url: `sample/view-sample-file/?p=${page}&size=${size}&title=${title}`,
                method: "GET",
            }),
            providesTags: ['sample']
        }),
        getSampleAnalysis:builder.query({
            query: ({page, size, title}) => ({
                url: `sample/analysis/?p=${page}&size=${size}&title=${title}`,
                method: "GET",
            }),
            providesTags: ['sample']
        }),
    }),

});

export const { useGetSampleDatasetQuery, useGetSampleAnalysisQuery } = SampleSlice;