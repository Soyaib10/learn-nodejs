import express from "express"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = 3000

// product schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

// instance of the schema- use this to save product data
const product = mongoose.model("products", productSchema)

// DB connection
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/mongoWithExpress")
        console.log("db is connected")
    } catch (error) {
        console.log("db is not connected")
        console.log(error.message)
        process.exit(1)
    }
}


app.get("/", (req, res) => {
    res.send("Hello brothers")
})

// create products
app.post("/products", async (req, res) => {
    try {
        let products;
        // for multiple products
        if (Array.isArray(req.body)) {
            products = await product.insertMany(req.body);
        } else {
            // for single product
            const newProduct = new product(req.body);
            products = await newProduct.save();
        }

        res.status(201).json({ message: "Product(s) added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error adding product(s)", error: error.message });
    }
});

// read products- return all the products
app.get("/products", async (req, res) => {
    try {
        const price = req.query.price
        const products = await product.find()
        if (products) {
            res.status(200).send(products)
        } else {
            res.status(404).send({
                message: "products not found",
            })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// read products- return a single product
app.get("/products/:id", async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const products = await product.findOne({ _id: id }).select({ title: 1, _id: 0 })
        // const products = await product.findOne({_id: id})
        if (products) {
            res.status(200).send(products)
        } else {
            res.status(404).send({
                message: "products not found",
            })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// get- query params
app.get("/products", async (req, res) => {
    try {
        const price = req.query.price
        const products = await product.find({ price: { $eq: price } })
        if (products) {
            res.status(200).send(products)
        } else {
            res.status(404).send({
                message: "products not found",
            })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

app.listen(port, async () => {
    console.log(`Server is running at port ${port}`)
    await connectDB()
})