import React, { createContext, useContext, useState } from 'react';

const TimeIntervalContext = createContext();

const useInterval = () => {
    const [timeInterval, setTimeInterval] = useState('weekly');

    return { timeInterval, setTimeInterval };
}

export const TimeIntervalContextProvider = ({ children }) => {
    return (
        <TimeIntervalContext.Provider value={useInterval()}>
            {children}
        </TimeIntervalContext.Provider>
    );
}

export const useTimeInterval = () => useContext(TimeIntervalContext);



