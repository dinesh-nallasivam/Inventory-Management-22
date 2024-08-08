import { useEffect, useState } from "react"
import Axios from "axios"
import DefaultTable from "../components/Tables/DefaultTable"
import Add from "../components/formComponent/Add"

function Purchase({setPopUps}) {
    
    const [purchaseDetails, setPurchaseDetails] = useState({
        header: ["purchaser name", "phone number", "date", "Quantity","price"],
        body: []
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Axios.get("http://localhost:3000/purchaseRouter/purchase", { withCredentials: true })
    
                if (res.status === 200) {
                    const list = res.data.data.map((item) => (
                        [
                            item.id,
                            item.phoneNumber,
                            item.purchaserName,
                            item.date.split("T")[0],
                            item.quantity,
                            item.purchasePrice
                        ]
                    ))
                    setPurchaseDetails({ ...purchaseDetails, body: [...list] })
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
            const url = "http://localhost:3000/purchaseRouter/purchase/" + element[0]
            await Axios.delete(url, { withCredentials: true })

        } catch (err) {
            console.log(err.message)
        }
    }

    const handleClick = ()=>{
        setPopUps({name:"Add new purchase"})
    } 

    return (
        <div className="w-full h-full py-5">
            <div className="p-2 flex justify-end">
                <Add name="Add the Purchase" handleClick={handleClick}/>
            </div>
            <div className="w-full h-fit border border-zinc-300 rounded-md p-1">
                <DefaultTable
                    tableDetails={purchaseDetails}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    )
}

export default Purchase
