var products = [
  { id : 0, price : 70000, title : 'Blossom Dress' },
  { id : 1, price : 50000, title : 'Springfield Shirt' },
  { id : 2, price : 60000, title : 'Black Monastery' }
];

for(let i = 0; i < 3; i++) {
  $('.title').eq(i).html(products[i].title);
  $('.price').eq(i).html(products[i].price);
}