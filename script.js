"use strict";

function startGame() {
  let bombCounter = 4;
  let bombArray = [];
  let bombCountdown = 4;

  for(let i = 1; i <= 16; i++) {
  // console.log(i);

  let newBox = document.createElement('div');
  newBox.id = i;
  // newBox.innerText = i;
  if (i <= 4) {
    newBox.className = "box row1";
  } else if (i >= 5 && i <= 8) {
    newBox.className = "box row2";
  } else if (i >= 9 && i <= 12) {
    newBox.className = "box row3";
  } else if (i >= 13 && i <= 16) {
    newBox.className = "box row4";
  }

  if ((i - 1) % 4 === 0) {
    newBox.classList.add("column1");
  } else if ((i + 2) % 4 === 0) {
    newBox.classList.add("column2");
  } else if ((i + 1) % 4 === 0) {
    newBox.classList.add("column3");
  } else if (i % 4 === 0) {
    newBox.classList.add("column4");
  }

  // create text
  let newText = document.createElement('p');
  // document.newText.innerHTML(i);
  // append text 
  // newBox.appendChild(newText);

  let position = document.getElementsByClassName('game-board')[0];

  // document.body.appendChild(newBox);
  position.appendChild(newBox);

  };
  function placeBombs() {
    while (bombCounter > 0) {
      let randomNo = Math.floor(Math.random() * 16) + 1;
      let bomb = document.getElementById(randomNo);
      // console.log(randomNo);
      if (bombArray.length) {
        for( let i = 0; i < bombArray.length; i++) {
          if (randomNo === bombArray[i]) {
            break;
          } else if (bombArray[i] !== randomNo && i === bombArray.length - 1) {
            bombArray.push(randomNo);
            bombCounter--;
          } 
        } 
        
      } else {
        bombArray.push(randomNo);
        bombCounter--;
        console.log(bombArray);
      }
      bomb.setAttribute("bomb", true);
    }
    let bombDisplay = document.createElement('div');
    let bombDisplayNo = document.createElement('div');
    bombDisplayNo.classList.add("bomb-display-no");
    bombCountdown = 4;
    bombDisplayNo.innerText = bombCountdown;
    let footer = document.getElementsByTagName('footer')[0];

    let bombDisplayText = document.createElement('p');
    bombDisplayText.innerText = " Bombs Left";
    
    footer.appendChild(bombDisplay);
    bombDisplay.appendChild(bombDisplayNo);bombDisplay.appendChild(bombDisplayText);

  } // end function "placeBombs"

  function assignValues() {
    for (let i = 1; i <= 16; i++) {
      // console.log(i);
      let proximity = 0;
      let boxNo = document.getElementById(i);

      if (document.getElementById(i).getAttribute("bomb") === "true") {
        let proximity = "bomb";
      } else {

        // proximity 1 square to the right
        if (i + 1 < 17 && (i) % 4 !== 0) {
          if (document.getElementById(i + 1).getAttribute("bomb") === "true") {
          proximity += 1;
          }
        }

        // proximity 1 square to the left
        if (i - 1 > 0 && (i - 1) % 4 !== 0) {
          if (document.getElementById(i - 1).getAttribute("bomb") === "true") {
            proximity += 1;
          }
        }

        // proximity one square above
        if (i - 4 > 0) {
          if (document.getElementById(i - 4).getAttribute("bomb") === "true") {
            proximity += 1;
          }
        }

        // proximity one square below
        if (i + 4 < 17) {
          if (document.getElementById(i + 4).getAttribute("bomb") === "true") {
            proximity += 1;
          }
        }

      boxNo.innerText = proximity;
    }
      
    }
  } // end function "assignValues"

  placeBombs()
  assignValues()
}

function clickTest(event) {
  console.log(event.button);
  
  let b = event.target;
  for (let i=0; i < b.classList.length; i++) {
    if (b.classList[i] === "box") {
      console.log(b);
      
      // This is what happens if you click on a bomb
      if (b.getAttribute("bomb") === "true") {
        b.innerHTML = `<i class="mdi mdi-bomb mdi-36px"></i>  <!-- bomb -->`;
        b.classList.add("ko");
        document.getElementsByClassName("bomb-display-no")[0].innerText -= 1;
        console.log("Game Over");

      } else {
      // if (b.hasClass = "box") {
      // console.log(event);
      // console.log(b);
      // console.log(b.classList);
      // console.log(b.classList.value);
      let classes = b.classList.value;
      b.classList.add("clicked");
      // console.log(b.classList.value);
      // }
      console.log(b.getAttribute("bomb"));
      }
    }
  }
}

let box = document.getElementsByClassName('box');
// console.log(box);


////// THINGS HAPPENING ON SCREEN //////////////////////
startGame();

document.onclick = clickTest;