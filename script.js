document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. TAB SWITCHING LOGIC ---
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    tabLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            tabLinks.forEach(l => l.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));
            
            link.classList.add("active");
            const targetId = link.getAttribute("data-target");
            document.getElementById(targetId).classList.add("active");
            
            if (targetId === "home") {
                document.body.classList.remove("inner-page-bg");
            } else {
                document.body.classList.add("inner-page-bg");
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // --- 2. RSVP LOGIC (Show/Hide extra questions) ---
    const attendingSelect = document.getElementById("attending-select");
    const extraQuestions = document.getElementById("extra-questions");

    if (attendingSelect && extraQuestions) {
        attendingSelect.addEventListener("change", (e) => {
            if (e.target.value === "Yes") {
                extraQuestions.style.display = "block";
            } else {
                extraQuestions.style.display = "none";
            }
        });
    }

    // --- 3. ADVANCED FORM SUBMISSION & SPAM PREVENTION ---
    const rsvpForm = document.getElementById("rsvp-form");
    const submitBtn = document.getElementById("submit-btn");
    const rsvpSuccess = document.getElementById("rsvp-success");

    if (rsvpForm) {
        // PREVENT ACCIDENTAL ENTER KEY SUBMISSIONS (except in text boxes where they need multiple lines)
        rsvpForm.addEventListener("keydown", function(e) {
            if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
                e.preventDefault();
            }
        });

        // HANDLE SUBMISSION NATIVELY
        rsvpForm.addEventListener("submit", async function(e) {
            e.preventDefault(); // Stops the page from leaving your site

            // Disable button to prevent spam/double-clicks
            submitBtn.disabled = true;
            submitBtn.innerText = "Sending...";
            submitBtn.style.opacity = "0.7";

            const formData = new FormData(rsvpForm);

            try {
                const response = await fetch(rsvpForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Success! Hide form, show thank you message
                    rsvpForm.style.display = "none";
                    rsvpSuccess.style.display = "block";
                } else {
                    alert("Oops! There was a problem submitting your form. Please try again.");
                    submitBtn.disabled = false;
                    submitBtn.innerText = "Submit RSVP";
                    submitBtn.style.opacity = "1";
                }
            } catch (error) {
                alert("Oops! There was a network error. Please check your connection and try again.");
                submitBtn.disabled = false;
                submitBtn.innerText = "Submit RSVP";
                submitBtn.style.opacity = "1";
            }
        });
    }
});

// --- 4. PASSWORD PROTECTION LOGIC ---
function checkPassword() {
    const input = document.getElementById("guest-password").value;
    const correctPassword = "Meraki"; 

    if (input === correctPassword) {
        document.getElementById("password-overlay").style.display = "none";
        document.getElementById("main-website").style.display = "block";
    } else {
        document.getElementById("password-error").style.display = "block";
    }
}

document.getElementById("guest-password").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkPassword();
    }
});
