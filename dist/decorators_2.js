"use strict";
class InputResult {
    constructor(name, num) {
        this.name = name;
        this.num = num;
    }
}
const form = document.querySelector(".form-field");
form.addEventListener("submit", e => {
    e.preventDefault();
    const valueEl = document.querySelector("#value");
    const numberEL = document.querySelector("#number");
    let valueEl_value = valueEl.value;
    let numberEL_value = +numberEL.value;
    const result = new InputResult(valueEl_value, numberEL_value);
    console.log(result);
});
//# sourceMappingURL=decorators_2.js.map