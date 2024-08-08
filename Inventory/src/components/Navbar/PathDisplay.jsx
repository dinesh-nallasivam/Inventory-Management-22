import { MdKeyboardArrowRight } from "react-icons/md";

function PathDisplay({ pathList, handleNavigation }) {
    return (
        <div className="w-full p-4 flex gap-1 overflow-auto hide-scrollbar items-center">
            {pathList.map((element, index) => {
                return (
                    <div 
                        className="w-fit flex gap-1 cursor-pointer items-center" 
                        key={index}
                        onClick={()=>handleNavigation(element)}
                    >
                        <p className={`text-sm font-normal ${index !== pathList.length - 1 ? "text-black-400" : "text-black-800"}`}>
                            {element}
                        </p>
                        <MdKeyboardArrowRight className={index !== pathList.length-1? "opacity-3":""}/>
                    </div>
                );
            })}
        </div>
    );
}

export default PathDisplay