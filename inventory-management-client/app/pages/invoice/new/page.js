'use client'
import React, { useState } from 'react'
import { TbCurrencyTaka, TbFileDownload } from 'react-icons/tb'
import { AiFillPrinter, AiOutlineSend } from 'react-icons/ai'
import { RiFileEditFill, RiSave3Fill } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa6';


const CreateInvoice = () => {
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear(); // Get the current year (e.g., 2023)
    const currentMonth = currentDate.getMonth() + 1; // Get the current month (0-11, so add 1 to get 1-12)
    const currentDay = currentDate.getDate(); // Get the current day of the month (1-31)

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

    // console.log('customerDetails', invoice.customerDetails);
    console.log('productDetails', invoice.productDetails);
    console.log('paymentDetails', invoice.paymentDetails);

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
                        totalPrice: 0
                    }
                ]
            }
        });
    }


    return (
        <div className='w-full bg-[#F7F7F9] lg:flex justify-center items-start flex-col lg:flex-row gap-y-2 lg:gap-x-6 min-h-[100vh] p-2 lg:p-4'>
            {/* left-invoice */}
            <div className='max-w-[700px]  bg-white shadow p-2 lg:p-4 rounded-md'>
                {/* top div */}
                <div className='grid grid-cols-1 lg:grid-cols-2 justify-between gap-x-8 pb-8 border-b-2 '>
                    {/* top left */}
                    <div>
                        <div>
                            <h1 className='text-2xl font-bold mb-3 text-gray-700'><span className='text-[#5A66F1]'>CN </span> Computer</h1>
                        </div>
                        <div className='text-gray-500'>
                            <address>
                                Office 149, 450 South Brand Brooklyn

                                San Diego County, CA 91905, USA

                                +1 (123) 456 7891, +44 (876) 543 2198
                            </address>
                        </div>

                    </div>

                    {/* top right */}
                    <div className='mt-4 lg:mt-0 lg:text-right w-full'>
                        <h1 className='text-xl font-semibold text-gray-500'>Invoice #CN-{currentYear}{currentMonth}{currentDay}-001</h1>
                        <p>Date Issued: {currentDay}-{currentMonth}-{currentYear}</p>
                    </div>
                </div>


                {/* middle div 1*/}
                <div className="flex flex-col gap-y-4 lg:flex-row  justify-between py-8 border-b-2">
                    {/* left */}
                    <div className="text-gray-400">
                        <h5 className='text-gray-600'>Invoice To: </h5>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:mr-4'>
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


                    {/* right*/}
                    <div className='w-full lg:max-w-[230px]   text-gray-400'>
                        <h5 className='text-gray-600'>Billing Details: </h5>
                        <div className="leading-8">
                            <div className='flex  items-center '>
                                <p className='w-full'>Total Paid:</p>

                                <input
                                    type="text"
                                    className='max-h-6 w-full input input-bordered'
                                    placeholder=""
                                    onChange={(e) => setInvoice({
                                        ...invoice, paymentDetails: {
                                            ...invoice.paymentDetails,
                                            totalPaid: e.target.value
                                        }
                                    }
                                    )
                                    }
                                />
                            </div>
                            <p className='flex items-center'>Total Due:{ }<TbCurrencyTaka className='text-gray-500 text-lg ' />
                                { }
                            </p>

                        </div>


                    </div>
                </div>

                {/* middle div 2  */}
                <div className='w-full'>
                    <div className="overflow-x-auto border-b ">
                        {
                            invoice.productDetails?.products?.lenght && invoice.productDetails.products.map((product, idx) => {
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Product Name</th>
                                            <th>Warranty</th>
                                            <th>Quantity</th>
                                            <th>Unite Price </th>
                                            <th>Total Price </th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-gray-400'>
                                        {/* row  */}
                                        <tr>
                                            <th>{idx + 1}</th>
                                            <td>Macbook Air M1 2020</td>
                                            <td>1 Years </td>
                                            <td>2</td>
                                            <td>90,000</td>
                                            <td>1,80,000</td>
                                        </tr>


                                    </tbody>
                                </table>
                            })
                        }

                    </div>

                </div>
                {/* middle div 3 */}

                <div className='p-2 border-b-2 mb-4'>
                    <h4 className=''>Add Product&apos;s Details</h4>
                    <div className='grid grid-cols-1 lg:grid-cols-4 gap-2 p-1 '>
                        <input
                            type="text"
                            className='w-full input input-bordered '
                            placeholder="Product's Name"
                            onChange={(e) => setInvoice({
                                ...invoice,
                                productDetails: {
                                    ...invoice.productDetails,
                                    products: {
                                        ...invoice.productDetails.products,
                                        productName: e.target.value
                                    }
                                }
                            })}
                        />
                        <input
                            type="text"
                            className='w-full input input-bordered '
                            placeholder="Warranty"
                            onChange={(e) => setInvoice({
                                ...invoice,
                                productDetails: {
                                    ...invoice.productDetails,
                                    products: {
                                        ...invoice.productDetails.products,
                                        warranty: e.target.value
                                    }
                                }
                            })}
                        />
                        <input
                            type="number"
                            className='w-full input input-bordered '
                            placeholder="Quantity"
                            onChange={(e) => setInvoice({
                                ...invoice,
                                productDetails: {
                                    ...invoice.productDetails,
                                    products: {
                                        ...invoice.productDetails.products,
                                        quantity: e.target.value
                                    }
                                }
                            })}
                        />
                        <input
                            type="number"
                            className='w-full input input-bordered '
                            placeholder="Unit Price"
                            onChange={(e) => setInvoice({
                                ...invoice,
                                productDetails: {
                                    ...invoice.productDetails,
                                    products: {
                                        ...invoice.productDetails.products,
                                        unitPrice: e.target.value
                                    }
                                }
                            })}
                        />
                    </div>

                    <div className='w-full text-right'>
                        <button
                            className='btn  mr-1 mt-1 bg-[#5a66f1] text-white rounded-md hover:text-black'
                            onClick={handleAddItem}
                        >
                            <FaPlus className='inline' />
                            Add Item
                        </button>
                    </div>
                </div>
                {/* middle div 4 */}
                <div className='flex flex-col-reverse lg:flex-row justify-between  border-b-2 '>
                    {/* left */}
                    <div className="flex justify-between lg:flex-col  mt-10 lg:mt-0 h-full  text-gray-400 ">
                        <div>
                            <p className=''><span className='text-gray-600'>Sold By: <br className='lg:hidden' /> </span> Ismail Patowary</p>
                        </div>

                        <div>
                            <p className=' h-full max-w-[150px] lg:mt-[153px] border-t text-gray-500'>Sales Person&apos;s Signature</p>
                        </div>
                    </div>

                    {/* right */}
                    <div className='text-gray-400 min-w-[180px] leading-10'>
                        <div className='flex justify-between'>
                            <p>Subtotal:</p>
                            <p className='flex items-center text-gray-700'><TbCurrencyTaka />{invoice.productDetails.totalPrice}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Discount:</p>
                            <p className='flex items-center text-gray-700'><TbCurrencyTaka />8,000</p>
                        </div>
                        <div className='flex justify-between border-b'>
                            <p>Tax/Vat:</p>
                            <p className='flex items-center text-gray-700'>0%</p>
                        </div>
                        <div className='flex justify-between '>
                            <p>Total:</p>
                            <p className='flex items-center text-gray-700'><TbCurrencyTaka />12,00,000</p>
                        </div>
                        <div className='flex  justify-end lg:justify-between mt-8 border-t'>
                            <p>Total In Words</p>
                            <p className='flex items-center text-gray-700'><TbCurrencyTaka /></p>
                        </div>

                    </div>
                </div>

                {/* last div */}
                <div className="py-6 text-gray-400">
                    <p><span className='text-gray-600'>Note:</span> You are an incredible custormar. We were extremly lucky to serve you. We hope you will keep us in mind for the future shopping. Thank you!  </p>
                </div>
            </div>

            {/* right btns */}
            <div className='max-h-[300px] w-full lg:max-w-[400px] bg-white rounded-md shadow-md mt-2 lg:mt-0 p-2 lg:p-4 flex flex-col gap-y-2 lg:gap-y-4'>
                <button className='btn w-full bg-[#5a66f1] text-white hover:text-black'><RiSave3Fill className='text-xl' />Save Invoice</button>
                <button className='btn btn-outline w-full border-[#5a66f1] text-[#5a66f1] hover:text-white'><RiFileEditFill className='text-xl' />Edit Invoice</button>
                <button className='btn btn-outline w-full border-[#5a66f1] text-[#5a66f1] hover:text-white'><AiFillPrinter className='text-xl' />Print </button>
                <button className='btn btn-outline w-full border-[#5a66f1] text-[#5a66f1] hover:text-white'><TbFileDownload className='text-xl' />Download </button>

            </div>
        </div>
    )
}

export default CreateInvoice