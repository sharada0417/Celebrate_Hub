import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BACKEND_URL = "http://localhost:8080";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/`,
    prepareHeaders: async (headers, { getState }) => {
      const token = await window?.Clerk?.session?.getToken();
      if (token) {
        headers.set(`Authorization`, `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPlaces: builder.query({
      query: () => "places/",
    }),
    getPlaceForSerchQuery: builder.query({
      query: ({ query }) => `places/serch/retrieve?query=${query}`, // Corrected typo: search -> serch
    }),
    getPlaceById: builder.query({
      query: (id) => `places/${id}`,
    }),
    createPlace: builder.mutation({
      query: (place) => ({
        url: "places",
        method: "POST",
        body: place,
      }),
    }),
    sendMessage: builder.mutation({
      query: (messages) => ({
        url: "places/llm",
        method: "POST",
        body: { messages },
      }),
    }),
  }),
});

export const {
  useGetPlacesQuery,
  useGetPlaceByIdQuery,
  useCreatePlaceMutation,
  useGetPlaceForSerchQueryQuery,
  useSendMessageMutation,
} = api;