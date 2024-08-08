const express = require("express")
const authRouter = require('./Routes/authRouter.js')
const productRouter = require('./Routes/productRouter.js')
const purchaseRouter = require('./Routes/purchaseRouter.js')
const orderRouter = require('./Routes/orderRouter.js')
const dashboardRouter = require('./Routes/dashboardRouter.js')
const customerRouter = require('./Routes/customerRouter.js')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { config } = require('dotenv');
config();

const PORT=process.env.PORT || 3000;

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/authentication",authRouter)

app.use("/productRouter",productRouter)

app.use("/purchaseRouter",purchaseRouter)

app.use("/orderRouter",orderRouter)

app.use("/dashboardRouter",dashboardRouter)

app.use("/customerRouter",customerRouter)

app.listen(PORT,()=>{console.log("server started")})