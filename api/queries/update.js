const { Client } = require('pg');
const { addBookAuthor, addBookCategory } = require('./create');
const { removeBookAuthor, removeBookCategory} = require('./remove');

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

async function updateBook(book_id, query = queryTemplate){
  const client = new Client();
  await client.connect();

  // IF BOOK EXIST 
  let select = await client.query("select book_id from books where book_id = $1", [book_id]);
  if( ! select.rowCount ) return {"error" : "book_id doesn't exist"};

  const { authors, categories, title} = query;
  //UPDATE BOOKS
  if(title) await client.query("update books set title = $1 where book_id = $2", [title, book_id])
  
    //UPDATE CATEGORIES
  if(categories){
    try {
      await updateCategories(book_id, JSON.parse(categories));
    } catch (error) {
      await updateCategories(book_id, categories.split(/ *, */));
    }
  }
  
  //UPDATE AUTHORS
  if(authors){
    try {
      await updateAuthors(book_id, JSON.parse(authors));
    } catch (error) {
      await updateAuthors(book_id, authors.split(/ *[,] */));
    }
  }
  
  
  
  const { subtitle, description, editorial, img, printdate } = query;
  const extraInfo = { subtitle, description, editorial, img, printdate };
  //UPDATE BOOKSEXTRAINFO
  const values = Object.keys(extraInfo).reduce( (prev, curr) => {
    if(prev == ""){
      prev += `${curr} = '${extraInfo[curr]}'`
    }else if(extraInfo[curr]){
      prev += `, ${curr} = '${extraInfo[curr]}'`
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
  return {"book_id" : book_id}
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
    if(category == "") return;
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
    if(author == "") return;
    let i = authorsInDB.findIndex(a => a.name == author);
    if(i == -1 ) await addBookAuthor(book_id, author)
  })

  await client.end();
}

module.exports = updateBook;