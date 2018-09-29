function gameOver() {
    if(life==0){
        cancelAnimationFrame(id);
        ship.x = x;
        ship.y = y;
        //alert("Game Over, score: " + score);
        ctx.font = "100px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText("Game Over",canvas.width/2-200,300);
        ctx.font = "60px Arial";
        ctx.fillText("Your score " + score,canvas.width/2,350);
        ctx.font = "30px Arial";
        ctx.fillText("Press f5 to contiune",canvas.width/2,400);        
    }
}

function clearExplosion(){
    if(arrExplosion.length!=0){
        if(FPS==50){
            arrExplosion.shift();
            FPS = 0;
        }
        FPS++;
        //console.log(FPS);
    }
}

function drawExplosion(){
    for(let i = 0; i < arrExplosion.length; i++){
        arrExplosion[i].draw();
    }
}

function loadExplosion(x,y){
    arrExplosion.push(new Explosion(x,y));
}

function collitionOfBulletWidthCircle(){
    for(let i = 0; i < arrBullet.length; i++){
        for(let j = 0; j < arrCircle.length; j++){
            if(arrBullet[i].collision(arrCircle[j])){
                loadExplosion(arrBullet[i].x,arrBullet[i].y)
                arrCircle.splice(j,1);
                initCircle();
                arrBullet.splice(i,1);
                score++;
                break;
            }
        }
    }
}

function fire(){
    if(Skill.status=="q"){
        let x = TankStatus.posX+ship.width/2;
        let y = TankStatus.posY+ship.height/2;
        let dg = TankStatus.degree;
        loadBullet(x,y,dg,"rocket",14,2);        
        Skill.status="noskill";
    }else if(Skill.status=="w"){
        let x = TankStatus.posX+ship.width/2;
        let y = TankStatus.posY+ship.height/2;
        let dg = TankStatus.degree;
        let randomTarget = Math.floor(Math.random()*arrCircle.length);
        loadBullet(x,y,dg,"intelligentrocket01",20,0);     
        arrBullet[arrBullet.length-1].setTarget(arrCircle[randomTarget])  
        Skill.status="noskill";
    }
    for(let i = 0; i<arrBullet.length; i++){
        arrBullet[i].update();
        if(arrBullet[i].x<0||arrBullet[i].x>canvas.width||
            arrBullet[i].y<0||arrBullet[i].y>canvas.height){
            arrBullet.splice(i,1);
        }
    }
}

function loadBullet(x,y,degree,type,radius,ratio){
    arrBullet.push(new Bullet(x,y,degree,type,radius,ratio));
}

function collitionOfTankWithCircle() {
    for (let i = 0; i < arrCircle.length; i++) {
        let distanceCurrent = Math.sqrt(Math.pow(((ship.x + ship.width / 2) - arrCircle[i].x), 2) + Math.pow(((ship.y + ship.height / 2) - arrCircle[i].y), 2));
        let distance = ship.width / 2 + arrCircle[i].radius;
        if (distanceCurrent <= distance) {
            life -= 1;
            loadExplosion(arrCircle[i].x,arrCircle[i].y)
            arrCircle.splice(i, 1);
            initCircle();
            break;
        }
    }

}

function collisionOfCircle() {
    for (let i = 0; i < arrCircle.length; i++) {
        for (let j = i + 1; j < arrCircle.length; j++) {
            arrCircle[i].collision(arrCircle[j]);
        }
    }
}

function drawCircle() {
    for (let i = 0; i < arrCircle.length; i++) {
        arrCircle[i].draw();
    }
}

function loadCircle(length) {
    for (let i = 0; i < length; i++) {
        initCircle();
    }
}

function initCircle() {
    let randomdx = Math.floor(Math.random() * 3) + 2;
    let randomdy = Math.floor(Math.random() * 3) + 2;
    let temp = [1, -1];
    let radius = 20,
    x = Math.random() * (canvas.width - radius * 2) + radius;
    y = Math.random() * (canvas.height - radius * 2) + radius;
    randomdx *= temp[Math.floor(Math.random() * 2)];
    randomdy *= temp[Math.floor(Math.random() * 2)];
    let rdImg = Math.floor(Math.random()*5);
    arrCircle.push(new Circle(x, y, randomdx, randomdy, radius, getRandomColor(),rdImg));
}

function getRandomColor() {
    return arrColor[Math.floor(Math.random() * arrColor.length)];
} 

function getDistance(x1,x2,y1,y2){
    return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));
}

function findMin(arr){
    let min = arr[0], index=0;
    for(let i = 1; i<arr.length; i++){
        if(min>arr[i]){
            min=arr[i];
            index=i;
        }
    }
    return [min,index];
}
