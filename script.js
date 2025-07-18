// This script allows you to add new projects dynamically to your portfolio.
// You can also edit the HTML directly for more control.

document.getElementById('add-project-btn').addEventListener('click', function() {
    const projectsList = document.getElementById('projects-list');
    // Create a new project card with editable fields
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <input type="text" placeholder="Project Title" class="project-title-input" style="width:100%;font-size:1.1rem;margin-bottom:0.5rem;" />
        <textarea placeholder="Short project description" class="project-desc-input" style="width:100%;height:60px;margin-bottom:0.5rem;"></textarea>
        <input type="url" placeholder="Project Link (https://...)" class="project-link-input" style="width:100%;margin-bottom:0.5rem;" />
        <button class="save-project-btn">Save</button>
    `;
    projectsList.appendChild(card);

    // Add sliding animation for new card
    card.style.transform = 'translateX(100vw)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.77,0,0.175,1)';
    setTimeout(() => {
        card.style.transform = 'translateX(0)';
    }, 10);

    card.querySelector('.save-project-btn').addEventListener('click', function() {
        const title = card.querySelector('.project-title-input').value.trim();
        const desc = card.querySelector('.project-desc-input').value.trim();
        const link = card.querySelector('.project-link-input').value.trim();
        if (!title || !desc || !link) {
            alert('Please fill in all fields.');
            return;
        }
        // Slide out before replacing content
        card.style.transform = 'translateX(-100vw)';
        setTimeout(() => {
            card.innerHTML = `
                <h3>${title}</h3>
                <p>${desc}</p>
                <a href="${link}" target="_blank">View Project</a>
            `;
            card.style.transform = 'translateX(100vw)';
            setTimeout(() => {
                card.style.transition = 'transform 0.5s cubic-bezier(0.77,0,0.175,1)';
                card.style.transform = 'translateX(0)';
            }, 10);
        }, 500);
    });
});
