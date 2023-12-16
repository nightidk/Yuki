"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPermissions = void 0;
var userPermissions;
(function (userPermissions) {
    userPermissions[userPermissions["DISABLED"] = -1] = "DISABLED";
    userPermissions[userPermissions["DEFAULT"] = 0] = "DEFAULT";
    userPermissions[userPermissions["BOOST"] = 1] = "BOOST";
    userPermissions[userPermissions["BETA"] = 2] = "BETA";
    userPermissions[userPermissions["DEVELOPER"] = 3] = "DEVELOPER";
    userPermissions[userPermissions["MODERATION"] = 4] = "MODERATION";
    userPermissions[userPermissions["MANAGER"] = 5] = "MANAGER";
    userPermissions[userPermissions["CURATOR"] = 6] = "CURATOR";
})(userPermissions = exports.userPermissions || (exports.userPermissions = {}));
