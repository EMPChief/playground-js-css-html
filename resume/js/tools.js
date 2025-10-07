/**
 * JavaPlay Tools Module
 * Contains all interactive tool functionality for JavaPlay page
 */

// ======= CALCULATOR TOOL =======
function initializeCalculator() {
    const calculatorOperations = {
        add: (a, b) => a + b,
        subtract: (a, b) => a - b,
        multiply: (a, b) => a * b,
        divide: (a, b) => b !== 0 ? a / b : 'Cannot divide by zero'
    };

    function performCalculation(operation) {
        const num1 = document.getElementById('num1').value;
        const num2 = document.getElementById('num2').value;
        const resultElement = document.getElementById('result');

        if (!validateNumber(num1) || !validateNumber(num2)) {
            animateElement(resultElement, 'Please enter valid numbers');
            return;
        }

        const result = calculatorOperations[operation](parseFloat(num1), parseFloat(num2));
        animateElement(resultElement, formatNumber(result));
    }

    // Add event listeners for calculator buttons
    document.getElementById('add')?.addEventListener('click', () => performCalculation('add'));
    document.getElementById('subtract')?.addEventListener('click', () => performCalculation('subtract'));
    document.getElementById('multiply')?.addEventListener('click', () => performCalculation('multiply'));
    document.getElementById('divide')?.addEventListener('click', () => performCalculation('divide'));
}

// ======= COUNTER TOOL =======
function initializeCounter() {
    let count = 0;
    const countElement = document.getElementById('count');
    if (!countElement) return;

    function updateCount(increment) {
        count += increment;
        const color = increment > 0 ? '#198754' : '#dc3545';
        animateElement(countElement, count, color);
    }

    document.getElementById('increment')?.addEventListener('click', () => updateCount(1));
    document.getElementById('decrement')?.addEventListener('click', () => updateCount(-1));
}

// ======= TEMPERATURE CONVERTER TOOL =======
function initializeTemperatureConverter() {
    const tempConversions = {
        celsiusToFahrenheit: (celsius) => (celsius * 9/5) + 32,
        fahrenheitToCelsius: (fahrenheit) => (fahrenheit - 32) * 5/9
    };

    function convertTemperature() {
        const fromUnit = document.getElementById('tempFrom')?.value;
        const toUnit = document.getElementById('tempTo')?.value;
        const fromValue = document.getElementById('tempFromValue')?.value;
        const toElement = document.getElementById('tempToValue');
        
        if (!fromUnit || !toUnit || !fromValue || !toElement) return;

        if (!validateNumber(fromValue)) {
            toElement.value = 'Invalid input';
            return;
        }

        let result;
        const value = parseFloat(fromValue);

        if (fromUnit === toUnit) {
            result = value;
        } else if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
            result = tempConversions.celsiusToFahrenheit(value);
        } else {
            result = tempConversions.fahrenheitToCelsius(value);
        }

        toElement.value = formatNumber(result);
        toElement.style.backgroundColor = '#e8f0fe';
        
        setTimeout(() => {
            toElement.style.backgroundColor = '';
        }, 300);
    }

    const convertTempBtn = document.getElementById('convertTemp');
    const tempFromValue = document.getElementById('tempFromValue');
    const swapUnitsIcon = document.querySelector('.bi-arrow-down-up');

    convertTempBtn?.addEventListener('click', convertTemperature);

    // Add input validation and auto-conversion for temperature inputs
    tempFromValue?.addEventListener('input', function() {
        if (this.value && validateNumber(this.value)) {
            convertTemperature();
        }
    });

    // Add unit swap functionality
    swapUnitsIcon?.addEventListener('click', function() {
        const fromSelect = document.getElementById('tempFrom');
        const toSelect = document.getElementById('tempTo');
        if (!fromSelect || !toSelect) return;
        
        const fromValue = document.getElementById('tempFromValue')?.value;
        const toValue = document.getElementById('tempToValue')?.value;

        // Swap units
        const tempUnit = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = tempUnit;

        // Swap values if they exist and are valid
        if (validateNumber(fromValue) && validateNumber(toValue)) {
            document.getElementById('tempFromValue').value = toValue;
            convertTemperature();
        }

        // Animate the swap icon
        this.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
}

// ======= RANDOM COLOR GENERATOR TOOL =======
function initializeColorGenerator() {
    const colorDisplay = document.getElementById('colorDisplay');
    const colorValue = document.getElementById('colorValue');
    const generateColorBtn = document.getElementById('generateColor');
    
    if (!colorDisplay || !colorValue || !generateColorBtn) return;

    generateColorBtn.addEventListener('click', () => {
        const randomColor = getRandomColor();
        colorDisplay.style.backgroundColor = randomColor;
        colorValue.textContent = randomColor;
        
        // Set text color based on brightness
        colorDisplay.style.color = isLightColor(randomColor) ? 'black' : 'white';

        // Add animation
        colorDisplay.style.transform = 'scale(1.05)';
        setTimeout(() => {
            colorDisplay.style.transform = 'scale(1)';
        }, 200);
    });
}

// ======= TIP CALCULATOR TOOL =======
function initializeTipCalculator() {
    const tipSlider = document.getElementById('tipPercentage');
    const tipValue = document.getElementById('tipValue');
    const billAmountInput = document.getElementById('billAmount');
    const tipAmountOutput = document.getElementById('tipAmount');
    const totalAmountOutput = document.getElementById('totalAmount');
    const calculateTipBtn = document.getElementById('calculateTip');
    
    if (!tipSlider || !tipValue || !billAmountInput || !tipAmountOutput || 
        !totalAmountOutput || !calculateTipBtn) return;
    
    tipSlider.addEventListener('input', () => {
        tipValue.textContent = tipSlider.value + '%';
    });
    
    calculateTipBtn.addEventListener('click', () => {
        const billAmount = parseFloat(billAmountInput.value) || 0;
        const tipPercent = parseInt(tipSlider.value);
        const tipAmount = billAmount * (tipPercent / 100);
        const totalAmount = billAmount + tipAmount;
        
        tipAmountOutput.textContent = '$' + formatNumber(tipAmount);
        totalAmountOutput.textContent = '$' + formatNumber(totalAmount);

        // Add animation
        tipAmountOutput.style.fontWeight = 'bold';
        totalAmountOutput.style.fontWeight = 'bold';
        
        setTimeout(() => {
            tipAmountOutput.style.fontWeight = '';
            totalAmountOutput.style.fontWeight = '';
        }, 300);
    });
}

// ======= WORD COUNTER TOOL =======
function initializeWordCounter() {
    const wordCountText = document.getElementById('wordCountText');
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    const lineCount = document.getElementById('lineCount');
    
    if (!wordCountText || !charCount || !wordCount || !lineCount) return;

    wordCountText.addEventListener('input', function() {
        const text = this.value;
        const chars = text.length;
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        const lines = text === '' ? 0 : text.split('\n').length;
        
        // Update with animation
        updateCountWithAnimation(charCount, chars);
        updateCountWithAnimation(wordCount, words);
        updateCountWithAnimation(lineCount, lines);
    });

    function updateCountWithAnimation(element, value) {
        const currentValue = parseInt(element.textContent);
        if (currentValue !== value) {
            animateElement(element, value, 'var(--primary-color)');
        }
    }
}

// ======= DIGITAL CLOCK TOOL =======
function initializeDigitalClock() {
    const digitalClock = document.getElementById('digitalClock');
    const dateDisplay = document.getElementById('dateDisplay');
    
    if (!digitalClock || !dateDisplay) return;

    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', options);
        
        if (digitalClock.textContent !== timeString) {
            digitalClock.textContent = timeString;
            // Subtle pulse animation on seconds change
            digitalClock.style.transform = 'scale(1.02)';
            setTimeout(() => {
                digitalClock.style.transform = 'scale(1)';
            }, 200);
        }
        
        dateDisplay.textContent = dateString;
    }
    
    // Update clock immediately and then every second
    updateClock();
    setInterval(updateClock, 1000);
}

