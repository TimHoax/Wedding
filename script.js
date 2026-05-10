To do this, we are going to use a very clean trick. We will tell your JavaScript to instantly swap the website's background whenever you click on any tab that isn't the Home tab.

This gives the rest of your website a beautiful, textured look while keeping the Home page focused on your main Hero photograph.

Here is exactly what you need to update in two of your files.
Step 1: Update style.css

Open your style.css file and scroll to the bottom. Add this new code.

(Note: I added background-attachment: fixed;. This is a premium design trick so that when guests scroll down to read your Schedule or RSVP, the text boxes glide smoothly over the background image without the image moving!)
code CSS

/* --- INNER PAGE BACKGROUND --- */
body.inner-page-bg {
    /* Put your background image link here! (I added a soft, muted mountain/nature texture as a placeholder) */
    background-image: url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
    background-size: cover;
    background-position: center;
    background-attachment: fixed; /* Creates a beautiful parallax gliding effect */
}

Step 2: Update script.js

Now we just need to tell the tabs to trigger that background image.

Open your script.js file and look at the very top section (the // --- 1. TAB SWITCHING LOGIC --- part).

Replace that entire first block with this updated version:
code JavaScript

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
});
