var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

// var img1 = new Image();
// img1.src = 'cactus.png';

class Cactus {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x,this.y,this.width,this.height);
        // cactus.drawImage(img1, this.x, this.y);
    }
}

var timer = 0;
var cactusArr = [];
var jumptimer = 0;
var animation;

function frameFunc() {
    animation = requestAnimationFrame(frameFunc);
    ctx.clearRect(0,0,canvas.width, canvas.height); // canvas 삭제
    timer++;
    if (timer % 200 === 0) {
        var cactus = new Cactus();
        cactusArr.push(cactus);
    }
    cactusArr.forEach((a, i, o) => {
        if(a.x < 0) {
            o.splice(i,1);
        }
        a.x--;
        collsionCheck(dino, a);
        a.draw(); // cactus 생성
    })
    if(jump == true) {
        dino.y -= 2;
        jumptimer++;
    }
    if(jump == false && dino.y < 200) {
        dino.y += 2;
        jumptimer = 0;
    }
    if(jumptimer > 50) {
        jump = false;
    }

    dino.draw(); // canvas 생성
}
frameFunc();

function collsionCheck(dino, cactus) {
    var xM = cactus.x - (dino.x + dino.width);
    var yM = cactus.y - (dino.y + dino.height);
    if(xM < 0 && yM < 0) {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}

var jump = false;
document.addEventListener('keydown', function(e) {
    if(e.code === 'Space') {
        jump = true;
    }
})