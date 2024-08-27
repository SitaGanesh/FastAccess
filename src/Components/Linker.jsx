import React from 'react';
import { useState } from 'react';
//imporing icons from the material UI one of the react component library that implements google's material design
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Linker(props) {
    //state hooks that used to edit the websiteName is which method property coming from Lander component
    //this state is used to toggle the edit btn
    const [isEditing, setIsEditing] = useState(false);
    //this state is used to switcht the old name to new name
    const [editedName, setEditedName] = useState(props.websiteName);

    //this handles the delete operation of linker when onClick delete is done
    function handleDelete(event) {
        //stops propagation from differnent element in dom hierarchy
        event.stopPropagation();
        //prevents from reloading the page
        event.preventDefault();
        //method property coming from lander containing data and index property gets deleted when event occurs 
        props.onDelete(props.id);
    }
    //used as an event to change the state from false to true  when editing happens
    function toggleEdit() {
        setIsEditing(!isEditing);
    }
    //updates the onchange value to new edited name dynamically
    function handleNameChange(event) {
        setEditedName(event.target.value);
    }
    //whenever editing is done then clicking some where else on the same page the changes gets saved
    function handleSave(event) {
        event.stopPropagation();
        event.preventDefault();
        //tracking that index on which change happend and placing a the same id or index place
        props.onEdit(props.id, editedName);
        //toggle again setted to false if change in mind for changing that new name to another new name
        setIsEditing(false);
    }

    //whenever the name and url of the website is too long then slice and append ... at end function
    function truncateString(str, maxLength) {
        if (str.length > maxLength) {
            return str.slice(0, maxLength - 3) + '...';
        }
        return str;
    }

    return (
        // linker-div is for css in index.html file and utility classes from tailwind css
        <div className="linker-div mx-auto w-full max-w-4xl bg-white ">
            <div className="hover:bg-white relative border shadow-md rounded-lg w-64 h-64 p-5 flex flex-col justify-between mx-5 my-5" style={{ float: "left" }}>
                <div className="absolute top-2 right-2">
                    {/* toggle button for edit button to change the name of the webname */}
                    <button onClick={toggleEdit} style={{borderRadius:"50%" }} className="h-10 w-10 text-black hover:text-[#1E90FF]">
                        {/* Editicon is coming from material ui library  for displaying icon (pencil) */}
                        <EditIcon className="relative top-0 right-2 left--2 bottom-3 " />
                    </button>
                </div>
                {/* link when u link on this, it will direct u website  */}
                <a href={props.websiteUrl} rel="noopener noreferrer" target="_blank" className="flex-grow flex flex-col justify-between">
                    <div className="flex-grow flex items-center justify-center">
                        <div className="w-28 h-28 bg-gray-200 flex items-center justify-center rounded-full">
                            {/* condition renderding happens when the specified url has logo it display the logo orelse it wont and keeps as it styles specified */}
                            {props.logo ? (
                                <img src={props.logo} alt={`${props.websiteName} logo`} className="w-full h-full object-contain rounded-full" />
                            ) : (
                                <div className="text-gray-500">No Logo</div>
                            )}
                        </div>
                    </div>
                    <div className="text-center">
                        {/* condition rendering when editing the website name  */}
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedName}
                                onChange={handleNameChange}
                                onBlur={handleSave}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                                autoFocus
                            />
                        ) : (
                            <h5 className="text-xl font-semibold">{truncateString(props.websiteName, 25)}</h5>
                        )}
                        <p className="text-sm text-gray-500">{truncateString(props.websiteUrl, 30)}</p>
                    </div>
                </a>
                {/* button to delete the linker */}
                <button
                    onClick={handleDelete}
                    className="text-black py-1 px-4 rounded-md mt-2 self-end hover:text-[#FF4500]"
                >
                    {/* Material ui icon  */}
                    <DeleteIcon/>
                </button>
            </div>
        </div>
    );
}
