// intersecction types

interface Employee {
    name: string;
    id: number
}

interface Employee_Status {
    name: string;
    roles: string[];
    date: Date;
}

interface SuperEmployeer extends Employee, Employee_Status{}

// using type to get the most occcured values
type User = string | null
type UserId = string | number
type Universal = User & UserId
let employeeName: Universal = "JOhnnyOhms"

// 

let em: SuperEmployeer = {
    name: "John",
    id: 25,
    roles: ['code in Js'],
    date: new Date()
}

type UnknownEmployee = Employee | Employee_Status;

function printStatus( em: UnknownEmployee ): void {
    console.log("name of employee " + em.name )
    if ( "id" in em )
        console.log("id: " + em.id);
    if ( "date" in em )
        console.log("Date " + em.date);       
}

printStatus( em )

interface Cat {
    type: "cat";
    catfood: string;
}

interface Dog {
    type: "dog";
    dogfood: String;
}

type Animal = Cat | Dog

function animalFood( food: Animal ): void{
    switch ( food.type ) {
        case "cat":
            console.log("cats prefered food is " + food.catfood);
            break;
        case "dog":
               console.log("Dogs prefered food is " + food.dogfood);
            break
    }
}

let dogfood: Animal = {
    type: "dog",
    dogfood: "snacks"
}

let catFood: Animal = {
    type: "cat",
    catfood: "milk"
}

animalFood( dogfood )
animalFood( catFood )

// index properties

interface ErrorMessages {
    [key: string]: string
}

const errorMssg: ErrorMessages = {
    response: "404",
    name: "invalid name",
    password: "wrong password"
}

