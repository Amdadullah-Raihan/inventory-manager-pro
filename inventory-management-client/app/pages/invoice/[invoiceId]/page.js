'use client'
import InvoiceHeader from '@/app/components/Invoice/CreateInvoice/InvoiceHeader';
import BillingDetailsPreview from '@/app/components/Invoice/Preview/BillingDetailsPreview';
import InvoicePreview from '@/app/components/Invoice/Preview/InvoicePreview';
import NotePreview from '@/app/components/Invoice/Preview/NotePreview';
import ProductDetailsPreview from '@/app/components/Invoice/Preview/ProductDetailsPreview';
import useApiUrl from '@/app/hooks/useApiUrl';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';

const SingleInvoice = () => {
    const apiUrl = useApiUrl()
    const { invoiceId } = useParams()
    const [singleInvoice, setSingleInvoice] = useState({});
    const [isLoading, setIsLoading] = useState(true);


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

    return (
        <InvoicePreview invoice={singleInvoice} isLoading={isLoading} />
    )
}

export default SingleInvoice