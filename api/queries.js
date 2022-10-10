const { Client } = require('pg');

const queryTemplate = {
  title : null,
  subtitle : null, 
  description : null, 
  printdate : null , 
  img: null , 
  editorial: null,
  categories : [],
  authors: []
}

  
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

async function createBook(query = queryTemplate){
  const client = new Client();
  await client.connect();

  //INSERT INTO BOOKS
  let res = await client.query("INSERT INTO books(title) VALUES($1) returning book_id", [query["title"]]);
  
  //define extras
  let book_id = await res.rows[0].book_id;
  const {subtitle , description , printdate , img , editorial} = query;

  //INSERT INTO booksextrainfo
  values = [book_id ,subtitle, description, printdate, img, editorial];
  res = await client.query("INSERT INTO booksextrainfo(book_id, subtitle, description, printdate, img, editorial) VALUES($1, $2, $3, $4, $5, $6) returning book_id",
   values);

  await client.end();

  const {authors, categories} = query;
  //INSERT AUTHORS
  if(authors) {
    try {
      //if not array
      JSON.parse(authors).forEach(author => addBookAuthor(book_id, author))
    } catch (error) {
      //string
      addBookAuthor(book_id, authors);
    }
  }

  //INSERT CATEGORIES
  if(categories){
    try {
      //if not array
      JSON.parse(categories).forEach(category => addBookCategory(book_id, category));
    } catch (error) {
      //string
      addBookCategory(book_id, categories)
    }
  }

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

async function addBookCategory(book_id, category){
  const client = new Client();
  await client.connect();

  //get category id
  let res = await client.query("select category_id from categories where category = $1", [category]);
  if(res.rowCount === 0){
    //insert into db
    res = await client.query("insert into categories(category) values($1) returning category_id", [category]);
  }

  let category_id = res.rows[0].category_id;
  //insert into booksauthors
  res = await client.query("insert into bookscategories(book_id, category_id) values($1, $2)", [book_id, category_id]);
  await client.end();
}


async function updateBook(book_id, query = queryTemplate){
  const client = new Client();
  await client.connect();

  // IF BOOK EXIST 
  let select = await client.query("select book_id from books where book_id = $1", [book_id]);
  if( ! select.rowCount ) return;

  const { authors, categories, title, ...query_} = query;

  //UPDATE BOOKS
  if(title) await client.query("update books set title = $1 where book_id = $2", [title, book_id])

  //UPDATE CATEGORIES
  if(categories) await updateCategories(book_id, JSON.parse(categories));
  //UPDATE AUTHORS
  if(authors) await updateAuthors(book_id, JSON.parse(authors));
  
  
  //UPDATE BOOKSEXTRAINFO
  const values = Object.keys(query_).reduce( (prev, curr) => {
    if(prev == ""){
      prev += `${curr} = '${query_[curr]}'`
    }else{
      prev += `, ${curr} = '${query_[curr]}'`
    }
    return prev;
  }, "");

  if(values != ""){
    let str = `update booksextrainfo set ${values} where book_id = $1`;
    try{
      select = await client.query(str, [book_id]);
    } catch (err) {
      await client.end(); 
      throw err;
    }
  }
  
  await client.end();
  return { res : 200}
}

async function updateCategories(book_id, categories = []){
  const client = new Client();
  await client.connect();

  let select = await client.query("select category_id as id, category as name from categories left join bookscategories using(category_id) left join books using(book_id) where book_id = $1;", [book_id]);
  let categoriesInDB = select.rows;

  categoriesInDB.forEach( async category => {
    let i = categories.findIndex(name => name == category.name);
    if( i == -1 ) await removeBookCategory(book_id, category.id);
  })
  
  categories.forEach(async category => {
    let i = categoriesInDB.findIndex( cat=> cat.name == category);
    if(i == -1 ) await addBookCategory(book_id, category)
  })

  await client.end();
}

async function updateAuthors(book_id, authors = []){
  const client = new Client();
  await client.connect();

  let select = await client.query("select author_id as id, author_name as name from authors left join booksauthors using(author_id) left join books using(book_id) where book_id = $1;", [book_id]);
  let authorsInDB = select.rows;

  authorsInDB.forEach( async author => {
    let i = authors.findIndex(a => a == author.name);
    if( i == -1 ) await removeBookAuthor(book_id, author.id);
  })

  authors.forEach(async author => {
    let i = authorsInDB.findIndex(a => a.name == author);
    if(i == -1 ) await addBookAuthor(book_id, author)
  })

  await client.end();
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

module.exports = {
  searchByAttribute,
  createBook,
  addBookAuthor,
  addBookCategory,
  updateBook
}