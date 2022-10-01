import { NewEntry } from "./classes.js";
var Result_output;
(function (Result_output) {
    Result_output["Result_1"] = "number";
    Result_output["Result_2"] = "string";
})(Result_output || (Result_output = {}));
function addValues(input_1, input_2, result_output) {
    let result;
    if (typeof input_1 === "number" && typeof input_2 === "number")
        result = input_1 + input_2;
    else
        result = input_1.toString() + input_2.toString();
    console.log(result);
    console.log(result_output);
}
addValues(5, 2, Result_output.Result_1);
const newEntry = new NewEntry("Johnny", 25);
newEntry.print();
//# sourceMappingURL=script.js.map