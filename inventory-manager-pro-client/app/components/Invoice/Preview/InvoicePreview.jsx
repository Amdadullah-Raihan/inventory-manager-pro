'use client'
import InvoiceHeader from '@/app/components/Invoice/CreateInvoice/InvoiceHeader';
import BillingDetailsPreview from '@/app/components/Invoice/Preview/BillingDetailsPreview';
import NotePreview from '@/app/components/Invoice/Preview/NotePreview';
import ProductDetailsPreview from '@/app/components/Invoice/Preview/ProductDetailsPreview';
import useApiUrl from '@/app/hooks/useApiUrl';
import useInvoice from '@/app/hooks/useInvoice';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';

const InvoicePreview = ({ invoice, isLoading }) => {


    return (
        <div className='w-full bg-[#F7F7F9] min-h-screen p-2 lg:p-6'>
            {
                isLoading ? <div className=' flex justify-center py-16 gap-1 text-primary'>
                    <p className='text-xl font-semibold '>Loading </p>
                    <RotatingLines
                        strokeColor="#5a66f1"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}
                    />
                </div> :
                    invoice.customerDetails ?

                        <div className='bg-white p-2 lg:p-6 rounded-lg max-w-[790px] mx-auto'>
                            <InvoiceHeader invoice={invoice} />
                            <ProductDetailsPreview invoice={invoice} />
                            <BillingDetailsPreview invoice={invoice} />
                            <NotePreview />
                        </div> :

                        <div className='bg-white rounded-lg  text-xl text-rose-500 py-16 text-center'>No Invoice Found!</div>
            }
        </div>
    )
}

export default InvoicePreview