const video = document.getElementById('user-video');
const offvideo = document.getElementById('toggle-user-video');
const muteButton = document.getElementById('toggle-mute');
const transcribedTextDiv = document.getElementById('transcribed-text');

let videoOn = true; // Track the video state

function end() {
    window.location.href = "http://127.0.0.1:5000/templates/feedback.html";
}

function restart() {
    alert("You are redirecting to home page, restart the interview again");
    window.location.href = "http://127.0.0.1:5000/home";
}

let timeLeft = 3 * 60; // 3 minutes
const timerElement = document.getElementById('timer');

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (timeLeft > 0) {
        timeLeft--;
    } else {
        clearInterval(timerInterval);
        alert('Interview completed.');
        document.getElementById('feedback-form').style.display = 'block';
        window.location.href = "fedback.html";
    }
};

const timerInterval = setInterval(updateTimer, 1000);

function toggleVideo() {
    if (videoOn) {
        video.style.display = 'none'; // Hide the video
        offvideo.innerText = 'Turn On Video'; // Change button text
        videoOn = false; // Update the state
    } else {
        video.style.display = 'block'; // Show the video
        offvideo.innerText = 'Turn Off Video'; // Change button text
        videoOn = true; // Update the state
    }
}

// Add event listener for the mute button (optional functionality)
muteButton.addEventListener('click', () => {
    alert("Mute functionality to be implemented.");
});
async function fetchQuestion() {
    try {
        const response = await fetch('/get_question');
        const data = await response.json();
        document.getElementById('question-display').innerText = data.question;
    } catch (error) {
        console.error("Error fetching question:", error);
    }
}

// Fetch the question when the page loads
window.onload = fetchQuestion;