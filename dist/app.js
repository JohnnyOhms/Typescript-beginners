"use strict";
let employeeName = "JOhnnyOhms";
let em = {
    name: "John",
    id: 25,
    roles: ['code in Js'],
    date: new Date()
};
function printStatus(em) {
    console.log("name of employee " + em.name);
    if ("id" in em)
        console.log("id: " + em.id);
    if ("date" in em)
        console.log("Date " + em.date);
}
printStatus(em);
function animalFood(food) {
    switch (food.type) {
        case "cat":
            console.log("cats prefered food is " + food.catfood);
            break;
        case "dog":
            console.log("Dogs prefered food is " + food.dogfood);
            break;
    }
}
let dogfood = {
    type: "dog",
    dogfood: "snacks"
};
let catFood = {
    type: "cat",
    catfood: "milk"
};
animalFood(dogfood);
animalFood(catFood);
const errorMssg = {
    response: "404",
    name: "invalid name",
    password: "wrong password"
};
//# sourceMappingURL=app.js.map