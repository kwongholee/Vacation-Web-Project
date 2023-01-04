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

var pants = [28, 30, 32, 34];
var shirts = [95, 100, 105];

$('.form-select').eq(0).on('input', function() {
  var value = $('.form-select').eq(0).val();
  if(value == '셔츠') {
    $('.form-select').eq(1).removeClass('shirt-size');
    $('.form-select').eq(1).html('');
    shirts.forEach(function(i) {
      $('.form-select').eq(1).append(`<option>${i}</option>`);
    });
  }
  else if(value == '모자') {
    $('.form-select').eq(1).addClass('shirt-size');
  }
  else if (value == '바지') {
    $('.form-select').eq(1).removeClass('shirt-size');
    $('.form-select').eq(1).html('');
    pants.forEach(function(i) {
      $('.form-select').eq(1).append(`<option>${i}</option>`);
    });
  }
});

var obj = {name: 'kim', age: 20};

for(var key in obj) {
  console.log(key);
  console.log(obj.key);
}