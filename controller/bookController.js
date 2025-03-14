import Book from "../models/book.js";

const books = [
    {
      bookname: "Harry Potter and the Sorcerer's Stone",
      bookPrice: 20,
      bookCategory: "Fantasy",
      bookAuthor: "67d4219452347e54ae594764"  // J.K. Rowling
    },
    {
      bookname: "A Game of Thrones",
      bookPrice: 25,
      bookCategory: "Fantasy",
      bookAuthor: "67d4219452347e54ae594765"  // George R.R. Martin
    },
    {
      bookname: "The Hobbit",
      bookPrice: 15,
      bookCategory: "Fantasy",
      bookAuthor: "67d4219452347e54ae594766"  // J.R.R. Tolkien
    },
    {
      bookname: "Murder on the Orient Express",
      bookPrice: 18,
      bookCategory: "Mystery",
      bookAuthor: "67d4219452347e54ae594767"  // Agatha Christie
    },
    {
      bookname: "I, Robot",
      bookPrice: 22,
      bookCategory: "Science Fiction",
      bookAuthor: "67d4219452347e54ae594768"  // Isaac Asimov
    }
  ];
  


  export const addBook = async (req, res)=>{

    try {
       const newbook = await Book.insertMany(books);
       if(!newbook){
        return res.json({
            message:'No book was added'
        })
       }

       return res.json({
        message:'success',
        bookData:newbook
       })
    } catch (error) {
        console.log(error)
    }
  }



  export const getBookDetail = async(req, res)=>{
    try {
      
const bookdetail = await Book.find({}).populate('bookAuthor');

if(!bookdetail){
  return res.send('No book detail found')
}


return res.json({
  message:'success',
  bookdetail:bookdetail
})

    } catch (error) {
      console.log(error);
    }
  }