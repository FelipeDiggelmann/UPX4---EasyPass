// ===== CHAT =====

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se está logado
    if (!Storage.estaLogado()) {
        redirecionar('index.html');
        return;
    }

    // Elementos do DOM
    const btnVoltar = document.getElementById('btnVoltar');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const btnEnviar = document.getElementById('btnEnviar');

    // Navegação
    btnVoltar.addEventListener('click', () => redirecionar('dashboard.html'));

    // Mensagem de boas-vindas
    const usuario = Storage.carregarUsuarioLogado();
    adicionarMensagemBot(`Olá, ${usuario.nome}! Como posso ajudá-lo(a) hoje?`);

    // Enviar mensagem
    function enviarMensagem() {
        const mensagem = chatInput.value.trim();

        if (!mensagem) {
            return;
        }

        // Adicionar mensagem do usuário
        adicionarMensagemUsuario(mensagem);

        // Limpar input
        chatInput.value = '';

        // Simular resposta do bot
        setTimeout(() => {
            const resposta = gerarResposta(mensagem);
            adicionarMensagemBot(resposta);
        }, 1000);
    }

    // Eventos
    btnEnviar.addEventListener('click', enviarMensagem);

    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            enviarMensagem();
        }
    });

    // Adicionar mensagem do usuário
    function adicionarMensagemUsuario(texto) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message message-user';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.textContent = texto;

        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = obterHoraAtual();

        bubble.appendChild(time);
        messageDiv.appendChild(bubble);
        chatMessages.appendChild(messageDiv);

        // Scroll para o final
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Adicionar mensagem do bot
    function adicionarMensagemBot(texto) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message message-bot';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.textContent = texto;

        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = obterHoraAtual();

        bubble.appendChild(time);
        messageDiv.appendChild(bubble);
        chatMessages.appendChild(messageDiv);

        // Scroll para o final
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Gerar resposta automática
    function gerarResposta(mensagem) {
        const msg = mensagem.toLowerCase();

        // Respostas baseadas em palavras-chave
        if (msg.includes('recarga') || msg.includes('recarregar')) {
            return 'Para fazer uma recarga, volte ao menu principal e selecione o tipo de cartão (Estudante ou Social).';
        }

        if (msg.includes('valor') || msg.includes('quanto')) {
            return 'Você pode recarregar valores de R$ 10, R$ 20, R$ 30, R$ 50 ou um valor personalizado. Para estudantes, o limite é R$ 135,00.';
        }

        if (msg.includes('pagamento') || msg.includes('pagar')) {
            return 'Aceitamos pagamento por Débito, Crédito ou PIX. Você escolhe na hora da recarga!';
        }

        if (msg.includes('historico') || msg.includes('histórico')) {
            return 'Você pode ver todas as suas recargas anteriores no menu Histórico.';
        }

        if (msg.includes('cpf')) {
            return 'Seu CPF é usado para identificação e confirmação nas recargas. Mantenha-o sempre atualizado.';
        }

        if (msg.includes('ajuda') || msg.includes('help')) {
            return 'Posso ajudá-lo com informações sobre recargas, valores, pagamentos e histórico. O que você gostaria de saber?';
        }

        if (msg.includes('obrigado') || msg.includes('obrigada') || msg.includes('valeu')) {
            return 'Por nada! Estou aqui para ajudar. Se precisar de mais alguma coisa, é só chamar!';
        }

        if (msg.includes('oi') || msg.includes('olá') || msg.includes('ola')) {
            return `Olá! Como posso ajudá-lo(a)?`;
        }

        // Resposta padrão
        return 'Desculpe, não entendi sua pergunta. Posso ajudá-lo com informações sobre recargas, valores, pagamentos e histórico. O que você gostaria de saber?';
    }

    // Obter hora atual
    function obterHoraAtual() {
        const agora = new Date();
        const horas = String(agora.getHours()).padStart(2, '0');
        const minutos = String(agora.getMinutes()).padStart(2, '0');
        return `${horas}:${minutos}`;
    }
});
