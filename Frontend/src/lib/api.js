import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const BACKEND_URL = "http://localhost:8080";

export const api = createApi({
  reducerPath : "api",
  baseQuery:fetchBaseQuery({ baseUrl : `${BACKEND_URL}/api/`}),
  endpoints:(builder)=>({
    getPlaces: builder.query({
      query:()=>"places/"
    }),
    getPlaceById:builder.query({
      query:(id)=>`places/${id}`,
    }),
    createPlace: builder.mutation({
      query:(place)=>({
        url:"places",
        method:"POST",
        body:place,
      })
    })
  })
})

export const {useGetPlacesQuery,useGetPlaceByIdQuery,useCreatePlaceMutation} = api;