document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const thumb = document.getElementById("thumb");
    const priceDisplay = document.getElementById("price");

    const min = 50000;  // Minimum value
    const max = 10000000;  // Maximum value
    const sliderWidth = slider.offsetWidth;

    let value = 400000; // Default value

    // Update the position of the thumb and display value
    function updateSlider(position) {
        const percentage = Math.max(0, Math.min(position / sliderWidth, 1)); // Clamp between 0 and 1
        value = Math.round(min + percentage * (max - min));
        const thumbPosition = percentage * sliderWidth;

        thumb.style.left = `${thumbPosition}px`;
        priceDisplay.textContent = `$${value.toLocaleString()}`;
    }

    // Initialize the slider position
    const initialPercentage = (value - min) / (max - min);
    updateSlider(initialPercentage * sliderWidth);

    // Mouse event handlers
    thumb.addEventListener("mousedown", (event) => {
        const startX = event.clientX;
        const startLeft = thumb.offsetLeft;

        function onMouseMove(e) {
            const dx = e.clientX - startX;
            const newLeft = startLeft + dx;

            updateSlider(newLeft);
        }

        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
});
