// ===== GERENCIAMENTO DE ARMAZENAMENTO LOCAL =====

const Storage = {
    /**
     * Salva dados no localStorage
     * @param {string} chave - Chave de armazenamento
     * @param {*} valor - Valor a ser armazenado
     */
    salvar(chave, valor) {
        try {
            localStorage.setItem(chave, JSON.stringify(valor));
            return true;
        } catch (error) {
            console.error('Erro ao salvar no localStorage:', error);
            return false;
        }
    },

    /**
     * Carrega dados do localStorage
     * @param {string} chave - Chave de armazenamento
     * @returns {*} Valor armazenado ou null
     */
    carregar(chave) {
        try {
            const valor = localStorage.getItem(chave);
            return valor ? JSON.parse(valor) : null;
        } catch (error) {
            console.error('Erro ao carregar do localStorage:', error);
            return null;
        }
    },

    /**
     * Remove dados do localStorage
     * @param {string} chave - Chave de armazenamento
     */
    remover(chave) {
        try {
            localStorage.removeItem(chave);
            return true;
        } catch (error) {
            console.error('Erro ao remover do localStorage:', error);
            return false;
        }
    },

    /**
     * Limpa todo o localStorage
     */
    limparTudo() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Erro ao limpar localStorage:', error);
            return false;
        }
    },

    // ===== USUÁRIOS =====

    /**
     * Salva um novo usuário
     * @param {Object} usuario - Dados do usuário
     */
    salvarUsuario(usuario) {
        const usuarios = this.carregarUsuarios();
        usuarios.push(usuario);
        return this.salvar('usuarios', usuarios);
    },

    /**
     * Carrega todos os usuários
     * @returns {Array} Lista de usuários
     */
    carregarUsuarios() {
        return this.carregar('usuarios') || [];
    },

    /**
     * Busca usuário por CPF
     * @param {string} cpf - CPF do usuário
     * @returns {Object|null} Usuário encontrado ou null
     */
    buscarUsuarioPorCPF(cpf) {
        const usuarios = this.carregarUsuarios();
        return usuarios.find(u => u.cpf === limparCPF(cpf)) || null;
    },

    /**
     * Atualiza dados do usuário
     * @param {string} cpf - CPF do usuário
     * @param {Object} novosDados - Novos dados do usuário
     */
    atualizarUsuario(cpf, novosDados) {
        const usuarios = this.carregarUsuarios();
        const index = usuarios.findIndex(u => u.cpf === limparCPF(cpf));
        
        if (index !== -1) {
            usuarios[index] = { ...usuarios[index], ...novosDados };
            return this.salvar('usuarios', usuarios);
        }
        
        return false;
    },

    // ===== SESSÃO =====

    /**
     * Salva usuário logado
     * @param {Object} usuario - Dados do usuário
     */
    salvarUsuarioLogado(usuario) {
        return this.salvar('usuarioLogado', usuario);
    },

    /**
     * Carrega usuário logado
     * @returns {Object|null} Usuário logado ou null
     */
    carregarUsuarioLogado() {
        return this.carregar('usuarioLogado');
    },

    /**
     * Remove usuário logado (logout)
     */
    removerUsuarioLogado() {
        return this.remover('usuarioLogado');
    },

    /**
     * Verifica se há usuário logado
     * @returns {boolean} True se há usuário logado
     */
    estaLogado() {
        return this.carregarUsuarioLogado() !== null;
    },

    // ===== HISTÓRICO DE RECARGAS =====

    /**
     * Salva uma recarga no histórico
     * @param {Object} recarga - Dados da recarga
     */
    salvarRecarga(recarga) {
        const historico = this.carregarHistorico();
        recarga.id = Date.now();
        recarga.data = new Date().toISOString();
        historico.unshift(recarga); // Adiciona no início
        return this.salvar('historico', historico);
    },

    /**
     * Carrega histórico de recargas
     * @returns {Array} Lista de recargas
     */
    carregarHistorico() {
        return this.carregar('historico') || [];
    },

    /**
     * Carrega histórico do usuário logado
     * @returns {Array} Lista de recargas do usuário
     */
    carregarHistoricoUsuario() {
        const usuario = this.carregarUsuarioLogado();
        if (!usuario) return [];
        
        const historico = this.carregarHistorico();
        return historico.filter(r => r.cpf === usuario.cpf);
    },

    // ===== CONFIGURAÇÕES =====

    /**
     * Salva configurações de acessibilidade
     * @param {Object} config - Configurações
     */
    salvarConfiguracoes(config) {
        return this.salvar('configuracoes', config);
    },

    /**
     * Carrega configurações de acessibilidade
     * @returns {Object} Configurações
     */
    carregarConfiguracoes() {
        return this.carregar('configuracoes') || {
            tema: 'claro',
            fonte: 'media',
            daltonismo: 'nenhum'
        };
    },

    /**
     * Reseta configurações para padrão
     */
    resetarConfiguracoes() {
        const configPadrao = {
            tema: 'claro',
            fonte: 'media',
            daltonismo: 'nenhum'
        };
        return this.salvar('configuracoes', configPadrao);
    },

    // ===== SALDO DOS CARTÕES =====

    /**
     * Inicializa os saldos dos cartões para um novo usuário
     * @param {string} cpf - CPF do usuário
     */
    inicializarSaldos(cpf) {
        const cpfLimpo = limparCPF(cpf);
        const saldos = this.carregarSaldos();
        
        if (!saldos[cpfLimpo]) {
            saldos[cpfLimpo] = {
                estudante: 0,
                social: 0
            };
            this.salvar('saldos', saldos);
        }
    },

    /**
     * Carrega todos os saldos
     * @returns {Object} Objeto com saldos de todos os usuários
     */
    carregarSaldos() {
        return this.carregar('saldos') || {};
    },

    /**
     * Carrega o saldo de um usuário
     * @param {string} cpf - CPF do usuário
     * @returns {Object} Objeto com saldos {estudante, social}
     */
    carregarSaldoUsuario(cpf) {
        const cpfLimpo = limparCPF(cpf);
        const saldos = this.carregarSaldos();
        return saldos[cpfLimpo] || { estudante: 0, social: 0 };
    },

    /**
     * Atualiza o saldo de um cartão
     * @param {string} cpf - CPF do usuário
     * @param {string} tipo - Tipo de cartão ('estudante' ou 'social')
     * @param {number} valor - Valor a ser adicionado
     */
    atualizarSaldo(cpf, tipo, valor) {
        const cpfLimpo = limparCPF(cpf);
        const saldos = this.carregarSaldos();
        
        if (!saldos[cpfLimpo]) {
            saldos[cpfLimpo] = { estudante: 0, social: 0 };
        }
        
        saldos[cpfLimpo][tipo] = (saldos[cpfLimpo][tipo] || 0) + valor;
        return this.salvar('saldos', saldos);
    }
};
