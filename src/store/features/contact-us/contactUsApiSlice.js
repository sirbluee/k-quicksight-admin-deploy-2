import { apiSlice } from "@/store/api/apiSlice";

export const contactUsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getContactUs: builder.query({
            query: ({ page, size }) => ({
                url: `contact_us/?p=${page}&size=${size}`,
                method: "GET",
            }),
            providesTags: ['contact_us']
        }),

        updateContactUs: builder.mutation({
            query: ({ id, data }) => ({
                url: `contact_us/${id}/`,
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            }),
            invalidatesTags: ["contact_us"],
        }),
    }),

});

export const {
    useGetContactUsQuery,
    useUpdateContactUsMutation
} = contactUsApiSlice;

