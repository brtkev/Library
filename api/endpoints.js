const Search = require('./queries/search');
const {createBook} = require('./queries/create');
const Update = require('./queries/update');

function search(req, res){ 
  const {search, attribute} = req.query;
  
  //QUERY SEARCH
  Search(search, attribute)
  .then( searchResult => {
    res.json(searchResult);
  })
  .catch( err => {
    console.log(err)
    res.send(`error, check logs`);
  })
}

function create(req, res){ 
  //QUERY CREATE
  createBook(req.query)
  .then( book_id => {
    
    res.json({ "book_id" : book_id })
  })
  .catch( err => {
    console.log(err);
    res.send('error, check the console');
  });
}

function update(req, res){ 
  const {book_id, ...query} = req.query;
  
  //$PSQL "update "
  Update(book_id, query)
  .then(result => res.json(result))
  .catch(err => {
    console.log(err);
    res.send(`${err}`)
  });
}

function remove(req, res){ 
  const {book_id} = req.query;
  
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