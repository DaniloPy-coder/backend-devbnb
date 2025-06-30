import { Router, Request, Response } from "express";
import multer from "multer";

import uploadConfig from "./config/multer";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreatePlaceController } from "./controllers/place/CreatePlaceController";
import { DetailPlaceController } from "./controllers/place/DetailPlaceController";
import { ListPlaceController } from "./controllers/place/ListPlaceController";
import { ListAllPlacesController } from "./controllers/place/ListAllPlacesController";

import { BookingController } from "./controllers/booking/BookingController";
import { ListBookingsController } from "./controllers/booking/ListBookingsController";
import { DeleteBookingController } from "./controllers/booking/DeleteBookingController";
import { UpdatePlaceController } from "./controllers/place/UpdatePlaceController";
// Config upload
const upload = multer(uploadConfig.upload());

// Controllers
const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const detailUserController = new DetailUserController();

const createPlaceController = new CreatePlaceController();
const detailPlaceController = new DetailPlaceController();
const listPlaceController = new ListPlaceController();
const updatePlaceController = new UpdatePlaceController();
const listAllPlacesController = new ListAllPlacesController();

const bookingController = new BookingController();
const listBookingsController = new ListBookingsController();
const deleteBookingController = new DeleteBookingController();

const router = Router();

// ROTAS USER
router.post("/users", createUserController.handle.bind(createUserController));
router.post("/login", authUserController.handle.bind(authUserController));
router.get("/me", isAuthenticated, detailUserController.handle.bind(detailUserController));
router.post("/logout", (req: Request, res: Response) => {
    res.clearCookie("auth_token");
    res.json({ message: "Logout successful" });
});

// ROTAS PLACES
router.post(
    "/places",
    isAuthenticated,
    upload.array("photos"),
    createPlaceController.handle.bind(createPlaceController)
);

router.get(
    "/places/:id",
    isAuthenticated,
    detailPlaceController.handle.bind(detailPlaceController)
);

router.get(
    "/user/places",
    isAuthenticated,
    listPlaceController.handle.bind(listPlaceController)
);

router.put(
    "/places/:id",
    isAuthenticated,
    upload.array("photos"),
    updatePlaceController.handle.bind(updatePlaceController)
);

router.get(
    "/places",
    listAllPlacesController.handle.bind(listAllPlacesController)
);

// ROTAS BOOKING
router.post(
    "/bookings",
    isAuthenticated,
    bookingController.handle.bind(bookingController)
);

router.get(
    "/bookings/user/:userId",
    isAuthenticated,
    listBookingsController.handle.bind(listBookingsController)
);

router.delete(
    "/bookings/:id",
    isAuthenticated,
    deleteBookingController.handle.bind(deleteBookingController)
);

export { router };
