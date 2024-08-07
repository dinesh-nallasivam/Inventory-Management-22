import { RxDashboard } from "react-icons/rx";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import SidebarComponent from "./SidebarComponent";
function Sidebar() {
    
   const  sidebarDetails = [
        {
            to:"/dashboard",
            check:"/dashboard",
            name:"Dashboard",
            icon:<RxDashboard className="w-6 h-6"/>
        },
        {
            to:"/product",
            check:"/product",
            name:"Product",
            icon:<MdOutlineProductionQuantityLimits className="w-6 h-6"/>
        },
        {
            to:"/purchase",
            check:"/purchase",
            name:"Purchase",
            icon:<BiPurchaseTag className="w-6 h-6"/>
        },
        {
            to:"/orders",
            check:"/orders",
            name:"view order",
            icon:<IoCartOutline className="w-6 h-6"/>
        },
    ]

    return (
        <div className="my-5 md:px-2">
            {
                sidebarDetails.map((element,index)=>(
                    <SidebarComponent
                        key={index}
                        sidebarDetails={element}
                    />
                ))
            }
        </div> 
    );
}

export default Sidebar;