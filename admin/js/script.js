const token = localStorage.getItem("token"); 
const canvas = document.getElementById("dustCanvas");
const ctx = canvas.getContext("2d");
let particlesArray = [];
let numParticles = 400; 
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



    function renderProjects() {
        fetch('/api/get_projects')
            .then(res => res.json())
            .then(data => {
                const tbody = document.querySelector("#projects-table tbody");
                tbody.innerHTML = data.message.map(project => `
                    <tr>
                        <td>${project.id}</td>
                        <td>${project.name}</td>
                        <td>${project.description}</td>
                        <td><a href="${project.live_preview}" target="_blank">View</a></td>
                        <td><img src="${project.image}" alt="${project.name}" width="50"></td>
                        <td>
                            <button class="btn btn-delete" onclick="deleteProject(${project.id})">Delete</button>
                        </td>
                    </tr>
                `).join(""); 
            })
            .catch(err => console.error("Error fetching projects:", err));
    }
    


    function renderFeatures() {

        fetch('/api/get_features')
        .then(res => res.json())
        .then(data=> {
            const tbody = document.querySelector("#features-table tbody");
            tbody.innerHTML = data.message.map(feature => `
                <tr>
                    <td>${feature.id}</td>
                    <td>${feature.project_id}</td>
                    <td>${feature.feature}</td>
                    <td>
                        <button class="btn btn-delete" onclick="deleteFeature(${feature.id})">Delete</button>
                    </td>
                </tr>
            `).join("");
        })
    }






    
    document.getElementById("add-project-form").addEventListener("submit", async (event) => {        
        event.preventDefault(); 
        const formData = new FormData(event.target); 
        try {
            const response = await fetch('/api/add_project', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            console.log("Success:", result);
            renderProjects(); 
            event.target.reset(); 
        } catch (error) {
            console.error("Error:", error);
        }
    });
    

    document.getElementById("add-feature-form").addEventListener("submit", function (e) {
        e.preventDefault();
        let projectId = document.getElementById("feature-project-id").value;
        let featureName = document.getElementById("feature-name").value;
        fetch("/api/add_feature", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ projectId, featureName }) 
        })
        .then(res => res.json())
        .then(data => {
            renderFeatures(); 
            e.target.reset(); 
        })
        .catch(err => {
            alert("An error occurred: " + err.message);
        });
    });
    renderProjects();
    renderFeatures();


const deleteProject = (id) => {
        fetch('/api/delete_project', {
            method: 'DELETE', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }) 
        })
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                console.log(data.message);
                document.getElementById(`project-${id}`)?.remove();
                renderProjects(); 
                renderFeatures();
            } else {
                console.log(data.error);
            }
        })
        .catch(err => {
            alert("Error deleting project: " + err);
        });
    };
    const deleteFeature = (featureID) => {
        fetch('/api/delete_feature', {
            method: 'DELETE', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ featureID }) 
        })
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                console.log(data.message);
                document.getElementById(`feature-${featureID}`)?.remove();
                renderFeatures();
            } else {
                console.log(data.error);
            }
        })
        .catch(err => {
            alert("Error deleting feature: " + err);
        });
    };







const markAsTopProject = () => {
    let projectID = document.getElementById("projectSelect").value;

    fetch('/api/mark_project_top', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectID })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            renderTopProjects();
        } else {
            alert("Error: " + data.error);
        }
    })
    .catch(err => alert("Error: " + err));
};


const unmarkTopProject = () => {
    let projectID = document.getElementById("projectSelect").value;

    if (!projectID) {
        alert("Please select a project to unmark!");
        return;
    }

    fetch('/api/unmark_project_top', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectID })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            renderTopProjects();
        } else {
            alert("Error: " + data.error);
        }
    })
    .catch(err => alert("Error: " + err));
};


function populateProjectDropdown() {
    fetch('/api/get_projects')
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById("projectSelect");
            select.innerHTML = data.message.map(project => `
                <option value="${project.id}">${project.name}</option>
            `).join(""); 
        })
        .catch(err => console.error("Error fetching projects:", err));
}
populateProjectDropdown();


document.getElementById('project-image').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview-image').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});



function renderTopProjects() {
    fetch('/api/get_top_projects')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("topProjectsContainer");
            if (!data.length) {
                container.innerHTML = "<p>No top projects available.</p>";
                return;
            }
            container.innerHTML = data.map(project => `
                <div class="top-project">
                <img src="${project.image}" alt="${project.name}" width="100">
                    <h3>${project.name}</h3>
                    <a href="${project.live_preview}" target="_blank">View Project</a>
                </div>
            `).join("");
        })
        .catch(err => console.error("Error fetching top projects:", err));
}
renderTopProjects();


