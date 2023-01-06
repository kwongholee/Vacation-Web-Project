var a = localStorage.getItem('cart');
var b = JSON.parse(a);

b.forEach(e => {
    document.getElementById('cart').append(e);
});