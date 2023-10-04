'use client'
import { useAuth } from '@/app/components/context/AuthContext';
import useApiUrl from '@/app/hooks/useApiUrl';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Invoice = () => {
    const [apiUrl] = useApiUrl();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [invoiceList, setInvoiceList] = useState([]);


    useEffect(() => {
        setIsLoading(true);
        if (user?.email) {
            axios.get(`${apiUrl}/api/invoice?userEmail=${user?.email}`)
                .then((invoice) => {
                    console.log(invoice.data);
                    setInvoiceList(invoice.data.invoice);
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, [user?.email, apiUrl]);

    return (
        <div className='p-2 lg:p-16 bg-[#F7F7F9] min-h-[100vh] '>
            <p className='text-rose-500 text-center uppercase text-3xl mb-8 '>This page will be designed soon!!</p>

            <p className='text-gray-700 capitalize text-2xl mb-2'>See all of your invoices</p>
            <div className='bg-white p-4 rounded-lg '>
                {
                    isLoading ? <p>Loading...</p> :


                        invoiceList?.length > 0 && invoiceList?.map((invoice, idx) => <div key={invoice._id} className='mb-3'>

                            {idx + 1}. {invoice.invoiceNumber} <br /> <span className='ml-8'>{invoice.customerDetails.customerName}</span>
                        </div>)
                }
            </div>
        </div>
    )
}

export default Invoice