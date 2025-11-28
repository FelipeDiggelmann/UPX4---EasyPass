# Projeto de Recarga de Cartão de Ônibus - EasyPass

Este é um projeto de site para recarga de cartões de ônibus, desenvolvido com HTML, CSS e JavaScript puro. O projeto foi criado como ambiente de testes e aprendizado, funcionando inteiramente no lado do cliente (frontend) e utilizando o `localStorage` do navegador para simular um banco de dados.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
/recarga-cartao-onibus
|-- /assets
    |--images
|-- /css
|   |-- global.css
|   |-- login.css
|   |-- dashboard.css
|   |-- recarga.css
|   |-- historico.css
|   |-- chat.css
|   `-- configuracoes.css
|-- /js
|   |-- utils.js
|   |-- storage.js
|   |-- auth.js
|   |-- dashboard.js
|   |-- recarga.js
|   |-- historico.js
|   |-- chat.js
|   `-- configuracoes.js
|-- index.html
|-- dashboard.html
|-- recarga.html
|-- historico.html
|-- chat.html
|-- configuracoes.html
`-- README.md
```

- **`/css`**: Contém todos os arquivos de estilo CSS, separados por página para melhor organização.
- **`/js`**: Contém os arquivos JavaScript, modularizados por funcionalidade.
- **`*.html`**: São as páginas do site.
- **`README.md`**: Este arquivo que você está lendo.

## Requisitos

Antes de clonar e executar o projeto, certifique-se de ter instalado o Git e o Visual Studio Code (opcional, mas recomendado). Para verificar se o Git está instalado no seu sistema, abra o terminal e execute:

```
git --version
```

Se o comando retornar uma versão (por exemplo `git version 2.x.x`), o Git está instalado. Caso contrário, instale o Git a partir de https://git-scm.com/downloads.

## Como obter o projeto (via Git - recomendado)

Em vez de baixar um arquivo `.zip`, recomendamos clonar o repositório diretamente do GitHub. Clonar traz todo o histórico do projeto e facilita atualizações futuras. Abra o terminal e execute os comandos abaixo.

1. Navegue até a pasta onde quer salvar o projeto:

```
cd /caminho/para/a/pasta/desejada
```

2. Clone o repositório usando HTTPS:

```
git clone https://github.com/FelipeDiggelmann/UPX4---EasyPass
```

Se preferir clonar usando SSH (requer que sua chave pública esteja adicionada ao GitHub), use:

```
git clone git@github.com:FelipeDiggelmann/UPX4---EasyPass.git
```

3. Entre na pasta do projeto:

```
cd UPX4---EasyPass
```

4. (Opcional) Se quiser clonar para uma pasta com nome diferente, adicione o nome desejado ao final:

```
git clone https://github.com/FelipeDiggelmann/UPX4---EasyPass EasyPass
```

5. Para atualizar o repositório local com alterações remotas no futuro:

```
git pull
```

## Configuração opcional do Git (primeiro uso)

Se for a primeira vez que usa o Git neste computador, configure seu nome e e-mail:

```
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

Se for usar SSH, crie uma chave SSH (caso não tenha) e adicione ao GitHub. Exemplos rápidos:

```
ssh-keygen -t ed25519 -C "seu.email@example.com"
cat ~/.ssh/id_ed25519.pub
```

Cole o conteúdo da chave pública nas configurações de SSH do GitHub.

## Executando o projeto no VSCode com Live Server

Como este é um projeto puramente frontend, não há necessidade de backend. A forma mais fácil de executar é utilizar o VSCode com a extensão Live Server.

1. Abra o Visual Studio Code.
2. Vá em `File > Open Folder...` e selecione a pasta do projeto (por exemplo `UPX4---EasyPass`).
3. Instale a extensão **Live Server** (de Ritwick Dey) caso ainda não tenha.
4. Clique com o botão direito em `index.html` e escolha `Open with Live Server`.
5. O Live Server abrirá seu navegador padrão apontando para `index.html`. Pronto, você pode testar as funcionalidades.

## Observações sobre armazenamento de dados

O projeto usa o `localStorage` do navegador para simular um banco de dados. Os dados persistem no navegador em que o projeto for executado. Para limpar os dados, abra as ferramentas de desenvolvedor do navegador (geralmente `F12`), vá em `Application > Local Storage` e remova as entradas relacionadas ao projeto.

## Contribuindo

Se quiser contribuir, a forma recomendada é:

1. Faça um fork do repositório no GitHub.
2. Clone seu fork localmente.
3. Crie uma branch para sua alteração:

```
git checkout -b minha-feature
```

4. Faça commits claros e pequenos:

```
git add .
git commit -m "Descrição da mudança"
```

5. Envie a branch para seu fork:

```
git push origin minha-feature
```

6. Abra um Pull Request no repositório original.
---

## Integração Frontend e "Backend"

Neste projeto, não há um backend real (como Node.js, Python, etc.). A persistência de dados (cadastro de usuários, histórico de recargas) é simulada utilizando o `localStorage` do navegador. Esta é uma API que permite salvar pares de chave-valor no navegador, que persistem mesmo após o fechamento da aba ou do navegador.

-   **`js/storage.js`**: Este arquivo centraliza todas as operações de leitura e escrita no `localStorage`. Ele fornece funções como `getUsers`, `saveUser`, `getHistory`, etc., que os outros arquivos JavaScript utilizam para manipular os dados.

-   **`js/auth.js`**: Gerencia o cadastro e login de usuários, utilizando o `storage.js` para salvar e recuperar as informações.

-   **`js/recarga.js`**: Controla o fluxo de recarga e salva as transações no histórico através do `storage.js`.

Essa abordagem torna o projeto totalmente independente e fácil de executar, sem a necessidade de configurar um ambiente de backend, o que é ideal para fins de aprendizado e prototipagem de interfaces.

## Dependências

Este projeto não possui dependências externas de bibliotecas ou frameworks. Foi construído utilizando apenas **HTML5**, **CSS3** e **JavaScript (ES6+)**.
