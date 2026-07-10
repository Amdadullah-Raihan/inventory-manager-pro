import React, { useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa6'
import { useInvoiceContext } from '@/providers/InvoiceContext'
import toast, { Toaster } from 'react-hot-toast'



const AddProductDetails = () => {
    const { invoice, setInvoice } = useInvoiceContext();



    // Function to add product details to the invoice.
    const handleAddItem = (e) => {
        e.preventDefault();
        const lastItem = invoice?.productDetails?.products[invoice.productDetails.products.length - 1];

        if (
            lastItem?.productName !== '' &&
            lastItem?.warranty !== '' &&
            lastItem?.quantity !== 0 &&
            lastItem?.unitPrice !== 0
        ) {
            setInvoice({
                ...invoice,
                productDetails: {
                    ...invoice.productDetails,
                    products: [
                        ...invoice.productDetails.products,
                        {
                            productName: '',
                            warranty: '',
                            quantity: 0,
                            unitPrice: 0,
                        },
                    ],
                },
            });
        } else {

            toast.error("Please fill in all required fields")
        }
    };


    // Function to handle changes in product details within an invoice.
    const handleProductChange = (e, idx, field) => {
        const updatedProducts = [...invoice.productDetails.products];
        updatedProducts[idx][field] = e.target.value;

        setInvoice({
            ...invoice,
            productDetails: {
                ...invoice.productDetails,
                products: updatedProducts,
            },
        });
    };

    // Function to remove the item at the specified index
    const handleDeleteItem = (idx) => {
        const updatedProducts = [...invoice.productDetails.products];
        updatedProducts.splice(idx, 1);
        setInvoice({
            ...invoice,
            productDetails: {
                ...invoice.productDetails,
                products: updatedProducts,
            },
        });
    };




    return (
        <form onSubmit={handleAddItem} className='py-4 border-b dark:border-b-gray-500'>
            <Toaster />
            <h4 className=''>Add Product&apos;s Details</h4>
            <div className='w-full h-full'>
                {
                    invoice?.productDetails?.products && invoice.productDetails.products.map((product, idx) =>
                        <div key={idx} className='flex gap-1 mb-2 border-b lg:items-center border-b-secondary lg:mb-0 lg:border-none '>
                            <div className='mt-3 sm:mt-0'>{idx + 1}.</div>
                            <div className='relative grid grid-cols-2 gap-2 mb-2 lg:grid-cols-4 '>
                                <input
                                    type="text"
                                    className='w-full h-10 px-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-secondary dark:text-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50'
                                    placeholder="Product's Name"
                                    value={invoice.productDetails.products[idx].productName}
                                    onChange={(e) => handleProductChange(e, idx, 'productName')}

                                />
                                <input
                                    type="text"
                                    className='w-full h-10 px-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-secondary dark:text-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50'
                                    placeholder="Warranty"
                                    value={invoice.productDetails.products[idx].warranty}
                                    onChange={(e) => handleProductChange(e, idx, 'warranty')}

                                />
                                <input
                                    type="number"
                                    className='w-full h-10 px-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-secondary dark:text-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50'
                                    placeholder="Quantity"
                                    value={invoice.productDetails.products[idx].quantity === 0 ? '' : invoice.productDetails.products[idx].quantity}
                                    onChange={(e) => handleProductChange(e, idx, 'quantity')}

                                />
                                <input
                                    type="number"
                                    className='w-full h-10 px-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-secondary dark:text-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50'
                                    placeholder="Unit Price"
                                    value={invoice.productDetails.products[idx].unitPrice === 0 ? '' : invoice.productDetails.products[idx].unitPrice}
                                    onChange={(e) => handleProductChange(e, idx, 'unitPrice')}
                                />
                            </div>
                            <button
                                className='ml-1 disabled:text-secondary' onClick={() => handleDeleteItem(idx)}

                            >
                                x
                            </button>
                        </div>
                    )
                }

            </div>
            <div className='w-full text-right'>
                <button
                    className='btn border-none  mr-1  bg-[#5a66f1] text-white rounded-md hover:bg-secondary'
                    type='submit'
                >
                    <FaPlus className='inline' />
                    Add Item
                </button>
            </div>
        </form>
    )
}

export default AddProductDetails