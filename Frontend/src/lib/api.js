import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BACKEND_URL = "https://celebratehub.netlify.app/api/";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/`,
    prepareHeaders: async (headers, { getState }) => {
       const clerk = window.Clerk;
      if (clerk) {
        const token = await clerk.session?.getToken();
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
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
    createBooking: builder.mutation({
      query:(booking) => ({
        url:"bookings",
        method:"POST",
        body:booking
      })
    }),
    createCheckoutSession: builder.mutation({
  query: (bookingId) => ({
    url: 'payments/create-checkout-session',
    method: 'POST',
    body: { bookingId }
  })
}),

     getBookingById: builder.query({
      query: (id) => `bookings/${id}`
    }),
    // createCheckoutSession: builder.mutation({
    //   query: () => ({
    //     url: 'payments/create-checkout-session',
    //     method: 'POST'
    //   })
    // }),
    getCheckoutSessionStatus: builder.query({
      query: (sessionId) => `payments/session-status?session_id=${sessionId}`
    })
  }),
});

export const {
  useGetPlacesQuery,
  useGetPlaceByIdQuery,
  useCreatePlaceMutation,
  useGetPlaceForSerchQueryQuery,
  useSendMessageMutation,
  useGetCheckoutSessionStatusQuery,
  useCreateBookingMutation,
  useGetBookingByIdQuery,
  useCreateCheckoutSessionMutation,
} = api;