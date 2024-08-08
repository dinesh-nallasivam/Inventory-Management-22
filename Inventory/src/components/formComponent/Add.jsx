import { FaPlus } from "react-icons/fa";

function Add({name,handleClick}) {
    return (
        <div 
            className="w-fit p-2 rounded-md bg-primarycolor flex gap-2 items-center cursor-pointer"
            onClick={handleClick}
        >
            <FaPlus className="text-white"/>
            <p className="uppercase text-base text-normal text-white">
                {name}
            </p>
        </div>
    );
}

export default Add;