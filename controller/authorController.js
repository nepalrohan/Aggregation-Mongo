import Author from "../models/author.js"

const authors = [
    {
      authorName: "J.K. Rowling",
      authorAddress: "Edinburgh, Scotland",
      authorAge: 55,
      noofBooksWritten: 7
    },
    {
      authorName: "George R.R. Martin",
      authorAddress: "Santa Fe, New Mexico, USA",
      authorAge: 72,
      noofBooksWritten: 5
    },
    {
      authorName: "J.R.R. Tolkien",
      authorAddress: "Bournemouth, England",
      authorAge: 81,  // (Tolkien passed away at age 81)
      noofBooksWritten: 4
    },
    {
      authorName: "Agatha Christie",
      authorAddress: "Torquay, England",
      authorAge: 85,  // (Christie passed away at age 85)
      noofBooksWritten: 66
    },
    {
      authorName: "Isaac Asimov",
      authorAddress: "Brooklyn, New York, USA",
      authorAge: 72,  // (Asimov passed away at age 72)
      noofBooksWritten: 500
    }
  ];
  

export const addAuthor = async (req, res)=>{
    try {
        
const authoradded = await Author.insertMany(authors);
if(!authoradded){
    return res.send('No author added')
}
return res.json({
    message:'success',
    authorData:authoradded
})
    } catch (error) {
        console.log(error)
    }
}