
const GameBoard = (() => {
    const PlayerFactory = (name, mark, turn) => {
        return { name, mark, turn }
    };

    var p1arr = [];
    var p2arr = [];
    const player1 = PlayerFactory("Player 1", "X", true);
    const player2 = PlayerFactory("Player 2", "O", false);

    const windisplay = document.querySelector('.win-display');
    var boxes = document.getElementsByClassName("box");
    let gameover = false;

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("click", function () {
            if (!gameover) {
                boxClicked(this);
            }
        });
    }

    function boxClicked(box) {
        if (box.innerHTML === "") {
            if (player1.turn === true) {
                box.textContent = player1.mark;
                // alert("Kaam 1 ho gya");
                p1arr[box.id] = player1.mark;
                console.log(p1arr);
                player1.turn = false;
                player2.turn = true;
                checkwinner();
            }
            else if (player2.turn === true) {
                box.textContent = player2.mark;
                // alert("Kaam 2 ho gya");
                p2arr[box.id] = player2.mark;
                console.log(p2arr);
                player1.turn = true;
                player2.turn = false;
                checkwinner();
            }
        } else {
            console.log("This box is already occupied!");
        }
    }

    const winCombos = [
        [0, 1, 2],
        [0, 3, 6],
        [3, 4, 5],
        [6, 7, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [0, 4, 8]
    ];

    function checkwinner() {

        // Function to count occurrences of 'X' and 'O' in an array
        function countOccurrences(array, symbol) {
            let count = 0;
            for (let i = 0; i < array.length; i++) {
                if (array[i] === symbol) {
                    count++;
                }
            }
            return count;
        }

        // Count the occurrences of 'X' and 'O' in both arrays
        const oCount = countOccurrences(p1arr, 'O') + countOccurrences(p2arr, 'O');
        const xCount = countOccurrences(p1arr, 'X') + countOccurrences(p2arr, 'X');

        // Check if any winCombos match the numbers in array1
        var isWinner1 = checkWinCombos(p1arr);
        if (isWinner1) {
            console.log("Winner is X! ");
            windisplay.textContent = "Winner is X! ";
            gameover = true;
        }

        // Check if any winCombos match the numbers in array2
        var isWinner2 = checkWinCombos(p2arr);
        if (isWinner2) {
            console.log("Winner is O!");
            windisplay.textContent = "Winner is O! ";
            gameover = true;
        }

        // Function to check if any winCombos match the given array
        function checkWinCombos(array) {
            for (var i = 0; i < winCombos.length; i++) {
                var combo = winCombos[i];
                var isMatch = true;
                for (var j = 0; j < combo.length; j++) {
                    if (!array[combo[j]]) {
                        isMatch = false;
                        break;
                    }
                }
                if (isMatch) {
                    return true;
                }
            }
            return false
        }

        // Check if all 9 boxes are occupied
        if (xCount + oCount === 9) {
            if (!isWinner1 && !isWinner2) {
                console.log('Tie!');
                windisplay.textContent = "Tie!";
                gameover = true;    
            }
        }
    }

    let resetbutton = document.querySelector('.reset')
    resetbutton.addEventListener('click', function () {
        // alert("Kaam ho gya!");
        resetgame();
    });

    function resetgame() {
        p1arr = [];
        p2arr = [];
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].innerHTML = "";
        }
        windisplay.textContent = "";
        gameover = false;
    }
})();