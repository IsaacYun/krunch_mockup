// Password Protection Logic
(function () {
    const SESSION_KEY = 'krunch_auth_session';
    const CORRECT_PASSWORD = '1111';

    if (!sessionStorage.getItem(SESSION_KEY)) {
        // Create Overlay
        const overlay = document.createElement('div');
        overlay.id = 'password-gate';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = '#000';
        overlay.style.color = '#fff';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '99999';

        // Create Input
        const input = document.createElement('input');
        input.type = 'password';
        input.placeholder = 'Enter Password';
        input.style.padding = '10px';
        input.style.fontSize = '16px';
        input.style.marginBottom = '10px';
        input.style.borderRadius = '5px';
        input.style.border = '1px solid #333';
        input.style.color = '#000'; // Ensure text is visible

        // Create Button
        const button = document.createElement('button');
        button.innerText = 'Enter';
        button.style.padding = '10px 20px';
        button.style.fontSize = '16px';
        button.style.cursor = 'pointer';
        button.style.backgroundColor = '#fff';
        button.style.color = '#000';
        button.style.border = 'none';
        button.style.borderRadius = '5px';

        // Error Message
        const errorMsg = document.createElement('p');
        errorMsg.style.color = 'red';
        errorMsg.style.marginTop = '10px';
        errorMsg.style.display = 'none';
        errorMsg.innerText = 'Incorrect Password';

        // Append elements
        overlay.appendChild(input);
        overlay.appendChild(button);
        overlay.appendChild(errorMsg);

        // Ensure body exists or wait for it
        if (document.body) {
            document.body.appendChild(overlay);
        } else {
            window.addEventListener('DOMContentLoaded', () => {
                document.body.appendChild(overlay);
            });
        }

        // Logic
        const checkPassword = () => {
            if (input.value === CORRECT_PASSWORD) {
                sessionStorage.setItem(SESSION_KEY, 'true');
                overlay.remove();
            } else {
                errorMsg.style.display = 'block';
                input.value = '';
            }
        };

        button.addEventListener('click', checkPassword);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkPassword();
        });
    }
})();

// DOMContentLoaded wrapper removed to ensure immediate execution
// document.addEventListener('DOMContentLoaded', () => {
// Input Formatting
// Main Logic - Waits for window load to ensure all elements are present
window.addEventListener('load', () => {
    // Input Formatting
    const offerInput = document.getElementById('offerInput');

    if (offerInput) {
        offerInput.addEventListener('input', (e) => {
            // Remove non-digit characters
            let value = e.target.value.replace(/[^\d]/g, '');

            // Format with commas
            if (value) {
                value = parseInt(value).toLocaleString();
            }

            e.target.value = value;
        });
    }

    // Countdown Timer logic
    // Countdown Timer logic: starts from 2d 22h 30m 27s
    const duration = (2 * 24 * 60 * 60 * 1000) + (22 * 60 * 60 * 1000) + (30 * 60 * 1000) + (27 * 1000);
    const targetDate = new Date().getTime() + duration;

    function updateTimer() {
        // Safe check for elements
        const daysEl = document.getElementById('days');
        if (!daysEl) return;

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

    // Mobile Menu Logic
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            // Animate hamburger to X (Optional simple toggle)
            const spans = hamburger.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
                spans[1].style.opacity = "0";
                spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
            } else {
                spans[0].style.transform = "none";
                spans[1].style.opacity = "1";
                spans[2].style.transform = "none";
            }
        });
    }

    // Offer Overlay Logic
    const setOfferBtn = document.getElementById('setOfferBtn');
    const offerOverlay = document.getElementById('offerOverlay');
    const closeOverlayBtn = document.querySelector('.close-overlay');
    const setOfferActionBtn = document.querySelector('.set-offer-action-btn');

    if (setOfferBtn && offerOverlay) {
        console.log('Set Offer Button and Overlay found');
        setOfferBtn.addEventListener('click', () => {
            console.log('Set Offer Button Clicked');
            offerOverlay.classList.add('active');
            offerOverlay.style.display = 'flex'; // Force flex display
            document.body.style.overflow = 'hidden';
            console.log('Overlay active class added');
        });
    } else {
        console.error('Set Offer Button or Overlay NOT found', { setOfferBtn, offerOverlay });
    }

    if (closeOverlayBtn && offerOverlay) {
        closeOverlayBtn.addEventListener('click', () => {
            offerOverlay.classList.remove('active');
            offerOverlay.style.display = ''; // Revert to stylesheet rule
            document.body.style.overflow = '';
        });
    }

    // Drag Gesture Logic for Bottom Sheet
    const dragArea = document.getElementById('dragArea');
    const overlay = document.getElementById('offerOverlay');
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    if (dragArea && overlay) {
        // Prevent default touch actions (scrolling) on the drag handle
        dragArea.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            isDragging = true;
            overlay.style.transition = 'none'; // Disable transition for direct follow
        }, { passive: false });

        dragArea.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Stop page scroll while dragging handle

            currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;

            // Only allow dragging DOWN (positive delta)
            if (deltaY > 0) {
                overlay.style.transform = `translateY(${deltaY}px)`;
            }
        }, { passive: false });

        dragArea.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;

            const deltaY = currentY - startY;
            const threshold = 150; // Drag distance to close

            // Restore transition for smooth snap
            overlay.style.transition = 'transform 0.3s ease-out';

            if (deltaY > threshold) {
                // Close Sheet
                overlay.classList.remove('active');
                setTimeout(() => {
                    overlay.style.display = '';
                    overlay.style.transform = ''; // Reset transform
                }, 300); // Wait for animation
                document.body.style.overflow = '';
            } else {
                // Snap Back to Open
                overlay.style.transform = 'translateY(0)';
            }
        });
    }

    if (setOfferActionBtn) {
        setOfferActionBtn.addEventListener('click', () => {
            alert('Offer Set!');
            overlay.classList.remove('active');
            overlay.style.display = '';
            document.body.style.overflow = '';
        });
    }
});
