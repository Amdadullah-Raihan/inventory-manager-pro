'use client'
import { useAuth } from '@/app/context/AuthContext';
import useApiUrl from '@/app/hooks/useApiUrl';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { AiOutlineFolderView, AiOutlinePlus } from 'react-icons/ai';
import { TbTrash } from 'react-icons/tb';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

const Invoice = () => {
    const [apiUrl] = useApiUrl();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [invoiceList, setInvoiceList] = useState([]);
    const [partialQuery, setPartialQuery] = useState('');
    const [id, setId] = useState('');



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

                    setInvoiceList(invoice.data.invoices);
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, [user?.email, apiUrl, partialQuery]);


    const handleDeleteInvoice = (invoiceId) => {

        axios.delete(`${apiUrl}/api/invoice/${invoiceId}`)
            .then(res => {
                if (res.data.success) {
                    toast.success("Invoice deleted successfully", {
                        position: toast.POSITION.TOP_RIGHT
                    })

                }
                const newInvoiceList = invoiceList.filter(invoice => invoice._id !== invoiceId)
                setInvoiceList(newInvoiceList)
            })
            .catch(err => {

            });
    };

    return (
        <div className='w-full py-4 lg:p-4  bg-[#F7F7F9] dark:bg-secondary dark:text-accent min-h-[100vh] '>
            <ToastContainer />

            <div className="max-w-sm lg:max-w-none mx-auto bg-white dark:bg-neutral shadow-md rounded-lg ">
                <div className='flex flex-col-reverse lg:flex-row gap-2 lg:justify-between py-6 px-4'>
                    <select className="select select-bordered w-full lg:max-w-xs" disabled>
                        <option disabled selected>Actions</option>

                    </select>
                    <div className='flex  gap-2 lg:flex-row items-center'>
                        <input type="text" className='w-full input input-bordered lg:mr-2 dark:bg-secondary' placeholder='Search Invoice' onChange={(e) => setPartialQuery(e.target.value)} />

                        <Link href='/pages/invoice/new' className='btn bg-[#5A5FE0] text-white border-none hover:text-gray-700'>
                            <AiOutlinePlus className='' /> <span className='hidden lg:inline'>Create Invoice</span>
                        </Link>
                    </div>
                </div>
                {
                    isLoading ? <div className='flex gap-1 justify-center pb-8'>
                        <p className='text-lg font-bold'>Loading</p>
                        <RotatingLines
                            strokeColor="#5A5FE0"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        />
                    </div> :
                        <div className="overflow-x-auto ">

                            <table className="table">
                                {/* head */}
                                <thead className='bg-base-200 dark:bg-secondary dark:text-white'>
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
                                    {

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
                                                    {invoice.issuedDate ? <span>{new Date(invoice.issuedDate).toISOString().split("T")[0]} </span> : <span>No Date Found!</span>}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-ghost btn-xs"
                                                        onClick={() => {
                                                            document.getElementById('my_modal_3').showModal()
                                                            setId(invoice._id)
                                                        }}
                                                    >
                                                        <TbTrash className='text-2xl text-rose-500' />
                                                    </button>
                                                    <Link href={`/pages/invoice/${invoice._id}`}>
                                                        <button className="btn btn-ghost btn-xs" >
                                                            <AiOutlineFolderView className='text-2xl text-[#5A5FE0]' />
                                                        </button>
                                                    </Link>
                                                </td>

                                                {/* modal  */}
                                                <dialog id="my_modal_3" className="modal">
                                                    <div className="modal-box">
                                                        <form method="dialog">
                                                            {/* if there is a button in form, it will close the modal */}
                                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                        </form>
                                                        <h3 className="font-bold text-l uppercase">Are you sure want to <span className='text-rose-500'>delete</span> the invoice?</h3>
                                                        <div>
                                                            <div className="modal-action">
                                                                <form method="dialog">

                                                                    <button className="btn bg-green-500 text-white mr-2 hover:text-green-500" >Cancel</button>
                                                                    <button className='btn bg-rose-500 text-white hover:text-rose-500' onClick={() => handleDeleteInvoice(id)}>Delete</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </dialog>
                                            </tr>

                                        ) :
                                            <div className='my-16 text-center text-xl uppercase text-rose-500'>
                                                No Invoice Found!
                                            </div>
                                    }


                                </tbody>


                            </table>
                        </div>

                }



            </div>

        </div>
    )
}

export default Invoice