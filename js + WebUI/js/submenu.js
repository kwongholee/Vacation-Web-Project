var 시작좌표 = 0;
var 눌렀냐 = false;

$('.slide-box').eq(0).on('mousedown', function(e) {
    시작좌표 = e.clientX;
    눌렀냐 = true;
})

$('.slide-box').eq(0).on('mousemove', function(e) {
    distance = e.clientX - 시작좌표;
    if(눌렀냐) {
        $('.slide-container').css('transform', `translateX(${distance}px)`)
    }
})

$('.slide-box').eq(0).on('mouseup', function(e) {
    눌렀냐 = false;
    if(e.clientX - 시작좌표 <= -100) {
        $('.slide-container').css('transition', 'all 0.5s').css('transform', 'translateX(-100vw)');
    }
    else {
        $('.slide-container').css('transition', 'all 0.5s').css('transform', 'translateX(0vw)');
    }
    setTimeout(() => {
        $('.slide-container').css('transition', 'none');
    }, 500);
})