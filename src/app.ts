import express from "express"
import productsRouter from "./routes/products"
import cors from "cors"
if (process.env.NODE_ENV != "producction") {
 require("dotenv").config()
}
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.use("/products", productsRouter)

app.listen(port,()=>{
  console.log(`server running on port ${port}...`);
})
