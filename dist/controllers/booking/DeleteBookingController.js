"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBookingController = void 0;
const DeleteBookingService_1 = require("../../services/booking/DeleteBookingService");
class DeleteBookingController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const service = new DeleteBookingService_1.DeleteBookingService();
            try {
                const result = yield service.execute(id);
                return res.json(result);
            }
            catch (err) {
                return res.status(400).json({ message: err.message });
            }
        });
    }
}
exports.DeleteBookingController = DeleteBookingController;
