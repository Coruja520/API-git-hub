const screen = {
    userProfile: document.querySelector('.profile-data'),
    
    renderUser(user) {
        this.userProfile.innerHTML = `
        <div class="info">
            <img src="${user.avatarUrl}" alt="Foto do perfil" />
            <div class="data">
                <h1>${user.name || 'Sem nome'}</h1>
                <p>${user.bio || 'Sem bio'}</p>
                <div class="followers">
                    <span>👥 Seguidores: ${user.followers}</span>
                    <span>👥 Seguindo: ${user.following}</span>
                </div>
            </div>
        </div>`;

        if(user.repositories.length > 0) {
            let repositoriesHTML = '<div class="repositories"><h2>Repositórios</h2><ul>';

            user.repositories.forEach(repo => {
                repositoriesHTML += `
                <li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    <div class="repo-details">
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🍴 ${repo.forks_count}</span>
                        <span>👀 ${repo.watchers_count}</span>
                        <span class="language">${repo.language || 'Sem forks'}</span>
                    </div>
                </li>`;
            });

            repositoriesHTML += '</ul></div>';
            this.userProfile.innerHTML += repositoriesHTML;
        }

        if(user.events && user.events.length > 0) {
            let eventsHTML = '<div class="events"><h2>Eventos Recentes</h2><ul>';

            user.events.filter(event => ['PushEvent', 'CreateEvent'].includes(event.type))
                     .slice(0, 10)
                     .forEach(event => {
                const message = event.type === 'PushEvent' 
                    ? event.payload.commits[0].message 
                    : 'Sem mensagem de commit';
                eventsHTML += `<li>${event.repo.name} - ${message}</li>`;
            });

            eventsHTML += '</ul></div>';
            this.userProfile.innerHTML += eventsHTML;
        }
    },

    renderNotFound() {
        this.userProfile.innerHTML = '<h3>Usuário não encontrado</h3>';
    },

    renderError() {
        this.userProfile.innerHTML = '<h3>Erro ao carregar dados</h3>';
    }
};

export { screen };