document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const stylePanelToggle = document.getElementById('style-panel-toggle');
    const closeStylePanel = document.getElementById('close-style-panel');
    const stylePanel = document.getElementById('style-panel');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = 'Переключити на світлу тему';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = 'Переключити на темну тему';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggle.textContent = 'Переключити на темну тему';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = 'Переключити на світлу тему';
            localStorage.setItem('theme', 'dark');
        }
    });

    document.addEventListener('scroll', function() {
        var footer = document.querySelector('footer');
        if (window.scrollY > 100) { // Змініть значення 100 за бажанням
            footer.style.transform = 'translateY(100%)';
        } else {
            footer.style.transform = 'translateY(0)';
        }
    });

    // 3.1 Створити панель керування стилями сторінки
    stylePanelToggle.addEventListener('click', () => {
        stylePanel.classList.remove('hidden');
    });

    closeStylePanel.addEventListener('click', () => {
        stylePanel.classList.add('hidden');
    });

    const backgroundColorPicker = document.getElementById('background-color-picker');
    const textColorPicker = document.getElementById('text-color-picker');

    backgroundColorPicker.addEventListener('change', (event) => {
        document.documentElement.style.setProperty('--background-color', event.target.value);
    });

    textColorPicker.addEventListener('change', (event) => {
        document.documentElement.style.setProperty('--text-color', event.target.value);
    });

    // 3.2 Отримати й вивести на сторінку дані з API
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => response.json())
        .then(data => {
            const apiDataSection = document.getElementById('api-data');
            apiDataSection.innerHTML = `
                <h2>Дані з API</h2>
                <p><strong>ID:</strong> ${data.id}</p>
                <p><strong>Title:</strong> ${data.title}</p>
                <p><strong>Body:</strong> ${data.body}</p>
            `;
        })
        .catch(error => console.error('Error fetching data:', error));
});