import type { IBook } from '@/types/book';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['Books', 'Borrows'],
  endpoints: builder => ({
    // ✅ get all books
    getAllBooks: builder.query<{ data: IBook[]; total: number }, void>({
      query: () => `/books`,
      providesTags: ['Books'],
    }),
    // ✅ get single books
    getSingleBook: builder.query<IBook, string>({
      query: id => `/books/${id}`,
      providesTags: ['Books'],
    }),
    // ✅ create books
    createBook: builder.mutation<IBook, Partial<IBook>>({
      query: body => ({
        url: `/books`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Books'],
    }),
    // ✅ update books
    updateBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Books'],
    }),
    // ✅ delete books
    deleteBook: builder.mutation<{ message: string }, string>({
      query: id => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),

    // ✅ borrow books
    createBorrow: builder.mutation({
      query: borrowData => ({
        url: '/borrows',
        method: 'POST',
        body: borrowData,
      }),
      invalidatesTags: ['Borrows', 'Books'],
    }),

    // ✅ borrow summery
    getBorrowSummary: builder.query({
      query: () => '/borrows/summary',
      providesTags: ['Borrows'],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useCreateBorrowMutation,
  useGetBorrowSummaryQuery,
} = apiSlice;
