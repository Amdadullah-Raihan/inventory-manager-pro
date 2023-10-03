'use client'
import React, { useEffect, useState } from 'react'
import { useInvoiceContext } from '@/app/components/context/InvoiceContext';
import { AiFillPrinter } from 'react-icons/ai';
import { RiFileEditFill, RiSave3Fill } from 'react-icons/ri';
import { TbCurrencyTaka, TbFileDownload } from 'react-icons/tb';
import InvoiceHeader from '@/app/components/Invoice/CreateInvoice/InvoiceHeader';
import BillingDetails from '@/app/components/Invoice/CreateInvoice/BillingDetails';
import ProductDetailsPreview from '@/app/components/Invoice/Preview/ProductDetailsPreview';
import BillingDetailsPreview from '@/app/components/Invoice/Preview/BillingDetailsPreview';

const InvoicePreview = () => {
    //states will go here


    return (
        <div className='w-full bg-[#F7F7F9] lg:flex justify-center items-start flex-col lg:flex-row gap-y-2 lg:gap-x-6 min-h-[100vh] p-2 lg:p-4'>
            {/* start invoice */}
            <div className='max-w-[700px]  bg-white shadow p-2 lg:p-4 rounded-md'>
                <InvoiceHeader />


                {/* Invoice to starts*/}
                <div className="flex flex-col gap-y-4 lg:flex-row justify-between py-8 border-b-2">
                    {/* middle left */}
                    <div className="text-gray-400">
                        <h5 className='text-gray-600'>Invoice To: </h5>
                        <p>Amdadul Islam{ }</p>
                        <address>1183 Nurerchala Rd., Vatara, Dhaka-1212</address>
                        <p>+8801890103204</p>
                        <p>amdaudllahrayhan@gmail.com</p>
                    </div>


                    {/* middle right*/}
                    <div className='text-gray-400'>
                        <h5 className='text-gray-600'>Billing Details: </h5>
                        <p className='flex items-center'>Total Paid:{ }<TbCurrencyTaka className='text-gray-500 text-lg ' />12390 </p>
                        <p className='flex items-center'>Total Due:{ }<TbCurrencyTaka className='text-gray-500 text-lg ' />0 </p>
                        <p className='flex items-center'>Paid By: Cash/Bkash/Bank </p>



                    </div>
                </div>

                <ProductDetailsPreview />
                <BillingDetailsPreview />


                {/* notes*/}
                <div className="py-6 text-gray-400">
                    <p><span className='text-gray-600'>Note:</span> You are an incredible custormar. We were extremly lucky to serve you. We hope you will keep us in mind for the future shopping. Thank you!  </p>
                </div>
            </div>

            {/* right btns */}
            <div className='max-h-[300px] w-full lg:max-w-[400px] bg-white rounded-md shadow-md mt-2 lg:mt-0 p-2 lg:p-4 flex flex-col gap-y-2 lg:gap-y-4'>
                <button className='btn w-full bg-[#5a66f1] text-white hover:text-black'><RiSave3Fill className='text-xl' />Save Invoice</button>
                <button className='btn btn-outline w-full border-[#5a66f1] text-[#5a66f1] hover:text-white'><RiFileEditFill className='text-xl' />Edit Invoice</button>
                <button className='btn btn-outline w-full border-[#5a66f1] text-[#5a66f1] hover:text-white'><AiFillPrinter className='text-xl' />Print </button>
                <button className='btn btn-outline w-full border-[#5a66f1] text-[#5a66f1] hover:text-white'><TbFileDownload className='text-xl' />Download </button>

            </div>
        </div>
    )
}

export default InvoicePreview