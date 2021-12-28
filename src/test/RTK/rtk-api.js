// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://6137592feac1410017c182b7.mockapi.io/';

const endpoitns = {
  tutors: 'tutors',
  departments: 'departments',
  cities: 'cities',
};

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Cities'],
  endpoints: build => ({
    getCities: build.query({
      query: () => endpoitns.cities,
      // Provides a list of `Cities` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Cities` element was added.
      providesTags: result =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: 'Cities', id })),
              { type: 'Cities', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Cities', id: 'LIST' }` is invalidated
            [{ type: 'Cities', id: 'LIST' }],
    }),
    addCity: build.mutation({
      query(body) {
        return {
          url: endpoitns.cities,
          method: 'POST',
          body,
        };
      },
      // Invalidates all Cities-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created city could show up in any lists.
      invalidatesTags: [{ type: 'Cities', id: 'LIST' }],
    }),
    editCity: build.mutation({
      query: ({ id, ...update }) => ({
        url: `${endpoitns.cities}/${id}`,
        method: 'PUT',
        body: update,
      }),
      // Invalidates all queries that subscribe to this City `id` only.
      // In this case, `getCity` will be re-run. `getCities` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { id }) => [{ type: 'Cities', id }],
    }),
    deleteCity: build.mutation({
      query(id) {
        return {
          url: `${endpoitns.cities}/${id}`,
          method: 'DELETE',
        };
      },
      // Invalidates all queries that subscribe to this City `id` only.
      invalidatesTags: (result, error, id) => [{ type: 'Cities', id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCitiesQuery,
  useAddCityMutation,
  useEditCityMutation,
  useDeleteCityMutation,
} = api;
