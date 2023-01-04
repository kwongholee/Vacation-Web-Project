// for(let i = 0; i < 3; i++) {
//   $('.tab-button').eq(i).on('click', function() {
//     tab(i);
//   });
// }

var car = ['소나타', 50000, 'white'];
var car2 = {name: '소나타', price: [50000, 3000, 4000], color: 'white'};
$('.product').html(car2.name);
$('.price').html(car2.price[0]);

$('.list').click(function(e) {
  tab(e.target.dataset.id);
})

function tab(i) {
  $('.tab-button').removeClass('orange');
  $('.tab-content').removeClass('show');
  $('.tab-button').eq(i).addClass('orange');
  $('.tab-content').eq(i).addClass('show');
}