import { apiSlice } from "@/store/api/apiSlice";

export const uploadSingleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadSingle: builder.mutation({
            query: ({data}) => {
                let formData = new FormData();
                formData.append("file", data);
                return {
                    url: 'files/upload/images/',
                    method: 'POST',
                    body: formData,
                    prepareHeaders: (headers) => {
                        headers.set("Content-Type", "multipart/form-data")
                        return headers;
                    },
                }
            },
            invalidatesTags: ['UploadSingle'],
        }),
    }),
});
export const { useUploadSingleMutation } = uploadSingleApiSlice;