// ======= PASSWORD STRENGTH CHECKER TOOL =======
function initializePasswordChecker() {
    const passwordInput = document.getElementById('passwordInput');
    const passwordStrength = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('strengthText');
    
    if (!passwordInput || !passwordStrength || !strengthText) return;
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        let strengthClass = '';
        
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        
        if (strength === 0) {
            strengthClass = 'secondary';
            strengthText.innerHTML = 'Password strength: <span class="text-secondary">None</span>';
        } else if (strength <= 25) {
            strengthClass = 'danger';
            strengthText.innerHTML = 'Password strength: <span class="text-danger">Weak</span>';
        } else if (strength <= 50) {
            strengthClass = 'warning';
            strengthText.innerHTML = 'Password strength: <span class="text-warning">Fair</span>';
        } else if (strength <= 75) {
            strengthClass = 'info';
            strengthText.innerHTML = 'Password strength: <span class="text-info">Good</span>';
        } else {
            strengthClass = 'success';
            strengthText.innerHTML = 'Password strength: <span class="text-success">Strong</span>';
        }
        
        passwordStrength.style.width = strength + '%';
        passwordStrength.className = 'progress-bar bg-' + strengthClass;
        
        // Animate the progress bar
        passwordStrength.style.transition = 'width 0.3s ease-in-out';
    });
}

// ======= BMI CALCULATOR TOOL =======
function initializeBMICalculator() {
    const heightInput = document.getElementById('heightInput');
    const weightInput = document.getElementById('weightInput');
    const calculateBMIBtn = document.getElementById('calculateBMI');
    const bmiResult = document.getElementById('bmiResult');
    const bmiCategory = document.getElementById('bmiCategory');
    
    if (!heightInput || !weightInput || !calculateBMIBtn || 
        !bmiResult || !bmiCategory) return;

    calculateBMIBtn.addEventListener('click', () => {
        const height = parseFloat(heightInput.value) || 0;
        const weight = parseFloat(weightInput.value) || 0;
        
        if (height > 0 && weight > 0) {
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);
            
            // Use common animation function
            animateElement(bmiResult, formatNumber(bmi, 1), '#0d6efd', 300);
            
            let category = '';
            let colorClass = '';
            
            if (bmi < 18.5) {
                category = 'Underweight';
                colorClass = 'text-info';
            } else if (bmi < 25) {
                category = 'Normal weight';
                colorClass = 'text-success';
            } else if (bmi < 30) {
                category = 'Overweight';
                colorClass = 'text-warning';
            } else {
                category = 'Obese';
                colorClass = 'text-danger';
            }
            
            bmiCategory.innerHTML = 'Category: <span class="' + colorClass + '">' + category + '</span>';
        }
    });
} 