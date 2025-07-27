let display = document.getElementById('display');
let historyDiv = document.getElementById('history');
let currentInput = '';
let history = [];

function appendToDisplay(value) {
    currentInput += value;
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    display.value = '';
}

function calculate(operator) {
    currentInput += operator;
    display.value = currentInput;
}

function evaluateExpression() {
    try {
        let result = eval(currentInput);
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Invalid calculation');
        }
        addToHistory(currentInput + ' = ' + result);
        currentInput = result.toString();
        display.value = currentInput;
    } catch (error) {
        display.value = 'Error';
        currentInput = '';
    }
}

function addToHistory(entry) {
    history.push(entry);
    if (history.length > 5) history.shift(); // Keep last 5 entries
    historyDiv.innerHTML = history.map(h => `<div>${h}</div>`).join('');
}