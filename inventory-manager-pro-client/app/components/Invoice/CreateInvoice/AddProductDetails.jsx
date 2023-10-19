import React from 'react'
import { FaPlus } from 'react-icons/fa6'
import { useInvoiceContext } from '../../../context/InvoiceContext'


const AddProductDetails = () => {
    const { invoice, setInvoice } = useInvoiceContext()

    //handel add item
    const handleAddItem = () => {
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

                    }
                ]
            }
        });
    }
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
    // console.log('Invoice updated', invoice);

    return (
        <div className='border-b py-4'>
            <h4 className=''>Add Product&apos;s Details</h4>
            <div className='h-full w-full'>
                {
                    invoice?.productDetails?.products && invoice.productDetails.products.map((product, idx) =>
                        <div key={idx} className='flex items-center gap-1  rounded-md mb-2 lg:border-none lg:mb-0'>
                            <div className='hidden lg:block'>{idx + 1}.</div>
                            <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 mb-2'>
                                <input
                                    type="text"
                                    className='input w-full input-bordered  dark:bg-secondary'
                                    placeholder="Product's Name"
                                    value={invoice.productDetails.products[idx].productName}
                                    onChange={(e) => handleProductChange(e, idx, 'productName')}

                                />
                                <input
                                    type="text"
                                    className='input w-full input-bordered  dark:bg-secondary'
                                    placeholder="Warranty"
                                    value={invoice.productDetails.products[idx].warranty}
                                    onChange={(e) => handleProductChange(e, idx, 'warranty')}

                                />
                                <input
                                    type="number"
                                    className='input w-full input-bordered  dark:bg-secondary'
                                    placeholder="Quantity"
                                    value={invoice.productDetails.products[idx].quantity === 0 ? '' : invoice.productDetails.products[idx].quantity}
                                    onChange={(e) => handleProductChange(e, idx, 'quantity')}

                                />
                                <input
                                    type="number"
                                    className='input w-full input-bordered  dark:bg-secondary'
                                    placeholder="Unit Price"
                                    value={invoice.productDetails.products[idx].unitPrice === 0 ? '' : invoice.productDetails.products[idx].unitPrice}
                                    onChange={(e) => handleProductChange(e, idx, 'unitPrice')}
                                />
                            </div>
                        </div>
                    )
                }

            </div>
            <div className='w-full text-right'>
                <button
                    className='btn border-none  mr-1 mt-1 bg-[#5a66f1] text-white rounded-md hover:text-black'
                    onClick={handleAddItem}
                >
                    <FaPlus className='inline' />
                    Add Item
                </button>
            </div>
        </div>
    )
}

export default AddProductDetails