const fs = require('fs');

// Ler o arquivo original (input.js)
fs.readFile('input.js', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }

  // Remover `let a = ` para converter em JSON válido
  const jsonString = data.replace(/let a = /, '');

  // Parse do JSON para objeto JavaScript
  const jsonData = JSON.parse(jsonString);

  // Gerar a string com a nova sintaxe sem aspas nas chaves
  const outputContent = `let inscritos = ${JSON.stringify(jsonData, null, 2)
    .replace(/"(\w+)":/g, '$1:')};\n`;

  // Salvar no novo arquivo (output.js)
  fs.writeFile('output.js', outputContent, (err) => {
    if (err) {
      console.error('Erro ao escrever o arquivo:', err);
    } else {
      console.log('Arquivo output.js criado com sucesso!');
    }
  });
});
