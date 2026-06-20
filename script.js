let currentNumber = '0';
let previousNumber = '';
let operator = '';
let shouldResetScreen = false;

const expressionDisplay = document.getElementById('expression');
const resultDisplay = document.getElementById('result');

function updateDisplay() {
    resultDisplay.textContent = currentNumber;
    expressionDisplay.textContent = previousNumber + operator;
}

function appendNumber(number) {
    if (currentNumber === '0' || shouldResetScreen) {
        currentNumber = number;
        shouldResetScreen = false;
    } else if (currentNumber.length < 15) {
        currentNumber += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetScreen) {
        currentNumber = '0.';
        shouldResetScreen = false;
    } else if (!currentNumber.includes('.')) {
        currentNumber += '.';
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== '' && !shouldResetScreen) {
        calculate();
    }
    previousNumber = currentNumber;
    operator = op;
    shouldResetScreen = true;
    updateDisplay();
}

function calculate() {
    if (operator === '' || shouldResetScreen) return;
    
    let result;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '−':
        case '-':
            result = prev - current;
            break;
        case '×':
        case '*':
            result = prev * current;
            break;
        case '÷':
        case '/':
            if (current === 0) {
                result = 'Error';
            } else {
                result = prev / current;
            }
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    
    if (result === 'Error') {
        currentNumber = 'Error';
    } else {
        currentNumber = parseFloat(result.toFixed(10)).toString();
    }
    
    operator = '';
    previousNumber = '';
    shouldResetScreen = true;
    updateDisplay();
}

function clearAll() {
    currentNumber = '0';
    previousNumber = '';
    operator = '';
    shouldResetScreen = false;
    updateDisplay();
}

function clearEntry() {
    currentNumber = '0';
    shouldResetScreen = false;
    updateDisplay();
}

function deleteLast() {
    if (currentNumber === 'Error') {
        clearAll();
        return;
    }
    
    if (currentNumber.length === 1 || (currentNumber.length === 2 && currentNumber[0] === '-')) {
        currentNumber = '0';
    } else {
        currentNumber = currentNumber.slice(0, -1);
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendDecimal();
    } else if (e.key === '+') {
        appendOperator('+');
    } else if (e.key === '-') {
        appendOperator('−');
    } else if (e.key === '*') {
        appendOperator('×');
    } else if (e.key === '/') {
        e.preventDefault();
        appendOperator('÷');
    } else if (e.key === '%') {
        appendOperator('%');
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Escape') {
        clearAll();
    } else if (e.key === 'Backspace') {
        deleteLast();
    }
});
