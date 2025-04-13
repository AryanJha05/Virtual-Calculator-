
let input = '';

function press(value) {
    input += value;
    const display = document.getElementById('display');
    display.textContent = input;
    display.classList.add('updated');

    setTimeout(() => {
    display.classList.remove('updated');
    }, 200);
}

function calculate() {
    try {
        let result;
        const operands = input.split(/\+|\-|\*|\//); // Split input into operands
        const operators = input.replace(/[0-9]/g, '').split(''); // Get the operators

        // First operand
        result = parseFloat(operands[0]);

        for (let i = 0; i < operators.length; i++) {
            const operator = operators[i];
            const nextOperand = parseFloat(operands[i + 1]);

            switch (operator) {
            case '+':
                result += nextOperand;
                break;
            case '-':
                result -= nextOperand;
                break;
            case '*':
                result *= nextOperand;
                break;
            case '/':
                if (nextOperand === 0) {
                throw new Error('Cannot divide by 0');
                }
                result /= nextOperand;
                break;
            default:
                throw new Error('Invalid operator');
            }
        }

        input = result.toString();
        document.getElementById('display').textContent = input;

    }   catch (error) {
            // Display the error message (error.message) in the display
            const display = document.getElementById('display');
            display.textContent = error.message;
            display.classList.add('error');

            setTimeout(() => {
                display.classList.remove('error');
            }, 300);

            input = '';
        }
            
}

function backspace() {
    input = input.slice(0, -1);
    updateDisplay();
}
  

function clearDisplay() {
    input = '';
    document.getElementById('display').textContent = '0';
}

function updateDisplay() {
      document.getElementById('display').textContent = input || '0';
}

// 💻 Keyboard support
document.addEventListener('keydown', function (event) {
    const key = event.key;
    const validKeys = '0123456789.+-*/';

    // Find button with matching data-key
    const button = document.querySelector(`button[data-key="${key.toLowerCase()}"]`);
    if (button) {
        button.classList.add('pressed');
        setTimeout(() => button.classList.remove('pressed'), 100);
    }

        if (validKeys.includes(key)){
                press(key);
            } else if (key === 'Enter' || key === '=') {
                    calculate();
                } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                        clearDisplay();
                    } else if (key === 'Backspace') {
                            input = input.slice(0, -1);
                            updateDisplay();
                        }   
});
       
       
