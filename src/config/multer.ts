import multer from "multer";

export default {
    upload() {
        return {
            storage: multer.memoryStorage(),
        };
    }
};
