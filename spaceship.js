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
