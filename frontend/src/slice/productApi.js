import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endPoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `Products`,
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
