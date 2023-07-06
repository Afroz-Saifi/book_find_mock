const express = require('express')
const cors = require('cors')
const { connection } = require('./config/db')
const { bookRouter } = require('./routes/book.route')
require('dotenv').config()
const app = express()
// updaes
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("workng")
})

app.use("/book", bookRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("connected to db");
    } catch (error) {
        console.log(error.message);
    }
    console.log(`server running on port ${process.env.PORT}`);
})