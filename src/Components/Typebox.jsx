import { useState } from "react";
//it is a api and dependency which provides the logos 
import axios from "axios";
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import FastForwardIcon from '@mui/icons-material/FastForward';
import "./Typebox.css";

export default function Typebox(props) {
    //zoom which is the expanding fearture comes with floating action btn or fab gives u expand the content based on boolean "in"
    //state used to switch the conditions 
    const [isExpanded, setExpanded] = useState(false);
    //state containing objects of input name and url assigned intially to empty and setFormData is used to update this initial state
    const [formData, setFormData] = useState({
        inputWebsiteName: "",
        inputWebsiteUrl: "",
    });
    //state which manages logos
    const [logo, setLogo] = useState('');
    //handles inputs whenever user writes in input box
    function handleInputInfo(event) {
        //object destructure used for target value and name
        const { value, name } = event.target;
        setFormData((prevValue) => {
            //spread operator used to return all the previous values and "name which is a key as value" assigned with value
            return {
                ...prevValue,
                //denotion is like this 
                [name]: value
            };
        });
    }
    //handling submit btn it should create a new linker with name, url, logo
    async function handleSubmit(event) {
        //used to prevent default loading on click event
        event.preventDefault();
        //exception handling to handle runtime error
        //if this block doesn't have any run time error it executes successfully
        try {
            //url object taking user website url name 
            let domain = new URL(formData.inputWebsiteUrl).hostname;
            //axips calls get method and specifies its url and implements the required url
            let response = await axios.get(`https://logo.clearbit.com/${domain}`);
            //state function is loaded by logo
            setLogo(response.config.url);
            //writes the data on linker with name url and logo
            props.onAdd({ ...formData, logo: response.config.url });
        }
        //if try blocks error then try get terminated and catch is executed
        catch (error) {
            console.log("there is error to fetch logo", e)
            {
                <div>
                <h3 ><b>Website URL should contain protocol://domian.topleveldomain ex:<em>https://example.com</em>or<em>http://example.com</em></b></h3>
                <p>Prefer to paste the url directly</p>
            </div>
            }
        }
        // after complete for typing and done is clicked then linker is created and formdata is set empty for next new entry
        setFormData({
            inputWebsiteName: "",
            inputWebsiteUrl: ""
        });
    }
    //clears the input contining data to empty
    function clearAll() {
        setFormData({
            inputWebsiteName: "",
            inputWebsiteUrl: ""
        });
        setLogo('');
    }
    //if user gives one input and doesnt give another then throws required based on this function
    const isInputsEmpty = () => {
        return formData.inputWebsiteUrl === "" || formData.inputWebsiteName === "";
    };
    //expanding method of the typebox 
    function expand() {
        setExpanded(true);
    }
    return (
        <div className="flex justify-center items-center mt-24">
            {/* form data with onsubmit property holding handlesubmit method */}
            <form className="hover:bg-white p-8 rounded-2xl border shadow-xl w-full max-w-sm" onSubmit={handleSubmit}>
                {/* condition rendering at the starting load of the page, initially it shows just url input box based on isExtened variable */}
                {isExpanded && (
                    <>
                        <label htmlFor="websiteName" className="block text-lg font-semibold mb-2">
                            Website Name {formData.inputWebsiteName}
                        </label>
                        <input
                            id="websiteName"
                            type="text"
                            placeholder="Enter website name here"
                            name="inputWebsiteName"
                            onChange={handleInputInfo}//passing input information here dynamically
                            value={formData.inputWebsiteName}//passing value 
                            required//necessary to include
                            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                        />
                    </>
                )}
               {/* initially the page show this data in typebox when it is loaded */}
                <label htmlFor="websiteURL" className="block text-lg font-semibold mb-2">
                    Website URL
                </label>
                <input
                    id="websiteURL"
                    type="url"
                    placeholder="Paste url* of the website here"
                    name="inputWebsiteUrl"
                    onClick={expand}//boolean data to show initially 
                    onChange={handleInputInfo}//dynamic change of input information
                    value={formData.inputWebsiteUrl}//passing value
                    required//necessary to include
                    className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                />
                <div className="flex justify-between">
                    {/* conditional rendering for expanded variable to not to show up first */}
                    {isExpanded && (
                        <>
                        {/* passed clearAll method to clear the input data from input fields */}
                            <button type="button" onClick={clearAll} className="bg-[#FF4500] text-white py-2 px-4 rounded-md hover:bg-red-600">
                                Cancel
                            </button>
                            {/* passed is input input empty method to check both the fields are filled or not */}
                            <button type="submit" disabled={isInputsEmpty()} className="bg-[#1E90FF] text-white py-2 px-4 rounded-md hover:bg-blue-600">
                                Done
                            </button>
                        </>
                    )}
                </div>
                {/* used very much to being extended features for the typebox */}
                <Zoom in={isExpanded}>
                    <Fab className="expand"><FastForwardIcon /></Fab>
                </Zoom>
            </form>
        </div>
    );
}
