const API_KEY = "ӨЗ_API_KEY_ҚОЙ"; // ← МІНДЕТТІ түрде өз key-іңді қой!

async function sendMessage() {
    let input = document.getElementById("userInput");
    let message = input.value;

    if (!message.trim()) return;

    addMessage(message, "user");
    input.value = "";

    addMessage("Жазып жатыр...", "bot");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + API_KEY
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Сен қазақ тілінде жауап беретін көмекші ассистентсің." },
                { role: "user", content: message }
            ]
        })
    });

    const data = await response.json();

    document.querySelector(".bot:last-child").remove();

    let reply = data.choices[0].message.content;
    addMessage(reply, "bot");
}

function addMessage(text, sender) {
    let messages = document.getElementById("messages");

    let msg = document.createElement("div");
    msg.className = "message " + sender;
    msg.innerText = text;

    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}
