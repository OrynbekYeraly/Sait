// Управление тёмной темой
const toggleBtn = document.getElementById('darkModeToggle');
const bodyEl = document.body;

function setTheme(theme) {
    if (theme === 'dark') {
        bodyEl.classList.add('dark');
        toggleBtn.innerHTML = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        bodyEl.classList.remove('dark');
        toggleBtn.innerHTML = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    setTheme('dark');
} else if (savedTheme === 'light') {
    setTheme('light');
} else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) setTheme('dark');
    else setTheme('light');
}

toggleBtn.addEventListener('click', () => {
    if (bodyEl.classList.contains('dark')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});

// Чат логика
const messagesContainer = document.getElementById('messages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

function addMessage(text, sender = 'user') {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    if (sender === 'user') {
        msgDiv.classList.add('user-msg');
    } else {
        msgDiv.classList.add('bot-msg');
    }
    msgDiv.textContent = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotReply(userMessage) {
    const msg = userMessage.toLowerCase().trim();

    if (msg.includes('привет') || msg.includes('здравствуй') || msg === 'hi' || msg === 'hello') {
        return "Привет-привет! Рад видеть тебя в моём портфолио 👋 Расскажи, что тебя интересует: дизайн, опыт или технологии?";
    }
    if (msg.includes('опыт') || msg.includes('работа') || msg.includes('проекты')) {
        return "У меня более 6 лет коммерческого опыта. Работал в финтехе, продукт-студии, а также много фриланса. Могу показать кейсы с UI/UX и frontend-разработкой!";
    }
    if (msg.includes('дизайн') || msg.includes('ui') || msg.includes('ux')) {
        return "🎨 Я обожаю создавать чистые интерфейсы с микроанимациями и доступностью. Работаю в Figma, знаком с принципами Material и Human Interface. Хочешь обсудить процесс проектирования?";
    }
    if (msg.includes('фронтенд') || msg.includes('html') || msg.includes('css') || msg.includes('js') || msg.includes('код')) {
        return "⚡ Да, я пишу адаптивный, семантический код. Владею React, Tailwind, а также создаю плавные анимации. Этот сайт — живой пример моей frontend-работы!";
    }
    if (msg.includes('скиллы') || msg.includes('навыки') || msg.includes('умею')) {
        return "Мои ключевые скиллы: Figma, Adobe XD, прототипирование, HTML/CSS/JS, React, Git, адаптивная вёрстка, дизайн-системы и командная работа. А ещё обожаю решать пользовательские задачи ✨";
    }
    if (msg.includes('спасибо') || msg.includes('благодарю')) {
        return "Всегда пожалуйста! Рад помочь 😊 Обращайся, если будут ещё вопросы.";
    }
    if (msg.includes('как дела') || msg.includes('как жизнь')) {
        return "Отлично! Создаю красивый код и дизайн, а у тебя как? :)";
    }
    if (msg.includes('тёмная тема') || msg.includes('тема')) {
        return "Тёмная тема уже активна (или ты можешь переключить кнопкой справа внизу)! Я тоже люблю работать при приглушённом свете 🌙";
    }
    if (msg.includes('контакты') || msg.includes('связь') || msg.includes('email')) {
        return "Напиши мне на a.smirnov@designwave.ru или свяжись через LinkedIn — буду рад новым знакомствам!";
    }
    return "Интересный вопрос! Если хочешь узнать больше о моём подходе к дизайну, опыте или коде — просто уточни. Я здесь, чтобы помочь ✨";
}

function handleSendMessage() {
    const messageText = chatInput.value.trim();
    if (messageText === "") return;

    addMessage(messageText, 'user');
    chatInput.value = '';

    setTimeout(() => {
        const reply = getBotReply(messageText);
        addMessage(reply, 'bot');
    }, 400);
}

sendBtn.addEventListener('click', handleSendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSendMessage();
    }
});

chatInput.focus();
console.log("🚀 Сайт-портфолио загружен. Дизайн с любовью! | Тёмная тема работает отлично.");
