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

module.exports = {
  searchByAttribute
}