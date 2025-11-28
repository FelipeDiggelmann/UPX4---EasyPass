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

    // Carregar e exibir saldos
    atualizarExibicaoSaldos(usuario.cpf);

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

// ===== FUNÇÃO PARA ATUALIZAR SALDOS =====

/**
 * Atualiza a exibição dos saldos no dashboard
 * @param {string} cpf - CPF do usuário
 */
function atualizarExibicaoSaldos(cpf) {
    const saldoEstudante = document.getElementById('saldoEstudante');
    const saldoSocial = document.getElementById('saldoSocial');
    
    const saldos = Storage.carregarSaldoUsuario(cpf);
    
    // Formatar valores como moeda brasileira
    saldoEstudante.textContent = formatarMoeda(saldos.estudante);
    saldoSocial.textContent = formatarMoeda(saldos.social);
}

/**
 * Formata um número como moeda brasileira
 * @param {number} valor - Valor a ser formatado
 * @returns {string} Valor formatado
 */
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}