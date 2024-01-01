import { apiSlice } from "@/store/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => `accounts/me/`,
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["User"], // provideTags are used for updating cache
        }),
        updateUser: builder.mutation({
            query: ({data, userId}) => ({
                url: `users/${userId}/`,
                method: 'PUT',
                body: data,
                keepUnusedDataFor: 5,

            }),
            invalidatesTags: ["User"],
        }),
        fileImport: builder.mutation({
            query: ({file}) => ({
                url: `files/upload/images/`,
                method: 'POST',
                body: file,
                prepareHeaders: (headers) => {
                    headers.set('Content-Type', `multipart/form-data`);
                    return headers;
                },
            }),
            invalidatesTags: ["User"],
        }),
        getAllUser: builder.query({
            query: () => ({
                url: `users/`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
            providesTags: ["User"],
        }),
        getAllUserSearch: builder.query({
            query: ({page, size, username}) => ({
                url: `users/list/?p=${page}&size=${size}&&username=${username}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
            providesTags: ["User"],
        }),
        deleteUser: builder.mutation({
            query: ({userId}) => ({
                url: `users/${userId}/`,
                method: 'DELETE',
            }),
            keepUnusedDataFor: 5,
            invalidatesTags: ["User"],
        }),
        createUser: builder.mutation({
            query: ({data}) => ({
                url: `users/`,
                method: 'POST',
                body: data,
            }),
            keepUnusedDataFor: 5,
            invalidatesTags: ["User"],
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: 'users/',
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
            providesTags: ["User"],
        })
  }),
});


export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useFileImportMutation,
  useGetAllUserSearchQuery,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
} = userApiSlice;


function generateBoundary() {
    return `----WebKitFormBoundary${Math.random().toString(16).substr(2)}`;
}
