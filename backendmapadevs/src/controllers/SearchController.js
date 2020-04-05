import Dev from "../models/Dev";
import parseStringAsArray from "../utils/parseStringAsArray";

module.exports = {
  async index(request, response) {
    // Busca Devs num Raio de 10km
    // Filtrar por Tecnologias

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
