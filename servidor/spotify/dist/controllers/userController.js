"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserController = getAllUserController;
exports.getUserByIdController = getUserByIdController;
exports.postUserController = postUserController;
exports.putUserController = putUserController;
exports.deleteUserController = deleteUserController;
const userService_1 = require("../serveis/userService");
async function getAllUserController(_req, res) {
    const tracks = await (0, userService_1.getAllUser)();
    return res.status(200).json(tracks);
}
async function getUserByIdController(req, res) {
    const findUser = await (0, userService_1.getUserById)(req.params.id);
    if (!findUser.success) {
        return res.status(findUser.code).json({ message: findUser.message });
    }
    return res.status(findUser.code).json(findUser);
}
;
async function postUserController(req, res) {
    const result = await (0, userService_1.createUser)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
async function putUserController(req, res) {
    const result = await (0, userService_1.substitUser)(req.body, req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
async function deleteUserController(req, res) {
    const result = await (0, userService_1.deleteUser)(req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).send();
}
