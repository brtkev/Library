const { Client } = require('pg');

// const psql = async () => {
  //   await client.connect()
  //   const res = await client.query('SELECT * from books')
  //   console.log(res.rows[0]) // Hello world!
  //   await client.end()
  // }
  // psql();
  
  async function searchByAttribute(search, attribute){
  const client = new Client();
  await client.connect();
  let res;
  if(attribute == 'id'){
    res = await client.query(`select * from books where book_id = ${search}`);
  }else{
    res = await client.query(`select * from books where ${attribute} like '%${search}%'`);
  }
  await client.end();
  return res.rows;
}

async function createBook(title, extras){
  const client = new Client();
  await client.connect();

  //INSERT INTO BOOKS
  let query = 'INSERT INTO books(title) VALUES($1) returning book_id',
    values = [title];
  let res = await client.query(query, values);
  
  //define extras
  let book_id = await res.rows[0].book_id;
  const {subtitle , description , printdate , img , editorial} = extras;

  //INSERT INTO booksextrainfo
  query = `INSERT INTO booksextrainfo(book_id, subtitle, description, printdate, img, editorial) 
  VALUES($1, $2, $3, $4, $5, $6) returning book_id`;
  values = [book_id ,subtitle, description, printdate, img, editorial];
  res = await client.query(query, values);

  await client.end();
  return book_id;
}

async function addBookAuthor(book_id, authorName){
  const client = new Client();
  await client.connect();

  //get author id
  let res = await client.query("select author_id from authors where author_name = $1", [authorName]);
  if(res.rowCount === 0){
    //insert into db
    res = await client.query("insert into authors(author_name) values($1) returning author_id", [authorName]);
  }

  let author_id = res.rows[0].author_id;
  //insert into booksauthors
  res = await client.query("insert into booksauthors(book_id, author_id) values($1, $2)", [book_id, author_id]);
  await client.end
}

module.exports = {
  searchByAttribute,
  createBook,
  addBookAuthor
}