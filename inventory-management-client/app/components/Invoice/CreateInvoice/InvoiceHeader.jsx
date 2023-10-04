'use client'
import React, { useEffect } from 'react'
import { useInvoiceContext } from '../../context/InvoiceContext';
import { useAuth } from '../../context/AuthContext';



const InvoiceHeader = () => {
    const { user } = useAuth()
    const { invoice, setInvoice } = useInvoiceContext();
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear(); // Get the current year (e.g., 2023)
    const currentMonth = currentDate.getMonth() + 1; // Get the current month (0-11, so add 1 to get 1-12)
    const currentDay = currentDate.getDate(); // Get the current day of the month (1-31)

    useEffect(() => {
        let newInvoiceNumber = `CN-${currentYear}${currentMonth}${currentDay}-001`
        setInvoice(invoice => ({
            ...invoice,
            invoiceNumber: newInvoiceNumber
        }));
        setInvoice(invoice => ({
            ...invoice,
            userEmail: user.email
        }));

    }, [user])

    return (
        <div className='invoice-header grid grid-cols-1 lg:grid-cols-2 justify-between gap-x-4 pb-2 border-b '>
            {/* top left */}
            <div className='invoice-header-left'>
                <div>
                    <h1 className='text-2xl font-bold mb-3 text-gray-700'><span className='text-[#5A66F1]'>CN </span> Computer & Network</h1>
                </div>
                <div className='text-gray-700'>
                    <address>
                        Shop# 545-546, Level# 5,Suvastu Arcade ICT Bhaban, New Elephant Road, Dhaka-1205, 01832-231421,
                        01867-428132, cncomputer0@gmail.com

                    </address>
                </div>

            </div>

            {/* top right */}
            <div className='invoice-header-right mt-4 lg:mt-0 text-gray-700 lg:text-right w-full'>
                <h1 className='text-xl font-semibold text-gray-700'>Invoice #{invoice.invoiceNumber}</h1>
                <p>Date Issued: {currentDay}-{currentMonth}-{currentYear}</p>
                <p className='border-b inline'>Customer&apos;s Details</p>
                <div className='lg:text-right'>
                    {invoice.customerDetails.customerName} <br />
                    {invoice.customerDetails.customerAddress} <br />
                    {invoice.customerDetails.customerPhoneNo} <br />
                    {invoice.customerDetails.customerEmail} <br />
                </div>
            </div>
        </div>
    )
}

export default InvoiceHeader