const idleThreshold = 5 * 1000; // 5 sekund pro snadnější testování
let idleTimer = null;

function startIdleDetection() {
    document.addEventListener('mousemove', resetIdleTimer);
    document.addEventListener('keydown', resetIdleTimer);
    console.log('Idle detection started.');
    resetIdleTimer();
}

function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(handleIdleTimeout, idleThreshold);
    console.log('Idle timer reset.');
}

function handleIdleTimeout() {
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const logMessage = `Čas neaktivity: ${idleThreshold / 1000} sekund, ${formattedTime}`;

    console.log('Idle timeout reached, sending update:', logMessage);
    window.electronAPI.sendUpdateActivityLog(logMessage);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('renderer.js načten.');
    startIdleDetection();

    window.electronAPI.onUpdateActivityLog((message) => {
        console.log('Received activity log update:', message);
        const logDiv = document.createElement('div');
        logDiv.textContent = message;
        document.getElementById('activity-log').appendChild(logDiv);
    });
});
