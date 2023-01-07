document.querySelector('#quiz').addEventListener('click', function(e) {
    switch(e.target.innerHTML) {
        case '부모님':
            alert('효자시네요');
            break;
        case '와이프':
            alert('사랑꾼이시네요');
            break;
        case '키우던 개':
            alert('동물 애호가시네요');
            break;
    }
})