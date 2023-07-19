const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sandbox77!',
});

connection.connect(function(err) {
  if(err) {
    console.log(err.stack);
    return;
  }
  console.log('connect');
});

connection.query('SELECT 어쩌구', function (에러, 결과, 필드) {
  if (에러){ console.log(에러) }
  console.log('result : ', 결과);
}); 

connection.query('select * from mart.card where 카드명 = ?', ['유저가입력한상품명'] , function(err, res, field) {
  if(err) {console.log(err)}
  console.log('result: ' + res)
})