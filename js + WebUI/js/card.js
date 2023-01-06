$(window).scroll(function() {
    var height = $(window).scrollTop();
    console.log(height);
    if(height >=650 && height <= 1150) {
        var y = (-1/500) * height + (115/50);
        $('.card-box').eq(0).css('opacity', y);
        $('.card-box').eq(0).css('transform', `scale(${y})`);
    }
    if(height >= 1150 && height <= 1039) {
        var z = (-1/67) * height + (1039/67);
        $('card-box').eq(1).css('opacity', z);
        $('.card-box').eq(1).css('transform', `scale(${z})`);
    }
});

// 704, 776

// 972, 1039