import React from 'react'
import "./Header.css"
import FastForwardIcon from '@mui/icons-material/FastForward';

export default function Header() {
    return (
        <>
            <header className="bg-[#1E90FF] p-5 mb-5 text-center text-white shadow-lg header ">
                 <div className="flex items-center drop-shadow-md" >
                    <FastForwardIcon className="text-[#FF4500] text-5xl mr-2" style={{fontSize:"50px"}} />
                    <h1 className="text-[#FF4500] text-4xl md:text-5xl font-medium">Fast Access</h1>
                </div>
            </header>
        </>
    )
}