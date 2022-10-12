const { Client } = require('pg');

async function searchByAttribute(search, attribute){
  const client = new Client();
  await client.connect();

  //IF attribute is id or not
  let where = attribute == 'id' ? "where book_id = $1" : "where " + `${attribute} like '%${search}%'`,
    values = attribute == 'id' ? [search] : [];

  //SEARCH for everything but categories and authors
  let str = "select * from books left join booksextrainfo using(book_id) left join bookscategories using(book_id) left join categories using(category_id) left join booksauthors using(book_id) left join authors using(author_id) " + where + " order by book_id";
  let res = await client.query(str, values);
  let rows = res.rows;

  rows = 
  
  await client.end();
  return rows;
}

function joinCategoriesAndAuthors(rows){
  return rows.reduce( (arr, curr) => {
    //categories setup
    if(curr.category_id) curr.categories = [curr.category];
    delete curr.category;

    //authors setup
    if(curr.author_id) curr.authors = [curr.author_name];
    delete curr.author_name;

    //first element of the array
    if(!arr) return [curr];
    
    //rows are always sorted by id
    //if last item if eq curr item id then join them
    else if(arr[arr.length -1].book_id == curr.book_id){
      arr[arr.length -1] = appendCategory(arr[arr.length -1], curr);
      arr[arr.length -1] = appendAuthor(arr[arr.length -1], curr) 

    //push new item
    }else{
      delete curr.author_id;
      delete curr.category_id;
      arr.push(curr);
    }
    return arr;
  }, false)
}

function appendCategory(prev, curr){
  if(!curr.category_id) return prev;
  else if(!prev.hasOwnProperty("categories")){
    prev.categories = curr.categories;

  }else if(prev.categories.indexOf(curr.categories[0]) == -1){
    prev.categories.push(...curr.categories)
  }
  return prev;
}

function appendAuthor(prev, curr){
  if(!curr.author_id) return prev;
  else if(!prev.hasOwnProperty("authors")){
    prev.authors = curr.authors;
  
  }else if(prev.authors.indexOf(curr.authors[0]) == -1){
    prev.authors.push(...curr.authors)
  }
  return prev;
}





module.exports = searchByAttribute;