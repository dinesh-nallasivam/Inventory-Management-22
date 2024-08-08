const prisma = require("../index")

const getNumberList = async(req,res)=>{
    
    const {phoneNumber} = req.body

    try{
        const list = await prisma.customer.findMany({
            where:{
                phoneNumber:{
                    contains:phoneNumber
                }
            }
        })
        
        res.status(200).json({message:"List is retrived",data:list})
    }catch (err) {
        console.error("Error updating product:", err)
        res.status(500).json({ message: "Error updating product", error: err.message })
    }
}

module.exports = { getNumberList }