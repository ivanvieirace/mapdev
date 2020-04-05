import axios from "axios";
import Dev from "../models/Dev";
import parseStringAsArray from "../utils/parseStringAsArray";

// index, show, store, update, destroy

module.exports = {
  async index(request, response) {
    const developer = await Dev.find();

    return response.json(developer);
  },

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
};
