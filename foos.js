```javascript
const startButton = document.getElementById("startButton");
const statusText = document.getElementById("statusText");

const betaValue = document.getElementById("betaValue");
const gammaValue = document.getElementById("gammaValue");

const ball = document.getElementById("ball");
const gameArea = document.getElementById("gameArea");

let sensorActive = false;


// Start sensor
startButton.addEventListener("click", async () => {

    // iPhone / iPad require permission
    if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
    ) {

        try {

            const permission =
                await DeviceOrientationEvent.requestPermission();

            if (permission !== "granted") {

                alert("Motion sensor permission was denied.");

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
            "deviceorientation",
            handleOrientation
        );

        sensorActive = true;

        startButton.textContent = "Stop Sensor";
        statusText.textContent = "Active";

    } else {

        window.removeEventListener(
            "deviceorientation",
            handleOrientation
        );

        sensorActive = false;

        startButton.textContent = "Start Sensor";
        statusText.textContent = "Inactive";
    }
});


// Called whenever the phone orientation changes
function handleOrientation(event) {

    const beta = event.beta;
    const gamma = event.gamma;

    if (beta === null || gamma === null) {
        return;
    }


    // Display sensor values

    betaValue.textContent =
        beta.toFixed(1) + "°";

    gammaValue.textContent =
        gamma.toFixed(1) + "°";


    /*
        Gamma controls horizontal movement.

        -90° = completely left
         0°  = horizontal
        +90° = completely right
    */

    let x = 50 + (gamma / 90) * 45;


    /*
        Beta controls vertical movement.

        -180° to +180°
    */

    let y = 50 + (beta / 180) * 45;


    // Keep the ball inside the screen

    x = Math.max(5, Math.min(95, x));
    y = Math.max(5, Math.min(95, y));


    // Move the ball

    ball.style.left = x + "%";
    ball.style.top = y + "%";
}
```


