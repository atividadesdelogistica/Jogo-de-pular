let player = document.getElementById("player")
let obstacle = document.getElementById("obstacle")
let scoreText = document.getElementById("score")
let highText = document.getElementById("highscore")
let deathScreen = document.getElementById("deathScreen")
let music = document.getElementById("deathMusic")

let score = 0
let high = localStorage.getItem("high") || 0
highText.innerText = high

let speed = 5
let playerX = 50
let jumping = false
let paused = false

function moveObstacle(){
if(paused)return

let obsX = obstacle.offsetLeft
obstacle.style.left = (obsX - speed) + "px"

if(obsX < -40){
obstacle.style.left = window.innerWidth + "px"
score++
scoreText.innerText = score

if(score % 5 == 0){
speed += 1
}
}

let playerRect = player.getBoundingClientRect()
let obsRect = obstacle.getBoundingClientRect()

if(
playerRect.right > obsRect.left &&
playerRect.left < obsRect.right &&
playerRect.bottom > obsRect.top
){
die()
}
}

setInterval(moveObstacle,20)

function jump(){
if(jumping || paused)return
jumping = true
let up = 0

let jumpInt = setInterval(()=>{
if(up >= 100){
clearInterval(jumpInt)
let downInt = setInterval(()=>{
if(up <= 0){
clearInterval(downInt)
jumping = false
}else{
up -=5
player.style.bottom = up+"px"
}
},20)
}else{
up+=5
player.style.bottom = up+"px"
}
},20)
}

document.getElementById("jump").ontouchstart = jump
document.getElementById("left").ontouchstart = ()=>{playerX -=20; player.style.left = playerX+"px"}
document.getElementById("right").ontouchstart = ()=>{playerX +=20; player.style.left = playerX+"px"}

function die(){
paused = true
deathScreen.style.display="flex"

if(score>high){
high=score
localStorage.setItem("high",high)
highText.innerText=high
}

music.currentTime=0
music.play()
}

document.getElementById("restart").onclick = ()=>{
score=0
speed=5
scoreText.innerText=0
obstacle.style.left=window.innerWidth+"px"
deathScreen.style.display="none"
paused=false
music.pause()
music.currentTime=0
}

document.getElementById("pause").onclick = ()=>{
paused = !paused
}
