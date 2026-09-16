```javascript
const startButton = document.getElementById("startButton");

const statusText = document.getElementById("statusText");

const xValue = document.getElementById("xValue");
const yValue = document.getElementById("yValue");
const zValue = document.getElementById("zValue");

const ball = document.getElementById("ball");
const gameArea = document.getElementById("gameArea");

let sensorActive = false;


// Initial position of the ball
let ballX = 50;
let ballY = 50;


// Start / stop the sensor
startButton.addEventListener("click", async () => {

    // Some browsers, especially iOS Safari,
    // require permission to use motion sensors.
    if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof DeviceMotionEvent.requestPermission === "function"
    ) {

        try {

            const permission =
                await DeviceMotionEvent.requestPermission();

            if (permission !== "granted") {

                alert("Permission to access the motion sensor was denied.");

                return;
            }

        } catch (error) {

            console.error(error);

            alert("Could not access the motion sensor.");

            return;
        }
    }


    if (!sensorActive) {

        window.addEventListener(
            "devicemotion",
            handleMotion
        );

        sensorActive = true;

        startButton.textContent = "Stop Sensor";

        statusText.textContent = "Active";

    } else {

        window.removeEventListener(
            "devicemotion",
            handleMotion
        );

        sensorActive = false;

        startButton.textContent = "Start Sensor";

        statusText.textContent = "Inactive";
    }
});


// This function is called every time
// the phone detects movement.
function handleMotion(event) {

    const acceleration =
        event.accelerationIncludingGravity;


    if (!acceleration) {
        return;
    }


    const x = acceleration.x || 0;
    const y = acceleration.y || 0;
    const z = acceleration.z || 0;


    // Display sensor values
    xValue.textContent = x.toFixed(2);
    yValue.textContent = y.toFixed(2);
    zValue.textContent = z.toFixed(2);


    /*
        Convert the phone's movement into
        movement of the ball.

        X controls horizontal movement.
        Y controls vertical movement.
    */

    ballX += x * 0.8;
    ballY -= y * 0.8;


    // Keep the ball inside the game area

    if (ballX < 5) {
        ballX = 5;
    }

    if (ballX > 95) {
        ballX = 95;
    }

    if (ballY < 7) {
        ballY = 7;
    }

    if (ballY > 93) {
        ballY = 93;
    }


    // Move the ball on the screen

    ball.style.left = ballX + "%";
    ball.style.top = ballY + "%";
}
```

