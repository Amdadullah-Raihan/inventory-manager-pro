'use client'
import { useAuth } from '@/app/components/context/AuthContext';
import useApiUrl from '@/app/hooks/useApiUrl';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Invoice = () => {
    const [apiUrl] = useApiUrl();
    const { user } = useAuth()
    const [invoiceList, setInvoiceList] = useState([]);


    useEffect(() => {
        if (user?.email) {
            axios.get(`${apiUrl}/api/invoice?userEmail=${user?.email}`)
                .then((invoice) => {
                    setInvoiceList(invoice.data.invoice);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, [user?.email, apiUrl]);

    return (
        <div className='p-2 lg:p-16 bg-[#F7F7F9] min-h-[100vh] '>
            <p className='text-center uppercase text-3xl mb-8 border-b'>This page will be designed soon!!</p>
            <ul className=''>
                {
                    invoiceList.map((invoice, idx) => <li key={invoice._id} className='mb-3'>

                        {idx + 1}. {invoice.invoiceNumber} <br /> <span className='ml-8'>{invoice.customerDetails.customerName}</span>
                    </li>)
                }
            </ul>
        </div>
    )
}

export default Invoice