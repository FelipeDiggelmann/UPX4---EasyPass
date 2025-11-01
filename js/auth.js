// ===== AUTENTICAÇÃO =====

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const loginForm = document.getElementById('loginForm');
    const cadastroForm = document.getElementById('cadastroForm');
    const formLogin = document.getElementById('formLogin');
    const formCadastro = document.getElementById('formCadastro');
    const showCadastro = document.getElementById('showCadastro');
    const showLogin = document.getElementById('showLogin');

    // Inputs de Login
    const loginCpf = document.getElementById('loginCpf');
    const loginSenha = document.getElementById('loginSenha');

    // Inputs de Cadastro
    const cadastroNome = document.getElementById('cadastroNome');
    const cadastroCpf = document.getElementById('cadastroCpf');
    const cadastroSenha = document.getElementById('cadastroSenha');
    const cadastroConfirmaSenha = document.getElementById('cadastroConfirmaSenha');

    // Adicionar máscaras de CPF
    adicionarMascaraCPF(loginCpf);
    adicionarMascaraCPF(cadastroCpf);

    // Alternar entre formulários
    showCadastro.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.classList.remove('active');
        cadastroForm.classList.add('active');
    });

    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        cadastroForm.classList.remove('active');
        loginForm.classList.add('active');
    });

    // ===== PROCESSAR LOGIN =====
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();

        const cpf = limparCPF(loginCpf.value);
        const senha = loginSenha.value;

        // Validações
        if (!validarCPF(cpf)) {
            exibirErro('CPF inválido!', loginForm);
            return;
        }

        if (!senha) {
            exibirErro('Digite sua senha!', loginForm);
            return;
        }

        // Buscar usuário
        const usuario = Storage.buscarUsuarioPorCPF(cpf);

        if (!usuario) {
            exibirErro('Usuário não encontrado! Faça seu cadastro.', loginForm);
            return;
        }

        if (usuario.senha !== senha) {
            exibirErro('Senha incorreta!', loginForm);
            return;
        }

        // Login bem-sucedido
        Storage.salvarUsuarioLogado(usuario);
        exibirSucesso('Login realizado com sucesso!', loginForm);
        
        setTimeout(() => {
            redirecionar('dashboard.html');
        }, 1000);
    });

    // ===== PROCESSAR CADASTRO =====
    formCadastro.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = cadastroNome.value.trim();
        const cpf = limparCPF(cadastroCpf.value);
        const senha = cadastroSenha.value;
        const confirmaSenha = cadastroConfirmaSenha.value;

        // Validações
        if (!nome) {
            exibirErro('Digite seu nome completo!', cadastroForm);
            return;
        }

        if (!validarCPF(cpf)) {
            exibirErro('CPF inválido!', cadastroForm);
            return;
        }

        if (!senha || senha.length < 4) {
            exibirErro('A senha deve ter no mínimo 4 caracteres!', cadastroForm);
            return;
        }

        if (senha !== confirmaSenha) {
            exibirErro('As senhas não coincidem!', cadastroForm);
            return;
        }

        // Verificar se CPF já está cadastrado
        const usuarioExistente = Storage.buscarUsuarioPorCPF(cpf);
        if (usuarioExistente) {
            exibirErro('CPF já cadastrado! Faça login.', cadastroForm);
            return;
        }

        // Criar novo usuário
        const novoUsuario = {
            nome: nome,
            cpf: cpf,
            senha: senha,
            dataCadastro: new Date().toISOString()
        };

        // Salvar usuário
        if (Storage.salvarUsuario(novoUsuario)) {
            exibirSucesso('Cadastro realizado com sucesso! Faça login.', cadastroForm);
            
            // Limpar formulário
            formCadastro.reset();
            
            // Voltar para login após 2 segundos
            setTimeout(() => {
                cadastroForm.classList.remove('active');
                loginForm.classList.add('active');
            }, 2000);
        } else {
            exibirErro('Erro ao realizar cadastro. Tente novamente.', cadastroForm);
        }
    });
});
