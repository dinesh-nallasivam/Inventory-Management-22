const prisma = require("../index")

const addProduct = async(req,res)=>{
    try{
        const {
            brandName,
            image,
            size, 
            quantity,
            category,
            purchasePrice,
            salesPrice
        } = req.body
    
        if(!brandName || !size || !category ){
            return res.status(404).json({message:"Need the product details to add the product."})
        }

        await prisma.product.create({
            data:{
                brandName,
                image: image || null,
                size, 
                quantity: parseInt(quantity) || 0,
                category,
                purchasePrice: parseInt(purchasePrice) || 0,
                salesPrice: parseInt(salesPrice) || 0,
                date: new Date()
            }
        })

        res.status(201).json({ message: "Product created successfully"})

    }catch (err) {
        console.error("Error fetching data:", err)
        res.status(500).json({ message: "Error fetching data", error: err.message })
    }
}

const getProduct = async (_, res) => {
    try {
        const product = await prisma.product.findMany({
            where:{status:"ACTIVE"}
        })

        res.status(200).json({ message: "Successfully retrived", data:product})

    } catch (err) {
        console.error("Error fetching product(s):", err)
        res.status(500).json({ message: "Error fetching product(s)", error: err.message })
    }
}

const getProductId = async (req, res) => {
    try {
        const { id } = req.params
        
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) }
        })

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        res.status(200).json({ message: "Successfully retrived", data:product})

    } catch (err) {
        console.error("Error fetching product(s):", err)
        res.status(500).json({ message: "Error fetching product(s)", error: err.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) }
        })

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        await prisma.product.update({
            where: { id: parseInt(id) },
            data: { status: "INACTIVE"}
        })

        res.status(200).json({ message: "Product deleted successfully" })

    } catch (err) {
        console.error("Error deleting product:", err)
        res.status(500).json({ message: "Error deleting product", error: err.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const {
            id,
            brandName,
            image,
            size, 
            quantity,
            category,
            purchasePrice,
            salesPrice
        } = req.body
      
        if(!id){
            return res.status(404).json({ message: "Please enter the id of the product" })
        }

        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) }
        })

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                brandName: brandName || product.brandName,
                image: image || product.image,
                size: size || product.size, 
                quantity: parseInt(quantity) || product.quantity,
                category: category || product.category,
                purchasePrice: parseInt(purchasePrice) || product.purchasePrice,
                salesPrice: parseInt(salesPrice) || product.salesPrice,
                date: new Date()
            }
        })

        res.status(200).json({ message: "Product updated successfully"})

    } catch (err) {
        console.error("Error updating product:", err)
        res.status(500).json({ message: "Error updating product", error: err.message })
    }
}

const getProductIdList = async(_,res)=>{
    try{
        const list = await prisma.product.findMany({
            where:{
                status:{
                    in: ["ACTIVE", "SOON"]
                }
            },
            select: {
                id: true
            }
        })
        
        res.status(200).json({message:"List of product ID is retrived",data:list})
    }catch (err) {
        console.error("Error updating product:", err)
        res.status(500).json({ message: "Error updating product", error: err.message })
    }
}

module.exports = { getProduct, addProduct, deleteProduct, updateProduct, getProductId, getProductIdList }