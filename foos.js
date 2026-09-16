```javascript
const startButton = document.getElementById("startButton");

const statusText = document.getElementById("statusText");

const xValue = document.getElementById("xValue");
const yValue = document.getElementById("yValue");
const zValue = document.getElementById("zValue");

const movementValue = document.getElementById("movementValue");
const movementStatus = document.getElementById("movementStatus");

let sensorActive = false;


// Start / stop the sensor
startButton.addEventListener("click", async () => {

    // Some browsers require permission before using motion sensors
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

        xValue.textContent = "0.00";
        yValue.textContent = "0.00";
        zValue.textContent = "0.00";

        movementValue.textContent = "0.00";
        movementStatus.textContent = "Phone is still";
    }
});


// Function executed whenever the phone moves
function handleMotion(event) {

    const acceleration = event.accelerationIncludingGravity;

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


    // Calculate total acceleration
    const magnitude = Math.sqrt(
        x * x +
        y * y +
        z * z
    );


    movementValue.textContent =
        magnitude.toFixed(2);


    // Determine movement level
    if (magnitude < 10.5) {

        movementStatus.textContent =
            "Phone is still";

    } else if (magnitude < 13) {

        movementStatus.textContent =
            "Phone is moving";

    } else {

        movementStatus.textContent =
            "Phone is shaking!";
    }
}
```
