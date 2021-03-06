import React from 'react';
import { createContext, useState } from 'react'

export const ColorContext = createContext();
export default function ColorProvider(props) {
    const [colors, setColors] = useState([{isDark:false,mainFontColor:"rgb(19, 24, 36)",secondaryFontColor:"rgba(45, 51, 63, 0.82)",background:"rgb(233, 233, 233)"},{light: '#DEA4A4',dark:"#BF4444"},{light: '#E5AB7E',dark:"#E5853C"},{light: '#E9E9B4',dark:"#E5E570"},{light: '#B5E3B7',dark:"#72B774"}])

    return (
        <ColorContext.Provider value={{colors,setColors}}>
            {props.children}
        </ColorContext.Provider>
    )
}
