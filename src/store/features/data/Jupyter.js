// this the extended slice for auth
import { apiSlice } from "@/store/api/apiSlice";

export const jupyterSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // build.mutation is used for POST, PUT, DELETE
        getJupyterFile: builder.query({
            query: ({page, size, filename}) => ({
                url: `jupyter/?p=${page}&size=${size}&file=${filename}`,
                method: "GET",
            }),
            providesTags: ['data']
        }),
        uploadJupyter: builder.mutation({
            query: ({file, userId}) => {
                let formData = new FormData();
                formData.append("file", file);

                return {
                    url: `jupyter/upload-jypyter/${userId}/`,
                    method: 'POST',
                    body: formData,
                    prepareHeaders: (headers) => {
                        headers.set("Content-Type", "multipart/form-data")
                        return headers;
                    },
                }
            },
            invalidatesTags: ['data'],
        }),
        deleteJupyterFile: builder.mutation({
            query: ({fileId}) => ({
                url: `jupyter/details/${fileId}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['data']
        })
    }),

});
// auto generated hooks for login mutation
export const { useGetJupyterFileQuery, useUploadJupyterMutation, useDeleteJupyterFileMutation } = jupyterSlice;