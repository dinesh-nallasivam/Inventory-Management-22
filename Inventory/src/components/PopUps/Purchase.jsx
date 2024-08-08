import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io"
import TextFrom from "../formComponent/TextForm"
import DropDown from "../formComponent/DropDown"
import Axios from "axios" 

function Purchase({popUps,setPopUps}) {
    const [name,setName] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
    const [quantity,setQuantity] = useState("0")
    const [purchasePrice,setPurchasePrice] = useState("")
    const [productId,setProductId] = useState(null)
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

    const handleAdd = async ()=>{
        try{
            if(name && phoneNumber && quantity && productId && purchasePrice ){
                 const res = await Axios.post("http://localhost:3000/purchaseRouter/purchase",{
                    productId:productId,phoneNumber,quantity,purchasePrice,purchaserName:name
                 },{withCredentials:true})
                 if(res.status==201){
                    setPopUps({})
                 }
            } 
        }catch(err){
            console.error(err.message)
        }
    }

    
    return (
        <div className="w-[70%] sm:w-[50%]  mt-[10%] mx-auto border rounded-md bg-white overflow-auto flex flex-col justify-between"
        >
            <div className="w-full p-3.5 flex justify-between items-center border-b border-primaryborder">
                <p className="pl-5 text-base font-medium text-black-800">
                    {popUps.name}
                </p>
                <IoMdClose className="cursor-pointer w-8 h-8" onClick={()=>setPopUps({})}/>
            </div>
            <div className="w-full py-3.5 px-10">
                <DropDown
                    name="Product ID"
                    options={productIdList}
                    selectedOption={productId}
                    setSelectedOption={setProductId}
                />
                {
                    productId && (
                        <>
                            <TextFrom
                                name="Purchaser Name"
                                text={name}
                                setText={setName}
                            />
                            <TextFrom
                                name="Phone Number"
                                text={phoneNumber}
                                setText={setPhoneNumber}
                            />
                            <TextFrom
                                name="Quantity"
                                text={quantity}
                                setText={setQuantity}
                            />
                            <TextFrom
                                name="Purchase Price"
                                text={purchasePrice}
                                setText={setPurchasePrice}
                            />
                        </>
                    )
                }
            </div>
            <div className="p-2.5 flex justify-end  items-end gap-x-4 border-t border-primaryborder">
                <button className="border border-finance-popupbutton rounded px-3.5 py-1.5 text-xxs font-medium text-finance-popupbuttoncontent uppercase" onClick={()=>setPopUps({})}>
                    cancel
                </button>
                <button className="border-0.5 border-primarycolor rounded px-2.5 py-1.5 text-xxs font-medium text-white bg-primarycolor uppercase" onClick={handleAdd}>
                    Add
                </button>
            </div>
        </div>
    )
}

export default Purchase;