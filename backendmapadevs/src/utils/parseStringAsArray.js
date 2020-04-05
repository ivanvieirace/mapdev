module.exports = function parsingStringAsArray(arrayAsString) {
  return arrayAsString.split(",").map((tech) => tech.trim());
};
