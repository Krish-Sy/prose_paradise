import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

//Since we're using async functions, we're injecting into apiSlice for builder and endpoints
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({ //builder has query method using which we can get queries being passed from backend i.e (product_url)
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      providesTags: ['Products'], //Without this, we may have to rename the page
      keepUnusedDataFor: 5
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    }), 
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productsApiSlice;
//useGetProductsQuery is a convention we follow. (Adding use and query beind getProducts fn)