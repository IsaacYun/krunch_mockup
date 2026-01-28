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
    // Input Formatting & Validation
    const offerInput = document.getElementById('offerInput');
    const offerError = document.getElementById('offerError');
    const submitBtn = document.getElementById('submitOfferBtn');
    const CURRENT_BID = 923000; // Fixed Current Bid as per request

    if (offerInput) {
        offerInput.addEventListener('input', (e) => {
            // Remove non-digit characters
            let rawValue = e.target.value.replace(/[^\d]/g, '');

            // Format with commas
            if (rawValue) {
                let numValue = parseInt(rawValue);
                e.target.value = numValue.toLocaleString();

                // Validation Logic
                if (numValue <= CURRENT_BID) {
                    offerError.style.display = 'block';
                    offerError.innerText = '더 높은 가격을 입력해주세요.'; // "Please enter a higher price"
                } else {
                    offerError.style.display = 'none';
                }
            } else {
                e.target.value = '';
                offerError.style.display = 'none';
            }
        });
    }

    // Countdown Timer logic (Mock: Auction Ends in 4 days)
    // 2025-Sep-31 does not exist, using Oct 1 for demo or just delta
    const duration = (4 * 24 * 60 * 60 * 1000) + (12 * 60 * 60 * 1000);
    const targetDate = new Date().getTime() + duration;

    function updateTimer() {
        const daysEl = document.getElementById('days');
        if (!daysEl) return; // Exit if elements don't exist

        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            if (daysEl) daysEl.innerText = "00";
            if (document.getElementById('hours')) document.getElementById('hours').innerText = "00";
            if (document.getElementById('mins')) document.getElementById('mins').innerText = "00";
            if (document.getElementById('secs')) document.getElementById('secs').innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
        if (document.getElementById('hours')) document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        if (document.getElementById('mins')) document.getElementById('mins').innerText = minutes.toString().padStart(2, '0');
        if (document.getElementById('secs')) document.getElementById('secs').innerText = seconds.toString().padStart(2, '0');
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    // Offer Overlay Logic
    const setOfferBtn = document.getElementById('setOfferBtn');
    const offerOverlay = document.getElementById('offerOverlay');
    // Note: closeOverlayBtn removed from HTML, so closing relies on Drag or Logic
    // We can add a function to close if needed, but user didn't specify close button behavior besides drag

    if (setOfferBtn && offerOverlay) {
        setOfferBtn.addEventListener('click', () => {
            offerOverlay.classList.add('active');
            offerOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Reset input to a valid starting value or keep previous?
            // User screenshot showed 888,888,888. Let's set to something valid or leave as is.
            // HTML value=1,000,000 which is > 923,000.
        });
    }

    // Drag Gesture Logic
    const dragArea = document.getElementById('dragArea');
    if (dragArea && offerOverlay) {
        let startY = 0;
        let currentY = 0;
        let isDragging = false;

        dragArea.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            isDragging = true;
            offerOverlay.style.transition = 'none';
        }, { passive: false });

        dragArea.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;
            if (deltaY > 0) {
                // Moving the whole overlay content?
                // Visual trick: translateY on the overlay content wrapper if we want to slide it down
                // Currently overlay is fixed full screen.
                // We should probably translate the .overlay-content inside it?
                // For simplicity, translating the whole overlay container might reveal background if it has one.
                // Since background is transparent (per CSS edit), this should work visually.
                offerOverlay.style.transform = `translateY(${deltaY}px)`;
            }
        }, { passive: false });

        dragArea.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            const deltaY = currentY - startY;
            offerOverlay.style.transition = 'transform 0.3s ease-out';
            if (deltaY > 150) {
                offerOverlay.classList.remove('active');
                setTimeout(() => {
                    offerOverlay.style.display = '';
                    offerOverlay.style.transform = '';
                }, 300);
                document.body.style.overflow = '';
            } else {
                offerOverlay.style.transform = 'translateY(0)';
            }
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const rawValue = offerInput.value.replace(/[^\d]/g, '');
            if (parseInt(rawValue) > CURRENT_BID) {
                // Success - Redirect to complete2.html
                window.location.href = 'complete2.html';
            } else {
                // Trigger error visual
                offerError.style.display = 'block';
                // Shake animation optional
            }
        });
    }
});
