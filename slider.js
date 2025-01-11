document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const thumb = document.getElementById("thumb");
    const priceDisplay = document.getElementById("price");

    const min = 50000; // Minimum slider value
    const max = 10000000; // Maximum slider value
    const step = 5000; // Increment/decrement step
    const sliderWidth = slider.offsetWidth;

    let value = 400000; // Default value

    // Function to update the slider position and value
    function updateSlider(position) {
        const percentage = Math.max(0, Math.min(position / sliderWidth, 1)); // Clamp percentage between 0 and 1
        value = Math.round((min + percentage * (max - min)) / step) * step; // Round to nearest step
        const thumbPosition = percentage * sliderWidth;

        // Update the thumb position and displayed value
        thumb.style.left = `${thumbPosition}px`;
        priceDisplay.textContent = `$${value.toLocaleString()}`;
    }

    // Initialize the slider position based on the default value
    function initializeSlider() {
        const initialPercentage = (value - min) / (max - min);
        const initialPosition = initialPercentage * sliderWidth;
        updateSlider(initialPosition); // Ensure alignment
    }

    initializeSlider(); // Set initial thumb position and value

    // Handle dragging
    thumb.addEventListener("mousedown", (event) => {
        event.preventDefault(); // Prevent text selection

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
