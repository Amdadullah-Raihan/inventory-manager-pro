import React from 'react'
import { useInvoiceContext } from '../../../context/InvoiceContext'

const InvoiceTo = () => {
    const { invoice, setInvoice } = useInvoiceContext();
    return (
        <div className="py-4 border-b dark:border-b-gray-500 ">
            {/* left */}
            <div className="text-gray-500 dark:text-gray-400          ">
                <h5 className='text-gray-600 dark:text-gray-400          '>Invoice To: </h5>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>
                    <input
                        type="text"
                        className='input w-full input-bordered  dark:bg-secondary'
                        placeholder="Customer's Name"
                        value={invoice.customerDetails.customerName}
                        onChange={(e) => setInvoice({
                            ...invoice, customerDetails: {
                                ...invoice.customerDetails,
                                customerName: e.target.value
                            }
                        }
                        )
                        }
                    />
                    <input
                        type="text"
                        className='input w-full input-bordered  dark:bg-secondary'
                        placeholder="Customer's Address"
                        value={invoice.customerDetails.customerAddress}
                        onChange={(e) => setInvoice({
                            ...invoice, customerDetails: {
                                ...invoice.customerDetails,
                                customerAddress: e.target.value
                            }
                        }
                        )
                        }
                    />
                    <input
                        type="text"
                        className='input w-full input-bordered  dark:bg-secondary'
                        placeholder="Customer's Phone No."
                        value={invoice.customerDetails.customerPhoneNo}
                        onChange={(e) => setInvoice({
                            ...invoice, customerDetails: {
                                ...invoice.customerDetails,
                                customerPhoneNo: e.target.value
                            }
                        }
                        )
                        }
                    />
                    <input
                        type="text"
                        className='input w-full input-bordered  dark:bg-secondary'
                        placeholder="Customer's Email"
                        value={invoice.customerDetails.customerEmail}
                        onChange={(e) => setInvoice({
                            ...invoice, customerDetails: {
                                ...invoice.customerDetails,
                                customerEmail: e.target.value
                            }
                        }
                        )
                        }
                    />
                </div>

            </div>
        </div>
    )
}

export default InvoiceTo