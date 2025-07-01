import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Task'],
  endpoints: builder => ({
    getTaskAll: builder.query({
      query: () => '/tasks',
      providesTags: ['Task'],
    }),

    createTask: builder.mutation({
      query: newTask => ({
        url: '/tasks',
        method: 'POST',
        body: newTask,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const { useGetTaskAllQuery, useCreateTaskMutation } = baseApi;
