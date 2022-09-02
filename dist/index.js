"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passCode = 50;
const data = "John";
function getData(passCode, data) {
    return "data is" + " " + data;
}
let result = getData(passCode, data);
//type script arrays
let myArra = [];
myArra.push(2);
myArra.forEach(num => num.toFixed(2));
console.log(myArra);
// enums
var Size;
(function (Size) {
    Size["small"] = "s";
    Size["medium"] = "m";
    Size["large"] = "l";
})(Size || (Size = {}));
let userSize = Size.medium;
console.log(userSize);
//# sourceMappingURL=index.js.map