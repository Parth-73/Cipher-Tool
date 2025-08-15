function updateLabels() {
    const mode = document.getElementById("mode").value;
    const keysLabel = document.getElementById("keysLabel");
    const outputLabel = document.getElementById("outputLabel");
    const generateBtn = document.getElementById("generateBtn");

    if (mode === "decrypt") {
        keysLabel.textContent = "Enter Keys to Decrypt:";
        outputLabel.textContent = "Decrypted Text:";
        generateBtn.style.display = "none"; // hide random keys button
    } else {
        keysLabel.textContent = "Keys:";
        outputLabel.textContent = "Encrypted Text:";
        generateBtn.style.display = "block"; // show random keys button
    }
}

function generateKeys() {
    document.getElementById('key1').value = Math.floor(Math.random() * 25) + 1;
    document.getElementById('key2').value = Math.floor(Math.random() * 25) + 1;
}

function caesarShift(text, k1, k2, mode) {
    const Ua = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const La = "abcdefghijklmnopqrstuvwxyz";
    let result = "";

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let key = (i % 2 === 0) ? k1 : k2;
        if (mode === "decrypt") key = 26 - key;

        if (Ua.includes(char)) {
            let idx = Ua.indexOf(char);
            result += Ua[(idx + key) % 26];
        } else if (La.includes(char)) {
            let idx = La.indexOf(char);
            result += La[(idx + key) % 26];
        } else {
            result += char;
        }
    }
    return result;
}

function processCipher() {
    const text = document.getElementById('inputText').value;
    const k1 = parseInt(document.getElementById('key1').value) || 0;
    const k2 = parseInt(document.getElementById('key2').value) || 0;
    const mode = document.getElementById('mode').value;

    if (!text.trim()) {
        alert("Please enter some text.");
        return;
    }
    if (k1 < 1 || k1 > 25 || k2 < 1 || k2 > 25) {
        alert("Keys must be between 1 and 25.");
        return;
    }

    const output = caesarShift(text, k1, k2, mode);
    document.getElementById('output').textContent = output;
}
