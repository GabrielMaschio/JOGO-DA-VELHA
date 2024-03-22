let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let playerX = document.querySelector(".playerX");
let playerO = document.querySelector(".playerO");

// Winning Pattern Array
let winningPattern = [ 
    [0, 1, 2], 
    [0, 3, 6], 
    [2, 5, 8], 
    [3, 4, 5],
    [6, 7, 8], 
    [1, 4, 7], 
    [0, 4, 8], 
    [2, 4, 6]
];

// Player 'X' plays frist
let xTurn = true;
let xPlayerTurn = true;
let count = 0;

// Show the player
const showPlayer = () => {
    if(xPlayerTurn) {
        xPlayerTurn = false;
        playerX.classList.add("turn");
        playerO.classList.remove("turn");
    } else {
        xPlayerTurn = true
        playerO.classList.add("turn");
        playerX.classList.remove("turn");
    }
}

// Disable All Buttons
const disableButtons = () => {
    btnRef.forEach((e) => (e.disabled = true));

    // Enable PopUp
    popupRef.classList.remove("hide");
};

// Enable All Buttons (For New Game and Restart) 
const enableButtons = () => {
    btnRef.forEach((e) => {
        e.innerText = "";
        e.disabled = false;
    });
    // Disable PopUp
    popupRef.classList.add("hide");
};

// This function is executed when a player wins
const winFunction = (letter) => {
    disableButtons();
    if(letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Ganhou";
    } else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Ganhou";
    };
};

// Function for draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> Empate";
}

// New Game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();

    xTurn = true

    xPlayerTurn = true;
    showPlayer();
});
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();

    xTurn = true

    xPlayerTurn = true;
    showPlayer();
});

// Win Logic
const winChecker = () => {
    // Loop through all win patterns
    for(let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText, 
            btnRef[i[1]].innerText, 
            btnRef[i[2]].innerText
        ];
        
        // Check if elements are filled
        // If 3 empty elements are same and would give win as would
        if(element1 != "" && element2 != "" && element3 != "") {
            if(element1 == element2 && element2 == element3) {
                // If all 3 buttons have same values then pass the value to winFunction;

                winFunction(element1);
            };
        };
    };
};

// Display X/O on click
btnRef.forEach((e) => {
    e.addEventListener('click', () => {
        showPlayer();

        if(xTurn) {
            xTurn = false;

            // Display X
            e.innerText = "X";
            e.disabled = true;
        } else {
            xTurn = true;

            // Display O
            e.innerText = "O";
            e.disabled = true;
        }

        // Increment count on each click
        count++;

        if(count == 9) {
            // It's a draw since there are a total of 9 boxed
            drawFunction();
        }

        // Check for win on every click
        winChecker();        
    });
});

// Enable Buttons and Disable PopUp on page load
window.onload = () => {
    enableButtons(); 
    showPlayer();
} 
