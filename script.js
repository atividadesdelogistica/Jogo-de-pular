let player = document.getElementById("player")
let obstacle = document.getElementById("obstacle")
let scoreText = document.getElementById("score")
let recordText = document.getElementById("record")
let gameOver = document.getElementById("gameOver")
let restart = document.getElementById("restart")
let deathSound = document.getElementById("deathSound")
let pauseBtn = document.getElementById("pauseBtn")

let score = 0
let record = localStorage.getItem("record") || 0
recordText.innerText="REC: "+record

let speed = 5
let playing = true
let jumping=false

function moveObstacle(){
if(!playing)return

let pos = obstacle.offsetLeft
obstacle.style.left=(pos-speed)+"px"

if(pos<0){
obstacle.style.left=window.innerWidth+"px"
score++
scoreText.innerText=score

if(score>record){
record=score
localStorage.setItem("record",record)
recordText.innerText="REC: "+record
}

if(score%5==0){
speed+=1
}
}

let playerRect=player.getBoundingClientRect()
let obsRect=obstacle.getBoundingClientRect()

if(playerRect.left<obsRect.right &&
playerRect.right>obsRect.left &&
playerRect.bottom>obsRect.top){
die()
}

requestAnimationFrame(moveObstacle)
}

function jump(){
if(jumping)return
jumping=true
let pos=50

let up=setInterval(()=>{
if(pos>=150){
clearInterval(up)
let down=setInterval(()=>{
if(pos<=50){
clearInterval(down)
jumping=false
}else{
pos-=5
player.style.bottom=pos+"px"
}
},20)
}else{
pos+=5
player.style.bottom=pos+"px"
}
},20)
}

function die(){
playing=false
gameOver.style.display="block"
deathSound.currentTime=0
deathSound.play()
score=0
scoreText.innerText=score
}

restart.onclick=()=>{
gameOver.style.display="none"
obstacle.style.left=window.innerWidth+"px"
speed=5
playing=true
deathSound.pause()
deathSound.currentTime=0
moveObstacle()
}

pauseBtn.onclick=()=>{
playing=!playing
if(playing)moveObstacle()
}

document.getElementById("jump").onclick=jump
moveObstacle()
