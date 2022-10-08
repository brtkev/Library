const { searchByAttribute } = require('./queries');

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
  const {title, subtitle, author, printDate, editorial} = req.query;
  
  //$PSQL "insert into books(title, subtitle, author, printDate, editorial) values('${title}', '${subtitle}', '${author}', '${printDate}', '${editorial}')"

  //send JSON
  res.send(`create`);
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