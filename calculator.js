// Простой калькулятор
let display = document.getElementById('display');
let history = [];
let currentInput = '';

function appendToDisplay(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = '';
    }
    currentInput += value;
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '0';
    display.value = currentInput;
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0';
    }
    display.value = currentInput;
}

function calculate() {
    try {
        let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(expression);
        
        // Добавляем в историю
        history.unshift(`${currentInput} = ${result}`);
        if (history.length > 10) history.pop();
        
        updateHistory();
        
        currentInput = result.toString();
        display.value = currentInput;
    } catch (error) {
        display.value = 'Ошибка';
        currentInput = '0';
    }
}

function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

// Бизнес калькулятор
function calculateBusiness() {
    const calls = parseFloat(document.getElementById('callVolume').value) || 0;
    const conversion = parseFloat(document.getElementById('conversion').value) || 0;
    const avgOrder = parseFloat(document.getElementById('avgOrder').value) || 0;
    const costPerCall = parseFloat(document.getElementById('costPerCall').value) || 0;
    
    const totalCalls = calls;
    const successfulCalls = calls * (conversion / 100);
    const totalRevenue = successfulCalls * avgOrder;
    const totalCost = calls * costPerCall;
    const totalProfit = totalRevenue - totalCost;
    const roi = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;
    const efficiency = conversion > 0 ? totalProfit / (calls * conversion / 100) : 0;
    
    document.getElementById('totalRevenue').textContent = formatCurrency(totalRevenue);
    document.getElementById('totalProfit').textContent = formatCurrency(totalProfit);
    document.getElementById('roiValue').textContent = roi.toFixed(1) + '%';
    document.getElementById('efficiency').textContent = formatCurrency(efficiency);
}

// ROI калькулятор
function updateRoiCalculator() {
    const employees = parseInt(document.getElementById('employeeCount').value);
    const salary = parseInt(document.getElementById('salary').value);
    const efficiency = parseInt(document.getElementById('efficiencyGain').value);
    const systemCost = parseInt(document.getElementById('systemCost').value);
    
    // Обновляем значения рядом с ползунками
    document.getElementById('employeeValue').textContent = employees;
    document.getElementById('salaryValue').textContent = formatCurrency(salary);
    document.getElementById('efficiencyValue').textContent = efficiency + '%';
    document.getElementById('systemValue').textContent = formatCurrency(systemCost);
    
    // Рассчитываем
    const monthlySalaryCost = employees * salary;
    const efficiencySavings = monthlySalaryCost * (efficiency / 100);
    const netSavings = efficiencySavings - systemCost;
    const paybackPeriod = systemCost > 0 ? (systemCost / netSavings) * 12 : 0;
    const yearlySavings = netSavings * 12;
    
    document.getElementById('salarySavings').textContent = formatCurrency(efficiencySavings);
    document.getElementById('netSavings').textContent = formatCurrency(netSavings);
    document.getElementById('paybackPeriod').textContent = paybackPeriod.toFixed(1) + ' месяцев';
    document.getElementById('yearlySavings').textContent = formatCurrency(yearlySavings);
    
    updateRoiChart(employees, salary, efficiency, systemCost);
}

function updateRoiChart(employees, salary, efficiency, systemCost) {
    const ctx = document.getElementById('roiChart').getContext('2d');
    
    // Если график уже существует, удаляем его
    if (window.roiChart) {
        window.roiChart.destroy();
    }
    
    const monthlyCost = employees * salary;
    const savings = monthlyCost * (efficiency / 100);
    const net = savings - systemCost;
    
    window.roiChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Затраты на зарплаты', 'Экономия от системы', 'Стоимость системы', 'Чистая экономия'],
            datasets: [{
                label: 'Сумма (руб)',
                data: [monthlyCost, savings, systemCost, net],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrencyShort(value);
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return formatCurrency(context.raw);
                        }
                    }
                }
            }
        }
    });
}

// Вспомогательные функции
function formatCurrency(value) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(value);
}

function formatCurrencyShort(value) {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
    }
    if (value >= 1000) {
        return (value / 1000).toFixed(0) + 'K';
    }
    return value.toString();
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация ползунков ROI
    const sliders = ['employeeCount', 'salary', 'efficiencyGain', 'systemCost'];
    sliders.forEach(id => {
        const slider = document.getElementById(id);
        if (slider) {
            slider.addEventListener('input', updateRoiCalculator);
        }
    });
    
    // Запуск первого расчета
    if (document.getElementById('employeeCount')) {
        updateRoiCalculator();
        calculateBusiness();
    }
    
    // Обновление данных базы каждые 5 секунд
    setInterval(updateDatabaseStats, 5000);
});

// Обновление данных базы
function updateDatabaseStats() {
    // Симуляция случайных изменений
    const callsToday = document.getElementById('callsToday');
    const activeClients = document.getElementById('activeClients');
    const avgDuration = document.getElementById('avgDuration');
    const conversionRate = document.getElementById('conversionRate');
    
    if (callsToday) {
        let calls = parseInt(callsToday.textContent.replace(/,/g, ''));
        calls += Math.floor(Math.random() * 10) - 2;
        if (calls < 1000) calls = 1000;
        callsToday.textContent = calls.toLocaleString('ru-RU');
    }
    
    if (activeClients) {
        let clients = parseInt(activeClients.textContent);
        clients += Math.floor(Math.random() * 3) - 1;
        if (clients < 500) clients = 500;
        activeClients.textContent = clients;
    }
    
    if (conversionRate) {
        let rate = parseFloat(conversionRate.textContent);
        rate += (Math.random() - 0.5) * 0.5;
        if (rate < 20) rate = 20;
        if (rate > 30) rate = 30;
        conversionRate.textContent = rate.toFixed(1) + '%';
    }
}