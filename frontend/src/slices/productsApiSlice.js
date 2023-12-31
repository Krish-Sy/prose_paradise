import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

//Since we're using async functions, we're injecting into apiSlice for builder and endpoints
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({ //builder has query method using which we can get queries being passed from backend i.e (product_url)
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5
    }) 
  }),
});

export const {useGetProductsQuery, useGetProductDetailsQuery} = productApiSlice; //useGetProductsQuery is a convention we follow. (Adding use and query beind getProducts fn)