
import useInvoice from '@/app/hooks/useInvoice';
import React, { createContext, useContext } from 'react'

const InvoiceContext = createContext();


export const InvoiceContextProvider = ({ children }) => {

    return (<InvoiceContext.Provider value={useInvoice()}>
        {children}
    </InvoiceContext.Provider>
    )
}



export const useInvoiceContext = () => {
    return useContext(InvoiceContext);
}