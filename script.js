const mainTime = document.getElementById('time');
const mainDate = document.querySelector('p');

let is24HourFormat = false;
let showMilliseconds = true;

let theme = localStorage.getItem('theme') || 'light';

function updateTimeAndDate() {
    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds() + 1).padStart(3, '0');

    let period = '';

    if (!is24HourFormat) {
        period = hours < 12 ? ' AM' : ' PM';
        hours = hours % 12 || 12;
    } else {
        period = '';
    }

    const formattedHours = String(hours).padStart(2, '0');

    const msPart = showMilliseconds ? `.<span class="ms">${milliseconds}</span>` : '';

    mainTime.innerHTML = `${formattedHours}:${minutes}:${seconds}${msPart}${period}`;

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    mainDate.textContent = now.toLocaleDateString(undefined, options);
}

/* Faster update rate so milliseconds visibly move */
setInterval(updateTimeAndDate, 16);
updateTimeAndDate();

document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 't') {
        is24HourFormat = !is24HourFormat;
        updateTimeAndDate();
    }
});

const toggleMsButton = document.getElementById('toggle-ms');
toggleMsButton.addEventListener('click', () => {
    showMilliseconds = !showMilliseconds;
    updateTimeAndDate();
});

const toggleFormatButton = document.getElementById('toggleFormat');
toggleFormatButton.addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
    updateTimeAndDate();
});

const toggleThemeButton = document.getElementById('toggle-theme');
toggleThemeButton.addEventListener('click', () => {
    if (theme === 'dark') {
        theme = 'light';
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    } else {
        theme = 'dark';
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    }
    localStorage.setItem('theme', theme);
});

if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
} else {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
}