document.getElementById('profile-image').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview-image-profile').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});





document.getElementById('add-profile-form').addEventListener('submit' , (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name' , document.getElementById('profile-name').value);
    formData.append('job_title' , document.getElementById('profile-job-title').value);
    formData.append('description' , document.getElementById('profile-description').value);
    const imageFile = document.getElementById('profile-image').files[0];
    if(imageFile) {
        formData.append('image' , imageFile);
    }
    fetch('/api/add_profile' , {
        method : 'POST',
        body : formData,
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.message) {
            alert("success");
            getDevInfo();
            fetchProfileData();
        }else {
            alert("Faild");
        }
    })
    .catch((err) => {
        console.error('Error : ',err);
        alert('Error adding Profile');
    })
});



document.getElementById('add-experience-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const profile_id = document.getElementById('experience-profile-id').value;
    const type = document.getElementById('experience-type').value;
    const value = document.getElementById('experience-value').value;
    const data = {
        profile_id,
        type,
        value
    };
    fetch('/api/add_experience', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        if(data.message) {
            renderData();
        } else {
            alert("Error Adding Experience");
        }
    })
    .catch((err) => {
        alert("Error Fetching");
    });
});




document.getElementById('add-skill-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let id = document.getElementById('skill-profile-id').value;
    let skillName = document.getElementById('skill-name').value;
    let skillIcon = document.getElementById('skill-icon').value;
    if (!id || !skillName || !skillIcon) {
        alert("All Data Must be Filled");
        return;
    }
    let data = { id, skillName, skillIcon };
    fetch('/api/add_skill', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            renderData();
        } else {
            alert("Error While Adding The Skills: " + data.error);
        }
    })
    .catch((err) => {
        console.error("Error Connecting to the route:", err);
    });
});


function getDevInfo() {
    fetch('/api/get_dev_info')
        .then(response => response.json())
        .then(data => {
            const developerContainer = document.getElementById('developer-container');
            developerContainer.innerHTML = ''; 
            data.profile.forEach(dev => {
                const devCard = document.createElement('div');
                devCard.classList.add('dev_card');
                const devImg = document.createElement('div');
                devImg.classList.add('dev_img');
                const img = document.createElement('img');
                img.src = dev.image || 'default_image.png'; 
                img.alt = dev.name;
                devImg.appendChild(img);
                const devInfo = document.createElement('div');
                devInfo.classList.add('dev_info');
                const name = document.createElement('h2');
                name.textContent = dev.name;
                const description = document.createElement('p');
                description.textContent = dev.id;
                devInfo.appendChild(name);
                devInfo.appendChild(description);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('btn-delete');
                deleteButton.onclick = () => deleteItem('profile',dev.id); 
                devCard.appendChild(devImg);
                devCard.appendChild(devInfo);
                devCard.appendChild(deleteButton);
                developerContainer.appendChild(devCard);
            });
        })
        .catch(err => console.error('Error fetching developer data:', err));
}
getDevInfo();








function createTable(headers, rows, type) {
    let tableHTML = '<table><thead><tr>';
    headers.forEach(header => {
        tableHTML += `<th>${header}</th>`;
    });
    tableHTML += '</tr></thead><tbody>';
    rows.forEach(row => {
        console.log(row);
        tableHTML += '<tr>';
        tableHTML += `<td style="display:none;">${row.id}</td>`; 
        row.cells.forEach(cell => {
            tableHTML += `<td>${cell}</td>`;
        });
        tableHTML += `<td><button class="btn-delete" onclick="deleteItem('${type}', ${row.id})">Delete</button></td>`;
        tableHTML += '</tr>';
    });
    tableHTML += '</tbody></table>';
    return tableHTML;
}


function renderData() {
    fetch('/api/get_dev_info')
        .then(res => res.json())
        .then(data => {
            const experienceContainer = document.getElementById('experience-container');
            if (data.experience.length > 0) {
                const experienceTable = createTable(
                    ["Profile ID", "Experience Type", "Experience Value", "Action"],
                    data.experience.map(item => ({
                        id: item.id, 
                        profile_id: item.profile_id,
                        cells: [item.profile_id, item.experience_type, item.experience_value]
                    })),
                    "experience"
                );
                experienceContainer.innerHTML = experienceTable;
            } else {
                experienceContainer.innerHTML = "<p>No experience data available.</p>";
            }
            const skillsContainer = document.getElementById('skills-container');
            if (data.skills.length > 0) {
                const skillsTable = createTable(
                    ["id", "Profile ID", "Skill Name", "Skill Icon", "Action"],
                    data.skills.map(item => ({
                        id: item.id, 
                        profile_id: item.profile_id,
                        cells: [item.id, item.profile_id, item.skill_name, item.skill_icon ? `<span class="custom-icon">${item.skill_icon}</span>` : ""]
                    })),
                    "skills"
                );
                skillsContainer.innerHTML = skillsTable;
            } else {
                skillsContainer.innerHTML = "<p>No skills data available.</p>";
            }
        })
        .catch(err => console.error("Error fetching data:", err));
}

