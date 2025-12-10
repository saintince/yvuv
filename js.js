// Обновление даты и времени
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    document.getElementById('datetime').textContent = now.toLocaleDateString('ru-RU', options);
}

setInterval(updateDateTime, 1000);
updateDateTime();

// Обработка формы регистрации
document.addEventListener('DOMContentLoaded', function() {
    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        regForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            const resultPage = window.open('', '_blank');
            resultPage.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Данные регистрации</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 2rem; }
                        .data-item { margin-bottom: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 5px; }
                    </style>
                </head>
                <body>
                    <h1>Данные регистрации в системе CallTrack</h1>
                    <div class="data-item"><strong>ФИО:</strong> ${data.fullname}</div>
                    <div class="data-item"><strong>Должность:</strong> ${data.position}</div>
                    <div class="data-item"><strong>Компания:</strong> ${data.company}</div>
                    <div class="data-item"><strong>Email:</strong> ${data.email}</div>
                    <div class="data-item"><strong>Телефон:</strong> ${data.phone}</div>
                    <div class="data-item"><strong>Тариф:</strong> ${data.tariff}</div>
                    <div class="data-item"><strong>Интересы:</strong> ${data.interests}</div>
                    <div class="data-item"><strong>Комментарий:</strong> ${data.comment}</div>
                    <button onclick="window.print()">Распечатать</button>
                </body>
                </html>
            `);
        });
    }
});
// Обработка формы регистрации
document.addEventListener('DOMContentLoaded', function() {
    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        regForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сбор данных формы
            const formData = new FormData(this);
            const data = {
                fullname: formData.get('fullname'),
                position: formData.get('position'),
                company: formData.get('company'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                tariff: formData.get('tariff'),
                interests: formData.getAll('interests'),
                comment: formData.get('comment')
            };
            
            // Открытие страницы с результатами
            const resultPage = window.open('', '_blank');
            resultPage.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Данные регистрации - CallTrack</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            padding: 2rem; 
                            background: #f8f9fa;
                        }
                        .result-container {
                            max-width: 600px;
                            margin: 0 auto;
                            background: white;
                            padding: 2rem;
                            border-radius: 10px;
                            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                        }
                        .data-item { 
                            margin-bottom: 1rem; 
                            padding: 1rem; 
                            background: #f8f9fa; 
                            border-radius: 5px; 
                            border-left: 4px solid #667eea;
                        }
                        .success-message {
                            text-align: center;
                            color: #28a745;
                            font-size: 1.2rem;
                            margin-bottom: 2rem;
                        }
                    </style>
                </head>
                <body>
                    <div class="result-container">
                        <div class="success-message">✅ Регистрация успешно завершена!</div>
                        <h2>Данные регистрации в системе CallTrack</h2>
                        <div class="data-item"><strong>ФИО:</strong> ${data.fullname}</div>
                        <div class="data-item"><strong>Должность:</strong> ${data.position}</div>
                        <div class="data-item"><strong>Компания:</strong> ${data.company}</div>
                        <div class="data-item"><strong>Email:</strong> ${data.email}</div>
                        <div class="data-item"><strong>Телефон:</strong> ${data.phone}</div>
                        <div class="data-item"><strong>Тариф:</strong> ${data.tariff}</div>
                        <div class="data-item"><strong>Интересы:</strong> ${data.interests.join(', ') || 'Не указаны'}</div>
                        <div class="data-item"><strong>Комментарий:</strong> ${data.comment || 'Не указан'}</div>
                        <button onclick="window.print()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Распечатать</button>
                    </div>
                </body>
                </html>
            `);
        });
    }
});
// Слайдер-карусель для новостей
class Carousel {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentSlide = 0;
        
        this.init();
    }
    
    init() {
        // Обработчики для кнопок
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Обработчики для индикаторов
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Автопрокрутка
        this.startAutoPlay();
        
        // Пауза при наведении
        this.carousel = document.querySelector('.carousel-container');
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    showSlide(index) {
        // Скрываем все слайды
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Показываем текущий слайд
        this.slides[index].classList.add('active');
        this.indicators[index].classList.add('active');
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        let nextIndex = this.currentSlide + 1;
        if (nextIndex >= this.slides.length) {
            nextIndex = 0;
        }
        this.showSlide(nextIndex);
    }
    
    prevSlide() {
        let prevIndex = this.currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = this.slides.length - 1;
        }
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Смена слайда каждые 5 секунд
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Инициализация карусели при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.carousel-container')) {
        new Carousel();
    }
});
// Переключение вкладок функциональности
class FeaturesTabs {
    constructor() {
        this.tabButtons = document.querySelectorAll('.nav-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
        
        this.init();
    }
    
    init() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });
    }
    
    switchTab(tabId) {
        // Деактивируем все кнопки и контент
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabContents.forEach(content => content.classList.remove('active'));
        
        // Активируем выбранную кнопку и контент
        const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(tabId);
        
        if (activeButton && activeContent) {
            activeButton.classList.add('active');
            activeContent.classList.add('active');
        }
    }
}

