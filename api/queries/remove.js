const { Client } = require('pg');

async function removeBook(book_id){
  const client = new Client();
  await client.connect();
  
  //IF NOT BOOK
  let r = await client.query("select * from books where book_id = $1", [book_id]);
  if(! r.rowCount) return {"error" : "book_id doesn't exist"};

  await client.query("with d1 as (delete from booksauthors where book_id = $1), d2 as (delete from bookscategories where book_id = $1), d3 as (delete from booksextrainfo where book_id = $1) delete from books where book_id = $1", [book_id])

  await client.end();
  return {"book_id" : book_id}
}

async function removeBookAuthor(book_id, author_id){
  const client = new Client();
  await client.connect();

  await client.query("delete from booksauthors where book_id = $1 and author_id = $2", [book_id, author_id])

  await client.end();
}

async function removeBookCategory(book_id, category_id){
  const client = new Client();
  await client.connect();

  await client.query("delete from bookscategories where book_id = $1 and category_id = $2", [book_id, category_id])

  await client.end();
}

async function truncateBooks(){
  const client = new Client();
  await client.connect();

  await client.query("truncate books, authors, booksauthors, bookscategories, booksextrainfo, categories;")

  await client.end();
}
module.exports = { removeBook,removeBookAuthor, removeBookCategory, truncateBooks}