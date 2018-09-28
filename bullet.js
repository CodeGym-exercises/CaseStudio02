//=======Bullet============
let Bullet = function(x,y,degree,type,radius,ratio){
    this.x = x;
    this.y = y;
    this.dx = undefined;
    this.dy = undefined;
    this.radius = radius;
    this.color = "#fff";
    this.speed = 2;
    this.degree = degree;
    this.type = type;
    this.ratio = ratio;

    this.draw = function(){
        //ctx.beginPath();
        let img = new Image();
        img.src = "imgs/"+this.type+".png";
        ctx.save()
        ctx.translate(this.x+this.radius,this.y+this.radius+this.ratio);
        ctx.rotate((this.degree+23)*Math.PI/180);
        ctx.shadowOffX = 1;
        ctx.shadowOffY = 10;
        ctx.shadowBlur = 40;
        ctx.shadowColor = this.color;
        ctx.translate(-this.radius,-(this.radius+this.ratio))
        ctx.drawImage(img,0,0,this.radius*2,this.radius*2+this.ratio);
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
}
