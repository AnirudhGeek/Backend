const express = require("express");
const app = express();

//Middleware
app.use(express.json());

let books = [
  {
    id: 1,
    title: "Book 1",
  },
  {
    id: 2,
    title: "Book 2",
  },
  {
    id: 3,
    title: "Book 3",
  },
];

//intro route
app.get("/", (req, res) => {
  res.json({
    msg: "Welcome to our bookstore api",
  });
});

//get all books
app.get("/get", (req, res) => {
  res.json(books);
});

//get a single book
app.get("/get/:id", (req, res) => {
  const book = books.find((item) => item.id === Number(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({
      msg: "Book not found",
    });
  }
});

//add a new book
app.post("/add", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: `Book ${books.length + 1}`,
  };
  books.push(newBook);
  res.status(200).json({
    data: newBook,
    msg: "New book is added successfully",
  });
});

//update a book
app.put("/update/:id", (req, res) => {
  const findCurrentBook = books.find(
    (bookItem) => bookItem.id === Number(req.params.id)
  );
  console.log(findCurrentBook);
  if (findCurrentBook) {
    findCurrentBook.title = req.body.title || findCurrentBook.title;
    res.status(200).json({
      msg: `Book with id ${req.params.id} updated sucessfully`,
      data: findCurrentBook,
    });
  } else {
    res.status(404).json({
      msg: "Book not found",
    });
  }
});

//deleting
app.delete("/delete/:id", (req, res) => {
  const findIndexOfCurrentBook = books.findIndex(
    (item) => item.id === Number(req.params.id)
  );
  if (findIndexOfCurrentBook !== -1) {
    const deletedBook = books.splice(findIndexOfCurrentBook, 1);
    res.status(200).json({
      msg: "Book deleted Successfully!",
      data: deletedBook[0],
    });
  } else {
    res.status(404).json({
      msg: "Book doesn't found",
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));
