# Projeto de Recarga de Cartão de Ônibus

Este é um projeto de um site para recarga de cartões de ônibus, desenvolvido com HTML, CSS e JavaScript puro. O projeto foi criado para ser um ambiente de testes e aprendizado, funcionando inteiramente no lado do cliente (frontend) e utilizando o `localStorage` do navegador para simular um banco de dados.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
/recarga-cartao-onibus
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

## Como Executar o Projeto no Windows com VSCode

Como este é um projeto puramente frontend, não há necessidade de um backend complexo ou integração com banco de dados. Você pode executá-lo diretamente no seu navegador. A forma mais fácil de fazer isso usando o VSCode é com a extensão **Live Server**.

**Passo a passo:**

1.  **Instale o Visual Studio Code:** Se ainda não o tiver, baixe e instale o [VSCode para Windows](https://code.visualstudio.com/download).

2.  **Abra o Projeto no VSCode:**
    -   Extraia o arquivo `.zip` que você recebeu em uma pasta de sua preferência.
    -   Abra o VSCode.
    -   Vá em `File > Open Folder...` (ou `Arquivo > Abrir Pasta...`) e selecione a pasta `recarga-cartao-onibus` que você extraiu.

3.  **Instale a Extensão Live Server:**
    -   No VSCode, clique no ícone de Extensões na barra lateral esquerda (parece um conjunto de quadrados).
    -   Na barra de busca, digite `Live Server`.
    -   Clique em `Install` (ou `Instalar`) na extensão criada por Ritwick Dey.

4.  **Inicie o Servidor Local:**
    -   Com o projeto aberto no VSCode, clique com o botão direito no arquivo `index.html` na lista de arquivos.
    -   Selecione a opção `Open with Live Server` (ou `Abrir com Live Server`).


5.  **Pronto!** O Live Server iniciará um servidor local e abrirá o seu navegador padrão na página `index.html`. Agora você pode navegar e testar todas as funcionalidades do site.

## Integração Frontend e "Backend"

Neste projeto, não há um backend real (como Node.js, Python, etc.). A persistência de dados (cadastro de usuários, histórico de recargas) é simulada utilizando o `localStorage` do navegador. Esta é uma API que permite salvar pares de chave-valor no navegador, que persistem mesmo após o fechamento da aba ou do navegador.

-   **`js/storage.js`**: Este arquivo centraliza todas as operações de leitura e escrita no `localStorage`. Ele fornece funções como `getUsers`, `saveUser`, `getHistory`, etc., que os outros arquivos JavaScript utilizam para manipular os dados.

-   **`js/auth.js`**: Gerencia o cadastro e login de usuários, utilizando o `storage.js` para salvar e recuperar as informações.

-   **`js/recarga.js`**: Controla o fluxo de recarga e salva as transações no histórico através do `storage.js`.

Essa abordagem torna o projeto totalmente independente e fácil de executar, sem a necessidade de configurar um ambiente de backend, o que é ideal para fins de aprendizado e prototipagem de interfaces.

## Dependências

Este projeto não possui dependências externas de bibliotecas ou frameworks. Foi construído utilizando apenas **HTML5**, **CSS3** e **JavaScript (ES6+)**.
