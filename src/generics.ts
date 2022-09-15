// Generics on promise

function doSomething(value: Array<number>) {
    let num: Array<number> = [1, 2, 3]
    num = [...num, ...value]
    console.log(num);
} 

const promise: Promise<Array<number>> = new Promise( ( resolve, reject ) => {
    resolve( [4, 5, 6])
    
    reject([])
} )
promise.then( (result) => {
    doSomething(result)
} )
promise.catch( ( result ) => {
doSomething(result)
} )


// custome generics

function mergeObject<T extends object, U extends Array<object>>(objA: T,  objB: U) {
    return {...objA, objB}
}

let result = mergeObject( { name: "john", course: ["javascript", "typescript"] }, [{ id: 25 }] )

console.log( result );

// use interface in generics
interface Length{
    length: number
}


function countLength<T extends Length>( value: T ): string | void{
    if ( value.length < 4 )
        return value + " is more than 3 character";
    
    if ( value.length > 4 )
        return value + " contain " + value.length + " characters";
     
}

let data = countLength( ["java", "C++", "C", "python", "Vue"] )
// countLength("")
console.log(data);


// keyof generics

function objectKey<T extends object, U extends keyof T>( obj: T, key: U ): T[U]{
    return obj[key]
}

objectKey({name:"John", roles: ["code in js"]}, "roles")







