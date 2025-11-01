# Arquitetura do Projeto - Recarga de Cartão de Ônibus

## Estrutura de Diretórios

```
recarga-cartao-onibus/
├── index.html              # Página de login/cadastro
├── dashboard.html          # Tela principal com serviços
├── recarga.html           # Fluxo de recarga
├── historico.html         # Histórico de recargas
├── chat.html              # Atendimento por chat
├── configuracoes.html     # Configurações e acessibilidade
├── css/
│   ├── global.css         # Estilos globais e variáveis CSS
│   ├── login.css          # Estilos da página de login
│   ├── dashboard.css      # Estilos do dashboard
│   ├── recarga.css        # Estilos do fluxo de recarga
│   ├── historico.css      # Estilos do histórico
│   ├── chat.css           # Estilos do chat
│   └── configuracoes.css  # Estilos das configurações
├── js/
│   ├── auth.js            # Gerenciamento de autenticação
│   ├── storage.js         # Gerenciamento de localStorage
│   ├── dashboard.js       # Lógica do dashboard
│   ├── recarga.js         # Lógica do fluxo de recarga
│   ├── historico.js       # Lógica do histórico
│   ├── chat.js            # Lógica do chat
│   ├── configuracoes.js   # Lógica de acessibilidade
│   └── utils.js           # Funções utilitárias
├── assets/
│   └── images/            # Imagens e ícones
├── README.md              # Documentação principal
└── TUTORIAL_WINDOWS.md    # Tutorial para Windows/VSCode

```

## Funcionalidades por Página

### 1. index.html - Login/Cadastro
- Formulário de login (CPF e senha)
- Formulário de cadastro (Nome, CPF, Senha)
- Validação básica de CPF
- Armazenamento em localStorage

### 2. dashboard.html - Tela Principal
- Menu de serviços:
  - Recarga Estudante
  - Recarga Social
  - Chat/Atendimento
  - Histórico de Recargas
  - Configurações
- Exibição de informações do usuário

### 3. recarga.html - Fluxo de Recarga
- Confirmação de CPF
- Seleção de valor (R$ 10, 20, 30, 50 ou personalizado)
- Limite de R$ 135 para estudante
- Seleção de método de pagamento (Débito, Crédito, PIX)
- Formulário de cartão (se débito/crédito)
- Geração de QR Code e chave PIX (se PIX)
- Botão de simulação de pagamento
- Confirmação de pagamento

### 4. historico.html - Histórico
- Lista de recargas anteriores
- Filtros por data/tipo

### 5. chat.html - Atendimento
- Interface de chat simulado
- Respostas automáticas básicas

### 6. configuracoes.html - Configurações
- Seleção de tema (claro/escuro)
- Ajuste de tamanho de fonte (pequeno/médio/grande)
- Filtros de daltonismo (protanopia, deuteranopia, tritanopia)

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização com variáveis CSS para temas
- **JavaScript (Vanilla)**: Lógica e interatividade
- **localStorage**: Persistência de dados local
- **QRCode.js**: Geração de QR Code para PIX

## Fluxo de Dados

1. Usuário faz login/cadastro → dados salvos no localStorage
2. Dashboard carrega informações do usuário logado
3. Recarga salva histórico no localStorage
4. Configurações aplicam CSS dinâmico via classes/variáveis
5. Todas as páginas verificam autenticação ao carregar

## Recursos de Acessibilidade

- Temas claro/escuro com variáveis CSS
- Tamanhos de fonte ajustáveis
- Filtros de cor para daltonismo (CSS filters)
- Navegação por teclado
- Labels semânticos

## Segurança (Ambiente de Teste)

⚠️ **IMPORTANTE**: Este é um projeto de teste/aprendizado
- Sem criptografia de senha
- Sem validação de backend
- Dados armazenados apenas no navegador
- Não usar em produção
