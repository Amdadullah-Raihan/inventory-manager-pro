'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useInvoiceContext } from '@/app/components/context/InvoiceContext';
import { AiFillPrinter } from 'react-icons/ai';
import { RiFileEditFill, RiSave3Fill } from 'react-icons/ri';
import { TbCurrencyTaka, TbFileDownload } from 'react-icons/tb';
import InvoiceHeader from '@/app/components/Invoice/CreateInvoice/InvoiceHeader';
import BillingDetails from '@/app/components/Invoice/CreateInvoice/BillingDetails';
import ProductDetailsPreview from '@/app/components/Invoice/Preview/ProductDetailsPreview';
import BillingDetailsPreview from '@/app/components/Invoice/Preview/BillingDetailsPreview';
import axios from 'axios';
import useApiUrl from '@/app/hooks/useApiUrl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import ReactToPrint from 'react-to-print';

const InvoicePreview = () => {
    //states will go here
    const [isSuccess, setIsSuccess] = useState(true);
    const { invoice } = useInvoiceContext();
    const [apiUrl] = useApiUrl();
    const router = useRouter();
    const componentRef = useRef()

    const handleSaveInvoice = () => {

        axios.post(`${apiUrl}/api/invoice/new`, invoice)
            .then(result => {

                if (result.data.success) {
                    toast.success('Invoice added successfully!', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000, // Close the toast after 3 seconds (optional)
                    });
                    setIsSuccess(true);
                    alert('Invoice added successfully');

                }
            })
            .catch(err => {
                console.log("error creating invoice", err);
                alert('Error creating invoice')
            })

    };


    return (
        <div className='w-full bg-[#F7F7F9] lg:flex justify-center items-start flex-col lg:flex-row gap-y-2 lg:gap-x-6 min-h-[100vh] p-2 lg:p-4'>
            {/* start invoice */}
            <div ref={componentRef} id="printable-content" className='max-w-[700px]  bg-white shadow p-2 lg:p-4 rounded-md'>
                <InvoiceHeader />
                <ProductDetailsPreview />
                <BillingDetailsPreview />


                {/* notes*/}
                <div className="py-4 text-gray-500">
                    <p><span className='text-gray-600'>Note:</span> You are an incredible custormar. We were extremly lucky to serve you. We hope you will keep us in mind for the future shopping. Thank you!  </p>
                </div>
            </div>

            {/* right btns */}
            <div className='max-h-[300px] w-full lg:max-w-[400px] bg-white rounded-md shadow-md mt-2 lg:mt-0 p-2 lg:p-4 flex flex-col gap-y-2 lg:gap-y-4'>

                <button
                    className={`btn w-full bg-[#5a66f1] text-white hover:text-black`}
                    disabled={isSuccess}
                    onClick={handleSaveInvoice}
                >
                    <RiSave3Fill className='text-xl' />
                    Save Invoice
                </button>
                <button
                    className='btn btn-outline w-full border-[#5a66f1] text-[#5a66f1] hover:text-white'
                    disabled={true}
                >
                    <RiFileEditFill className='text-xl' />
                    Edit Invoice
                </button>
                <ReactToPrint
                    trigger={() => {
                        return <button
                            className='btn btn-outline w-full border-[#5a66f1] text-[#5a66f1] hover:text-white'
                            disabled={!isSuccess}


                        >
                            <AiFillPrinter className='text-xl' />
                            Print
                        </button>
                    }}
                    content={() => componentRef.current}
                    documentTitle='Invoice'
                    printStyle='print'
                    target='_self'
                />


                <ReactToPrint
                    trigger={() => {
                        return <button
                            className='btn btn-outline w-full border-[#5a66f1] text-[#5a66f1] hover:text-white'
                            disabled={!isSuccess}

                        >
                            <TbFileDownload className='text-xl' />
                            Download
                        </button>
                    }}
                    documentTitle='Invoice'
                    content={() => componentRef.current}



                />



            </div>
        </div>
    )
}

export default InvoicePreview