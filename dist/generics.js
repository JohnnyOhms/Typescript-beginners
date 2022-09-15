"use strict";
function doSomething(value) {
    let num = [1, 2, 3];
    num = [...num, ...value];
    console.log(num);
}
const promise = new Promise((resolve, reject) => {
    resolve([4, 5, 6]);
    reject([]);
});
promise.then((result) => {
    doSomething(result);
});
promise.catch((result) => {
    doSomething(result);
});
function mergeObject(objA, objB) {
    return Object.assign(Object.assign({}, objA), { objB });
}
let result = mergeObject({ name: "john", course: ["javascript", "typescript"] }, [{ id: 25 }]);
console.log(result);
function countLength(value) {
    if (value.length < 4)
        return value + " is more than 3 character";
    if (value.length > 4)
        return value + " contain " + value.length + " characters";
}
let data = countLength(["java", "C++", "C", "python", "Vue"]);
console.log(data);
function objectKey(obj, key) {
    return obj[key];
}
objectKey({ name: "John", roles: ["code in js"] }, "roles");
//# sourceMappingURL=generics.js.map