document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. TAB SWITCHING LOGIC ---
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    tabLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Remove active class from all links and content
            tabLinks.forEach(l => l.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));
            
            // Add active class to clicked link and corresponding content
            link.classList.add("active");
            const targetId = link.getAttribute("data-target");
            document.getElementById(targetId).classList.add("active");
            
            // BACKGROUND IMAGE LOGIC
            if (targetId === "home") {
                document.body.classList.remove("inner-page-bg");
            } else {
                document.body.classList.add("inner-page-bg");
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // --- 2. RSVP LOGIC (Show/Hide extra questions) ---
    const attendingSelect = document.getElementById("attending-select");
    const extraQuestions = document.getElementById("extra-questions");

    attendingSelect.addEventListener("change", (e) => {
        if (e.target.value === "Yes") {
            extraQuestions.style.display = "block"; // Show questions if attending
        } else {
            extraQuestions.style.display = "none";  // Hide if declining or empty
        }
    });
});

// --- 3. PASSWORD PROTECTION LOGIC ---
function checkPassword() {
    const input = document.getElementById("guest-password").value;
    
    // CHANGE YOUR PASSWORD HERE (It is case-sensitive!)
    const correctPassword = "Fynbos2026"; 

    if (input === correctPassword) {
        // Hide the password screen and show the website
        document.getElementById("password-overlay").style.display = "none";
        document.getElementById("main-website").style.display = "block";
    } else {
        // Show error message
        document.getElementById("password-error").style.display = "block";
    }
}

// Allow guests to press "Enter" on their keyboard to submit the password
document.getElementById("guest-password").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkPassword();
    }
});document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. TAB SWITCHING LOGIC ---
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    tabLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Remove active class from all links and content
            tabLinks.forEach(l => l.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));
            
            // Add active class to clicked link and corresponding content
            link.classList.add("active");
            const targetId = link.getAttribute("data-target");
            document.getElementById(targetId).classList.add("active");
            
            // ---> NEW: BACKGROUND IMAGE LOGIC <---
            if (targetId === "home") {
                // If it's the Home tab, remove the background image
                document.body.classList.remove("inner-page-bg");
            } else {
                // If it's any other tab, add the background image
                document.body.classList.add("inner-page-bg");
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // --- 2. RSVP CONDITIONAL LOGIC ---
    const attendingSelect = document.getElementById("attending-select");
    const accommSection = document.getElementById("accommodation-section");
    const hotelSelect = document.getElementById("hotel-select");
    const nightsSection = document.getElementById("nights-section");
    
    // Checkboxes
    const friday = document.getElementById("friday");
    const saturday = document.getElementById("saturday");
    const sunday = document.getElementById("sunday");
    const discountMsg = document.getElementById("discount-message");

    // Show accommodation questions only if attending
    attendingSelect.addEventListener("change", (e) => {
        if (e.target.value === "Yes") {
            accommSection.style.display = "block";
        } else {
            accommSection.style.display = "none";
            // Reset fields
            hotelSelect.value = "No";
            nightsSection.style.display = "none";
        }
    });

    // Show night selection only if staying at hotel
    hotelSelect.addEventListener("change", (e) => {
        if (e.target.value === "Yes") {
            nightsSection.style.display = "block";
        } else {
            nightsSection.style.display = "none";
        }
    });

    // The "3rd Night Free" Logic
    function checkDiscount() {
        if (friday.checked && saturday.checked) {
            discountMsg.style.display = "block";
            // Automatically check Sunday and make it read-only for clarity
            sunday.checked = true;
            sunday.disabled = true; 
            
            // We create a hidden input so the value still sends to the server since disabled inputs don't submit
            if(!document.getElementById("hidden-sunday")) {
                let hiddenInput = document.createElement("input");
                hiddenInput.type = "hidden";
                hiddenInput.name = "night_sunday";
                hiddenInput.value = "Yes (Free)";
                hiddenInput.id = "hidden-sunday";
                document.getElementById("rsvp-form").appendChild(hiddenInput);
            }
        } else {
            discountMsg.style.display = "none";
            sunday.disabled = false;
            let hiddenInput = document.getElementById("hidden-sunday");
            if(hiddenInput) hiddenInput.remove();
        }
    }

    friday.addEventListener("change", checkDiscount);
    saturday.addEventListener("change", checkDiscount);
});

// --- 3. PASSWORD PROTECTION LOGIC ---
function checkPassword() {
    const input = document.getElementById("guest-password").value;
    
    // CHANGE YOUR PASSWORD HERE (It is case-sensitive!)
    const correctPassword = "Meraki"; 

    if (input === correctPassword) {
        // Hide the password screen and show the website
        document.getElementById("password-overlay").style.display = "none";
        document.getElementById("main-website").style.display = "block";
    } else {
        // Show error message
        document.getElementById("password-error").style.display = "block";
    }
}

// Allow guests to press "Enter" on their keyboard to submit the password
document.getElementById("guest-password").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkPassword();
    }
});
