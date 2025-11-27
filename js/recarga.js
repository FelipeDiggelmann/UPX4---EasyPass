// ===== RECARGA =====

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se está logado
    if (!Storage.estaLogado()) {
        redirecionar('index.html');
        return;
    }

    // Carregar informações do usuário
    const usuario = Storage.carregarUsuarioLogado();

    // Obter tipo de cartão da URL
    const urlParams = new URLSearchParams(window.location.search);
    const tipoCartao = urlParams.get('tipo') || 'estudante';

    // Atualizar título
    document.getElementById('tipoCartao').textContent = tipoCartao === 'estudante' ? 'Estudante' : 'Social';

    // Variáveis globais
    let valorSelecionado = 0;
    let metodoPagamento = '';
    let chavePix = '';

    // ===== NAVEGAÇÃO =====
    const btnVoltar = document.getElementById('btnVoltar');
    btnVoltar.addEventListener('click', () => redirecionar('dashboard.html'));

    // ===== ETAPA 1: CONFIRMAÇÃO DE CPF =====
    document.getElementById('confirmaName').textContent = usuario.nome;
    document.getElementById('confirmaCpf').textContent = formatarCPF(usuario.cpf);

    const cpfConfirmacao = document.getElementById('cpfConfirmacao');
    adicionarMascaraCPF(cpfConfirmacao);

    const btnConfirmarCpf = document.getElementById('btnConfirmarCpf');
    btnConfirmarCpf.addEventListener('click', function() {
        const cpfDigitado = limparCPF(cpfConfirmacao.value);

        if (cpfDigitado !== usuario.cpf) {
            exibirErro('CPF não corresponde ao usuário logado!', document.getElementById('etapa1'));
            return;
        }

        // Avançar para etapa 2
        mostrarEtapa('etapa2');
    });

    // ===== ETAPA 2: SELEÇÃO DE VALOR =====
    const limiteInfo = document.getElementById('limiteInfo');
    if (tipoCartao === 'estudante') {
        limiteInfo.textContent = 'Limite máximo: R$ 135,00';
    } else {
        limiteInfo.textContent = 'Sem limite de valor';
    }

    const valoresBtns = document.querySelectorAll('.valor-btn');
    const valorPersonalizado = document.getElementById('valorPersonalizado');

    valoresBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            valoresBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            valorSelecionado = parseFloat(this.dataset.valor);
            valorPersonalizado.value = '';
        });
    });

    valorPersonalizado.addEventListener('input', function() {
        valoresBtns.forEach(b => b.classList.remove('selected'));
        valorSelecionado = parseFloat(this.value) || 0;
    });

    const btnConfirmarValor = document.getElementById('btnConfirmarValor');
    btnConfirmarValor.addEventListener('click', function() {
        if (valorSelecionado <= 0) {
            exibirErro('Selecione um valor válido!', document.getElementById('etapa2'));
            return;
        }

        if (tipoCartao === 'estudante' && valorSelecionado > 135) {
            exibirErro('Valor máximo para estudante é R$ 135,00!', document.getElementById('etapa2'));
            return;
        }

        // Atualizar valor exibido
        document.getElementById('valorEscolhido').textContent = formatarValor(valorSelecionado);
        document.getElementById('valorPix').textContent = formatarValor(valorSelecionado);

        // Avançar para etapa 3
        mostrarEtapa('etapa3');
    });

    // ===== ETAPA 3: MÉTODO DE PAGAMENTO =====
    const metodosBtns = document.querySelectorAll('.metodo-btn');

    metodosBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            metodosBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            metodoPagamento = this.dataset.metodo;

            if (metodoPagamento === 'pix') {
                // Gerar PIX
                gerarPix();
                mostrarEtapa('etapa4Pix');
            } else {
                // Mostrar formulário de cartão
                document.getElementById('tipoCartaoPagamento').textContent = 
                    metodoPagamento === 'debito' ? 'Débito' : 'Crédito';
                mostrarEtapa('etapa4Cartao');
            }
        });
    });

    // ===== ETAPA 4A: FORMULÁRIO DE CARTÃO =====
    const numeroCartao = document.getElementById('numeroCartao');
    const validadeCartao = document.getElementById('validadeCartao');
    const cvvCartao = document.getElementById('cvvCartao');

    adicionarMascaraCartao(numeroCartao);
    adicionarMascaraValidade(validadeCartao);

    // Limitar CVV a 3 dígitos
    cvvCartao.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').substring(0, 3);
    });

    const btnSimularPagamentoCartao = document.getElementById('btnSimularPagamentoCartao');
    btnSimularPagamentoCartao.addEventListener('click', function() {
        const numero = numeroCartao.value.replace(/\D/g, '');
        const nome = document.getElementById('nomeCartao').value;
        const validade = validadeCartao.value;
        const cvv = cvvCartao.value;

        // Validações básicas
        if (numero.length < 16) {
            exibirErro('Número do cartão inválido!', document.getElementById('etapa4Cartao'));
            return;
        }

        if (!nome) {
            exibirErro('Digite o nome no cartão!', document.getElementById('etapa4Cartao'));
            return;
        }

        if (validade.length < 5) {
            exibirErro('Validade inválida!', document.getElementById('etapa4Cartao'));
            return;
        }

        if (cvv.length < 3) {
            exibirErro('CVV inválido!', document.getElementById('etapa4Cartao'));
            return;
        }

        // Processar pagamento
        processarPagamento();
    });

    // ===== ETAPA 4B: PIX =====
    const btnCopiarChave = document.getElementById('btnCopiarChave');
    btnCopiarChave.addEventListener('click', function() {
        const chaveInput = document.getElementById('chavePix');
        chaveInput.select();
        document.execCommand('copy');
        exibirSucesso('Chave PIX copiada!', document.getElementById('etapa4Pix'));
    });

    const btnSimularPagamentoPix = document.getElementById('btnSimularPagamentoPix');
    btnSimularPagamentoPix.addEventListener('click', function() {
        processarPagamento();
    });

    // ===== MODAL DE CONFIRMAÇÃO =====
    const modal = document.getElementById('modalConfirmacao');
    const btnFecharModal = document.getElementById('btnFecharModal');

    btnFecharModal.addEventListener('click', function() {
        modal.classList.remove('active');
        redirecionar('dashboard.html');
    });

    // ===== FUNÇÕES AUXILIARES =====

    function mostrarEtapa(etapaId) {
        document.querySelectorAll('.etapa').forEach(etapa => {
            etapa.classList.remove('active');
        });
        document.getElementById(etapaId).classList.add('active');
    }

    function gerarPix() {
        chavePix = gerarChavePix();
        document.getElementById('chavePix').value = chavePix;

        // Gerar QR Code
        const qrcodeDiv = document.getElementById('qrcodeDiv');
        qrcodeDiv.innerHTML = ''; // Limpar QR Code anterior

        new QRCode(qrcodeDiv, {
            text: chavePix,
            width: 200,
            height: 200,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    function processarPagamento() {
        // Salvar recarga no histórico
        const recarga = {
            cpf: usuario.cpf,
            nome: usuario.nome,
            tipo: tipoCartao,
            valor: valorSelecionado,
            metodoPagamento: metodoPagamento,
            status: 'concluído'
        };

        Storage.salvarRecarga(recarga);

         // Atualizar saldo do cartao
        const tipoSaldo = tipoCartao === 'estudante' ? 'estudante' : 'social';
        Storage.atualizarSaldo(usuario.cpf, tipoSaldo, valorSelecionado);

        // Exibir modal de confirmação
        document.getElementById('valorFinal').textContent = formatarValor(valorSelecionado);
        modal.classList.add('active');
    }
});
