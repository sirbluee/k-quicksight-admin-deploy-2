import { apiSlice } from "@/store/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        getTutorials: builder.query({
            query: ({ page, size, title }) => `/tutorials/?p=${page}&size=${size}&title=${title}`,
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["Tutorial"], // provideTags are used for updating cache
        }),
        
        deleteTutorials: builder.mutation({
            query: (id) => ({
                url: `/tutorials/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tutorial"],
        }),
        
        createTutorial: builder.mutation({
            query: ({ data }) => ({
                url: `/tutorials/`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            }),
            invalidatesTags: ["Tutorial"],
        }),
        
        getTutorialById: builder.query({
            query: (id) => `/tutorials/${id}/`,
            keepUnusedDataFor: 5, 
            providesTags: ["Tutorial"],
        }),

        updateTutorial: builder.mutation({
            query: ({ id, data }) => ({
                url: `/tutorials/${id}/`,
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
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
    useDeleteTutorialsMutation,
    useCreateTutorialMutation,
    useGetTutorialByIdQuery,
    useUpdateTutorialMutation,
} = userApiSlice;

