// ===== DASHBOARD =====

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se está logado
    if (!Storage.estaLogado()) {
        redirecionar('index.html');
        return;
    }

    // Carregar informações do usuário
    const usuario = Storage.carregarUsuarioLogado();
    const nomeUsuario = document.getElementById('nomeUsuario');
    nomeUsuario.textContent = usuario.nome;

    // Botão de logout
    const btnLogout = document.getElementById('btnLogout');
    btnLogout.addEventListener('click', function() {
        if (confirm('Deseja realmente sair?')) {
            Storage.removerUsuarioLogado();
            redirecionar('index.html');
        }
    });

    // Cards de serviço
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const service = this.dataset.service;
            
            switch(service) {
                case 'estudante':
                    redirecionar('recarga.html?tipo=estudante');
                    break;
                case 'social':
                    redirecionar('recarga.html?tipo=social');
                    break;
                case 'chat':
                    redirecionar('chat.html');
                    break;
                case 'historico':
                    redirecionar('historico.html');
                    break;
                case 'configuracoes':
                    redirecionar('configuracoes.html');
                    break;
            }
        });
    });
});
