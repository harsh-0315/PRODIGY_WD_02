let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let interval = null;
let isRunning = false;
let count = 0;
const time = document.getElementById("time");
const btnContainer = document.querySelector(".btnContainer");
const lapRecords = document.querySelector(".lapRecord");

function pad(value) {
    return String(value).padStart(2, "0");
}

function setTime() {
    time.innerHTML = `${pad(minutes)}:${pad(seconds)}:${pad(Math.floor(milliseconds / 10))}`;
}

function timer() {
    milliseconds += 10;

    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;

        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
    }
    setTime();
}

function startClock() {
    if (!interval) {
        interval = setInterval(timer, 10);

    }
}

function stopClock() {
    clearInterval(interval);
    interval = null;
}

function resetClock() {
    stopClock();
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    setTime();
    resetLaps();
}

function addLap() {
    if (!isRunning && interval) {
        count++;
        const lapDiv = document.createElement("div");
        lapDiv.classList.add("lap-div");
        lapDiv.innerHTML = `<h3>Lap ${count}</h3> <p>${pad(minutes)}:${pad(seconds)}:${pad(Math.floor(milliseconds / 10))}</p>`;
        lapRecords.append(lapDiv);
    }
}

function resetLaps() {
    count = 0;
    lapRecords.innerHTML = "";
}

btnContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("start")) {
        startClock();
    }
    if (e.target.classList.contains("stop")) {
        stopClock();
    }
    if (e.target.classList.contains("reset")) {
        resetClock();
    }
    if (e.target.classList.contains("lap")) {
        addLap();
    }
});


