const { Client } = require('pg');

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

module.exports = searchByAttribute;