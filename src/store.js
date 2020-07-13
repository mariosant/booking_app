import { createElement } from 'react'
import { createStoreon } from 'storeon'
import { StoreContext } from 'storeon/react'
import { storeonLogger } from 'storeon/devtools'
import { createRouter } from '@storeon/router'
import authModule from './lib/storeon-auth0-spa/mod.js'

const {
	SNOWPACK_PUBLIC_AUTH0_CLIENT_ID,
	SNOWPACK_PUBLIC_AUTH0_DOMAIN,
} = import.meta.env

const auth = authModule({
	client_id: SNOWPACK_PUBLIC_AUTH0_CLIENT_ID,
	domain: SNOWPACK_PUBLIC_AUTH0_DOMAIN,
	scopes: 'openid profile email',
})

const router = createRouter([
	['/', () => ({ page: 'home' })],
	['/classes', () => ({ page: 'classes' })],
	['/classes/*', (id) => ({ page: 'classes', id })],
	['/customers', () => ({ page: 'customers' })],
	['/customers/*', (id) => ({ page: 'customers', id })],
])

const store = createStoreon([storeonLogger, auth, router])

window.store = store

export default store

export const StoreProvider = ({ children }) =>
	createElement(StoreContext.Provider, { value: store }, children)
