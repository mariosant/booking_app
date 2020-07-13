import createAuth0Client from '@auth0/auth0-spa-js'

const createModule = (options) => async (store) => {
	store.on('@init', () => ({
		auth0: {
			loading: false,
			error: undefined,
			user: undefined,
			accessToken: undefined,
			claims: undefined,
		},
	}))

	store.on('auth0/set', ({ auth }, params = {}) => {
		const nextAuth = { ...auth, ...params }

		return { auth0: nextAuth }
	})

	store.on('auth0/error', ({ auth }, error) => {
		const nextAuth = { ...auth, error }

		return { auth0: nextAuth }
	})

	store.on('auth0/loading', ({ auth }, loading) => {
		const nextAuth = { ...auth, loading }

		return { auth0: nextAuth }
	})

	store.on('auth0/getUser', async (state) => {
		try {
			const user = await client.getUser()
			const claims = await client.getIdTokenClaims()
			const accessToken = await client.getTokenSilently()

			store.dispatch('auth0/set', { accessToken, claims, user })
		} catch (error) {
			store.dispatch('auth0/set', { error })
		}
	})

	store.on('auth0/loginWithPopup', async () => {
		store.dispatch('auth0/loading', true)

		try {
			await client.loginWithPopup()

			store.dispatch('auth0/getUser')
		} catch (error) {
			store.dispatch('auth0/error', error)
		} finally {
			store.dispatch('auth0/loading', true)
		}
	})

	store.on('auth0/loginWithRedirect', async () => {
		store.dispatch('auth0/loading', true)

		const { redirect_uri = window.location.origin } = options

		try {
			await client.loginWithRedirect({
				redirect_uri,
			})

			store.dispatch('auth0/getUser')
		} catch (error) {
			store.dispatch('auth0/error', error)
		} finally {
			store.dispatch('auth0/loading', false)
		}
	})

	store.on('auth0/logout', () => {
		store.dispatch('auth0/set', {
			user: undefined,
		})

		client.logout()
	})

	const client = await createAuth0Client(options)

	try {
		if (window.location.search.includes('code=')) {
			await client.handleRedirectCallback()
		}
	} catch (error) {
		console.error(error)
		store.dispatch('auth0/error', error)
	} finally {
		store.dispatch('auth0/getUser')
	}
}

export default createModule
