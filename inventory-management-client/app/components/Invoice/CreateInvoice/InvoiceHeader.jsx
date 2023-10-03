import React from 'react'



const InvoiceHeader = () => {
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear(); // Get the current year (e.g., 2023)
    const currentMonth = currentDate.getMonth() + 1; // Get the current month (0-11, so add 1 to get 1-12)
    const currentDay = currentDate.getDate(); // Get the current day of the month (1-31)


    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 justify-between gap-x-4 pb-2 border-b '>
            {/* top left */}
            <div>
                <div>
                    <h1 className='text-2xl font-bold mb-3 text-gray-700'><span className='text-[#5A66F1]'>CN </span> Computer & Technology</h1>
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
    )
}

export default InvoiceHeader