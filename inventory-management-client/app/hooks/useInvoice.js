'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../components/context/AuthContext'

const useInvoice = () => {



    const [invoice, setInvoice] = useState({
        userEmail: '',
        invoiceNumber: '',
        customerDetails: {
            customerName: 'Customer Name',
            customerAddress: 'Customer Address',
            customerPhoneNo: 'Customer Phone Number',
            customerEmail: 'Customer Email'
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


    return {
        invoice,
        setInvoice
    }
}

export default useInvoice