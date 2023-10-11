'use client'
import React, { useState } from 'react'

const useInterval = () => {
    const [timeInterval, setTimeInterval] = useState('weekly')
    return (
        {
            timeInterval,
            setTimeInterval
        }
    )
}

export default useInterval