const passCode: number = 50;
const data: string = "John";

function getData(passCode: number, data: string):string{
    return "data is" + " " + data
}

let result = getData(passCode, data)

//type script arrays
let myArra: number[] = [];
myArra.push(2)
myArra.forEach(num=>num.toFixed(2))
console.log(myArra);

// enums

enum Size {small = 's', medium = "m", large = "l"}
let userSize: Size = Size.medium
console.log(userSize);


export{}