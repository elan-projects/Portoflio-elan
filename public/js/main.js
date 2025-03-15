const canvas = document.getElementById("dustCanvas");
const ctx = canvas.getContext("2d");
let particlesArray = [];
    let numParticles = 90;
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(); 
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
    particlesArray = []; 
    for (let i = 0; i < numParticles; i++) {
        particlesArray.push(new Particle());
    }
}
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}
resizeCanvas();
animateParticles();
window.addEventListener("resize", resizeCanvas);
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
document.querySelectorAll(".nav__links_sec li").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); 
        const targetId = link.getAttribute("data-target"); 
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            setTimeout(()=> {
                document.querySelectorAll("section").forEach(part => {
                    part.style.display = "flex"; 
                });
                document.querySelector(".footer_section").style.display = "block"; 
                document.querySelector(".sec_nav_container").style.display = "none";
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
            } , 400)
        }
    });
});
document.querySelectorAll(".nav__links li").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); 
        const targetId = link.getAttribute("data-target"); 
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});
const loadTopProjects = () => {
    fetch('/api/get_top_projects')
        .then(res => res.json())
        .then(data => {
            const container = document.querySelector(".projects_wrapper");
            container.innerHTML = ""; 
            data.forEach(project => {
                const projectCard = document.createElement("div");
                projectCard.classList.add("project_card");
                projectCard.setAttribute("id" , project.id);
                projectCard.innerHTML = `
                    <div class="img_project_container">
                        <img src="${project.image}" alt="${project.name}">
                    </div>
                    <div class="project_info">
                        <h2>${project.name}</h2>
                        <div class="arrow_right">
                            <svg xmlns="http:
                                <g weight="light">
                                    <path d="M220.24,132.24l-72,72a6,6,0,0,1-8.48-8.48L201.51,134H40a6,6,0,0,1,0-12H201.51L139.76,60.24a6,6,0,0,1,8.48-8.48l
                                    72,72A6,6,0,0,1,220.24,132.24Z"></path>
                                </g>
                            </svg>
                        </div>
                    </div>
                `;
                container.appendChild(projectCard);
            });
        })
        .catch(err => console.error("Error fetching top projects:", err));
};
loadTopProjects();
document.querySelector(".projects_wrapper").addEventListener("click", (event) => {
    const card = event.target.closest(".project_card");
    if (card) {
        window.location.href = `/project/${card.getAttribute("id")}`;
    }
});
document.getElementById("submitemail").addEventListener("click", function () {
    let emailInput = document.querySelector(".email_input input");
    if (!emailInput.value || !validateEmail(emailInput.value)) {
        showNotification("Enter a valid email address!", "error");
        return;
    }
    fetch("/api/send_confirmation_mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: emailInput.value })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            showNotification("Email received! We will contact you soon.", "success");
            emailInput.value = ""; 
        } else {
            showNotification(data.error || "Failed to send confirmation email.", "error");
        }
    })
    .catch(err => {
        console.error("Error:", err);
        showNotification("Server error, try again later.", "error");
    });
});
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
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}



