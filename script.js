let count = 0;
/**
 * ЖИ-ге сұраныс жіберу функциясы
 */
async function sendMessage() {
    let input = document.getElementById("userInput");
    let msg = input.value;

    if (!msg) return;

    addMessage("Сен: " + msg);

    input.value = "";

    count++;
    document.getElementById("count").innerText = count;

    addMessage("ЖИ: жазып жатыр...");

    const API_KEY = "ӨЗ_API_KEY"; // ← қой!

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + API_KEY
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "user", content: msg }
            ]
        })
    });

    const data = await response.json();

    document.getElementById("messages").lastChild.remove();

    addMessage("ЖИ: " + data.choices[0].message.content);
}

/**
 * Хабарламаны экранға шығару
 */
function addMessage(text) {
    let div = document.createElement("p");
    div.innerText = text;
    document.getElementById("messages").appendChild(div);
}

/**
 * Қараңғы режим ауыстыру
 */
function toggleTheme() {
    document.body.classList.toggle("dark");
}