function deleteItem(type, id) {
    fetch('/api/delete_dev', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, id }), 
    })
    .then(res => res.json())
    .then(data => {
        renderData(); 
        getDevInfo();
    })
    .catch(err => console.error(`Error deleting ${type}:`, err));
}
window.onload = renderData;


function getUserInfo() {
    fetch('/api/get_user_info')
        .then(res => res.json())
        .then(data => {
            const userInfos = data.message;  
            const maxId = Math.max(...userInfos.map(user => user.id)); 
            document.getElementById('views').innerText = maxId;

            let userMap = new Map(); // Store unique IP addresses and count occurrences
            
            userInfos.forEach(userInfo => {
                const ip = userInfo.ip_address;
                if (userMap.has(ip)) {
                    userMap.get(ip).count += 1; // Increment count for existing IP
                } else {
                    userMap.set(ip, { ...userInfo, count: 1 }); // Store user info and initialize count
                }
            });

            let userCards = '';
            userMap.forEach(userInfo => {
                userCards += `
                    <div class="user_info_card">
                        <div class="data_item">
                            <span class="label">IP Address:</span>
                            <span>${userInfo.ip_address} (Visits: ${userInfo.counter})</span>
                        </div>
                        <div class="data_item">
                            <span class="label">City:</span>
                            <span>${userInfo.city}</span>
                        </div>
                        <div class="data_item">
                            <span class="label">Region:</span>
                            <span>${userInfo.region}</span>
                        </div>
                        <div class="data_item">
                            <span class="label">Country:</span>
                            <span>${userInfo.country}</span>
                        </div>
                        <div class="data_item">
                            <span class="label">ISP:</span>
                            <span>${userInfo.isp}</span>
                        </div>
                        <div class="data_item">
                            <span class="label">Browser:</span>
                            <span>${userInfo.browser}</span>
                        </div>
                        <div class="data_item">
                            <span class="label">Platform:</span>
                            <span>${userInfo.platform}</span>
                        </div>
                        <div class="data_item">
                            <span class="label">Screen Resolution:</span>
                            <span>${userInfo.screen_resolution}</span>
                        </div>
                        <div class="data_item">
                            <span class="label">Color Depth:</span>
                            <span>${userInfo.color_depth}</span>
                        </div>
                        <div class="data_item">
                            <span class="label">Timestamp:</span>
                            <span>${userInfo.timestamp}</span>
                        </div>
                    </div>
                `;
            });

            document.querySelector('.user_center_info').innerHTML = userCards;
        })
        .catch(err => {
            console.error('Error fetching user info:', err);
        });
}
getUserInfo();
document.querySelector('.user_center_info').style.display="none";


let isActive = false;
document.querySelector('.more_info').addEventListener("click", () => {
    if (!isActive) {
        document.querySelector('.user_center_info').style.display="flex";
        getUserInfo();  
        isActive = true;
    } else {
        document.querySelector('.user_center_info').style.display="none";
        console.log("Function is disabled now!");
        isActive = false;
    }
});









//testi
async function loadTestimonials() {
    try {
        let response = await fetch("/api/get_testimonials");
        let testimonials = await response.json();

        let container = document.getElementById("testi_container");
        container.innerHTML = ""; // Clear existing content

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
                <button class="delete_btn" data-id="${testi.id}">Delete</button>
            `;

            container.appendChild(card);
        });

        // Attach event listeners to delete buttons
        document.querySelectorAll(".delete_btn").forEach(button => {
            button.addEventListener("click", async (event) => {
                let testimonialId = event.target.dataset.id;
                await deleteTestimonial(testimonialId);
            });
        });

    } catch (error) {
        console.error("Error loading testimonials:", error);
    }
}

async function deleteTestimonial(id) {
    try {
        if (!token) {
            console.error("No authentication token found");
            return;
        }

        let response = await fetch(`/api/delete_testimonial/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}` // Include JWT in request headers
            }
        });

        if (response.ok) {
            showNotification("Testimonial deleted successfully!", "success");
            loadTestimonials(); 
        } else {
            const data = await response.json();
            showNotification(data.error || "Failed to delete testimonial", "error");
        }
    } catch (error) {
        console.error("Error deleting testimonial:", error);
        showNotification("An error occurred while deleting testimonial", "error");
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



loadTestimonials();
