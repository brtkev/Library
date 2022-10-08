const { json } = require('body-parser');
const { searchByAttribute, createBook, addBookAuthor, addBookCategory } = require('./queries');

function search(req, res){ 
  const {search, attribute} = req.query;
  
  //QUERY SEARCH
  searchByAttribute(search, attribute)
  .then( searchResult => {
    res.json(searchResult);
  })
  .catch( err => {
    console.log(err)
    res.send(`error, check logs`);
  })
}

function create(req, res){ 
  const {title, authors, categories} = req.query;
  
  //QUERY CREATE
  createBook(title, req.query)
  .then( book_id => {
    if(authors) {
      try {
        //if not array
        JSON.parse(authors).forEach(author => addBookAuthor(book_id, author))
      } catch (error) {
        //string
        addBookAuthor(book_id, authors);
      }
    }

    if(categories){
      try {
        //if not array
        JSON.parse(categories).forEach(category => addBookCategory(book_id, category));
      } catch (error) {
        //string
        addBookCategory(book_id, categories)
      }
    }
    res.json({ "book_id" : book_id })
  })
  .catch( err => {
    console.log(err);
    res.send('error, check the console');
  });
}

function update(req, res){ 
  const {title, subtitle, author, printDate, editorial} = req.query;
  
  //$PSQL "update "

  //send JSON
  res.send(`update`);
}

function remove(req, res){ 
  const {title, subtitle, author, printDate, editorial} = req.query;
  
  //$PSQL "delete from books where <condition>"

  //send JSON
  res.send(`update`);
}


module.exports = function(app ){
  app.get('/api/search', search);
  app.post('/api/create', create);
  app.put('/api/update', update);
  app.delete('/api/remove', remove);

} 