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

        deleteSampleDataset: builder.mutation({
            query: ({id}) => ({
                url: `sample/sample-file/detail/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['sample']
        }),
        deleteSampleAnalysis: builder.mutation({
            query: ({id}) => ({
                url: `sample/analysis/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['sample']
        }),
        uploadSampleDataset: builder.mutation({
            query: ({file, userId}) => {
                let formData = new FormData();
                formData.append("file", file);

                return {
                    url: `sample/upload-sample-file/${userId}/`,
                    method: 'POST',
                    body: formData,
                    prepareHeaders: (headers) => {
                        headers.set("Content-Type", "multipart/form-data")
                        return headers;
                    },
                }
            },
            invalidatesTags: ['sample'],
        }),

        getFileDetail: builder.query({
            query: ({uuid, size, page}) => ({
                url: `files/details/${uuid}/?size=${size}&p=${page}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 1,
            providesTags: ["sample"],
        }),

        getSampleAnalysis:builder.query({
            query: ({page, size, title}) => ({
                url: `sample/analysis/?p=${page}&size=${size}&title=${title}`,
                method: "GET",
            }),
            providesTags: ['sample']
        }),
        

        createSampleAnalysis : builder.mutation({
            query: ({data}) => ({
                url: `sample/analysis/`,
                method: 'POST',
                body: data,
            }),
            keepUnusedDataFor: 5,
            invalidatesTags: ["sample"],
        }),


    }),

});

export const { 
    useGetSampleDatasetQuery, 
    useGetSampleAnalysisQuery,
    useDeleteSampleDatasetMutation,
    useUploadSampleDatasetMutation,
    useGetFileDetailQuery,
    useCreateSampleAnalysisMutation,
    useDeleteSampleAnalysisMutation
} = SampleSlice;