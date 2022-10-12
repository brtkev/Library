const Search = require('./queries/search');
const {createBook} = require('./queries/create');
const Update = require('./queries/update');
const { removeBook } = require('./queries/remove');

function errorCatcher(response){

  return function (err){
    console.log(err);
    response.send(`${err}`)
  }
}

function search(req, res){ 
  const {search, attribute} = req.query;
  
  //QUERY SEARCH
  Search(search, attribute)
  .then( searchResult => {
    res.json(searchResult);
  })
  .catch( errorCatcher(res))
}

function create(req, res){ 
  //QUERY CREATE
  createBook(req.query)
  .then( r => {
    res.json(r)
  })
  .catch( errorCatcher(res));
}

function update(req, res){ 
  const {book_id, ...query} = req.query;
  
  //$PSQL "update "
  Update(book_id, query)
  .then(result => res.json(result))
  .catch(errorCatcher(res));
}

function remove(req, res){ 
  const {book_id} = req.query;
  
  removeBook(book_id)
  .then(r => res.json(r))
  .catch(errorCatcher(res));
}


module.exports = function(app ){
  app.get('/api/search', search);
  app.post('/api/create', create);
  app.put('/api/update', update);
  app.delete('/api/remove', remove);

} 