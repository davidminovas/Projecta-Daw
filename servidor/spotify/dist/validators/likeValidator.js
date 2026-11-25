"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidLike = isValidLike;
function isValidLike(like) {
    if (like.user === null || like.track === null || like.liketrack === null) {
        return false;
    }
    return true;
}
