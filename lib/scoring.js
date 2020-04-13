"use strict";
exports.__esModule = true;
exports.defaultBoolScorer = function (bool) {
    return bool === true ? 1 : 0;
};
exports.scoreMaximizer = function () { return 1; };
// will recursively count all final values that are true
function scoreRecur(ref, path, boolScorer) {
    if (path === void 0) { path = ''; }
    if (typeof ref === 'string') {
        return 0; // ignore string values (e.g. "name")
    }
    if (typeof ref === 'boolean') {
        return boolScorer(ref);
    }
    else if (typeof ref === 'object') {
        var sum = 0;
        for (var _i = 0, _a = Object.entries(ref); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], val = _b[1];
            sum += scoreRecur(val, path + "." + key, boolScorer);
        }
        return sum;
    }
    else {
        console.warn("Skipping " + typeof ref + " at " + path + ":", ref);
        return 0;
    }
}
exports.scoreRecur = scoreRecur;
