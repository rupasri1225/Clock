// Digital Clock functionality
function updateClock() {
    const now = new Date();
    
    // Format time
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Format date
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('en-US', options);
    
    document.getElementById('currentTime').textContent = timeString;
    document.getElementById('currentDate').textContent = dateString;
}

// Timer functionality
let timerInterval;
let totalSeconds = 0;
let remainingSeconds = 0;
let isRunning = false;

function showTab(tabName) {
    // Remove active class from all tabs and buttons
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    // Add active class to selected tab and button
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

function getTimerInput() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    return hours * 3600 + minutes * 60 + seconds;
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}

function updateTimerDisplay() {
    document.getElementById('timerDisplay').textContent = formatTime(remainingSeconds);
    
    // Update progress bar
    const progress = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;
    document.getElementById('progressFill').style.width = progress + '%';
}

function startTimer() {
    if (!isRunning) {
        if (remainingSeconds === 0) {
            totalSeconds = remainingSeconds = getTimerInput();
        }
        
        if (remainingSeconds > 0) {
            isRunning = true;
            document.getElementById('timerStatus').textContent = 'Timer Running';
            document.getElementById('timerDisplay').classList.remove('timer-finished');
            
            timerInterval = setInterval(() => {
                remainingSeconds--;
                updateTimerDisplay();
                
                if (remainingSeconds <= 0) {
                    clearInterval(timerInterval);
                    isRunning = false;
                    document.getElementById('timerStatus').textContent = 'Time\'s Up!';
                    document.getElementById('timerDisplay').classList.add('timer-finished');
                    
                    // Play notification sound (if available)
                    try {
                        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhCDuO1fPNeSsFJH');
                        audio.play().catch(() => {});
                    } catch (e) {}
                    
                    // Reset for next use
                    remainingSeconds = 0;
                }
            }, 1000);
        } else {
            document.getElementById('timerStatus').textContent = 'Please set a time';
        }
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        document.getElementById('timerStatus').textContent = 'Timer Paused';
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    remainingSeconds = 0;
    totalSeconds = 0;
    document.getElementById('timerStatus').textContent = 'Timer Ready';
    document.getElementById('timerDisplay').classList.remove('timer-finished');
    updateTimerDisplay();
}

// Initialize
updateClock();
setInterval(updateClock, 1000);
updateTimerDisplay();