// Инициализация вкладок при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.features-nav')) {
        new FeaturesTabs();
    }
});
// Управление базой данных
function toggleDatabase() {
    const dbHeader = document.querySelector('.database-header');
    const dbStats = document.getElementById('dbStats');
    const arrow = document.querySelector('.db-toggle-arrow');
    
    if (dbHeader.classList.contains('collapsed')) {
        // Разворачиваем
        dbHeader.classList.remove('collapsed');
        dbStats.style.maxHeight = dbStats.scrollHeight + 'px';
        arrow.style.transform = 'rotate(0deg)';
        arrow.textContent = '▼';
        
        // Сохраняем в localStorage, что база развернута
        localStorage.setItem('dbCollapsed', 'false');
    } else {
        // Сворачиваем
        dbHeader.classList.add('collapsed');
        dbStats.style.maxHeight = '0';
        arrow.style.transform = 'rotate(-90deg)';
        arrow.textContent = '▶';
        
        // Сохраняем в localStorage, что база свернута
        localStorage.setItem('dbCollapsed', 'true');
    }
}

// Инициализация состояния базы данных
function initDatabase() {
    const dbHeader = document.querySelector('.database-header');
    const dbStats = document.getElementById('dbStats');
    const arrow = document.querySelector('.db-toggle-arrow');
    
    if (!dbHeader || !dbStats || !arrow) return;
    
    // Проверяем сохраненное состояние
    const isCollapsed = localStorage.getItem('dbCollapsed') === 'true';
    
    if (isCollapsed) {
        dbHeader.classList.add('collapsed');
        dbStats.style.maxHeight = '0';
        arrow.style.transform = 'rotate(-90deg)';
        arrow.textContent = '▶';
    } else {
        dbHeader.classList.remove('collapsed');
        dbStats.style.maxHeight = dbStats.scrollHeight + 'px';
        arrow.style.transform = 'rotate(0deg)';
        arrow.textContent = '▼';
    }
    
    // Обновление данных статистики
    updateDatabaseStats();
    
    // Автоматическое обновление каждые 10 секунд
    setInterval(updateDatabaseStats, 10000);
}

// Обновление данных статистики
function updateDatabaseStats() {
    const elements = {
        callsToday: document.getElementById('callsToday'),
        activeClients: document.getElementById('activeClients'),
        avgDuration: document.getElementById('avgDuration'),
        conversionRate: document.getElementById('conversionRate'),
        todayRevenue: document.getElementById('todayRevenue'),
        onlineOperators: document.getElementById('onlineOperators')
    };
    
    // Если элементов нет - выходим
    if (!elements.callsToday) return;
    
    // Симуляция реальных данных
    const now = new Date();
    const hour = now.getHours();
    
    // Базовая статистика в зависимости от времени суток
    let baseCalls = 800;
    if (hour >= 9 && hour <= 18) {
        baseCalls = 1200 + Math.floor(Math.random() * 300);
    } else if (hour >= 19 && hour <= 22) {
        baseCalls = 600 + Math.floor(Math.random() * 200);
    } else {
        baseCalls = 200 + Math.floor(Math.random() * 100);
    }
    
    // Генерация реалистичных данных
    const data = {
        callsToday: baseCalls + Math.floor(Math.random() * 100),
        activeClients: 450 + Math.floor(Math.random() * 150),
        avgDuration: generateRandomTime(2, 7),
        conversionRate: (20 + Math.random() * 15).toFixed(1),
        todayRevenue: (baseCalls * 100 + Math.random() * 50000).toFixed(0),
        onlineOperators: `${8 + Math.floor(Math.random() * 8)}/15`
    };
    
    // Обновление элементов
    if (elements.callsToday) {
        elements.callsToday.textContent = data.callsToday.toLocaleString('ru-RU');
    }
    
    if (elements.activeClients) {
        elements.activeClients.textContent = data.activeClients.toLocaleString('ru-RU');
    }
    
    if (elements.avgDuration) {
        elements.avgDuration.textContent = data.avgDuration;
    }
    
    if (elements.conversionRate) {
        elements.conversionRate.textContent = data.conversionRate + '%';
    }
    
    if (elements.todayRevenue) {
        elements.todayRevenue.textContent = formatCurrency(data.todayRevenue);
    }
    
    if (elements.onlineOperators) {
        elements.onlineOperators.textContent = data.onlineOperators;
    }
}

// Генерация случайного времени в формате "мин:сек"
function generateRandomTime(minMinutes, maxMinutes) {
    const totalSeconds = Math.floor((minMinutes + Math.random() * (maxMinutes - minMinutes)) * 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Форматирование валюты
function formatCurrency(value) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(value);
}

// Добавьте initDatabase в инициализацию при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // ... существующий код ...
    
    // Инициализация базы данных
    initDatabase();
    
    // ... остальной код ...
});