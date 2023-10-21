'use client'
import InvoiceHeader from '@/app/components/Invoice/CreateInvoice/InvoiceHeader';
import BillingDetailsPreview from '@/app/components/Invoice/Preview/BillingDetailsPreview';
import InvoicePreview from '@/app/components/Invoice/Preview/InvoicePreview';
import NotePreview from '@/app/components/Invoice/Preview/NotePreview';
import ProductDetailsPreview from '@/app/components/Invoice/Preview/ProductDetailsPreview';
import useApiUrl from '@/app/hooks/useApiUrl';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { AiFillPrinter } from 'react-icons/ai';
import { RotatingLines } from 'react-loader-spinner';
import ReactToPrint from 'react-to-print';

const SingleInvoice = () => {
    const apiUrl = useApiUrl()
    const { invoiceId } = useParams()
    const [singleInvoice, setSingleInvoice] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const invoiceRef = useRef()


    useEffect(() => {
        setIsLoading(true);
        axios.get(`${apiUrl}/api/invoice/singleInvoice/${invoiceId}`)
            .then((response) => {
                setSingleInvoice(response.data.invoice);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log('error', error);
                // setIsLoading(false)
            })
    }, []);

    console.log('single inovice', singleInvoice);

    return (
        <div className='mb-2 w-full md:flex gap-x-4 bg-[#F7F7F9] dark:bg-secondary p-2 lg:p-6'>
            <InvoicePreview ref={invoiceRef} invoice={singleInvoice} isLoading={isLoading} />
        </div>
    )
}

export default SingleInvoice