'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../components/context/AuthContext'

const useInvoice = () => {

    const issuedDate = new Date().toISOString().split('T')[0];

    // console.log('issuedDate', issuedDate);

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
                quantity: '',
                unitPrice: '',

            }],
        },
        paymentDetails: {
            subtotal: '',
            discount: 0,
            total: 0,
            totalPaid: 0,
            totalDue: 0,

        }
    });


    return {
        invoice,
        setInvoice
    }
}

export default useInvoice