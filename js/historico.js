// ===== HISTÓRICO =====

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se está logado
    if (!Storage.estaLogado()) {
        redirecionar('index.html');
        return;
    }

    // Elementos do DOM
    const btnVoltar = document.getElementById('btnVoltar');
    const listaHistorico = document.getElementById('listaHistorico');
    const mensagemVazio = document.getElementById('mensagemVazio');
    const filtroTipo = document.getElementById('filtroTipo');
    const btnLimparFiltros = document.getElementById('btnLimparFiltros');

    // Navegação
    btnVoltar.addEventListener('click', () => redirecionar('dashboard.html'));

    // Carregar histórico
    let historico = Storage.carregarHistoricoUsuario();

    // Renderizar histórico
    function renderizarHistorico(filtro = 'todos') {
        listaHistorico.innerHTML = '';

        // Filtrar histórico
        let historicoFiltrado = historico;
        if (filtro !== 'todos') {
            historicoFiltrado = historico.filter(r => r.tipo === filtro);
        }

        // Verificar se há recargas
        if (historicoFiltrado.length === 0) {
            mensagemVazio.style.display = 'block';
            listaHistorico.style.display = 'none';
            return;
        }

        mensagemVazio.style.display = 'none';
        listaHistorico.style.display = 'flex';

        // Criar elementos de histórico
        historicoFiltrado.forEach(recarga => {
            const item = criarItemHistorico(recarga);
            listaHistorico.appendChild(item);
        });
    }

    // Criar item de histórico
    function criarItemHistorico(recarga) {
        const item = document.createElement('div');
        item.className = 'historico-item';

        const data = new Date(recarga.data);
        const dataFormatada = formatarData(data);

        const tipoBadge = recarga.tipo === 'estudante' ? 'badge-estudante' : 'badge-social';
        const tipoTexto = recarga.tipo === 'estudante' ? 'Estudante' : 'Social';

        let metodoPagamentoTexto = '';
        switch(recarga.metodoPagamento) {
            case 'debito':
                metodoPagamentoTexto = 'Débito';
                break;
            case 'credito':
                metodoPagamentoTexto = 'Crédito';
                break;
            case 'pix':
                metodoPagamentoTexto = 'PIX';
                break;
        }

        item.innerHTML = `
            <div class="historico-header">
                <div class="historico-tipo">
                    <span class="badge ${tipoBadge}">${tipoTexto}</span>
                </div>
                <div class="historico-data">${dataFormatada}</div>
            </div>
            <div class="historico-detalhes">
                <div class="historico-detalhe">
                    <strong>Valor:</strong> <span class="historico-valor">R$ ${formatarValor(recarga.valor)}</span>
                </div>
                <div class="historico-detalhe">
                    <strong>Pagamento:</strong> ${metodoPagamentoTexto}
                </div>
                <div class="historico-detalhe">
                    <strong>Status:</strong> ${recarga.status}
                </div>
            </div>
        `;

        return item;
    }

    // Filtros
    filtroTipo.addEventListener('change', function() {
        renderizarHistorico(this.value);
    });

    btnLimparFiltros.addEventListener('click', function() {
        filtroTipo.value = 'todos';
        renderizarHistorico('todos');
    });

    // Renderizar histórico inicial
    renderizarHistorico();
});
