import React from 'react'
import { useInvoiceContext } from '../../context/InvoiceContext'

const InvoiceTo = () => {
    const { invoice, setInvoice } = useInvoiceContext();
    return (
        <div className="py-4 border-b">
            {/* left */}
            <div className="text-gray-500">
                <h5 className='text-gray-600'>Invoice To: </h5>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>
                    <input
                        type="text"
                        className='input w-full input-bordered '
                        placeholder="Customer's Name"
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
                        className='input w-full input-bordered'
                        placeholder="Customer's Address"
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
                        className='input w-full input-bordered '
                        placeholder="Customer's Phone No."
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
                        className='input w-full input-bordered'
                        placeholder="Customer's Email"
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