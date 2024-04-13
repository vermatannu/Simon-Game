let gameSeq = [];
let userSeq = [];

let highest = 0;

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let high = document.querySelector("p");

let btns = ["red","green","yellow","purple"];

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("game started");
        started = true;
        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    },250);
}
function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    gameFlash(randBtn);
    console.log(gameSeq);
    if(level > highest){
        highest = level;
    }
} 

function checkAns(idx){
    if(gameSeq[idx] == userSeq[idx]){
        if(gameSeq.length == userSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        if(h2 !== null){
            h2.innerHTML = `Game Over! Score <b> ${level} </b> <br>press any key to start.`;
        }
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        if(high !== null){
            high.innerHTML = `Highest Score : ${highest}`;
        }
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    // console.log(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    // console.log(userColor);
    checkAns(userSeq.length-1);
}
function reset(){
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}