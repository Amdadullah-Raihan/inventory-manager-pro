'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import useApiUrl from './useApiUrl';
import axios from 'axios';

const useInvoice = () => {
    const { user } = useAuth();
    const [apiUrl] = useApiUrl();

    const issuedDate = new Date().toISOString().split('T')[0];

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();


    const [invoice, setInvoice] = useState({
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
    });

    //Generate a new invoice Number;
    useEffect(() => {
        axios.get(`${apiUrl}/api/invoice/latest/invoiceNumber`)
            .then(res => {
                if (res.data.greatestInvoiceNumber) {

                    const greatestInvoiceNumber = parseInt(res.data.greatestInvoiceNumber);

                    let newInvoiceNumber = `CN-${currentYear}${currentMonth}${currentDay}-${String(greatestInvoiceNumber + 1).padStart(3, '0')}`;



                    setInvoice(prevInvoice => ({
                        ...prevInvoice,
                        invoiceNumber: newInvoiceNumber,
                        userEmail: user.email
                    }));

                }

            })



    }, [user.email, apiUrl, invoice.invoiceNumber])


    return {
        invoice,
        setInvoice
    }
}

export default useInvoice