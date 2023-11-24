import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials, setCurrentUser } from "../features/auth/authSlice";
import { getDecryptedRefreshToken } from "@/lib/cryptography";

// create base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access;
    headers.set("content-type", "application/json");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// custom base query with re-authentication when token expires
const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const refreshToken = await getDecryptedRefreshToken();
    console.log("resfreshToken in apiSlice", refreshToken);
    if (refreshToken) {
      try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/token/refresh/`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken }),
            }
        );
        const resultResponse = await response.json();
        console.log("response", resultResponse);

        if (resultResponse.code === 200) {
          api.dispatch(setCredentials(resultResponse.data));


          result = await baseQuery(args, api, extraOptions);
        } else if (resultResponse.code === 401) {
          api.dispatch(logout());
          alert("Your session has expired. Please login again.");
        }
      } catch (error) {
        console.error("Failed to refresh access token", error);

        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
      alert("Your session has expired. Please login again.");
    }
  }
  return result;
};
// create api slice with custom base query
export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["User"], // tagTypes are used for cache invalidation
  endpoints: (builder) => ({}),
});