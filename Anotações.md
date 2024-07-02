
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




## Funções/Argumentos

Acesso à determinada página da web:
```javascript
cy.visit('https://example.com.br')
```

Validação de "titles"
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

