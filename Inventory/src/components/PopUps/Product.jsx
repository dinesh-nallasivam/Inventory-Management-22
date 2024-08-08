import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io"
import TextFrom from "../formComponent/TextForm"
import DropDown from "../formComponent/DropDown"
import DropDownForm from "../formComponent/DropDownForm"
import Axios from "axios" 

function Product({popUps,setPopUps}) {

    const [name,setName] = useState("")
    const [category,setCategory] = useState(null)
    const [size,setSize] = useState("")
    const [quantity,setQuantity] = useState("0")
    const [purchasePrice,setPurchasePrice] = useState("")
    const [salesPrice,setSalesPrice] = useState("")
    const [available,setAvailable] = useState("INACTIVE")

    const categoryList = [
        'Shirts',
        'T-Shirts',
        'Jackets',
        'Jeans',
        'Shorts',
        'Suits',
    ]
    const aval = [
        "INACTIVE",
        "ACTIVE",
        "SOON",
    ]

    useEffect(()=>{

        const fetch = async()=>{
            if(popUps.name=="Edit the product"){
                const id = popUps.data[0]
                try{
                    const url = "http://localhost:3000/productRouter/product/" +id
                    const res = await Axios.get(url,{withCredentials:true})
                    
                    if(res.status==200){
                        const data = res.data.data
                        setName(data.brandName)
                        setCategory(data.category)
                        setQuantity(data.quantity)
                        setSize(data.size)
                        setPurchasePrice(data.purchasePrice)
                        setSalesPrice(data.salesPrice)
                        setAvailable(data.status)
                    } 
                }catch(err){
                    console.error(err.message)
                }
            }
        }

        fetch()
    },[])

    const handleAdd = async ()=>{
        try{
            if(name && category && size ){
                 const res = await Axios.post("http://localhost:3000/productRouter/product",{
                    brandName:name,category,size,quantity
                 },{withCredentials:true})
                 if(res.status==201){
                    setPopUps({})
                 }
            } 
        }catch(err){
            console.error(err.message)
        }
    }

    const handleSave = async ()=>{
        try{
            const res = await Axios.put("http://localhost:3000/productRouter/product",{
                id:popUps.data[0],brandName:name,category,size,quantity,purchasePrice,salesPrice,status:available
            },{withCredentials:true})
            
            if(res.status==200){
                setPopUps({})
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
                <TextFrom
                    name="Brand Name"
                    text={name}
                    setText={setName}
                />
                <DropDown
                    name="Category"
                    options={categoryList}
                    selectedOption={category}
                    setSelectedOption={setCategory}
                />
                <TextFrom
                    name="Size"
                    text={size}
                    setText={setSize}
                />
                <TextFrom
                    name="Quantity"
                    text={quantity}
                    setText={setQuantity}
                />
                {
                    popUps.name == "Edit the product" && (
                        <>
                            <TextFrom
                                name="Purchase Price"
                                text={purchasePrice}
                                setText={setPurchasePrice}
                            />
                            <TextFrom   
                                name="Sales Price"
                                text={salesPrice}
                                setText={setSalesPrice}
                            />
                            <DropDownForm
                                name="Available Status"
                                options={aval}
                                selectedOption={available}
                                setSelectedOption={setAvailable}
                            />
                        </>
                    )
                }
            </div>
            <div className="p-2.5 flex justify-end  items-end gap-x-4 border-t border-primaryborder">
                <button className="border border-finance-popupbutton rounded px-3.5 py-1.5 text-xxs font-medium text-finance-popupbuttoncontent uppercase" onClick={()=>setPopUps({})}>
                    cancel
                </button>
                {
                    popUps.name == "Edit the product" && (
                        <button className="border-0.5 border-primarycolor rounded px-2.5 py-1.5 text-xxs font-medium text-white bg-primarycolor uppercase" onClick={handleSave}>
                            Save
                        </button>
                    )
                }
                {
                    popUps.name == "Add new product"  && (
                        <button className="border-0.5 border-primarycolor rounded px-2.5 py-1.5 text-xxs font-medium text-white bg-primarycolor uppercase" onClick={handleAdd}>
                            Add
                        </button>
                    )
                }
            </div>
        </div>
    );
}

export default Product;