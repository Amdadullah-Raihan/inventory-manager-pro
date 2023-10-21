'use client'
import React, { useEffect, useState } from 'react'
import { TbCurrencyTaka, TbFileDownload } from 'react-icons/tb'
import { AiFillPrinter, AiOutlineSend } from 'react-icons/ai'
import { RiFileEditFill, RiSave3Fill } from 'react-icons/ri';
import { FaArrowRotateRight, FaPlus } from 'react-icons/fa6';
import ProtectedRoute from '@/app/components/ProtectedRoute/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { ToWords } from 'to-words';
import useInvoice from '@/app/hooks/useInvoice';
import { useInvoiceContext } from '@/app/context/InvoiceContext';
import Link from 'next/link';
import InvoiceHeader from '@/app/components/Invoice/CreateInvoice/InvoiceHeader';
import InvoiceTo from '@/app/components/Invoice/CreateInvoice/InvoiceTo';
import AddProductDetails from '@/app/components/Invoice/CreateInvoice/AddProductDetails';
import BillingDetails from '@/app/components/Invoice/CreateInvoice/BillingDetails';
import { GrPowerReset } from 'react-icons/gr';
import NotePreview from '@/app/components/Invoice/Preview/NotePreview';
import { motion } from 'framer-motion';


const CreateInvoice = () => {

    const { invoice, setInvoice } = useInvoiceContext()
    const router = useRouter()

    // console.log('customerDetails', invoice.customerDetails);
    // console.log('invoice', invoice);
    // console.log('paymentDetails', invoice.paymentDetails);

    const issuedDate = new Date().toISOString().split('T')[0];

    const handleReset = (resetOption) => {
        if (resetOption === 'all') {
            setInvoice({
                userEmail: '',
                invoiceNumber: '',
                issuedDate: issuedDate,
                customerDetails: {
                    customerName: '',
                    customerAddress: '',
                    customerPhoneNo: '',
                    customerEmail: ''
                },
                productDetails: {
                    products: [{
                        productName: '',
                        warranty: '',
                        quantity: 0,
                        unitPrice: 0,

                    }],
                },
                paymentDetails: {
                    subtotal: 0,
                    discount: 0,
                    total: 0,
                    totalPaid: 0,
                    totalDue: 0,

                }
            })
        }
        else if (resetOption === 'customer') {
            setInvoice((prevInvoice) => ({
                ...prevInvoice,
                invoiceNumber: '',
                customerDetails: {
                    customerName: '',
                    customerAddress: '',
                    customerPhoneNo: '',
                    customerEmail: ''
                } // Reset customerDetails to an empty object
            }));

        }
        else if (resetOption === 'product') {
            setInvoice((prevInvoice) => ({
                ...prevInvoice,
                invoiceNumber: '',
                productDetails: {
                    products: [{
                        productName: '',
                        warranty: '',
                        quantity: 0,
                        unitPrice: 0,

                    }],

                } // Reset productsDetails to an empty object
            }));
            setInvoice((prevInvoice) => ({
                ...prevInvoice,
                invoiceNumber: '',
                paymentDetails: {
                    subtotal: 0,
                    discount: 0,
                    total: 0,
                    totalPaid: 0,
                    totalDue: 0,

                } // Reset paymentDetails to an empty object
            }));

        }

    }


    // Form validation
    const isFormFilled =
        typeof invoice.userEmail === 'string' && invoice.userEmail.trim() !== '' &&
        typeof invoice.invoiceNumber === 'string' && invoice.invoiceNumber.trim() !== '' &&
        typeof invoice.customerDetails?.customerName === 'string' && invoice.customerDetails?.customerName.trim() !== '' &&
        typeof invoice.customerDetails?.customerAddress === 'string' && invoice.customerDetails?.customerAddress.trim() !== '' &&
        typeof invoice.customerDetails?.customerPhoneNo === 'string' && invoice.customerDetails?.customerPhoneNo.trim() !== '' &&
        Array.isArray(invoice.productDetails?.products) && invoice.productDetails.products.every(
            (product) =>
                typeof product.productName === 'string' && product.productName.trim() !== '' &&
                (typeof product.quantity === 'number' && product.quantity >= 0) &&
                (typeof product.unitPrice === 'number' && product.unitPrice >= 0)
        ) &&
        (typeof invoice.paymentDetails?.subtotal === 'number' && invoice.paymentDetails.subtotal >= 0) &&
        (typeof invoice.paymentDetails?.discount === 'number' && invoice.paymentDetails.discount >= 0);





    console.log('isFormfilled', isFormFilled);
    console.log('invoice', invoice);

    return (
        <ProtectedRoute router={router}>
            <div className='w-full bg-[#F7F7F9] dark:bg-secondary lg:flex justify-center items-start flex-col lg:flex-row gap-y-2 lg:gap-x-6 min-h-[100vh] p-2 lg:p-4 capitalize'>

                {/* Invoice Starts */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}


                    className='max-w-[700px]  bg-white dark:bg-neutral dark:text-gray-400  shadow p-2 lg:p-4 rounded-md'
                >
                    <InvoiceHeader invoice={invoice} />
                    <InvoiceTo />
                    <AddProductDetails />
                    <BillingDetails />
                    <NotePreview />
                </motion.div>
                {/* Invoice ends */}

                {/* right btn  */}
                <motion.div
                    initial={{ opacity: 0.5, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}


                    className='max-h-[300px] w-full lg:max-w-[400px] bg-white dark:bg-neutral rounded-md shadow-md mt-2 lg:mt-0 p-2 lg:p-4 flex flex-col gap-y-2 lg:gap-y-4'
                >
                    <button
                        // disabled={isFormFilled ? false : true}
                        className='btn border-none w-full bg-[#5a66f1] text-white hover:text-black disabled:dark:bg-base-200'
                    >
                        <Link
                            href='/pages/invoice/preview'
                            className='flex items-center gap-2'
                        >
                            <RiSave3Fill className='text-xl' />
                            See Preview
                        </Link>
                    </button>

                    {
                        process.env.NODE_ENV === 'development' && <>
                            <button
                                className='btn border-none w-full bg-orange-500 text-white hover:text-black'
                                onClick={() => handleReset('customer')}
                            >

                                Reset customer details
                            </button>

                            <button
                                className='btn border-none w-full bg-blue-500 text-white hover:text-black'
                                onClick={() => handleReset('product')}
                            >

                                Reset Product Details
                            </button>
                        </>
                    }

                    <button
                        className='btn border-none w-full bg-rose-500 text-white hover:text-black'
                        onClick={() => handleReset('all')}
                    >
                        <FaArrowRotateRight className='text-xl' />

                        Reset All
                    </button>



                </motion.div>
            </div>
        </ProtectedRoute>
    )
}

export default CreateInvoice