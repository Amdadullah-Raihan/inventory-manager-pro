
import useInterval from '@/app/hooks/useInterval';
import React, { createContext, useContext, useState } from 'react'

const TimeIntervalContext = createContext();


export const TimeIntervalContextProvider = ({ children }) => {



    return (<TimeIntervalContext.Provider value={useInterval()}>
        {children}
    </TimeIntervalContext.Provider>
    )
}



export const useTimeInvterval = () => {
    return useContext(TimeIntervalContext);
}