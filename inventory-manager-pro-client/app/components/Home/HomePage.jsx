import React, { useEffect, useState } from 'react';
import { FaBangladeshiTakaSign, FaChartLine, FaChartSimple, FaCircleDot, FaDollarSign, FaSackDollar } from 'react-icons/fa6';
import LineChartDemo from '../Charts/LineChart';
import axios from 'axios';
import useApiUrl from '@/app/hooks/useApiUrl';
import { useAuth } from '../../context/AuthContext';
import { useTimeInterval } from '../../context/TimeIntervalContext';

const HomePage = () => {
    const [apiUrl] = useApiUrl();
    const { user } = useAuth();
    const [totalSold, setTotalSold] = useState(0);
    const [totalPurchased, setTotalPurchased] = useState(0);
    const { timeInterval } = useTimeInterval();

    // Function to format numbers with commas
    const formatNumberWithCommas = (number) => {
        return number.toLocaleString('en-IN');
    };

    useEffect(() => {
        axios.get(`${apiUrl}/api/features/sales/${user.email}/${timeInterval}`)
            .then((res) => {
                setTotalSold(res.data.totalSold);
                setTotalPurchased(res.data.totalPurchased);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [user.email, apiUrl, timeInterval]);

    const cardData = [
        {
            title: 'Sales Overview',
            icon: <FaChartSimple className='text-primary text-2xl' />,
            value: totalSold,
            label: 'Total Sales: ',
        },
        {
            title: 'Purchase Overview',
            icon: <FaDollarSign className='text-primary text-2xl' />,
            value: totalPurchased,
            label: 'Total Purchased: ',
        },
        {
            title: 'Revenue Overview',
            icon: <FaChartLine className='text-primary text-2xl' />,
            value: totalSold,
            label: 'Total Revenue: ',
        },
        {
            title: 'Profit Overview',
            icon: <FaSackDollar className='text-primary text-2xl' />,
            value: totalSold - totalPurchased,
            label: 'Total Profit:',
        },
    ];

    return (
        <div className='bg-[#F7F7F9] dark:bg-secondary overflow-hidden w-full min-h-[100vh] p-2 lg:p-6  dark:text-gray-400           '>
            <div className='grid gap-2 lg:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mb-2 lg:mb-6'>
                {cardData.map((data, index) => (
                    <div key={index} className='bg-white dark:bg-neutral shadow p-4 rounded-md'>
                        <div className='flex flex-col gap-6'>
                            <div className='flex gap-2 items-center justify-between'>
                                <h3 className='text-xl font-bold '>{data.title}</h3>
                                {data.icon}
                            </div>
                            <div className='flex justify-between'>
                                <div className='leading-3'>
                                    <p className=' dark:text-gray-400 mb-1'>{data.label}</p>
                                    <small className='text-gray-500'>In Last Week</small>
                                </div>
                                <div className='flex items-center'>
                                    <FaBangladeshiTakaSign className='text-lg' />
                                    <p className='font-bold text-lg'>{formatNumberWithCommas(data.value)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <div className='w-[100%] bg-white dark:bg-neutral p-2 lg:p-6 shadow-md rounded-lg pr-4'>
                <div className='flex gap-6 mb-6 ml-6'>
                    <div className='flex gap-2 items-center'>
                        <FaCircleDot className='text-primary' />
                        <p>Total Sales</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <FaCircleDot className='text-[#82ca9d]' />
                        <p>Total Expenses</p>
                    </div>
                </div>
                <LineChartDemo />
            </div>
        </div>
    );
};

export default HomePage;
