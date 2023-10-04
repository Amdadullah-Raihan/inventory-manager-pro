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
    const [partialQuery, setPartialQuery] = useState('');

    // console.log("invoiceList", invoiceList);

    useEffect(() => {
        setIsLoading(true);
        let url;
        if (partialQuery) {
            url = `${apiUrl}/api/invoice/${user?.email}?partialQuery=${partialQuery}`
        }
        else {
            url = `${apiUrl}/api/invoice/${user?.email}`
        }
        if (user?.email) {
            axios.get(url)
                .then((invoice) => {
                    // console.log(invoice.data);
                    setInvoiceList(invoice.data.invoices);
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, [user?.email, apiUrl, partialQuery]);

    return (
        <div className='p-2 lg:p-16 bg-[#F7F7F9] min-h-[100vh] '>
            <p className='text-rose-500 text-center uppercase text-3xl mb-8 '>This page will be designed soon!!</p>

            <div className='flex justify-between'>
                <p className='text-gray-700 capitalize text-2xl mb-2'>See all of your invoices</p>

                <div className="form-control">
                    <div className="input-group">
                        <input type="text" placeholder="Search…" className="input input-bordered input-md" onChange={(e) => setPartialQuery(e.target.value)} />
                        <button className="btn btn-square" >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className='bg-white p-4 rounded-lg '>
                {
                    isLoading ? <p>Loading...</p> :


                        invoiceList?.length > 0 ? invoiceList?.map((invoice, idx) => <div key={invoice._id} className='mb-3'>

                            {idx + 1}. {invoice.invoiceNumber} <br /> <span className='ml-8'>{invoice.customerDetails.customerName}</span>
                        </div>) : <div> No Invoice Found! </div>
                }
            </div>
        </div>
    )
}

export default Invoice