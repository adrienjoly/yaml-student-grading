#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var yaml_1 = __importDefault(require("yaml"));
var scoring_1 = require("./scoring");
var USAGE = "Usage: $ ./grade student-grading.yaml";
var yamlFilePath = process.argv[2];
if (!yamlFilePath) {
    console.warn(USAGE);
    process.exit(1);
}
console.warn("Parsing " + yamlFilePath + "...");
var fileContents = fs_1["default"].readFileSync(yamlFilePath, 'utf8');
var data = yaml_1["default"].parse(fileContents);
var groupsScore = data.groupes.map(function (groupData, i) {
    return {
        name: groupData.nom,
        score: scoring_1.scoreRecur(groupData, "groupe[" + i + "]", scoring_1.defaultBoolScorer),
        maxScore: scoring_1.scoreRecur(groupData, "groupe[" + i + "]", scoring_1.scoreMaximizer)
    };
});
// assertion: all maxScore values should be equal
console.log(groupsScore);
