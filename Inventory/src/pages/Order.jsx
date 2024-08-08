import { useEffect, useState } from "react"
import Axios from "axios"
import DefaultTable from "../components/Tables/DefaultTable"
import SelectedOrder from "../components/Order/SelectedOrder"
import Add from "../components/formComponent/Add"
import OrderCreation from "../components/Order/OrderCreation"

function Order() {
    
    const [orderDetails, setOrderDetails] = useState({
        header: ["phone number","name","date", "total Quantity","total price"],
        body: []
    })
    const [pathList,setPathList] = useState(["Order"])
    const [pathDetails,setPathDetails] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Axios.get("http://localhost:3000/orderRouter/order", { withCredentials: true })
                
                if (res.status === 200 && res.data.data.length!=0) {
                    const list = res.data.data.map((item) => (
                        [
                            item.id,
                            item.customer.phoneNumber,
                            item.customer.name,
                            item.date.split("T")[0],
                            item.totalQuantity,
                            item.totalPrice
                        ]
                    ))

                    setOrderDetails({ ...orderDetails, body: [...list] })
                }
    
            } catch (err) {
                console.log(err.message)
            }
        }
    
        fetchData()

    }, [])

    const handleNavigation = (name)=>{
        const pathIndex = pathList.indexOf(name)
        
        const pathDetailsList = pathDetails.filter((element,index)=>{
            if(index<=(pathIndex)) return element
        })
        setPathDetails([...pathDetailsList])

        const list = pathList.filter((element,index)=>{
            if(index<=pathIndex) return element
        })

        setPathList([...list])
    }

    const  handleSelected = (element)=>{

        setPathDetails([...pathDetails,element[0]])
        setPathList([...pathList,"Selected Order Details"])
    }

    const handleClick =()=>{
        setPathDetails([...pathDetails,""])
        setPathList([...pathList,"Order Creation"])
    } 

    return (
        <div className="w-full h-full">
           
            {
                pathList[pathList.length-1] == "Order" && (
                    <div className="py-5">
                        <div className="p-2 flex justify-end">
                            <Add name="Add the order" handleClick={handleClick}/>
                        </div>
                        <div className="w-full h-fit border border-zinc-300 rounded-md p-1">
                            <DefaultTable
                                tableDetails={orderDetails}
                                handleSelected={handleSelected}
                            />
                        </div>
                    </div>
                )
            }

            {
                pathList[pathList.length-1] == "Selected Order Details" && (
                   <SelectedOrder
                        pathList={pathList}
                        handleNavigation={handleNavigation}
                        pathDetails={pathDetails}
                   />
                ) 
            }

            {
                pathList[pathList.length-1] == "Order Creation" && (
                    <OrderCreation
                        pathList={pathList}
                        pathDetails={pathDetails}
                        handleNavigation={handleNavigation}
                    />
                )
            }
        </div>
    )
}

export default Order
