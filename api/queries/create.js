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

async function createBook(query = queryTemplate){
  const client = new Client();
  await client.connect();

  //INSERT INTO BOOKS
  let res = await client.query("INSERT INTO books(title) VALUES($1) returning book_id", [query["title"]]);
  
  //define extras
  let book_id = await res.rows[0].book_id;
  const {subtitle , description , printdate , img , editorial} = query;

  //INSERT INTO booksextrainfo
  let values = {book_id ,subtitle, description, printdate, img, editorial};
  let [keyString, valString] = Object.keys(values).reduce( (strs, key) => {
    if(!values[key] || values[key] == 'undefined') values[key] = '';
    if(strs[0] == ""){
      strs[0] += key; strs[1] += values[key];
    }else{
      strs[0] += `, ${key}`; strs[1] += `, '${values[key].slice(0, 100)}'`;
    }
    return strs;
  } , ["",""])
  let str = `INSERT INTO booksextrainfo(${keyString}) VALUES(${valString}) returning book_id`
  
  res = await client.query(str);

  await client.end();

  const {authors, categories} = query;
  //INSERT AUTHORS
  if(authors) {
    try {
      //if not array
      JSON.parse(authors).forEach(author => addBookAuthor(book_id, author))
    } catch (error) {
      //string
      authors.split(/ *, */).forEach(author => {
        if(author == "") return;
        addBookAuthor(book_id, author)
      })
    }
  }

  //INSERT CATEGORIES
  if(categories){
    try {
      //if not array
      JSON.parse(categories).forEach(category => addBookCategory(book_id, category));
    } catch (error) {
      //string
      categories.split(/ *, */).forEach(category => {
        if(category == "" || category == 'undefined') return;
        addBookCategory(book_id, category)
      })
      
    }
  }

  return {"book_id" : book_id};
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


module.exports = {createBook, addBookAuthor, addBookCategory}