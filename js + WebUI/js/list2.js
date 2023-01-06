var products = [
  { id : 0, price : 70000, title : 'Blossom Dress' },
  { id : 1, price : 50000, title : 'Springfield Shirt' },
  { id : 2, price : 60000, title : 'Black Monastery' }
];

$('#price').on('click', function() {
  products.sort(function(a,b) {
      return a.price - b.price;
  });
  $('.row').html('');
  products.forEach((a,i) => {
    var template = `<div class="col-sm-4">
    <img src="https://via.placeholder.com/600" class="w-100">
    <h5>${products[i].title}</h5>
    <p>가격 : <span>${products[i].price}</span></p>
    <button class="buy">구매</button>
    </div>`;
    $('.row').append(template);
  })
});

$('#title').on('click', function() {
  products.sort(function(a,b) {
    if(a.title < b.title) {
      return 1;
    }
    else {
      return -1;
    }
  });
  $('.row').html('');
  products.forEach((a,i) => {
    var template = `<div class="col-sm-4">
    <img src="https://via.placeholder.com/600" class="w-100">
    <h5>${products[i].title}</h5>
    <p>가격 : <span>${products[i].price}</span></p>
    <button class="buy">구매</button>
    </div>`;
    $('.row').append(template);
  })
});

$('#price6').on('click', function() {
  var newproducts = products.filter(function(a) {
      return a.price <= 60000;
  });
  $('.row').html('');
  newproducts.forEach((a,i) => {
    var template = `<div class="col-sm-4">
    <img src="https://via.placeholder.com/600" class="w-100">
    <h5>${newproducts[i].title}</h5>
    <p>가격 : <span>${newproducts[i].price}</span></p>
    <button class="buy">구매</button>
    </div>`;
    $('.row').append(template);
  })
});

var template = `<div class="col-sm-4">
<img src="https://via.placeholder.com/600" class="w-100">
<h5>Card title</h5>
<p>가격 : <span>70000</span></p>
<button class="buy">구매</button>
</div>`;

function producthtml(a, b) {
  for(let i = 0; i < a.length; i++) {
    $('.row').append(b);
    $('.row h5').eq(a[i].id).html(`${a[i].title}`);
    $('.row span').eq(a[i].id).html(`${a[i].price}`);
  }
}

producthtml(products, template);

var count = 0;

$('#more').on('click', function() {
  count++;
  if(count == 1) {
    $.get('https://codingapple1.github.io/js/more1.json').done(function(data) {
      producthtml(data, template);
    })
  }
  else if(count == 2) {
    $.get('https://codingapple1.github.io/js/more2.json').done(function(data) {
      producthtml(data, template);
      $('#more').css('display', 'none');
    })
  }
})

$('.buy').on('click', function(e) {
  if(localStorage.getItem('cart') == null) {
    var a = [e.target.previousElementSibling.previousElementSibling.innerHTML];
    var b = JSON.stringify(a);
    localStorage.setItem('cart', b);
  }
  else {
    var a = localStorage.getItem('cart');
    var b = JSON.parse(a);
    if(b.includes(e.target.previousElementSibling.previousElementSibling.innerHTML) == false) {
      b.push(e.target.previousElementSibling.previousElementSibling.innerHTML);
      var c = JSON.stringify(b);
      localStorage.setItem('cart', c);
    }
  }
})

// e.target.previousElementSibling.previousElementSibling.innerHTML == $(e.target).siblings('h5').text()