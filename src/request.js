import { GraphQLClient } from 'graphql-request'
import store from './store.js'

const {
	SNOWPACK_PUBLIC_BACKEND_URL = 'http://localhost:8081',
} = import.meta.env

export const request = (query, variables) => {
	const { accessToken } = store.get('auth0')

	const client = new GraphQLClient(SNOWPACK_PUBLIC_BACKEND_URL, {
		headers: {
			authorization: `Bearer ${accessToken}`,
		},
    })
    
    return client.request(query, variables)
}
