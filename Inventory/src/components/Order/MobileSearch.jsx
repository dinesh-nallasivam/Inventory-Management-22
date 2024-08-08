import { useState } from 'react'
import Axios from "axios"

const MobileSearch = ({ searchTerm, setSearchTerm }) => {
    
    const [options,setOptions] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    
    const handleSelect = (option) => {
        setIsOpen(false)
        setSearchTerm(option.phoneNumber)
    }

    const onChange = async(e) => {
        setSearchTerm(e.target.value)
        setIsOpen(true)
        if(searchTerm && searchTerm.trim()){
            try{
                const res = await Axios.post("http://localhost:3000/customerRouter/number",{
                    phoneNumber:searchTerm
                }, { withCredentials: true })
    
                if(res.status == 200){
                    setOptions([...res.data.data])
                }
            } catch (err) {
                console.log(err.message)
            }
        }
    }

    return (
        <div className="relative w-full max-w-xs">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={onChange}
                className="w-full px-4 py-2 border rounded-md shadow focus:outline-none"
            />
            {isOpen && options.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                    <ul>
                        {options.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(option)}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            >
                                {option.phoneNumber}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default MobileSearch
