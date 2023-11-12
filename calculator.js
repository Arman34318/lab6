document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const buttons = document.querySelector(".buttons");

  buttons.addEventListener("click", handleClick);

  function handleClick(event) {
    const target = event.target;

    if (target.matches("button")) {
      const value = target.textContent;

      switch (value) {
        case "=":
          calculate();
          break;
        case "C":
          clearDisplay();
          break;
        case "←":
          backspace();
          break;
        case "%":
          percent();
          break;
        case "+/-":
          negate();
          break;
        default:
          appendToDisplay(value);
          break;
      }
    }
  }

  function calculate() {
    try {
      display.value = eval(display.value);
    } catch (error) {
      display.value = "Error";
    }
  }

  function clearDisplay() {
    display.value = "";
  }

  function backspace() {
    display.value = display.value.slice(0, -1);
  }

  function percent() {
    display.value = eval(display.value + "/100");
  }

  function negate() {
    display.value = eval(display.value + "* -1");
  }

  function appendToDisplay(symbol) {
    display.value += symbol;
  }

  function appendOperator(operator) {
    const lastChar = display.value.slice(-1);

    if (!isNaN(lastChar) || lastChar === "%") {
      display.value += operator;
    } else if (/[+\-*/]/.test(lastChar)) {
      // Replace the last operator if another one is pressed
      display.value = display.value.slice(0, -1) + operator;
    }
  }
});