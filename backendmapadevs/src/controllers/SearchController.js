import Dev from "../models/Dev";
import parseStringAsArray from "../utils/parseStringAsArray";

module.exports = {
  // Rota de Busca de Desenvolvedores, por Raio Geográfico e Stack de Tecnologias
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStringAsArray(techs);

    const developerFiltro = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return response.json({ developerFiltro });
  },
};
