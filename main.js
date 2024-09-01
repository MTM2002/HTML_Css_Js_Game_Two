document.querySelector(".control-button span").onclick = function () {
    let yourName = window.prompt("What Is Your Name?")
    if(yourName==null||yourName=="") {
        document.querySelector(".name span").innerHTML = "Unknown"
    } else {
        document.querySelector(".name span").innerHTML = yourName
    }
    document.querySelector(".control-button").remove()
}
let duration = 1000
let container = document.querySelector(".box-container")
let Arrbox = Array.from(container.children)
let orderRange = Array.from(Array(Arrbox.length).keys())
shuffle(orderRange)
Arrbox.forEach((box,index)=> {
    box.style.order = orderRange[index]
    box.addEventListener("click", function() {
        flipBox(box)
    })
})
function flipBox(selectedbox) {
    selectedbox.classList.add("is-flipped")
    let allFlippedBox = Arrbox.filter(flippedBox => flippedBox.classList.contains("is-flipped"))
    if (allFlippedBox.length === 2) {
        stopClicking()
        hasMatched(allFlippedBox[0],allFlippedBox[1])
    }
}
function stopClicking() {
    container.classList.add("no-clicking")
    setTimeout(() => {
        container.classList.remove("no-clicking")
    }, duration);
}
function hasMatched(firstBlock,secondBlock) {
    let tries = document.querySelector(".tries span")
    if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
        firstBlock.classList.remove("is-flipped")
        secondBlock.classList.remove("is-flipped")
        firstBlock.classList.add("has-matched")
        secondBlock.classList.add("has-matched")
        document.getElementById("success").play()
    } else {
        tries.innerHTML = parseInt(tries.innerHTML)+1
        setTimeout(()=> {
            firstBlock.classList.remove("is-flipped")
            secondBlock.classList.remove("is-flipped")
        },duration)
        document.getElementById("fail").play()
    }
}
function shuffle(array) {
    let current = array.length,
        random,
        temp;
    while(current > 0) {
        random = Math.floor(Math.random() * current);
        current--; 
        temp = array[current];
        array[current] = array[random];
        array[random] = temp
    }
    return array
}
