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
            query: ({data}) => ({
                url: `/tutorials/`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            }),
            invalidatesTags: ["Tutorial"],
        }),

    }),

});

// auto generated hooks for getUser query (GET)
export const { useGetTutorialsQuery, useDeleteTutorialsMutation, useCreateTutorialMutation } = userApiSlice;

