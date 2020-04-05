/* Função Auxiliar para Tratamento e Conversão de Dados vindos em Strings,
   para elementos em Array 
*/
module.exports = function parsingStringAsArray(arrayAsString) {
  return arrayAsString.split(",").map((tech) => tech.trim());
};
