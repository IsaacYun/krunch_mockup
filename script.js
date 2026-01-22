document.addEventListener('DOMContentLoaded', () => {
    // Input Formatting
    const offerInput = document.getElementById('offerInput');

    offerInput.addEventListener('input', (e) => {
        // Remove non-digit characters
        let value = e.target.value.replace(/[^\d]/g, '');

        // Format with commas
        if (value) {
            value = parseInt(value).toLocaleString();
        }

        e.target.value = value;
    });

    // Countdown Timer logic
    // Countdown Timer logic: starts from 2d 22h 30m 27s
    const duration = (2 * 24 * 60 * 60 * 1000) + (22 * 60 * 60 * 1000) + (30 * 60 * 1000) + (27 * 1000);
    const targetDate = new Date().getTime() + duration;

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            // Expired
            document.getElementById('days').innerText = "00";
            document.getElementById('hours').innerText = "00";
            document.getElementById('mins').innerText = "00";
            document.getElementById('secs').innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('mins').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('secs').innerText = seconds.toString().padStart(2, '0');
    }

    setInterval(updateTimer, 1000);
    updateTimer(); // Initial call
});
