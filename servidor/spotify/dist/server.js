"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const apiConfig_1 = require("./config/apiConfig");
app_1.app.listen(apiConfig_1.APICONFIG.port, apiConfig_1.APICONFIG.host, () => {
    console.log(`Servidor escoltant a ${apiConfig_1.APICONFIG.host}:${apiConfig_1.APICONFIG.port}`);
});
