// Calculator functionality
let display = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForOperand = false;

// Update display
function updateDisplay() {
    display.value = displayValue;
}

// Initialize display
updateDisplay();

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.innerText;
        
        // Handle number input
        if (!isNaN(buttonText) || buttonText === '.') {
            handleNumberInput(buttonText);
        } 
        // Handle operator input
        else if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/') {
            handleOperatorInput(buttonText);
        } 
        // Handle equals
        else if (buttonText === '=') {
            handleEquals();
        } 
        // Handle AC (All Clear)
        else if (buttonText === 'AC') {
            handleClear();
        } 
        // Handle DEL (Delete)
        else if (buttonText === 'DEL') {
            handleDelete();
        } 
        // Handle percentage
        else if (buttonText === '%') {
            handlePercentage();
        }
    });
});

// Handle number input
function handleNumberInput(number) {
    if (waitingForOperand) {
        displayValue = number === '.' ? '0.' : number;
        waitingForOperand = false;
    } else {
        if (number === '.' && displayValue.includes('.')) {
            return; // Prevent multiple decimal points
        }
        if (number === '.' && displayValue === '0') {
            displayValue = '0.';
        } else if (displayValue === '0' && number !== '.') {
            displayValue = number;
        } else {
            displayValue += number;
        }
    }
    updateDisplay();
}

// Handle operator input
function handleOperatorInput(nextOperator) {
    const inputValue = parseFloat(displayValue);
    
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const currentValue = firstOperand || 0;
        const newValue = inputValue;
        
        if (operator === '+') {
            firstOperand = currentValue + newValue;
        } else if (operator === '-') {
            firstOperand = currentValue - newValue;
        } else if (operator === '*') {
            firstOperand = currentValue * newValue;
        } else if (operator === '/') {
            if (newValue === 0) {
                alert("Cannot divide by zero!");
                handleClear();
                return;
            }
            firstOperand = currentValue / newValue;
        }
        
        displayValue = String(firstOperand);
        updateDisplay();
    }
    
    waitingForOperand = true;
    operator = nextOperator;
}

// Handle equals
function handleEquals() {
    const inputValue = parseFloat(displayValue);
    
    if (firstOperand !== null && operator) {
        let result;
        
        if (operator === '+') {
            result = firstOperand + inputValue;
        } else if (operator === '-') {
            result = firstOperand - inputValue;
        } else if (operator === '*') {
            result = firstOperand * inputValue;
        } else if (operator === '/') {
            if (inputValue === 0) {
                alert("Cannot divide by zero!");
                handleClear();
                return;
            }
            result = firstOperand / inputValue;
        }
        
        // Round to avoid floating point precision issues
        result = Math.round(result * 10000000000) / 10000000000;
        displayValue = String(result);
        firstOperand = result;
        operator = null;
        waitingForOperand = true;
        updateDisplay();
    }
}

// Handle clear
function handleClear() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForOperand = false;
    updateDisplay();
}

// Handle delete
function handleDelete() {
    if (displayValue.length === 1 || (displayValue.length === 2 && displayValue.startsWith('-'))) {
        displayValue = '0';
    } else {
        displayValue = displayValue.slice(0, -1);
    }
    updateDisplay();
}

// Handle percentage
function handlePercentage() {
    const currentValue = parseFloat(displayValue);
    displayValue = String(currentValue / 100);
    updateDisplay();
}

// Add keyboard support
document.addEventListener('keydown', event => {
    if (event.key >= 0 && event.key <= 9) {
        handleNumberInput(event.key);
    } else if (event.key === '.') {
        handleNumberInput('.');
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        handleOperatorInput(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        handleEquals();
    } else if (event.key === 'Escape') {
        handleClear();
    } else if (event.key === 'Backspace') {
        handleDelete();
    } else if (event.key === '%') {
        handlePercentage();
    }
});
