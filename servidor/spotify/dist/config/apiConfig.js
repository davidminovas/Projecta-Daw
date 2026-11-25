"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APICONFIG = void 0;
exports.APICONFIG = {
    name: "API Spotify",
    description: "Manage Spotify funcionslity",
    host: "localhost",
    port: 3000,
    status: "Working",
    version: {
        major: 1,
        minor: 0,
        patch: 0
    },
    resources: [
        {
            name: "Root end point",
            endPoint: "/"
        },
        {
            name: "Track(songs)",
            endPoint: "GET /tracks",
        },
        {
            name: "Playlist tracks",
            endPoint: "GET /playList/:id/tracks",
        }
    ]
};
