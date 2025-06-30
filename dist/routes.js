"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("./config/multer"));
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const CreatePlaceController_1 = require("./controllers/place/CreatePlaceController");
const DetailPlaceController_1 = require("./controllers/place/DetailPlaceController");
const ListPlaceController_1 = require("./controllers/place/ListPlaceController");
const ListAllPlacesController_1 = require("./controllers/place/ListAllPlacesController");
const BookingController_1 = require("./controllers/booking/BookingController");
const ListBookingsController_1 = require("./controllers/booking/ListBookingsController");
const DeleteBookingController_1 = require("./controllers/booking/DeleteBookingController");
const UpdatePlaceController_1 = require("./controllers/place/UpdatePlaceController ");
// Config upload
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
// Controllers
const createUserController = new CreateUserController_1.CreateUserController();
const authUserController = new AuthUserController_1.AuthUserController();
const detailUserController = new DetailUserController_1.DetailUserController();
const createPlaceController = new CreatePlaceController_1.CreatePlaceController();
const detailPlaceController = new DetailPlaceController_1.DetailPlaceController();
const listPlaceController = new ListPlaceController_1.ListPlaceController();
const updatePlaceController = new UpdatePlaceController_1.UpdatePlaceController();
const listAllPlacesController = new ListAllPlacesController_1.ListAllPlacesController();
const bookingController = new BookingController_1.BookingController();
const listBookingsController = new ListBookingsController_1.ListBookingsController();
const deleteBookingController = new DeleteBookingController_1.DeleteBookingController();
const router = (0, express_1.Router)();
exports.router = router;
// ROTAS USER
router.post("/users", createUserController.handle.bind(createUserController));
router.post("/login", authUserController.handle.bind(authUserController));
router.get("/me", isAuthenticated_1.isAuthenticated, detailUserController.handle.bind(detailUserController));
router.post("/logout", (req, res) => {
    res.clearCookie("auth_token");
    res.json({ message: "Logout successful" });
});
// ROTAS PLACES
router.post("/places", isAuthenticated_1.isAuthenticated, upload.array("photos"), createPlaceController.handle.bind(createPlaceController));
router.get("/places/:id", isAuthenticated_1.isAuthenticated, detailPlaceController.handle.bind(detailPlaceController));
router.get("/user/places", isAuthenticated_1.isAuthenticated, listPlaceController.handle.bind(listPlaceController));
router.put("/places/:id", isAuthenticated_1.isAuthenticated, upload.array("photos"), updatePlaceController.handle.bind(updatePlaceController));
router.get("/places", listAllPlacesController.handle.bind(listAllPlacesController));
// ROTAS BOOKING
router.post("/bookings", isAuthenticated_1.isAuthenticated, bookingController.handle.bind(bookingController));
router.get("/bookings/user/:userId", isAuthenticated_1.isAuthenticated, listBookingsController.handle.bind(listBookingsController));
router.delete("/bookings/:id", isAuthenticated_1.isAuthenticated, deleteBookingController.handle.bind(deleteBookingController));
