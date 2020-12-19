let currentPlayer = "PlayerX";

$(".grid .cell").each(function (idx) {
  $(this).data("index", idx);
});


$(".grid .cell").click(function () {
  const index = $(this).data("index");

  if (board[index]) {
    return
  }

  board[index] = currentPlayer;

  if (currentPlayer === "PlayerX") {
    $(this).text("X");
  } else {
    $(this).text("O");
  }

  ifWin();

  if(drawTwo()) alert("Its a Draw!");

  if (currentPlayer === "PlayerX") {
    currentPlayer = "PlayerO";
  } else {  
    currentPlayer = "PlayerX";
  }
});

$("#playerSubmission").submit(function (event) {
  event.preventDefault();
  const playerOne = event.target[0].value;
  const playerTwo = event.target[1].value;

  const display = $(".nameDisplay");
  display.append($(`<div> PlayerX: ${playerOne}</div>`));
  display.append($(`<div> PlayerO: ${playerTwo}</div>`));
  $(this).addClass("invisible");
});

let board = ["", "", "", "", "", "", "", "", ""];

function clearBoard() {
    $(".cell").text("");
    board = Array(9).fill("");
  $(".nameDisplay").text("");
  $("#playerOne").text("");
  $('#playerSubmission').removeClass("invisible");
}

$(".clear-board").on("click", clearBoard)

let winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function ifWin() {
  didWin = false;
  for (let i = 0; i <= 7; i++) {
    const winningPosition = winningPositions[i];
    let a = board[winningPosition[0]];
    let b = board[winningPosition[1]];
    let c = board[winningPosition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      didWin = true;
    }
  }
  if (didWin) {
    alert(currentPlayer + " has won!");
    console.log(board);
    board = Array(9).fill("")
    clearBoard();
  }
}

function drawTwo() {
  return !board.some(position => {
    return position === "";
  })  
}