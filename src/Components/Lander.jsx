import React from "react"
import './Lander.css'
import { useState, useEffect } from "react";
import Linker from "./Linker";
import Typebox from './Typebox';

export default function Lander() {
    //this state is used for saving the linkers permanently(local storage is used)
    const [link, setLink] = useState(() => {
        //this line of code retrieves a value from the browser's localStorage and getItem is a method of 'localStorage' object in Js
        const savedLinks = localStorage.getItem('links');
        //condition rendering operation where savedLinks stored string is null or undefinied
        //JSON.parse converts the string to object or an array
        return savedLinks ? JSON.parse(savedLinks) : [];
    });

    //run side effect in function components
    useEffect(() => {
        //this is the function that inhances the side effect based on dependency change here, [link]
        //JSON.stingify coverts array or object into string 
        localStorage.setItem('links', JSON.stringify(link));
    }, [link]);

    //used to add new linker taking the new data as argument 
    function addLinker(formData) {
        //updates the previous and current data 
        setLink(prevLinks => {
            //The spread operator ... is used to create a new array that includes all the items in prevLinks, followed by the new formData. 
            return [...prevLinks, formData];
        });
    }

    //used to removes the linkitem from array
    function deleteLink(id) {
        setLink(prevLink => {
            //filter iterates through each linkitem in prevLink array and keeps only the items where index doesnt match id 
            return prevLink.filter((linkItem, index) => index !== id);
        });
    }

    //updates the website name  which has to edit 
    function editLink(id, newWebsiteName) {
        setLink(prevLink => {
            //map iterates through each linkitem in prevLink array and creates a new array 
            return prevLink.map((linkItem, index) => {
                //id matches then it returns new object 
                if (index === id) {

                    return {
                        ...linkItem,
                        //oldname updates with newname
                        inputWebsiteName: newWebsiteName
                    };
                }
                //doesnt match then return linkitem
                return linkItem;
            });
        });
    }

    return (
        <div className="lander">
            {/* passing onAdd property which holds addLinker method to Typebox */}
            <Typebox onAdd={addLinker} />
            {/*map iterates linker elements when ever new linker is created and adds to new array */}
            {link.map((linkItems, index) => {
                return (
                    <Linker
                        key={index}//required 
                        id={index}//array index traching
                        onDelete={deleteLink}//passing the onDelete method to Linker
                        onEdit={editLink}//passing the onEdit method to Linker
                        websiteName={linkItems.inputWebsiteName}//passing the websiteName value to Linker
                        websiteUrl={linkItems.inputWebsiteUrl}//passing the websiteurl value to Linker
                        logo={linkItems.logo} // passing the logo to Linker
                    />
                );
            })}
        </div>
    );
}
