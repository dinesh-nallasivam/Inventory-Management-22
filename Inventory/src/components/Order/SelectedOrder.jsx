import DefaultTable from "../Tables/DefaultTable"
import PathDisplay from "../Navbar/PathDisplay"
import { useState, useEffect } from "react"
import Axios from "axios"

function SelectedOrder({ pathList,handleNavigation,pathDetails}) {
    
    const [orderItemsDetails, setOrderItemsDetails] = useState({
        header: ["Brand Name","category","size", "Quantity","actual price","saled price"],
        body: []
    })
    const [orderDetails,setOrderDetails] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = pathDetails[pathDetails.length-1]
                const url = "http://localhost:3000/orderRouter/order/" + id
                
                const res = await Axios.get(url, { withCredentials: true })
            
                if (res.status === 200 && res.data.data.length!=0) {
                    const list = res.data.data.map((item) => (
                        [
                            item.id,
                            {
                                name:item.product.brandName,
                                image:item.product.image
                            },
                            item.product.category,
                            item.product.size,
                            item.quantity,
                            item.actualPrice,
                            item.saledPrice
                        ]
                    ))
                    
                    setOrderDetails({
                        orderId:res.data.data[0].order.id,
                        date:res.data.data[0].order.date.split("T")[0],
                        totalQuantity:res.data.data[0].order.totalQuantity,
                        totalPrice:res.data.data[0].order.totalPrice
                    })
                    setOrderItemsDetails({ ...orderItemsDetails, body: [...list] })
                }
    
            } catch (err) {
                console.log(err.message)
            }
        }
    
        fetchData()

    }, [])

    return (
        <>
            <PathDisplay
                pathList={pathList}
                handleNavigation={handleNavigation}
            />
            <div className="py-5 px-3">
                <div className="flex justify-between items-center px-2 w-full md:w-[75%] my-4 md:mx-auto">
                    <div className="flex gap-4 ">
                        <p className="text-base text-medium">
                            Order Id :
                        </p>
                        <p className="text-base text-normal">
                            {orderDetails.orderId}
                        </p>
                    </div>
                    <div className="flex gap-4 ">
                        <p className="text-base text-medium">
                            Date :
                        </p>
                        <p className="text-base text-normal">
                            {orderDetails.date}
                        </p>
                    </div>
                    <div className="flex gap-4 ">
                        <p className="text-base text-medium">
                            Total Quantity :
                        </p>
                        <p className="text-base text-normal">
                            {orderDetails.totalQuantity}
                        </p>
                    </div>
                    <div className="flex gap-4 ">
                        <p className="text-base text-medium">
                            Total Price :
                        </p>
                        <p className="text-base text-normal">
                            {orderDetails.totalPrice}
                        </p>
                    </div>
                </div>
                <div className="w-full h-fit border border-zinc-300 rounded-md p-1">
                    <DefaultTable
                        tableDetails={orderItemsDetails}
                    />
                </div>
            </div>
        </>
    );
}

export default SelectedOrder;