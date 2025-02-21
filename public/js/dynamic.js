const extractId = ()=> {
    const url = window.location.pathname;
    const segments = url.split('/');
    return segments[segments.length -1];
}





function handleProjectInfo() {
    const projectId = extractId(); 
    if (!projectId) {
        return;
    }
    fetch(`/project_info/${projectId}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(project => {
            if (project) {
                document.getElementById('project_name').textContent = project.name;
                document.getElementById('project_overview_text').textContent = project.description;
                document.querySelector('.project_main_img_container img').src = project.image;
                document.querySelector('.website_live h4').addEventListener ('click' , ()=> {
                    window.location.href = project.live_preview;
                })
            } else {
                console.log("error fetch all data");
            }
        })
        .catch(err => {
            console.error('Error occurred:', err);
        });
}




function handleFeaturesInfo() {
    const projectId = extractId(); 
    if (!projectId) {
        return;
    }
    fetch('/api/get_features')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            const features = data.message.filter(item => item.project_id === parseInt(projectId));
            if (features.length > 0) {
                const featuresListContainer = document.createElement('div');
                featuresListContainer.className = 'features_project_list_container';
                const heading = document.createElement('h1');
                heading.textContent = 'Features';
                featuresListContainer.appendChild(heading);
                const featuresList = document.createElement('ul');
                featuresList.className = 'features_project_list';
                features.forEach(feature => {
                    const listItem = document.createElement('li');
                    listItem.textContent = feature.feature;
                    featuresList.appendChild(listItem);
                });
                featuresListContainer.appendChild(featuresList);
                const mainContainer = document.querySelector('.main_container');
                mainContainer.appendChild(featuresListContainer);
            } else {
                console.log('No features found for this project');
            }
        })
        .catch(err => {
            console.error('Error occurred:', err);
        });
}





try {
function generateProjectCards() {
    const projectsWrapper = document.querySelector('.projects_wrapper');
    if (!projectsWrapper) return;
    fetch('/api/get_projects')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            const projectsWrapper = document.querySelector('.projects_wrapper');
            projectsWrapper.innerHTML = ''; 
            data.message.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project_card';
                projectCard.setAttribute('data-id', project.id);
                const imgContainer = document.createElement('div');
                imgContainer.className = 'img_project_container';
                const img = document.createElement('img');
                img.src = project.image; 
                img.alt = project.name; 
                imgContainer.appendChild(img);
                const projectInfo = document.createElement('div');
                projectInfo.className = 'project_info';
                const projectName = document.createElement('h2');
                projectName.textContent = project.name;
                projectInfo.appendChild(projectName);
                const arrowRight = document.createElement('div');
                arrowRight.className = 'arrow_right';
                arrowRight.innerHTML = `
                    <svg xmlns="http:
                        <g color="var(--token-e91715da-04f6-4d7b-8ef4-d115c6c7cf80, rgb(255, 255, 255))" weight="light">
                            <path d="M220.24,132.24l-72,72a6,6,0,0,1-8.48-8.48L201.51,134H40a6,6,0,0,1,0-12H201.51L139.76,60.24a6,6,0,0,1,8.48-8.48l72,72A6,6,0,0,1,220.24,132.24Z"></path>
                        </g>
                    </svg>
                `;
                projectInfo.appendChild(arrowRight);
                projectCard.appendChild(imgContainer);
                projectCard.appendChild(projectInfo);
                projectsWrapper.appendChild(projectCard);
            });
            goToMainProject();
        })
        .catch(err => {
            console.error('Error occurred:', err);
        });
}
}catch(error) {
    console.log("Function Generate Project Cards not Working");
}



const goToMainProject = () => {
    const projectCards = document.querySelectorAll('.project_card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-id');
            window.location.href = `/project/${projectId}`;
        });
    });
};




const getDevInfo = ()=> {
    if(!document.querySelector(".aboutSection")){
        return;
    }
const url = window.location.href; 
const id = url.split('/').pop(); 
fetch('/api/get_dev_info')
    .then(response => response.json())
    .then(data => {
        const profile = data.profile.find(p => p.id === parseInt(id));
        if (profile) {
            populateProfileContent(profile, data);
        } else {
            document.body.innerHTML = '<p>Profile not found.</p>';
        }
        if (profile.name === "Salah Attar") {
            const neonButton = document.querySelector(".neon_button");
            document.body.style.backgroundColor = "rgb(11, 8, 51)";
            document.documentElement.style.setProperty('--token-primary-text-color', 'rgb(255, 239, 0)');
            document.querySelector(".pic_container").style.boxShadow = "0px 0px 10px #110e01"
            neonButton.style.backgroundImage = "radial-gradient(54.12% 66% at 50% 90.1%, rgba(17, 0, 210, 0.15) 0%, rgba(196, 196, 196, 0) 100%)";        }
    })
    .catch(err => console.error('Error fetching data:', err));




function populateProfileContent(profile, data) {
    const profileImg = document.querySelector('.pic_container img');
    profileImg.src = profile.image; 
    profileImg.alt = profile.name; 
    const devText = document.querySelector('.dev_text');
    devText.querySelector('h1').textContent = profile.name; 
    devText.querySelector('h2').textContent = profile.job_title; 
    devText.querySelector('p').textContent = profile.description; 
    const experienceList = document.querySelector('.experience_list');
    experienceList.innerHTML = ''; 
    const profileExperience = data.experience.filter(exp => exp.profile_id === profile.id);
    profileExperience.forEach(exp => {
        const experienceContainer = document.createElement('div');
        experienceContainer.classList.add('experience_container');
        const experienceRate = document.createElement('div');
        experienceRate.classList.add('experience_rate');
        const rateP = document.createElement('p');
        rateP.innerHTML = `<span>+</span>${exp.experience_value}`;
        experienceRate.appendChild(rateP);
        const experienceText = document.createElement('div');
        experienceText.classList.add('experience_text');
        const textP = document.createElement('p');
        textP.textContent = exp.experience_type;
        experienceText.appendChild(textP);
        experienceContainer.appendChild(experienceRate);
        experienceContainer.appendChild(experienceText);
        experienceList.appendChild(experienceContainer);
    });
    const skillsList = document.querySelector('.skills_list');
    skillsList.innerHTML = ''; 
    const profileSkills = data.skills.filter(skill => skill.profile_id === profile.id);
    profileSkills.forEach(skill => {
        const skillContainer = document.createElement('div');
        skillContainer.classList.add('skill_container');
        skillContainer.innerHTML = skill.skill_icon; 
        skillsList.appendChild(skillContainer);
    });
}
}
getDevInfo();
generateProjectCards();
handleFeaturesInfo();
handleProjectInfo();