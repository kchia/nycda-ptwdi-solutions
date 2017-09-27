var pg = require('pg');

// connect to hat_app database at port 5432
// var pool = new pg.Pool('postgres://localhost:5432/hat_app');
var pool = new pg.Pool({
  host: 'localhost',
  user: 'houchia',
  port: 5432,
  database: 'hat_app'
});

var username = process.argv[2];

pool.connect(function(err, client, done){

  if(err) throw err;

  /** CODE GOES HERE **/
  client.query('select * from hats where user_id = (select (id) from users where name = $1)', [username], function(err, result) {
    console.log(result.rows);
  } )




  // client.query(`select * from hats where material = $1 and name = $2 and id = $3`, ['felt', 'beautiful', 18], function(err, result) {
  // //result now has rows where the hat material is `felt`
  //   if (err) throw err;
  //   console.log(result.rows)
  // });

  // client.query('select * from hats', function(err, result){

  //   if(err) throw err;

  //   console.log(result.rows);
  //   // tell node process to exit

  //   done();

  //   pool.end();
  // });

  /**
    EXERCISE:WRITE to PostgreSQL via Node: insert a hat into hats table
  **/
  // client.query("insert into hats (name, material, height, brim) values ('beautiful', 'felt', '5', true)", function(err, result) {
  //   //should print 'INSERT: 1'
  //   console.log(`${result.command}: ${result.rowCount}`);
  //   //call done and end, same as the read example
  //   done();
  //   pool.end();
  // });
})