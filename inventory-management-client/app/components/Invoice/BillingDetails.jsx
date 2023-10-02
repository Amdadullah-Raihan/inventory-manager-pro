'use client'
import useInvoice from '@/app/hooks/useInvoice'
import React, { useEffect, useState } from 'react'
import { TbCurrencyTaka } from 'react-icons/tb'
import { ToWords } from 'to-words';
import { useInvoiceContext } from '../context/InvoiceContext';



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
    const [subtotal, setSubtotal] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [total, setTotal] = useState(subtotal)
    const [totalInWords, setTotalInWords] = useState('')



    useEffect(() => {
        let newSubtotal = 0;

        invoice.productDetails.products.forEach((product) => {
            newSubtotal += product.unitPrice * product.quantity;
        });

        setSubtotal(newSubtotal);
    }, [invoice.productDetails.products]);


    const handleDiscount = (e) => {
        let discount = e.target.value;
        let total = subtotal - discount;;
        setTotal(total);
        setTotalInWords(toWords.convert(total))
    }


    return (
        <div className='flex flex-col-reverse lg:flex-row lg:justify-between gap-6  py-2'>
            {/* left */}
            <div className="w-full text-gray-400 ">
                <div className='mb-[150px]'>
                    <h4 className='text-gray-700 mb-2'>Billing&apos;s Details</h4>
                    <div className='flex flex-col gap-y-2'>
                        <div className='flex gap-2'>
                            <p>Total Paid:</p>
                            <input type='number' className='input input-bordered input-xs' />
                        </div>
                        <div className='flex items-center gap-2'>
                            <p>Total Due:</p>
                            <p className='text-gray-700 flex items-center'><TbCurrencyTaka className='' /> will show</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p className='inline border-t text-gray-500'>Sales Person&apos;s Signature</p>
                </div>
            </div>

            {/* right */}
            <div className='w-full text-gray-400  leading-10'>
                <div className='flex justify-between'>
                    <p>Subtotal:</p>
                    <p className='flex items-center text-gray-700'><TbCurrencyTaka />{subtotal}</p>
                </div>
                <div className='flex justify-between'>
                    <p>Discount:</p>
                    <p className='flex items-center text-gray-700'>
                        <TbCurrencyTaka />
                        <input type="number" className='input input-bordered input-xs' onChange={handleDiscount} />
                    </p>
                </div>
                <div className='flex justify-between border-b'>
                    <p>Tax/Vat:</p>
                    <p className='flex items-center text-gray-700'>0%</p>
                </div>
                <div className='flex justify-between '>
                    <p>Total:</p>
                    <p className='flex items-center text-gray-700'><TbCurrencyTaka />{total}</p>
                </div>
                <div className='mt-8 '>
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