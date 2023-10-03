'use client'
import React, { useEffect, useState } from 'react'
import { TbCurrencyTaka, TbFileDownload } from 'react-icons/tb'
import { AiFillPrinter, AiOutlineSend } from 'react-icons/ai'
import { RiFileEditFill, RiSave3Fill } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa6';
import ProtectedRoute from '@/app/components/ProtectedRoute/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { ToWords } from 'to-words';
import useInvoice from '@/app/hooks/useInvoice';
import { useInvoiceContext } from '@/app/components/context/InvoiceContext';
import Link from 'next/link';
import InvoiceHeader from '@/app/components/Invoice/CreateInvoice/InvoiceHeader';
import InvoiceTo from '@/app/components/Invoice/CreateInvoice/InvoiceTo';
import AddProductDetails from '@/app/components/Invoice/CreateInvoice/AddProductDetails';
import BillingDetails from '@/app/components/Invoice/CreateInvoice/BillingDetails';


const CreateInvoice = () => {

    const { invoice, setInvoice } = useInvoiceContext()
    const router = useRouter()





    // console.log('customerDetails', invoice.customerDetails);
    console.log('productDetails', invoice.productDetails.products);
    // console.log('paymentDetails', invoice.paymentDetails);


    return (
        <ProtectedRoute router={router}>
            <div className='w-full bg-[#F7F7F9] lg:flex justify-center items-start flex-col lg:flex-row gap-y-2 lg:gap-x-6 min-h-[100vh] p-2 lg:p-4'>

                {/* Invoice Starts */}
                <div className='max-w-[700px]  bg-white shadow p-2 lg:p-4 rounded-md'>

                    <InvoiceHeader />
                    <InvoiceTo />
                    <AddProductDetails />
                    <BillingDetails />

                    {/* Notes Starts */}
                    <div className=" pt-1 mt-4 text-gray-400 border-t">
                        <p><span className='text-gray-600'>Note:</span> You are an incredible custormar. We were extremly lucky to serve you. We hope you will keep us in mind for the future shopping. Thank you!  </p>
                    </div>
                    {/* Notes ends */}
                </div>
                {/* Invoice ends */}

                {/* right btns */}
                <div className='max-h-[300px] w-full lg:max-w-[400px] bg-white rounded-md shadow-md mt-2 lg:mt-0 p-2 lg:p-4 flex flex-col gap-y-2 lg:gap-y-4'>
                    <Link href='/pages/invoice/preview'>
                        <button className='btn w-full bg-[#5a66f1] text-white hover:text-black'><RiSave3Fill className='text-xl' />See Preview</button>
                    </Link>


                </div>
            </div>
        </ProtectedRoute>
    )
}

export default CreateInvoice