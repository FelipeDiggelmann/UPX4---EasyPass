// ===== FUNÇÕES UTILITÁRIAS =====

/**
 * Formata CPF com máscara
 * @param {string} cpf - CPF sem formatação
 * @returns {string} CPF formatado (000.000.000-00)
 */
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length <= 11) {
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return cpf;
}

/**
 * Remove formatação do CPF
 * @param {string} cpf - CPF formatado
 * @returns {string} CPF sem formatação
 */
function limparCPF(cpf) {
    return cpf.replace(/\D/g, '');
}

/**
 * Valida CPF (validação básica de formato)
 * @param {string} cpf - CPF a ser validado
 * @returns {boolean} True se válido
 */
function validarCPF(cpf) {
    cpf = limparCPF(cpf);
    
    if (cpf.length !== 11) {
        return false;
    }
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    
    // Validação dos dígitos verificadores
    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
}

/**
 * Formata número de cartão de crédito
 * @param {string} numero - Número do cartão
 * @returns {string} Número formatado
 */
function formatarNumeroCartao(numero) {
    numero = numero.replace(/\D/g, '');
    return numero.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

/**
 * Formata validade do cartão (MM/AA)
 * @param {string} validade - Validade do cartão
 * @returns {string} Validade formatada
 */
function formatarValidadeCartao(validade) {
    validade = validade.replace(/\D/g, '');
    if (validade.length >= 2) {
        validade = validade.substring(0, 2) + '/' + validade.substring(2, 4);
    }
    return validade;
}

/**
 * Formata valor monetário
 * @param {number} valor - Valor numérico
 * @returns {string} Valor formatado (R$ 0,00)
 */
function formatarValor(valor) {
    return valor.toFixed(2).replace('.', ',');
}

/**
 * Gera uma chave PIX aleatória (simulação)
 * @returns {string} Chave PIX aleatória
 */
function gerarChavePix() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let chave = '';
    for (let i = 0; i < 32; i++) {
        chave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return chave;
}

/**
 * Formata data para exibição
 * @param {Date} data - Objeto Date
 * @returns {string} Data formatada (DD/MM/YYYY HH:MM)
 */
function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

/**
 * Exibe mensagem de erro
 * @param {string} mensagem - Mensagem a ser exibida
 * @param {HTMLElement} container - Container onde a mensagem será exibida
 */
function exibirErro(mensagem, container) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = mensagem;
    
    // Remove mensagens anteriores
    const mensagensAnteriores = container.querySelectorAll('.error-message, .success-message');
    mensagensAnteriores.forEach(msg => msg.remove());
    
    container.insertBefore(errorDiv, container.firstChild);
    
    // Remove após 5 segundos
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

/**
 * Exibe mensagem de sucesso
 * @param {string} mensagem - Mensagem a ser exibida
 * @param {HTMLElement} container - Container onde a mensagem será exibida
 */
function exibirSucesso(mensagem, container) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = mensagem;
    
    // Remove mensagens anteriores
    const mensagensAnteriores = container.querySelectorAll('.error-message, .success-message');
    mensagensAnteriores.forEach(msg => msg.remove());
    
    container.insertBefore(successDiv, container.firstChild);
    
    // Remove após 5 segundos
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

/**
 * Redireciona para uma página
 * @param {string} url - URL de destino
 */
function redirecionar(url) {
    window.location.href = url;
}

/**
 * Adiciona máscara de CPF a um input
 * @param {HTMLInputElement} input - Input a receber a máscara
 */
function adicionarMascaraCPF(input) {
    input.addEventListener('input', function(e) {
        e.target.value = formatarCPF(e.target.value);
    });
}

/**
 * Adiciona máscara de cartão de crédito a um input
 * @param {HTMLInputElement} input - Input a receber a máscara
 */
function adicionarMascaraCartao(input) {
    input.addEventListener('input', function(e) {
        e.target.value = formatarNumeroCartao(e.target.value);
    });
}

/**
 * Adiciona máscara de validade a um input
 * @param {HTMLInputElement} input - Input a receber a máscara
 */
function adicionarMascaraValidade(input) {
    input.addEventListener('input', function(e) {
        e.target.value = formatarValidadeCartao(e.target.value);
    });
}
