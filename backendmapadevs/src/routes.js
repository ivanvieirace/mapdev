import { Router } from "express";
import DevController from "./controllers/DevController";
import SearchController from "./controllers/SearchController";

const routes = Router();

// Rotas
routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);
routes.put("/devs", DevController.update);
routes.delete("/devs/:id", DevController.destroy);
routes.get("/search", SearchController.index);

export default routes;
