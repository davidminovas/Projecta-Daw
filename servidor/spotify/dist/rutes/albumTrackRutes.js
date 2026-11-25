"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.albumTrackRuter = void 0;
const express_1 = require("express");
const albumTrackController_1 = require("../controllers/albumTrackController");
exports.albumTrackRuter = (0, express_1.Router)();
exports.albumTrackRuter.post("/", albumTrackController_1.postAlbumTrackController);
exports.albumTrackRuter.delete("/:id", albumTrackController_1.deleteAlbumTrackController);
