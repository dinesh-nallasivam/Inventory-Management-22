import PathDisplay from "../Navbar/PathDisplay"
import { useState, useEffect } from "react"
import Axios from "axios"
import MobileSearch from "./MobileSearch";
import TextFrom from "./TextForm"
import DropDown from "./DropDown"
import { FaPlus } from "react-icons/fa6"

function OrderCreation({ pathList,handleNavigation,pathDetails}) {
    
    const [phoneNumber,setPhoneNumber] = useState()
    const [orderItems,setOrderItems] = useState([{productId:null,quantity:null}])
    const [productIdList,setProductIdList] = useState([])

    useEffect(()=>{
        const fetch = async()=>{
            try{
                const url = "http://localhost:3000/productRouter/IdList"
                const res = await Axios.get(url,{withCredentials:true})
                
                if(res.status==200){
                    const list = res.data.data.map((element)=>{
                        return element.id.toString()
                    })
                    setProductIdList([...list])
                } 
            }catch(err){
                console.error(err.message)
            }
        }

        fetch()
    },[])

    const handleProductId = (option,index)=>{
        const list = orderItems.map((element,ind)=>{
            if(ind==index){
                element.productId = option
                return element
            }
        })

        setOrderItems([...list])
    }

    const handleQuantity = (e,index)=>{
        const list = orderItems.map((element,ind)=>{
            if(ind==index){
                element.quantity = e.target.value
            }
            return element
        })

        setOrderItems([...list])
    }

    const handlePlus = ()=>{
        setOrderItems(prev=> [...prev,{productId:null,quantity:null}])
    }

    return (
        <>
            
            <PathDisplay
                pathList={pathList}
                handleNavigation={handleNavigation}
            />

            <div className="w-full p-4">
                <div className="my-3">
                    <label htmlFor="Phone Number" className="block text-xs font-medium mb-2">
                        Phome Number
                    </label>
                    <MobileSearch 
                        searchTerm={phoneNumber}
                        setSearchTerm={setPhoneNumber}
                    />
                </div>
                <div className="my-4">
                    <p className="text-xl text-medium">
                        Order Items
                    </p>
                    <div className="mt-2 w-full md:w-[75%]">
                        {
                            orderItems.map((element,index)=>{
                                return(
                                    <div className="flex justify-between items-center" key={index}>
                                        <DropDown
                                            index={index}
                                            name="Product ID"
                                            options={productIdList}
                                            selectedOption={element.productId}
                                            setSelectedOption={handleProductId}
                                        />
                                        <TextFrom
                                            index={index}
                                            name="Quantity"
                                            text={element.quantity}
                                            setText={handleQuantity}
                                        />
                                        <div className="p-2">
                                            {
                                                index==(orderItems.length-1) && (
                                                    <div className="pt-5">
                                                        <FaPlus className="w-6 h-6 text-zinc-600" onClick={handlePlus}/>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderCreation;