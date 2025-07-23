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

function toggleTheme() {
    document.body.classList.toggle('dark');
    document.querySelector('.calculator').classList.toggle('dark');
    document.getElementById('display').classList.toggle('dark');
    document.querySelectorAll('button').forEach(btn => btn.classList.toggle('dark'));
    document.getElementById('history').classList.toggle('dark');
    const toggleBtn = document.getElementById('theme-toggle');
    toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9.]/.test(key)) {
        appendToDisplay(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        calculate(key);
    } else if (key === 'Enter' || key === '=') {
        evaluateExpression();
    } else if (key === 'Escape' || key === 'c') {
        clearDisplay();
    } else if (key === '^') {
        calculate('**');
    } else if (key === 's') {
        calculate('Math.sqrt(');
    } else if (key === '%') {
        calculate('/100');
    }
})

function backspace() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}

function copyResult() {
    navigator.clipboard.writeText(display.value).then(() => alert('Copied!'));
};