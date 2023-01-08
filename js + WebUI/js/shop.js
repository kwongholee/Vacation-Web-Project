const product = {
    "products": [
      {
        "id": 0,
        "title": "식기세척기",
        "brand": "세척나라",
        "photo": "pr1.jpg",
        "price": 10000
      },
      {
        "id": 1,
        "title": "원목 침대 프레임",
        "brand": "침대나라",
        "photo": "pr2.jpg",
        "price": 20000
      },
      {
        "id": 2,
        "title": "천연 디퓨저 세트",
        "brand": "향기나라",
        "photo": "pr3.jpg",
        "price": 30000
      },
      {
        "id": 3,
        "title": "시원한 서큘레이터",
        "brand": "바람나라",
        "photo": "pr4.jpg",
        "price": 40000
      }
    ]
  }

product.products.forEach((a) => {
    var template = `<div class="white-bg">
    <img src="../shop/${a.photo}" width="200px">
    <h3>${a.title}</h3>
    <p>${a.brand}</p>
    <h4>가격: ${a.price}</h4>
    <button class="cart-in">담기</button>
    </div>`;
    $('#cart').append(template);
})

$('#input-list').change(function() {
  var search = $('#input-list').val();
  if(search == '') {
    $('.white-bg').css('display', 'inline-block');
    $('.white-bg h3 span').removeClass('highlight');
    $('.white-bg p span').removeClass('highlight');
  }
  else {
    for(let i = 0; i < 4; i++) {
      var h3 = $('.white-bg h3').eq(i).text();
      var p = $('.white-bg p').eq(i).text();
      $('.white-bg h3 span').eq(i).removeClass('highlight');
      $('.white-bg p span').eq(i).removeClass('highlight');
      if(h3.includes(search) || p.includes(search)) {
        $('.white-bg').eq(i).css('display', 'inline-block');
        if(h3.includes(search)) {
          var newH3 = h3.split(search).join(`<span class="highlight">${search}</span>`);
          $('.white-bg h3').eq(i).html('');
          $('.white-bg h3').eq(i).html(newH3);
        }
        else {
          var newP = p.split(search).join(`<span class="highlight">${search}</span>`);
          $('.white-bg p').eq(i).html('');
          $('.white-bg p').eq(i).html(newP);
        }
      }
      else {
        $('.white-bg').eq(i).css('display', 'none');
        $('.white-bg h3 span').eq(i).removeClass('highlight');
        $('.white-bg p span').eq(i).removeClass('highlight');
      }
    }
  }
})

$('.cart-in').on('click', function(e) {
  
})