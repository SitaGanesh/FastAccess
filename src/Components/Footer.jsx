import React from 'react'
import "./Footer.css"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Footer() {
    const year = new Date().getFullYear();
    return (
        <>
        <div className="footer">
            <footer className="footer flex flex-col space-y-5 justify-center m-10">
                <div className="flex justify-center space-x-9 my-3 ">
                    <a className="hover:text-[#FF4500]" href="https://www.linkedin.com/in/s-ganesh-96281b256/" target="_blank" rel="noopener noreferrer"><LinkedInIcon /></a>
                    <a className="hover:text-[#FF4500]" href="https://x.com/ganesh_sita07" target="_blank" rel="noopener noreferrer"><XIcon /></a>
                    <a className="hover:text-[#FF4500]" href="https://github.com/SitaGanesh" target="_blank" rel="noopener noreferrer"><GitHubIcon /></a>
                    <a className="hover:text-[#FF4500]" href="https://sitaganesh.netlify.app/#one" target="_blank" rel="noopener noreferrer"><PersonIcon /></a>
                </div>
                    <div className="flex justify-center flex-col m-10">
                        <div>Created by Sita Ganesh <FavoriteIcon className="text-red-500 hover:text-black"/></div>
                    <><a href="https://github.com/SitaGanesh/FastAccess" target='_blank'><b>View Source code on Github</b></a></>
                    </div>
                <p className="text-center text-gray-700 font-medium">copyright ©{year}.</p>
            </footer>
        </div>
        </>
    )
}

export default Footer
