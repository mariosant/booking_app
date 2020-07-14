import React from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'
import ThemeProvider from "@chakra-ui/core/dist/es/ThemeProvider";
import CSSReset from "@chakra-ui/core/dist/es/CSSReset";

import { StoreProvider } from './store.js'
import App from './App.jsx'

ReactDOM.render(
	<React.StrictMode>
		<>  
			<Helmet>
				<title>Booking for classes</title>
			</Helmet>
            <ThemeProvider>
                <StoreProvider>
                    <>
                        <CSSReset />
                        <App />
                    </>
                </StoreProvider>
            </ThemeProvider>
		</>
	</React.StrictMode>,
	document.getElementById('root')
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
	import.meta.hot.accept()
}
