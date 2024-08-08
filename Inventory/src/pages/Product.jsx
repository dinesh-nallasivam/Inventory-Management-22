import { useEffect, useState } from "react"
import Axios from "axios"
import DefaultTable from "../components/Tables/DefaultTable"
import Add from "../components/formComponent/Add"

function Product({setPopUps}) {
    
    const [productDetails, setProductDetails] = useState({
        header: ["brand name", "category", "quantity", "size", "Price"],
        body: []
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Axios.get("http://localhost:3000/productRouter/product", { withCredentials: true })
    
                if (res.status === 200 && res.data) {

                    const list = res.data.data.map((item) => (
                        [
                            item.id,
                            {
                                name: item.brandName,
                                image: item.image
                            },
                            item.category,
                            item.quantity,
                            item.size,
                            item.salesPrice
                        ]
                    ))
                    setProductDetails({ ...productDetails, body: [...list] })
                }
    
            } catch (err) {
                console.log(err.message)
            }
        }
    
        fetchData()

    }, [])

    const handleDelete = async(event,element)=>{
        event.stopPropagation()
        try {
            const url = "http://localhost:3000/productRouter/product/" + element[0]
            await Axios.delete(url, { withCredentials: true })

        } catch (err) {
            console.log(err.message)
        }
    }

    const handleEdit = (event,element)=>{
        event.stopPropagation()
        setPopUps({
            name:"Edit the product",
            data:element
        })
    }

    const handleClick = ()=>{
        setPopUps({name:"Add new product"})
    } 

    return (
        <div className="w-full h-full py-5">
            <div className="p-2 flex justify-end">
                <Add name="Add the product" handleClick={handleClick}/>
            </div>
            <div className="w-full h-fit border border-zinc-300 rounded-md p-1">
                <DefaultTable
                    tableDetails={productDetails}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            </div>
        </div>
    )
}

export default Product
