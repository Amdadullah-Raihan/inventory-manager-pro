import React, { useState } from 'react'

const useInvoice = () => {
    const [invoice, setInvoice] = useState({
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
            totalPaid: 0,
            totalDue: 0,

        }
    })
    return {
        invoice,
        setInvoice
    }
}

export default useInvoice