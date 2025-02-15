const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");

let yesSize = 1;
let runawayMode = false;
let escapeSpeed = 1.2; // Initial escape speed

// If "Yes" is clicked, go to the next page
yesButton.addEventListener("click", () => {
    window.location.href = "transition.html"; // Redirect to "Yes" page
});

// If "No" is clicked, make "Yes" grow while keeping it centered
noButton.addEventListener("click", () => {
    if (!runawayMode) {
        yesSize *= 2;
        yesButton.style.transform = `scale(${yesSize})`;

        // Keep the "Yes" button centered dynamically
        yesButton.style.position = "absolute";
        yesButton.style.left = `50%`;
        yesButton.style.top = `50%`;
        yesButton.style.transform = `translate(-50%, -50%) scale(${yesSize})`;

        if (yesSize >= 4) {
            runawayMode = true;
            alert("Oops! The 'No' button is escaping! 😆");

            // Add shaking effect to the "No" button
            noButton.classList.add("runaway");

            // Start blinking effect
            startBlinking(noButton);
        }
    }
});

// Make the "No" button blink every 0.2s
function startBlinking(button) {
    button.blinking = setInterval(() => {
        button.style.visibility = (button.style.visibility === "hidden") ? "visible" : "hidden";
    }, 200);
}

// Make "No" button teleport when cursor gets close
document.addEventListener("mousemove", (event) => {
    if (runawayMode) {
        const x = event.clientX;
        const y = event.clientY;
        const noButtonRect = noButton.getBoundingClientRect();
        const yesButtonRect = yesButton.getBoundingClientRect();

        // Calculate distance between cursor and "No" button
        const distance = Math.sqrt(
            Math.pow(noButtonRect.x - x, 2) + Math.pow(noButtonRect.y - y, 2)
        );

        // If cursor gets too close, teleport the "No" button away
        if (distance < 120) { 
            let newX = Math.random() * (window.innerWidth - 100);
            let newY = Math.random() * (window.innerHeight - 50);

            // Ensure "No" button doesn't appear inside the growing "Yes" button
            while (
                newX > yesButtonRect.left - 100 &&
                newX < yesButtonRect.right + 100 &&
                newY > yesButtonRect.top - 100 &&
                newY < yesButtonRect.bottom + 100
            ) {
                newX = Math.random() * (window.innerWidth - 100);
                newY = Math.random() * (window.innerHeight - 50);
            }

            // Apply escape speed factor to make it move faster each time
            newX += (newX - noButtonRect.x) * escapeSpeed;
            newY += (newY - noButtonRect.y) * escapeSpeed;

            noButton.style.position = "fixed"; // Ensure it moves freely
            noButton.style.left = `${Math.max(0, Math.min(newX, window.innerWidth - 100))}px`;
            noButton.style.top = `${Math.max(0, Math.min(newY, window.innerHeight - 50))}px`;

            // Gradually increase escape speed (up to a limit)
            escapeSpeed = Math.min(escapeSpeed + 0.2, 3);
        }
    }
});

// Prevent "No" button from going completely off-screen
document.addEventListener("mousemove", (event) => {
    if (runawayMode) {
        const x = event.clientX;
        const y = event.clientY;
        const noButtonRect = noButton.getBoundingClientRect();

        let newX = Math.random() * (window.innerWidth - 100);
        let newY = Math.random() * (window.innerHeight - 50);

        // Keep the button within safe zones
        newX = Math.max(20, Math.min(newX, window.innerWidth - 120));
        newY = Math.max(20, Math.min(newY, window.innerHeight - 80));

        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
    }
});