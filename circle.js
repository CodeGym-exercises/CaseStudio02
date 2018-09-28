//=======CIRCLE=========
let Circle = function(x, y, dx, dy, rad, color,imgn) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = rad;
    this.color = color;

    this.draw = function() {
        ctx.beginPath();
        let img = new Image();
        img.src = "imgs/ufo"+imgn+".png";
        ctx.shadowOffX = 10;
        ctx.shadowOffY = 10;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.drawImage(img, this.x, this.y,this.radius+20,this.radius+20);
        //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ///ctx.fillStyle = this.color;
        //ctx.fill();
        //ctx.closePath();
        this.update();
    }
    this.update = function() {
        if (this.x > canvas.width - this.radius ||
            this.x < 0 + this.radius) {
            this.dx = -this.dx;
        }
        if (this.y > canvas.height - this.radius ||
            this.y < 0 + this.radius) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
    }
    this.collision = function(object) {
        let distance = Math.sqrt(Math.pow((this.x - object.x), 2) + Math.pow((this.y - object.y), 2));
        let sumOfRad = this.radius + object.radius;

        if (distance <= sumOfRad) {
            this.dx = -this.dx;
            this.dy = -this.dy;
            object.dx = -object.dx;
            object.dy = -object.dy;
        }
    }
}
