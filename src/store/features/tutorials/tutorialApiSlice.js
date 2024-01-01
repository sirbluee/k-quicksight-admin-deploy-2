import { apiSlice } from "@/store/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getTutorials: builder.query({
            query: ({ page, size, title }) => `tutorials/?p=${page}&size=${size}&title=${title}`,
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["Tutorial"], // provideTags are used for updating cache
        }),
        getRequestTutorials: builder.query({
            query: ({ page, size }) => `request_tutorials/?p=${page}&size=${size}`,
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["Tutorial"], // provideTags are used for updating cache
        }),
        getRequestTutorialById: builder.query({
            query: ({ id }) => `request_tutorials/${id}/`,
            keepUnusedDataFor: 5,
            providesTags: ["Tutorial"]
        }),
        deleteTutorials: builder.mutation({
            query: (id) => ({
                url: `tutorials/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tutorial"],
        }),

        createTutorial: builder.mutation({
            query: ({ data }) => ({
                url: `tutorials/`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            }),
            invalidatesTags: ["Tutorial"],
        }),

        getTutorialById: builder.query({
            query: (id) => `tutorials/${id}/`,
            keepUnusedDataFor: 5,
            providesTags: ["Tutorial"],
        }),

        updateTutorial: builder.mutation({
            query: ({ id, data }) => ({
                url: `tutorials/${id}/`,
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            }),
            invalidatesTags: ["Tutorial"],
        }),
        updateTutorialStatus: builder.mutation({
            query: ({ id, data }) => ({
                url: `request_tutorials/${id}/`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Tutorial"],
        }),


    }),

});
// useGetTutorialByIdQuery

// auto generated hooks for getUser query (GET)
export const {
    useGetTutorialsQuery,
    useGetRequestTutorialsQuery,
    useGetRequestTutorialByIdQuery,
    useDeleteTutorialsMutation,
    useCreateTutorialMutation,
    useGetTutorialByIdQuery,
    useUpdateTutorialMutation,
    useUpdateTutorialStatusMutation
} = userApiSlice;

