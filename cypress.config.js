const { defineConfig } = require('cypress');

// Altera a visualização da aplicação em termos de dimensões de altura e largura

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {},
});


