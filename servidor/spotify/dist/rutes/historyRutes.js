"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyRuter = void 0;
const express_1 = require("express");
const historyController_1 = require("../controllers/historyController");
exports.historyRuter = (0, express_1.Router)();
exports.historyRuter.get("/:id", historyController_1.getHistoryByIdController);
exports.historyRuter.post("/", historyController_1.postHistoryController);
