import React from 'react'
import { useStoreon } from "storeon/react";
import UnauthenticatedPage from 'src/pages/unauthenticated/page.jsx'

const NormalPage = () => 'It works'

function App() {
    const {user} = useStoreon('auth0')

    return user ? <NormalPage /> : <UnauthenticatedPage />    
}

export default App
