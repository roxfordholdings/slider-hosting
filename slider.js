document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const thumb = document.getElementById("thumb");
    const priceDisplay = document.getElementById("price");

    const min = 50000; // Minimum slider value
    const max = 10000000; // Maximum slider value
    const sliderWidth = slider.offsetWidth;

    let value = 400000; // Default value

    // Function to update the slider position and value
    function updateSlider(position) {
        const percentage = Math.max(0, Math.min(position / sliderWidth, 1)); // Clamp percentage between 0 and 1
        value = Math.round(min + percentage * (max - min));
        const thumbPosition = percentage * sliderWidth;

        // Update the thumb position and displayed value
        thumb.style.left = `${thumbPosition}px`;
        priceDisplay.textContent = `$${value.toLocaleString()}`;
    }

    // Initialize the slider position based on the default value
    const initialPercentage = (value - min) / (max - min);
    updateSlider(initialPercentage * sliderWidth);

    // Handle dragging the thumb
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
