let runningTotal = 0;
let buffer = "0";
let previousOperator;
let result = undefined;
const screen = document.querySelector(".screen");

function processButton(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    if (result !== undefined) {
      buffer = "0";
      result = undefined;
    }
    handleNumber(value);
  }
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleSymbol(value) {
  switch(value) {
    case "C": 
      buffer = "0";
      runningTotal = 0;
      console.log("Clearing")
      break;
    case "←":
      buffer = buffer.substring(0, buffer.length - 1);
      break;
    case "=":
      flushingOperation(value);
      result = runningTotal.toString();
      buffer = result;
      runningTotal = 0;
      break;
    default:
      doMath(value);
  }
  console.log("result: ", result)
  console.log("buffer: ", buffer)
  console.log("running total: ", runningTotal)
}

function doMath(value) {
  previousOperator = value;
  if (buffer === "0") {
    return;
  } else if (runningTotal === 0) {
    runningTotal = parseInt(buffer);
  } else {
    flushingOperation(value);
  }
  buffer = "0";
}

function flushingOperation(value) {
  switch(previousOperator) {
    case "÷":
      runningTotal /= parseInt(buffer);
      break;
    case "×":
      runningTotal *= parseInt(buffer);
      break;
    case "-":
      runningTotal -= parseInt(buffer);
      break;
    case "+":
      runningTotal += parseInt(buffer);
  }
}

document.querySelector(".calc-buttons").addEventListener("click", function(event) {
    processButton(event.target.innerText);
    screen.innerText = buffer;
  });