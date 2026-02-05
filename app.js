// Load and render publications, projects, teaching, and reviews data
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();
        
        renderSelectedPublications(data.selectedPublications);
        renderArxivedPublications(data.arxivedPublications);
        renderProjectsByCategory(data.projects);
        renderTeaching(data.teaching);
        renderReviews(data.reviews);
    } catch (error) {
        console.error('Error loading data:', error);
    }
});

function renderSelectedPublications(publications) {
    const container = document.getElementById('selected-publications-container');
    
    publications.forEach(pub => {
        const pubDiv = document.createElement('div');
        pubDiv.className = 'publication';
        
        let html = `
            <p>
                <b>${pub.title}</b>
                <br>${pub.authors}
                <br><i>${pub.venue}</i>
        `;
        
        if (pub.links && pub.links.length > 0) {
            html += '<br>';
            pub.links.forEach((link, index) => {
                html += `<a href="${link.url}" target="_blank" rel="noopener noreferrer">[${link.text}]</a> `;
            });
        }
        
        html += '</p>';
        
        pubDiv.innerHTML = html;
        container.appendChild(pubDiv);
    });
}

function renderArxivedPublications(publications) {
    const container = document.getElementById('arxived-publications-container');
    
    publications.forEach(pub => {
        const pubDiv = document.createElement('div');
        pubDiv.className = 'publication';
        
        let html = `
            <p>
                <b>${pub.title}</b>
                <br>${pub.authors}
                <br><i>${pub.venue}</i>
        `;
        
        if (pub.links && pub.links.length > 0) {
            html += '<br>';
            pub.links.forEach((link, index) => {
                html += `<a href="${link.url}" target="_blank" rel="noopener noreferrer">[${link.text}]</a> `;
            });
        }
        
        html += '</p>';
        
        pubDiv.innerHTML = html;
        container.appendChild(pubDiv);
    });
}

function renderProjectsByCategory(projects) {
    const researchContainer = document.getElementById('research-projects-container');
    const courseContainer = document.getElementById('course-projects-container');
    
    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-item';
        
        let html = `
            <p>
                <b>${project.title}</b>
                ${project.description}
                <br><i>${project.affiliation} · ${project.period}</i>
        `;
        
        if (project.links && project.links.length > 0) {
            html += '<br>';
            project.links.forEach((link, index) => {
                html += `<a href="${link.url}" target="_blank" rel="noopener noreferrer">[${link.text}]</a> `;
            });
        }
        
        html += '</p>';
        
        projectDiv.innerHTML = html;
        
        if (project.category === 'research') {
            researchContainer.appendChild(projectDiv);
        } else if (project.category === 'course') {
            courseContainer.appendChild(projectDiv);
        }
    });
}

function renderTeaching(teaching) {
    const container = document.getElementById('teaching-container');
    
    teaching.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        
        if (item.organization) {
            itemDiv.innerHTML = `
                <div class="course">${item.role}</div>
                <div class="course_details">
                    ${item.organization} · ${item.period}
                    ${item.details ? '<br>' + item.details : ''}
                </div>
            `;
        } else {
            itemDiv.innerHTML = `
                <div class="course">${item.role}</div>
                <div class="course_details">
                    ${item.course}<br>
                    Faculty Supervisor: ${item.supervisor} · ${item.period}
                    ${item.extra ? '<br>' + item.extra : ''}
                </div>
            `;
        }
        
        container.appendChild(itemDiv);
    });
}

function renderReviews(reviews) {
    const container = document.getElementById('reviews-grid');
    
    reviews.forEach(review => {
        const reviewLink = document.createElement('a');
        reviewLink.href = review.url;
        reviewLink.className = 'review-item';
        reviewLink.target = '_blank';
        reviewLink.rel = 'noopener noreferrer';
        
        const img = document.createElement('img');
        img.src = review.image;
        img.alt = review.title;
        
        reviewLink.appendChild(img);
        container.appendChild(reviewLink);
    });
}