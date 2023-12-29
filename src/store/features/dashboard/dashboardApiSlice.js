import { apiSlice } from "@/store/api/apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        getDashboard: builder.query({
            query: () => `/dashboard-admin/`,
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["Dashboard"], // provideTags are used for updating cache
        }),

    }),

});

export const {
    useGetDashboardQuery,

} = dashboardApiSlice;

