const express = require("express");
const { Book } = require("../model/book.model");

const bookRouter = express.Router();

bookRouter.post("/addBook", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const bookData = new Book(data);
    await bookData.save();
    return res.json({
      error: false,
      message: "Book added successfully",
    });
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    });
  }
});

bookRouter.get("/", async (req, res) => {
    try {
        const {filter, sort} = req.query
        let Myfilter = {}
        let Mysort = {}
        if(filter && filter!=""){
            Myfilter.Genre = filter
        }
        if(sort=="asc"){
            Mysort.Price = 1
        }else if(sort=="desc"){
            Mysort.Price = -1
        }
        // console.log(Mysort);
        console.log(Myfilter);
        const data = await Book.find(Myfilter).sort(Mysort)
        if(data.length==0){
            throw new Error("No books found")
        }else{
            return res.json({
                error: false,
                data
            })
        }
    } catch (error) {
        return res.json({
            error: true,
            message: error.message
        })
    }
})

bookRouter.delete("/delete/:id", async (req, res) => {
    const {id} = req.params
    try {
        const data = await Book.findByIdAndDelete(id)
        if(data){
            return res.json({
                error: false,
                message: "book deleted successfully"
            })
        }else{
            throw new Error("book not found")
        }
    } catch (error) {
        return res.json({
            error: true,
            message: error.message
        })
    }
})




module.exports = { bookRouter };
