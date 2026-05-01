// ===============================
// HELP FILE
// ===============================
async function openHelp() {
    try {
        const response = await fetch('../assets/help_files/help_column_trans.txt');
        const text = await response.text();
        alert(text);
    } catch (err) {
        console.error(err);
        alert('Error loading help file.');
    }
}

// ===============================
// MESSAGE FILE (teacher view)
// ===============================
async function openMessage() {
    try {
        const response = await fetch('../assets/message_files/column_trans_messages.txt');
        const text = await response.text();
        alert(text); // You can later hide this for teacher-only use
    } catch (err) {
        console.error(err);
        alert('Error loading message file.');
    }
}

// ===============================
// CHECK MY WORK
// ===============================
async function checkMyWork(studentOutput) {
    const msgNumber = prompt('Enter the message number you were given:');

    if (!msgNumber || isNaN(msgNumber)) {
        alert('Invalid message number.');
        return;
    }

    try {
        const response = await fetch('../assets/message_files/column_trans_messages.txt');
        const text = await response.text();

        const lines = text.split('\n').map(l => l.trim());
        const correct = lines[msgNumber - 1]; // zero-based index

        if (!correct) {
            alert('Message number not found in file.');
            return;
        }

        const student = studentOutput.trim();
        const answer = correct.trim();

        // Exact match
        if (student === answer) {
            alert('Perfect! Congratulations — your answer is correct.');
            return;
        }

        // Partial match
        let matches = 0;
        const len = Math.min(student.length, answer.length);

        for (let i = 0; i < len; i++) {
            if (student[i] === answer[i]) matches++;
        }

        if (matches > 0) {
            alert(`Partial match: ${matches} characters correct in the right positions.`);
        } else {
            alert('Sorry — no match.');
        }

        // We NEVER show the correct message to the student.

    } catch (err) {
        console.error(err);
        alert('Error reading the message file.');
    }
}

// ===============================
// SIGNATURE / CIPHER IMAGE
// ===============================
function openSignature() {
    window.open('../assets/images/column_trans_cipher.png', '_blank');
}
