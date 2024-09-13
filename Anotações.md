
## Anotações Gerais - Automação com Cypress

O objetivo desta documentação é registrar as principais funcionalidades, comandos, funções, e demais detalhes a respeito dos testes automatizados com o Cypress. Servindo também de apoio e consolidação do conhecimento.


### Comandos/Instalações

Instalar o Cypress

```bash
  npm install cypress@13.12.0 --save-dev
```

Executar o Cypress

```bash
  npx cypress open
```

Executar o script de teste
```bash
  npm run cy:open
```

### Extensões (opcionais)
* Cypress Helper

## Funções/Argumentos

Acesso à determinada página da web:
```javascript
cy.visit('https://example.com.br')
```

Validação de Títulos
```javascript
cy.title()
cy.title().should('parâmetro 1', 'Título')
```

Should
- Utilizado para criar uma verificação de resultados esperados. Elas são automaticamente re-tentadas por alguns segundos (por default o Cypress utiliza 4 segundos, mas é possível alterar esse tempo).

Argumentos do Should
```javascript
'be.equal'
'be.visible'
'have.class'
'not.be.equal'
```

Type
- Utilizado para digitar em campos. Essa função é geralmente associada a outras, como por exemplo o get. Um exemplo correto de sua utilização seria algo semelhante a:
```javascript
cy.get('input').type('Olá, Mundo!')
```
Este comando fará com que o campo input recebe a escrita "Olá, Mundo!".


Click
- Utilizado para clicar em elementos do DOM. Um exemplo correto de sua utilização:
```javascript
cy.get('.btn').click() // Acessa a classe .btn e clica sobre o botão
cy.contains('Welcome').click() // Clica no primeiro elemento que contenha a palavra "Welcome"
```

Get
- Função utilizada para acessar determinado elemento do DOM (Document Element Model). Exemplo: classes, ids, li, ul, ol, e outros disponíveis.
```javascript
cy.get()
cy.get('input').should('be.visible')
cy.get('.dropdown-menu').click()
```


Encadeamento de Comandos
- O encadeamento permite armazenar um ou mais comandos dentro da mesma função, permitindo que outras verificações sejam feitas para o mesmo elemento. Exemplo:

```javascript
cy.get('input[type="text"]')
  .type('Olá mundo!')
  .should('have.value', 'Olá mundo!')
```

Também é interessante fazer verificações intermediárias. Exemplo:

```javascript
cy.get('input[type="text"]')
  .should('be.visible')
  .type('Olá mundo!')
  .should('have.value', 'Olá mundo!')
```

Nessa verificação, analisamos primeiramente se o input indicado está visível antes mesmo de acessá-lo e prosseguir para o "type". Ainda que seja possível tal análise, não é uma boa prática encadear um comando .should() após outro comando de ação. 

Uma alternativa mais indicada para a cadeia de comandos seria algo semelhante a:

```javascript
  cy.get('input[type="text"]')
    .as('textField')
    .should('be.visible')
    .type('Olá mundo!')

  cy.get('@textField')
    .should('have.value', 'Olá mundo!')
```

No exemplo acima, após obter o 'input' do tipo 'text', cria-se uma referência a ele atribuindo-lhe um alias e o comando 'type' fica ao final. Posteriormente, o alias criado é utilizado para executar a última verificação com o '.should'.

O beforeEach é utilizado para executar um conjunto de instruções antes de cada teste individual dentro de um 'describe'. Ele é útil para configurar o estado inicial necessári para que cada teste seja executado de forma isolada e consistente.

Motivos para se utilizar o 'beforeEach':

1. Reutilização de código
Caso seja necessário repetir uma série de passos em vários testes, como acessar uma ágina ou realizar um login, basta utilizá-lo. Isso evita duplicação de código.

2. Estado consistente
Ao garantir que cada teste comece em um estado inicial conhecido, evita-se a interferência entre testes. Isso é importante para evitar falsos positivos ou negativos causados por efeitos colaterais de testes anteriores.

3. Facilidade de manutenção
Caso haja necessidade de alteração, basta modificar o código no 'beforeEach', e todos os testes que dependem dele serão automaticamente atualizados.

4. Isolamento de teste
Garante que os testes sejam independentes uns dos outros, o que é uma boa prática em testes automatizados. Isso significa que a falha de um teste não deve afetar os resultados dos outros.

Um bom exemplo pode ser utilizado para uma aplicação que requer autenticação. Nesse caso, você pode colocar o login no 'beforeEach' para que todos os testes dentro daquele 'describe' já estejam autenticados:

```javascript
  beforeEach(() => {
  cy.visit('/login');
  cy.get('input[name="username"]').type('user');
  cy.get('input[name="password"]').type('password');
  cy.get('button[type="submit"]').click();
});
```

.select()
```javascript
  cy.get('input[type="radio"][value="feedback"]').check() // Encadear o .check() permite marcar o radio indicado
```

.check() 
```javascript
it('CT09 - Validando todas as opções de seleção do tipo radio', () => {
        cy.get('input[type="radio"]')
        .each(TypeOfServices => {
            cy.wrap(TypeOfServices) // o .wrap itera sobre todos os itens disponíveis passíveis de seleção
            .check()
            .should('be.checked')
        })
})
```
Com o .check também é possíveis marcar inputs do tipo Checkbox. Para desmarcá-lo, pode-se utilizar o comando .uncheck()


.selectFile()

- Este comando permite selecionar um arquivo em inputs de upload. Basta encadeá-lo ao comando .get(), por exemplo, e então passar o caminho do arquivo desejado.

