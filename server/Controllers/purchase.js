const prisma = require("../index")

const addPurchase = async(req,res)=>{
    try{
        const {
            purchaserName,
            phoneNumber,
            quantity,
            purchasePrice,
            productId,
        } = req.body
    
        if(!purchaserName || !phoneNumber || !quantity || !purchasePrice || !productId ){
            return res.status(404).json({message:"Need the purchase details to add the purchase."})
        }

        const product = await prisma.product.findUnique({where:{id:parseInt(productId)}})

        if(!product){
            return res.status(404).json({ message: "The given product id doesn't exits in table" })
        }

        await prisma.purchase.create({
            data:{
                purchaserName,
                phoneNumber:phoneNumber,
                quantity:parseInt(quantity),
                purchasePrice:parseInt(purchasePrice),
                productId:parseInt(productId),
                date: new Date()
            }
        })

        await prisma.product.update({
            where:{id:parseInt(productId)},
            data:{
                quantity: product.quantity + parseInt(quantity),
                purchasePrice : parseInt(purchasePrice),
                salesPrice: parseInt(purchasePrice) + 100,
                status:"ACTIVE"
            }
        })

        res.status(201).json({ message: "Purchase created successfully"})

    }catch (err) {
        console.error("Error fetching data:", err)
        res.status(500).json({ message: "Error fetching data", error: err.message })
    }
}

const getPurchase = async (_, res) => {
    try {
        const purchase = await prisma.purchase.findMany()

        if (purchase.length==0) {
            return res.status(404).json({ message: "No product found",data:purchase })
        }

        res.status(200).json({ message: "Successfully retrived", data:purchase})

    } catch (err) {
        console.error("Error fetching product(s):", err)
        res.status(500).json({ message: "Error fetching product(s)", error: err.message })
    }
}

const deletePurchase = async (req, res) => {
    try {
        const { id } = req.params
        
        const purchase = await prisma.purchase.findUnique({
            where: { id: parseInt(id) }
        })

        if (!purchase) {
            return res.status(404).json({ message: "Product not found" })
        }

        await prisma.purchase.delete({
            where: { id: parseInt(id) }
        })

        res.status(200).json({ message: "Product deleted successfully" })

    } catch (err) {
        console.error("Error deleting product:", err)
        res.status(500).json({ message: "Error deleting product", error: err.message })
    }
}

module.exports = { getPurchase, addPurchase, deletePurchase }