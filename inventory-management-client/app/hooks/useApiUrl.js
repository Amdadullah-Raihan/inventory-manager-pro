import React from 'react'

const useApiUrl = () => {
    let apiUrl;
    if (process.env.NODE_ENV == 'development') apiUrl = 'http://localhost:5000';
    else apiUrl = "https://inventory-management-server-rho.vercel.app"

    return [apiUrl]
}

export default useApiUrl;