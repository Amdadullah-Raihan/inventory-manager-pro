'use client'
import useInvoice from '@/app/hooks/useInvoice'
import React, { useEffect, useState } from 'react'
import { TbCurrencyTaka } from 'react-icons/tb'
import { ToWords } from 'to-words';
import { useInvoiceContext } from '../../context/InvoiceContext';



const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
        currency: true,
        ignoreDecimal: false,
        ignoreZeroCurrency: false,
        doNotAddOnly: false,
        currencyOptions: { // can be used to override defaults for the selected locale
            name: 'Rupee',
            plural: 'Taka',
            symbol: '',
            fractionalUnit: {
                name: 'Paisa',
                plural: 'Paise',
                symbol: '',
            },
        }
    }
});

const BillingDetails = () => {
    const { invoice, setInvoice } = useInvoiceContext();

    const [totalInWords, setTotalInWords] = useState('')


    const handleDiscount = (e) => {

        setInvoice((prevInvoice) => ({
            ...prevInvoice,
            paymentDetails: {
                ...prevInvoice.paymentDetails,
                discount: e.target.value,
            },
        }));

    }

    const handleTotalPaidChange = (e) => {

        setInvoice((prevInvoice) => ({
            ...prevInvoice,
            paymentDetails: {
                ...prevInvoice.paymentDetails,
                totalPaid: e.target.value,
            },
        }));
    }


    useEffect(() => {
        let newSubtotal = 0;

        invoice.productDetails.products.forEach((product) => {
            newSubtotal += product.unitPrice * product.quantity;
        });

        setInvoice((prevInvoice) => ({
            ...prevInvoice,
            paymentDetails: {
                ...prevInvoice.paymentDetails,
                subtotal: newSubtotal,
            },
        }));

    }, [invoice.productDetails.products]);



    useEffect(() => {
        let subtotal = invoice.paymentDetails.subtotal;
        let newTotal = invoice.paymentDetails.subtotal - invoice.paymentDetails.discount;
        setInvoice((prevInvoice) => ({
            ...prevInvoice,
            paymentDetails: {
                ...prevInvoice.paymentDetails,
                total: newTotal,
            },
        }));
        setTotalInWords(toWords.convert(newTotal))
    }, [invoice.paymentDetails.subtotal, invoice.paymentDetails.discount])




    return (
        <div className='flex flex-col-reverse lg:flex-row lg:justify-between gap-6  py-2'>
            {/* left */}
            <div className="w-full text-gray-500 ">
                <div className='mb-[150px]'>
                    <h4 className='text-gray-700 mb-2'>Billing&apos;s Details</h4>
                    <div className='flex flex-col gap-y-2'>
                        <div className='flex gap-2'>
                            <p>Total Paid:</p>
                            <input
                                type='number'
                                className='input input-bordered input-xs'
                                value={invoice.paymentDetails.totalPaid === 0 ? '' : invoice.paymentDetails.totalPaid}
                                onChange={handleTotalPaidChange}
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <p>Total Due:</p>
                            <div className='text-gray-700 flex items-center'>
                                <TbCurrencyTaka className='' />
                                <p>{invoice.paymentDetails.total - invoice.paymentDetails.totalPaid}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <p className='inline border-t text-gray-500'>Sales Person&apos;s Signature</p>
                </div>
            </div>

            {/* right */}
            <div className='w-full text-gray-500'>
                <div className='flex justify-between mb-2'>
                    <p>Subtotal:</p>
                    <p className='flex items-center text-gray-700'>
                        <TbCurrencyTaka />
                        {invoice.paymentDetails.subtotal}
                    </p>
                </div>
                <div className='flex justify-between mb-2'>
                    <p>Discount:</p>
                    <p className='flex items-center text-gray-700'>
                        <TbCurrencyTaka />
                        <input
                            type="number"
                            className='input input-bordered input-xs'
                            value={invoice.paymentDetails.discount === 0 ? ' ' : invoice.paymentDetails.discount}
                            onChange={handleDiscount}
                        />
                    </p>
                </div>
                <div className='flex justify-between border-b mb-2'>
                    <p>Tax/Vat:</p>
                    <p className='flex items-center text-gray-700'>0%</p>
                </div>
                <div className='flex justify-between'>
                    <p>Total:</p>
                    <p className='flex items-center text-gray-700'>
                        <TbCurrencyTaka />
                        {invoice.paymentDetails.total}
                    </p>
                </div>
                <div className='mt-[93px] '>
                    <p>{totalInWords}</p>
                    <div className='flex  justify-end lg:justify-between border-t'>
                        <p>Total In Words</p>
                        <p className='flex items-center text-gray-700'><TbCurrencyTaka /></p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BillingDetails