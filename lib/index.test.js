"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ava_1 = __importDefault(require("ava"));
var index_1 = require("./index");
ava_1["default"]('one plus two equals three', function (t) {
    t.is(index_1.sum(1, 2), 3);
});
