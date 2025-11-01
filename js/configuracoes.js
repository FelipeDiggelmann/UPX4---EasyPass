// ===== CONFIGURAÇÕES DE ACESSIBILIDADE =====

// Aplicar configurações ao carregar qualquer página
document.addEventListener('DOMContentLoaded', function() {
    aplicarConfiguracoes();

    // Se estiver na página de configurações, adicionar event listeners
    if (window.location.pathname.includes('configuracoes.html')) {
        inicializarPaginaConfiguracoes();
    }
});

/**
 * Aplica as configurações salvas
 */
function aplicarConfiguracoes() {
    const config = Storage.carregarConfiguracoes();

    // Aplicar tema
    if (config.tema === 'escuro') {
        document.body.classList.add('tema-escuro');
    } else {
        document.body.classList.remove('tema-escuro');
    }

    // Aplicar tamanho de fonte
    document.body.classList.remove('fonte-pequena', 'fonte-grande');
    if (config.fonte === 'pequena') {
        document.body.classList.add('fonte-pequena');
    } else if (config.fonte === 'grande') {
        document.body.classList.add('fonte-grande');
    }

    // Aplicar filtro de daltonismo
    document.body.classList.remove('daltonismo-protanopia', 'daltonismo-deuteranopia', 'daltonismo-tritanopia');
    if (config.daltonismo !== 'nenhum') {
        document.body.classList.add(`daltonismo-${config.daltonismo}`);
    }
}

/**
 * Inicializa a página de configurações
 */
function inicializarPaginaConfiguracoes() {
    // Verificar se está logado
    if (!Storage.estaLogado()) {
        redirecionar('index.html');
        return;
    }

    const config = Storage.carregarConfiguracoes();

    // Elementos do DOM
    const btnVoltar = document.getElementById('btnVoltar');
    const btnResetarConfig = document.getElementById('btnResetarConfig');
    const configBtns = document.querySelectorAll('.config-btn');

    // Navegação
    btnVoltar.addEventListener('click', () => redirecionar('dashboard.html'));

    // Marcar opções ativas
    configBtns.forEach(btn => {
        const tipoConfig = btn.dataset.config;
        const valor = btn.dataset.value;

        if (config[tipoConfig] === valor) {
            btn.classList.add('active');
        }

        // Event listener para cada botão
        btn.addEventListener('click', function() {
            const tipo = this.dataset.config;
            const novoValor = this.dataset.value;

            // Remover active de todos os botões do mesmo tipo
            document.querySelectorAll(`[data-config="${tipo}"]`).forEach(b => {
                b.classList.remove('active');
            });

            // Adicionar active ao botão clicado
            this.classList.add('active');

            // Atualizar configuração
            config[tipo] = novoValor;
            Storage.salvarConfiguracoes(config);

            // Aplicar imediatamente
            aplicarConfiguracoes();

            // Feedback visual
            exibirSucesso('Configuração aplicada!', document.querySelector('.config-content'));
        });
    });

    // Resetar configurações
    btnResetarConfig.addEventListener('click', function() {
        if (confirm('Deseja resetar todas as configurações para o padrão?')) {
            Storage.resetarConfiguracoes();
            aplicarConfiguracoes();

            // Atualizar botões ativos
            configBtns.forEach(btn => {
                btn.classList.remove('active');
            });

            // Marcar opções padrão
            document.querySelector('[data-config="tema"][data-value="claro"]').classList.add('active');
            document.querySelector('[data-config="fonte"][data-value="media"]').classList.add('active');
            document.querySelector('[data-config="daltonismo"][data-value="nenhum"]').classList.add('active');

            exibirSucesso('Configurações resetadas!', document.querySelector('.config-content'));
        }
    });
}
