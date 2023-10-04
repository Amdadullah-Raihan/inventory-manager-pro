'use client'
import { useAuth } from '@/app/components/context/AuthContext';
import useApiUrl from '@/app/hooks/useApiUrl';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { AiOutlineFolderView, AiOutlinePlus } from 'react-icons/ai';
import { TbTrash } from 'react-icons/tb';

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


    const handleDeleteInvoice = (invoiceId) => {
        console.log(invoiceId);
        axios.delete(`${apiUrl}/api/invoice/${invoiceId}`)
            .then(res => {
                console.log("deleted invoice", res);
                if (res.data.success) {
                    alert(res.data.message);

                }
                const newInvoiceList = invoiceList.filter(invoice => invoice._id !== invoiceId)
                setInvoiceList(newInvoiceList)
            })
            .catch(err => {

            });
    };

    return (
        <div className='p-2 lg:p-4  bg-[#F7F7F9] min-h-[100vh] '>
            <div className="bg-white shadow-md rounded-lg ">
                <div className='flex  justify-between py-6 px-4'>
                    <select className="select select-bordered w-full max-w-xs" disabled>
                        <option disabled selected>Actions</option>

                    </select>
                    <div className='flex  items-center'>
                        <input type="text" className='input input-bordered mr-2' placeholder='Search Invoice' onChange={(e) => setPartialQuery(e.target.value)} />
                        <Link href='/pages/invoice/new' className='btn bg-[#5A5FE0] text-white hover:text-gray-700'>
                            <AiOutlinePlus className='' /> Create Invoice
                        </Link>
                    </div>
                </div>
                <div className="overflow-x-auto ">

                    <table className="table">
                        {/* head */}
                        <thead className='bg-base-200'>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>Invoic ID</th>
                                <th>Customer  </th>
                                <th>Issued Date</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}

                            {
                                isLoading ? <p>Loading...</p> :


                                    invoiceList?.length > 0 ? invoiceList?.map((invoice, idx) =>

                                        <tr key={invoice._id}>
                                            <td>
                                                <label>
                                                    <input type="checkbox" className="checkbox" />
                                                </label>
                                            </td>
                                            <td className='text-[#5A5FE0] font-semibold'>
                                                #{invoice.invoiceNumber}
                                            </td>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div>
                                                        <div className="font-bold">{invoice.customerDetails.customerName}</div>
                                                        <div className="text-sm opacity-50">{invoice.customerDetails.customerEmail}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                {invoice.issuedDate ? <span>{invoice.issuedDate} </span> : <span>No Date Found!</span>}
                                            </td>
                                            <td>
                                                <button className="btn btn-ghost btn-xs" onClick={() => handleDeleteInvoice(invoice._id)}>
                                                    <TbTrash className='text-2xl text-rose-500' />
                                                </button>
                                                <button className="btn btn-ghost btn-xs">
                                                    <AiOutlineFolderView className='text-2xl text-[#5A5FE0]' />
                                                </button>
                                            </td>
                                        </tr>

                                    ) :
                                        <div> No Invoice Found! </div>
                            }


                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    )
}

export default Invoice