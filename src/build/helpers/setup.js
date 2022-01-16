"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializer = void 0;
const initializer = async (client) => {
    await client.initApplicationCommands({
        guild: { log: true },
        global: { log: true },
    });
    await client.initApplicationPermissions();
};
exports.initializer = initializer;
//# sourceMappingURL=setup.js.map