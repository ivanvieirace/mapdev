import axios from "axios";
import Dev from "../models/Dev";
import parseStringAsArray from "../utils/parseStringAsArray";
import { response } from "express";

// index, show, store, update, destroy

module.exports = {
  // Rota de Consulta Geral de todos os Desenvolvedores
  async index(request, response) {
    const developer = await Dev.find();

    return response.json(developer);
  },

  // Rota de Cadastro de Novos Desenvolvedores
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let developer = await Dev.findOne({ github_username });

    if (!developer) {
      const apiResponse = await axios.get(
        `http://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude],
      };

      const developer = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
    }

    return response.json(developer);
  },

  // Rota Atualização de Registro Desenvolvedor
  async update(request, response) {
    const developerUpdate = await Dev.findOneAndUpdate(
      request.params.github_username,
      request.body,
      {
        new: true,
      }
    );

    return response.json(developerUpdate);
  },

  async destroy(request, response) {
    await Dev.findByIdAndRemove(request.params.id);

    return response.send();
  },
};
