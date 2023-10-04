import React, { useState } from 'react'
import { useInvoiceContext } from '../../context/InvoiceContext'

const ProductDetailsPreview = () => {
    const { invoice } = useInvoiceContext();
    return (
        <div>
            <div className="overflow-x-auto border-b mb-4 lg:mb-8 ">
                <table className="table">
                    {/* head */}
                    <thead className='text-gray-800'>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Warranty</th>
                            <th>Quantity</th>
                            <th>Unite Price </th>
                            <th>Total Price </th>
                        </tr>
                    </thead>
                    <tbody className='text-gray-700'>
                        {/* row  */}
                        {
                            invoice?.productDetails?.products && invoice.productDetails.products.map((product, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{product.productName}</td>
                                <td>{product.warranty} </td>
                                <td>{product.quantity}</td>
                                <td>{product.unitPrice}</td>
                                <td>{product.unitPrice * product.quantity}</td>

                            </tr>)
                        }



                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductDetailsPreview