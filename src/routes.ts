import { Router, Request, Response } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { CreatePlaceController } from "./controllers/place/CreatePlaceController";
import { ListPlaceController } from "./controllers/place/ListPlaceController";
import { DetailPlaceController } from "./controllers/place/DetailPlaceController";
import { UpdatePlaceController } from "./controllers/place/UpdatePlaceController ";
import { ListAllPlacesController } from "./controllers/place/ListAllPlacesController";

import uploadConfig from "./config/multer";
import multer from "multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// ROTAS USER
router.post("/users", new CreateUserController().handle);
router.post("/login", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

router.post("/logout", (req: Request, res: Response) => {
    res.clearCookie("auth_token");
    res.status(200).json({ message: "Deslogado com successo" });
});

// ROTAS PLACES
router.get("/places/:id", isAuthenticated, new DetailPlaceController().handle);
router.get("/user/places", isAuthenticated, new ListPlaceController().handle);
router.post("/places", isAuthenticated, upload.single("photos"), new CreatePlaceController().handle);
router.put("/places/:id", isAuthenticated, upload.array("photos"), new UpdatePlaceController().handle);
router.get("/places", new ListAllPlacesController().handle);

export { router };
