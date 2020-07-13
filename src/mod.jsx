import React from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'
import { StoreProvider } from './store.js'
import App from './App.jsx'

import 'antd/dist/antd.css'

ReactDOM.render(
	<React.StrictMode>
		<>
			<Helmet>
				<title>Booking for classes</title>
			</Helmet>
			<StoreProvider>
				<App />
			</StoreProvider>
		</>
	</React.StrictMode>,
	document.getElementById('root')
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
	import.meta.hot.accept()
}
