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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import ReactToPrint from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import NotePreview from '@/app/components/Invoice/Preview/NotePreview';

const InvoicePreview = () => {
    //states will go here
    const [isSuccess, setIsSuccess] = useState(false);
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
                    }
                    );
                    setIsSuccess(true);

                }
            })
            .catch(err => {
                console.log("error creating invoice", err);
                alert('Error creating invoice')
            })

    };

    const handleDownloadPDF = () => {
        const input = componentRef.current;

        //store and define shadow
        const originalBoxShadow = input.style.boxShadow;
        input.style.boxShadow = 'none';


        html2canvas(input)
            .then(canvas => {
                input.style.boxShadow = originalBoxShadow;
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4', true);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
                const imgX = (pdfWidth - imgWidth * ratio);
                const imgY = 0;
                pdf.addImage(imgData, "png", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
                pdf.save(`${invoice.customerDetails.customerName}-invoice-${invoice.invoiceNumber}.pdf`);

            })
    };


    return (
        <div className='w-full bg-[#F7F7F9] lg:flex justify-center items-start flex-col lg:flex-row gap-y-2 lg:gap-x-6 min-h-[100vh] p-2 lg:p-4'>
            {/* start invoice */}
            <div ref={componentRef} id="printable-content" className='max-w-[700px]  bg-white shadow p-2 lg:p-4 rounded-md'>
                <ToastContainer />
                <InvoiceHeader invoice={invoice} />
                <ProductDetailsPreview invoice={invoice} />
                <BillingDetailsPreview invoice={invoice} />
                <NotePreview />

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


                <button
                    className='btn btn-outline w-full border-[#5a66f1] text-[#5a66f1] hover:text-white'
                    disabled={!isSuccess}
                    onClick={handleDownloadPDF}

                >
                    <TbFileDownload className='text-xl' />
                    Download
                </button>




            </div>
        </div>
    )
}

export default InvoicePreview