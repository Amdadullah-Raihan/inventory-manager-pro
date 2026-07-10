'use client'
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
const data = [
    {
        name: 'Day-1',
        sold: '10',
        purchased: '100',
    },
    {
        name: 'Day-2',
        sold: '130',
        purchased: '120',
    },
    {
        name: 'Day-3',
        sold: '140',
        purchased: '150',
    },
    {
        name: 'Day-4',
        sold: '150',
        purchased: '160',
    },
    {
        name: 'Day-5',
        sold: '120',
        purchased: '100',
    },
    {
        name: 'Day-6',
        sold: '110',
        purchased: '80',
    },
    {
        name: 'Day-7',
        sold: '110',
        purchased: '80',
    },
];

const LineChartDemo = () => {
    return (

        <ResponsiveContainer
            width="100%"
            aspect={3}
            z-index="0"
        >
            <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#adadad" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="sold" stroke="#5A66F1" />
                <Line type="monotone" dataKey="purchased" stroke="#82ca9d" />
            </LineChart>

        </ResponsiveContainer>
    )
}

export default LineChartDemo