document.addEventListener("DOMContentLoaded", () => {
    const dots = document.getElementById("dots");
    let dotCount = 1;

    // Animate "..." dots (. → .. → ... → reset)
    setInterval(() => {
        dots.textContent = ".".repeat(dotCount);
        dotCount = (dotCount % 3) + 1; // Loops between 1, 2, 3
    }, 500);

    // Redirect to "yes.html" after 3 seconds
    setTimeout(() => {
        window.location.href = "yes.html";
    }, 3500);
});