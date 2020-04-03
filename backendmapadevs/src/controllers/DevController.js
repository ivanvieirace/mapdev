import axios from "axios";
import Dev from "../models/Dev";

module.exports = {
async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;
  
    let developer = await Dev.findOne({ github_username });

    if (!developer) {
        const apiResponse = await axios.get(
            `http://api.github.com/users/${github_username}`
          );
        
          const { name = login, avatar_url, bio } = apiResponse.data;
        
          const techsArray = techs.split(',').map(tech => tech.trim());
        
          const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
          };
        
          const developer = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
          })
    }
  
    return response.json(developer);
  }
};