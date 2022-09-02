let firstName:string = "John";

let userName = (name: string, id?: number): string=>{
    return name;
}

userName(firstName)

const myObj:{
    name: string, 
    age: number, 
    question: boolean
} = {
    name : "John",
    age : 22,
    question: true
}

console.log(myObj);
