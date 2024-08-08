const prisma = require("../index")

const addOrder = async(req,res)=>{
    try{
        const {
            phoneNumber,
            orderData
        } = req.body
    
        if(!phoneNumber || orderData.length==0){
            return res.status(404).json({message:"Need the some details for further process."})
        }
    
        const customer = await prisma.customer.findUnique({where:{phoneNumber}})
        
        if(!customer){
            await prisma.customer.create({
                data:{
                    phoneNumber,
                    date: new Date()
                }
            })
        }
        
        let totalPrice = 0
        let totalQuantity = 0

        let orderItems = await Promise.all(orderData.map(async (item) => {
            
            const product = await prisma.product.findUnique({ where: { id: parseInt(item.productId) } })

            if (!product) {
                throw new Error(`The product with ID doesn't exist in the table.`)
            }

            if(product.quantity<item.quantity){
                await prisma.order.delete({where:{id:order.id}})
                res.status(404).json({message:"Qunatity is less then the ordered one."})
            }

            totalPrice += (parseInt(item.quantity) * product.salesPrice)
            totalQuantity += parseInt(item.quantity)

            return {
                productId: product.id,
                quantity: parseInt(item.quantity),
                saledPrice: product.salesPrice,
                actualPrice: product.purchasePrice,
                date: new Date()
            }
        }))

        const order = await prisma.order.create({
            data:{
                date: new Date(),
                totalPrice,
                totalQuantity,
                customerId:customer.id
            }
        })
        
        orderItems = orderItems.map((item)=>{
            item.orderId = order.id
            return item
        })

        await prisma.orderItem.createMany({
            data:orderItems
        })
        
        await Promise.all(orderItems.map(async (item) => {
            
            const quant =  await prisma.product.findUnique({ where: { id: parseInt(item.productId) }})

            await prisma.product.update({
                where: { id: parseInt(item.productId) },
                data: {
                    quantity: {
                        decrement: item.quantity
                    }
                }
            })            

        }))

        res.status(200).json({message:"successfully order placed"})

    }catch(err){
        res.status(500).json({message:err.message})
    }

}

const getOrder = async (_,res)=>{
    try{

        const order = await prisma.order.findMany({
            include:{
                customer:true
            }
        })

        res.status(200).json({message:"Date retrived successfully",data:order})
    
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getOrderItem = async(req,res)=>{
    const { id } = req.params

    if(!id){
        res.status(404).json({message:"Order ID is needed."})
    }

    try{

        const order = await prisma.order.findUnique({
            where: { id: parseInt(id) }
        })

        if (!order) {
            return res.status(404).json({ message: "Order not found for given ID." })
        }

        const data = await prisma.orderItem.findMany({where:{orderId:parseInt(id)},include:{product:true,order:true}})

        return res.status(200).json({message:"Order items for given id retrived successfully",data:data})

    }catch(err){
            return res.status(500).json({message:err.message})
    }
}

module.exports = { addOrder, getOrder, getOrderItem }