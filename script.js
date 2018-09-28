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
