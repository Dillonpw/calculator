const buttons = document.querySelectorAll('.btn');
const screenTop = document.querySelector('.screen.top');
const screenBottom = document.querySelector('.screen.bot');

let currentInput = '';
let currentOperator = '';
let prevInput = '';

// Add event listeners to all calculator buttons
buttons.forEach(button => {
    button.addEventListener('click', () => handleButton(button.id));
});

let fullMath = ''; // Variable to store the full math expression

function handleButton(buttonId) {
    if (!isNaN(buttonId) || buttonId === '.') {
        // Handle numeric and decimal buttons
        currentInput += buttonId;
        updateScreen();
    } else if (buttonId === 'clear') {
        // Clear the input
        clearInput();
    } else if (buttonId === 'delete') {
        // Delete the last character
        currentInput = currentInput.slice(0, -1);
        updateScreen();
    } else if (buttonId === 'sum' || buttonId === 'minus' || buttonId === 'times' || buttonId === 'divide') {
        // Handle operator buttons
        if (currentInput !== '') {
            if (prevInput === '') {
                prevInput = currentInput;
                currentOperator = buttonId;
                currentInput = '';
                fullMath += prevInput + ' ' + getOperatorSymbol(buttonId) + ' ';
            } else {
                performCalculation();
                currentOperator = buttonId;
                fullMath = prevInput + ' ' + getOperatorSymbol(buttonId) + ' ';
                currentInput = '';
            }
            updateScreen();
        }
    } else if (buttonId === 'equals') {
        if (currentInput !== '' && prevInput !== '' && currentOperator !== '') {
            performCalculation();
            updateScreen();
            fullMath = prevInput; 
            prevInput = '';
            currentOperator = '';
            currentInput = '';
        }
    }

    else if (buttonId === 'plus') {
        if (currentInput !== '') {
            if (prevInput === '') {
                prevInput = currentInput;
                currentOperator = 'sum';
                currentInput = '';
                fullMath += prevInput + ' + ';
            } else {
                performCalculation();
                currentOperator = 'sum';
                fullMath = prevInput + ' + ';
                currentInput = '';
            }
            updateScreen();
        }
    }
}


function getOperatorSymbol(operator) {
    switch (operator) {
        case 'sum':
            return '+';
        case 'minus':
            return '-';
        case 'times':
            return '×';
        case 'divide':
            return '÷';
        default:
            return operator;
    }
}



function performCalculation() {
    const num1 = parseFloat(prevInput);
    const num2 = parseFloat(currentInput);
    switch (currentOperator) {
        case 'sum':
            currentInput = (num1 + num2).toString();
            break;
        case 'minus':
            currentInput = (num1 - num2).toString();
            break;
        case 'times':
            currentInput = (num1 * num2).toString();
            break;
        case 'divide':
            currentInput = (num1 / num2).toString();
            break;
    }
    prevInput = currentInput; 
}


function updateScreen() {
    screenBottom.textContent = prevInput !== '' ? prevInput : ' ';
    screenTop.textContent = currentInput !== '' ? currentInput : '0';
}


function clearInput() {
    currentInput = '';
    currentOperator = '';
    prevInput = '';
    updateScreen();
}