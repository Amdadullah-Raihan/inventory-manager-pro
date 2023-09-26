import React from 'react'
import { TbCurrencyTaka, TbFileDownload } from 'react-icons/tb'
import { AiFillPrinter, AiOutlineSend } from 'react-icons/ai'


const CreateInvoice = () => {
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear(); // Get the current year (e.g., 2023)
    const currentMonth = currentDate.getMonth() + 1; // Get the current month (0-11, so add 1 to get 1-12)
    const currentDay = currentDate.getDate(); // Get the current day of the month (1-31)



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
                <div className="flex flex-col gap-y-4 lg:flex-row justify-between py-8 border-b-2">
                    {/* middle left */}
                    <div className="text-gray-400">
                        <h5 className='text-gray-600'>Invoice To: </h5>
                        <p>Amdadul Islam{ }</p>
                        <address>1183 Nurerchala Rd., Vatara, Dhaka-1212</address>
                        <p>+8801890103204</p>
                        <p>amdaudllahrayhan@gmail.com</p>
                    </div>


                    {/* middle right*/}
                    <div className='text-gray-400'>
                        <h5 className='text-gray-600'>Billing Details: </h5>
                        <p className='flex items-center'>Total Paid:{ }<TbCurrencyTaka className='text-gray-500 text-lg ' />12390 </p>
                        <p className='flex items-center'>Total Due:{ }<TbCurrencyTaka className='text-gray-500 text-lg ' />0 </p>
                        <p className='flex items-center'>Paid By: Cash/Bkash/Bank </p>



                    </div>
                </div>

                {/* middle div 2  */}
                <div>
                    <div className="overflow-x-auto border-b mb-4 lg:mb-8 ">
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
                                    <th>1</th>
                                    <td>Macbook Air M1 2020</td>
                                    <td>1 Years </td>
                                    <td>2</td>
                                    <td>90,000</td>
                                    <td>1,80,000</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>Macbook Air M2 2021</td>
                                    <td>2 Years </td>
                                    <td>1</td>
                                    <td>1,10,000</td>
                                    <td>1,10,000</td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td>Macbook Pro M1 2020</td>
                                    <td>3 Years </td>
                                    <td>3</td>
                                    <td>90,000</td>
                                    <td>2,70,000</td>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <td>Macbook Pro M2 2022</td>
                                    <td>2 Years </td>
                                    <td>2</td>
                                    <td>190,000</td>
                                    <td>3,80,000</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

                {/* middle div 3 */}
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
                            <p className='flex items-center text-gray-700'><TbCurrencyTaka />12,80,000</p>
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
                <button className='btn w-full bg-[#5a66f1] text-white hover:text-black'><AiOutlineSend className='text-xl' />Submit Invoice</button>
                <button className='btn btn-outline w-full border-[#5a66f1] text-[#5a66f1] hover:text-white'><AiFillPrinter className='text-xl' />Print </button>
                <button className='btn btn-outline w-full border-[#5a66f1] text-[#5a66f1] hover:text-white'><TbFileDownload className='text-xl' />Download </button>

            </div>
        </div>
    )
}

export default CreateInvoice