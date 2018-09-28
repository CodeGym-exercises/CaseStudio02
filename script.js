let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let score = 0;
let life = 10;
let FPS = 0;


window.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 37:
            TankStatus.status = "moveleft";
            console.log("37->> left");
            break;
        case 38:
            TankStatus.status = "movetop";
            console.log("38->> top");
            break;
        case 39:
            TankStatus.status = "moveright";
            console.log("39->> right");
            break;
        case 40:
            TankStatus.status = "movedown";
            console.log("40->> down");
            break;
        case 83:
            TankStatus.status = "stop";
            console.log("83->> stop");
            break;
        case 81:
            Skill.status = "q";
            console.log("83->> q skill");
            break;
    }
});

//=================== CLASS ========================



//=======TANK=========
let Tank = function(x, y, size, spd) {
    this.x = x;
    this.y = y;
    this.spdx = spd;
    this.spdy = spd;
    this.width = size;
    this.height = size;
    this.degree = 0;
    this.draw = function() {
        //ctx.rotate(Math.PI/10);
        let img = new Image(100, 100);
        img.src = "imgs/spaceship.png";
        //ctx.rotate(-45*Math.PI/180);
        ctx.save();
        ctx.translate(this.x + (this.width / 2), this.y + (this.height / 2));
        ctx.rotate(this.degree * Math.PI / 180);
        this.degree += 1;
        if (this.degree == 360) {
            this.degree = 0;
        }
        ctx.shadowOffX = 10;
        ctx.shadowOffY = 10;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#fff";
        ctx.translate(-this.width / 2, -this.height / 2);
        ctx.drawImage(img, 0, 0, this.width, this.height);
        ctx.restore();
        //ctx.resetTransform();
    };

    this.update = function() {
        if (TankStatus.status == "movetop") {
            if (this.y > 0) {
                this.y -= this.spdy;
            }
            //console.log(this.nextStepY);            
        } else if (TankStatus.status == "movedown") {
            if (this.y < canvas.height - this.height) {
                this.y += this.spdy;
            }
        } else if (TankStatus.status == "moveleft") {
            if (this.x > 0) {
                this.x -= this.spdx;
            }

        } else if (TankStatus.status == "moveright") {
            if (this.x < canvas.width - this.width) {
                this.x += this.spdx;
            }
        }
        TankStatus.posX = this.x;
        TankStatus.posY = this.y;
        TankStatus.degree = this.degree;
    }
} 

//=======Bullet============
let Bullet = function(x,y,degree){
    this.x = x;
    this.y = y;
    this.dx = undefined;
    this.dy = undefined;
    this.radius = 14;
    this.color = "#fff";
    this.speed = 2;
    this.degree = degree;

    this.draw = function(){
        //ctx.beginPath();
        let img = new Image();
        img.src = "imgs/rocket.png";
        ctx.save()
        ctx.translate(this.x+this.radius,this.y+this.radius+2);
        ctx.rotate((this.degree+22)*Math.PI/180);
        ctx.shadowOffX = 1;
        ctx.shadowOffY = 10;
        ctx.shadowBlur = 40;
        ctx.shadowColor = this.color;
        ctx.translate(-this.radius,-(this.radius+2))
        ctx.drawImage(img,0,0,this.radius*2,this.radius*2+2);
        ctx.restore();
        //ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        //ctx.fillStyle = this.color;
        //ctx.fill();
        //ctx.closePath();
    }

    this.update = function(){
        this.draw();
        this.dx = this.speed*Math.cos((this.degree-50)*Math.PI/180);
        this.dy = this.speed*Math.sin((this.degree-50)*Math.PI/180);
        this.x+=this.dx;
        this.y+=this.dy;
        this.speed+=0.2;
        //console.log("x " + this.x);
        //console.log("y " + this.y);
    }

    this.collision = function(object) {
        let distance = Math.sqrt(Math.pow((this.x - object.x), 2) + Math.pow((this.y - object.y), 2));
        let sumOfRad = this.radius + object.radius;
        if (distance <= sumOfRad) {
            return true;
        }else{return false;}
    }
}

let Explosion = function(x,y){
    this.posX = x;
    this.posY = y;
    this.draw= function(){
        let img = new Image();
        img.src = "imgs/explosion"+Math.floor(Math.random()*3)+".png";
        ctx.shadowOffX = 1;
        ctx.shadowOffY = 10;
        ctx.shadowBlur = 80;
        ctx.shadowColor = "#ff0";
        ctx.drawImage(img,this.posX,this.posY,100,100);
    };
}//=======END_CLASS=========

//=========init obj========
//->>init tank
let x = 200,
    y = 200,
    size = 60,
    spd = 5;
let tank = new Tank(x, y, size, spd);

//->>init circle
let arrCircle = [];
let arrColor = [
    "#153641",
    "#22556E",
    "#4799B7",
    "#6DB3BF",
    "#94CFC9",
    "#009EA9",
    "#F8F7F5",
    "#FAD956",
    "#F8A602"
];
loadCircle(4); //input->length

//-->>init bullet skill
let arrBullet = [];

//-->>init Explosion array
let arrExplosion = [];

//=========== object ==========
let TankStatus = {
    status: "stop",
    degree: undefined,
    posX: undefined,
    posY: undefined
}
let Skill = {
    status: "noskill"
}
//=========FNC=========


let count = 10;
//==========draw============
let id;
function animate() {
    id = requestAnimationFrame(animate);
    //requestAnimationFrame()
    //console.log("runing");
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Score: "+ score,10,30);
    ctx.fillText("Life: "+ life,10,60);
    ctx.fillText("Q: fire ",120,30);
    ctx.fillText("S: stop ",200,30);
    tank.draw();
    tank.update();
    fire();
    drawCircle();
    collisionOfCircle();
    collitionOfTankWithCircle();
    collitionOfBulletWidthCircle();
    drawExplosion();
    clearExplosion();
    gameOver();
}
animate();
