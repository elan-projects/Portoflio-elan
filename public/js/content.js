try {
    const canvas = document.getElementById("dustCanvas");
    if (!canvas) {
        throw new Error("Canvas element with ID 'dustCanvas' not found.");
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("Could not get 2D rendering context for the canvas.");
    }

    let particlesArray = [];
    let numParticles = 90;

    function resizeCanvas() {
        try {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        } catch (err) {
            console.error("Error resizing canvas:", err);
        }
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = 1;
            this.speedX = (Math.random() - 0.5) * 0.6;
            this.speedY = (Math.random() - 0.5) * 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap particles around the canvas edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        draw() {
            ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

    function initParticles() {
        try {
            particlesArray = [];
            for (let i = 0; i < numParticles; i++) {
                particlesArray.push(new Particle());
            }
        } catch (err) {
            console.error("Error initializing particles:", err);
        }
    }

    function animateParticles() {
        try {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animateParticles);
        } catch (err) {
            console.error("Error animating particles:", err);
        }
    }

    // Initialize canvas and particles
    resizeCanvas();
    animateParticles();

    // Handle window resize
    window.addEventListener("resize", resizeCanvas);
} catch (err) {
    console.error("Error initializing particle animation:", err);
}
// Nav Bar Responsive 


const secondMenu = document.querySelector(".sec_nav");
const mainNavLinks = document.querySelector(".nav__links_sec");
let isMenuActive = false;

secondMenu.addEventListener("click", () => {
    isMenuActive = true;
    document.querySelector(".sec_nav_container").style.display = "flex";
    
    document.querySelectorAll("section").forEach(part => {
        part.style.display = "none";
    });
    document.querySelector(".footer_section").style.display = "none";
});

document.addEventListener("click", (event) => {
    const isClickInsideNav = mainNavLinks.contains(event.target);
    const isClickOnMenu = secondMenu.contains(event.target);
    if (!isClickInsideNav && !isClickOnMenu && isMenuActive) {
        isMenuActive = false;
        document.querySelectorAll("section").forEach(part => {
            part.style.display = "flex"; 
        });
        document.querySelector(".footer_section").style.display = "block"; 
        document.querySelector(".sec_nav_container").style.display = "none"; 
    }
    
});










// Send Mail Function 
document.addEventListener("DOMContentLoaded", () => {
    try {
        let contactForm = document.querySelector("form");

        if (!contactForm) {
            console.warn("No form found on this page.");
            return;
        }

        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            sendEmail();
        });
    } catch (err) {
        console.error("Error initializing contact form:", err);
        showNotification("Failed to initialize the form. Please refresh the page.", "error");
    }
});

function sendEmail() {
    if(!document.querySelector(".contact_info_section")) {
        return;
    }
    try {
        let senderName = document.querySelector("[name='name']");
        let senderEmail = document.querySelector("[name='email']");
        let senderSubject = document.querySelector("[name='subject']");
        let senderMessage = document.querySelector("[name='message']");

        // Check if all required fields are filled
        if (!senderName || !senderEmail || !senderSubject || !senderMessage) {
            showNotification("Form fields are missing. Please check the form.", "error");
            return;
        }

        if (!senderName.value || !senderEmail.value || !senderMessage.value || !senderSubject.value) {
            showNotification("Fill all the data first!", "error");
            return;
        }

        // Send the email via fetch
        fetch("/api/send_mail", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                senderName: senderName.value,
                senderEmail: senderEmail.value,
                senderSubject: senderSubject.value,
                senderMessage: senderMessage.value
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response was not ok.");
            }
            return res.json();
        })
        .then(data => {
            if (data.message) {
                showNotification("Email sent successfully!", "success");
                document.querySelector("form").reset();
            } else {
                showNotification(data.error || "Failed to send email.", "error");
            }
        })
        .catch(err => {
            console.error("Error while fetching the server:", err);
            showNotification("Server error, try again later.", "error");
        });
    } catch (err) {
        console.error("Error occurred while sending email:", err);
        showNotification("Unexpected error occurred!", "error");
    }
}

