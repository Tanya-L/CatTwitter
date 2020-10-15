import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => (
    <div style={{ textAlgin: 'center' }}>
        <h2>404</h2>
        <h3>Page not found</h3>
        <Link to="/">Go home</Link>
    </div>
)

export default PageNotFound