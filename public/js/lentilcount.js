const gridItemIds = [
    "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10",
    "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b10",
    "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10",
    "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10",
    "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "e10",
    "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10"
];

const lentilFiles = ["redlentil.png", "greenlentil.png", "blacklentil.png"]

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let lentilCount = 0

function startGame() {

    lentilCount = getRandomInt(10, 55);
    let pickedGrids = [];
    let pickedCount = 0;
    while (pickedCount < lentilCount) {
        index = getRandomInt(0, 59)
        let grid = gridItemIds[index];
        if (pickedGrids.indexOf(grid) == -1) {
            pickedGrids.push(grid);
            pickedCount += 1;
        }
    }
    console.log(pickedGrids)
    pickedGrids.forEach(gridID => {
        console.log(gridID)
        const currentDiv = document.getElementById(gridID)
        const imgPath = "images/" + lentilFiles[Math.floor(Math.random() * lentilFiles.length)]
        const lentilImage = document.createElement("img")
        lentilImage.src = imgPath
        currentDiv.innerHTML = ""
        currentDiv.appendChild(lentilImage);
    });
}


const submitButton = document.getElementById("submitbutton");
const inputBox = document.getElementById("inputbox")

submitButton.addEventListener("click", () => 
{
    let guess = inputBox.value;
    if (guess == lentilCount)
    {
        submissionItems = document.getElementById("submission");
        submissionItems.innerHTML = `<a href="/home"> Back to Home! </a>`;
        winGame();

        // access the add pet happiness function here?
    }
    else
    {
        speak(`You guessed: ${guess}... try again!`);
    }


});



speechbox = document.getElementById("speak");

function speak(words)
{
    speechbox.textContent = words
}


// This method of submitting wins is incredibly insecure, but not enough time to properly
//verify. In the future, render the lentils by EJS, store the win # serverside, and check
// there.
function winGame()
{
    fetch('/games/lentilcounter', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        }
        ,
        body: JSON.stringify({win: true})
    })
    .then(Response => {
        return Response.text();
    })
    .then(data => {
        speak(data)
        updateSidebar();
    })
    .catch(error => {
        speechbox.textContent = "You broke the server! Get outta my farm!"
        console.log(error)
    })

    }

document.addEventListener("DOMContentLoaded", startGame());