function showNotification(message, type) {
    let notification = document.createElement("div");
    notification.className = `toast-notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}









// Function to add parallax effect to cards
function addParallaxEffect() {
    const cards = document.querySelectorAll('.devSection .card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();

            // Calculate mouse position relative to the card
            const mouseX = e.clientX - rect.left; // X position within the card
            const mouseY = e.clientY - rect.top; // Y position within the card

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const offsetX = (mouseX - centerX) / centerX; // Range: -1 to 1
            const offsetY = (mouseY - centerY) / centerY; // Range: -1 to 1

            // Apply 3D transform based on mouse position
            const tiltAmount = 10; // Adjust this value to control the tilt intensity
            card.style.transform = `
                perspective(1000px)
                rotateX(${offsetY * tiltAmount}deg)
                rotateY(${offsetX * tiltAmount}deg)
                scale(1.15)
            `;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

fetch('/api/get_dev_info')
    .then(response => response.json())
    .then(data => {
        const devSection = document.querySelector('.devSection');
        data.profile.forEach(profile => {
            const card = document.createElement('div');
            card.classList.add('card');
            const img = document.createElement('img');
            img.src = profile.image;
            img.alt = profile.name;
            card.appendChild(img);
            devSection.appendChild(card);
            card.addEventListener('click' , () => {
                window.location.href=`/developer/${profile.id}`
            })
        });
        addParallaxEffect();
    })
    .catch(err => console.error('Error fetching data:', err));




fetch('https://ipinfo.io/json')
.then(response => {
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    return fetch('/send_user_info', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/'
    },
    body: JSON.stringify( {device : navigator.userAgent , net : data})
    });
})

.catch(error => {
    console.error('Error:', error);
});





const testimonySection = document.querySelector(".add_testi_section");

testimonySection.style.display="none";
let isTesti = false;
function appearTestiSection() {
    const testimonySection = document.querySelector(".testimony_section");
    const addTestiButton = document.querySelector(".add_testi button");
    const addTestiSection = document.querySelector(".add_testi_section");
    if (!testimonySection || !addTestiButton || !addTestiSection) {
        return;
    }
    addTestiButton.addEventListener("click", () => {
        isTesti = !isTesti; 
        showTesti(isTesti, addTestiSection);
    });
}
function showTesti(isVisible, section) {
    section.style.display = isVisible ? "flex" : "none";
}

document.addEventListener("DOMContentLoaded", appearTestiSection);



document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("previewImg").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


function sendTestiData() {
    document.querySelector(".testi_form").addEventListener("submit", async (e) => {
        e.preventDefault();

        let form = e.target;
        let name = form.querySelector("input[name='name']").value.trim();
        let job = form.querySelector("input[name='job']").value.trim();
        let msg = form.querySelector("textarea[name='msg']").value.trim();
        let image = form.querySelector("input[name='image']").files[0]; // Get the image file

        if (!name || !job || !msg) {
            showNotification("All fields are required!", "error");
            console.log("Error: Missing fields");
            return;
        }

        // Prepare FormData for sending
        let formData = new FormData();
        formData.append("name", name);
        formData.append("job", job);
        formData.append("message", msg);
        if (image) {
            formData.append("image", image);
        }
        try {
            let response = await fetch("/api/send_testimonial", {
                method: "POST",
                body: formData,
            });
            let result = await response.json();
            if (result.message) {
                showNotification("Your Testimonial Has been registered successfully", "success");
                form.reset();
                document.getElementById("previewImg").src = "https://via.placeholder.com/120"; // Reset image preview
            } else {
                showNotification(result.message || "Submission failed!", "error");
                console.log("Error:", result);
            }
        } catch (error) {
            showNotification("Network error!", "error");
            console.error("Fetch error:", error);
        }
    });
}

sendTestiData();

async function fetchTestimonials() {
    try {
        let response = await fetch("/api/get_testimonials");
        let testimonials = await response.json();

        let container = document.querySelector(".marquee-content");
        container.innerHTML = ""; // Clear previous content before appending new ones

        testimonials.forEach(testi => {
            let card = document.createElement("div");
            card.classList.add("testi_card");

            card.innerHTML = `
                <div class="testi_comment">
                    <p>"${testi.message}"</p>
                </div>
                <div class="testi_info">
                    <div class="testi_img">
                        <img src="${testi.image}" alt="Testimonial Image">
                    </div>
                    <div class="testi_name_job">
                        <strong>${testi.name}</strong>
                        <p>${testi.job}</p>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });

        cloneCardsForAnimation(); // Clone cards once for smooth scrolling

    } catch (error) {
        console.error("Error fetching testimonials:", error);
    }
}

function cloneCardsForAnimation() {
    const marqueeContent = document.querySelector(".marquee-content");
    const cards = Array.from(marqueeContent.children);

    // Ensure we're not cloning cards twice
    if (marqueeContent.dataset.cloned) return;
    marqueeContent.dataset.cloned = "true"; // Prevent multiple clones

    cards.forEach(card => {
        const clone = card.cloneNode(true);
        marqueeContent.appendChild(clone);
    });

    const calculateTotalWidth = () => {
        const cardWidth = cards[0].offsetWidth; 
        const gapWidth = window.innerWidth <= 600 ? 20 : 50; 
        const totalCards = cards.length * 2; // Original + Cloned
        const totalWidth = (cardWidth + gapWidth) * totalCards;
        return totalWidth;
    };

    marqueeContent.style.width = `${calculateTotalWidth()}px`;
    window.addEventListener("resize", () => {
        marqueeContent.style.width = `${calculateTotalWidth()}px`;
    });
}

fetchTestimonials();
        fetchTestimonials();
function updateMarqueeSpeed(speed) {
    document.documentElement.style.setProperty("--marquee-animation-duration", `${speed}s`);
}

updateMarqueeSpeed(60);
