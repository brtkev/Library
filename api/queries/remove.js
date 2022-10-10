const { Client } = require('pg');

async function removeBook(book_id){
  const client = new Client();
  client.connect();
  

  client.end();
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

module.exports = { removeBookAuthor, removeBookCategory}