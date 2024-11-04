import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice.js'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions)

    // If you want, handle other status codes, too
    if (result?.error?.status === 403) {
        console.log('sending refresh token')

        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if (refreshResult?.data) {

            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data }))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {

            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired."
            }
            return refreshResult
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Service', 'ServiceItem', 'Bill'],
    endpoints: builder => ({
        fetchServices: builder.query({
            query: () => '/services',
            providesTags: ['Service']
        }),
        addService: builder.mutation({
            query: (newService) => ({
                url: '/services',
                method: 'POST',
                body: newService,
            }),
            invalidatesTags: ['Service']
        }),
        addServiceItem: builder.mutation({
            query: (newServiceItem) => ({
                url: '/serviceItems',
                method: 'POST',
                body: newServiceItem,
            }),
            invalidatesTags: ['ServiceItem']
        }),
        fetchBills: builder.query({
            query: () => '/bill',
            providesTags: ['Bill'],
        }),
        fetchBillDetail: builder.query({
            query: (billId) => `/bill/${billId}`,
            providesTags: (result, error, billId) => [{ type: 'Bill', id: billId }],
        }),
        updateBill: builder.mutation({
            query: ({ id, changes }) => ({
                url: `/bill/${id}/status`,
                method: 'PATCH', // Use PATCH for partial updates
                body: changes,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Bill', id }],
        }),
    })
})

export const { useFetchServicesQuery, useAddServiceMutation, useAddServiceItemMutation, useFetchBillsQuery, useFetchBillDetailQuery, useUpdateBillMutation } = apiSlice;
