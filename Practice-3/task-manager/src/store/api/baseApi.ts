import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: builder => ({
    getTaskAll: builder.query({
      query: () => '/tasks',
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
    }),
  }),
});

export const { useGetTaskAllQuery, useCreateTaskMutation } = baseApi;
