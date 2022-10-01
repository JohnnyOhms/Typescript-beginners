import { NewEntry} from "./classes.js";

enum Result_output {
    Result_1 = "number",
    Result_2 = "string"
}

function addValues(
    input_1: number | string,
    input_2: number | string, 
    result_output: Result_output
    ): number | string | void{

    let result: unknown;

    if ( typeof input_1 === "number" && typeof input_2 === "number" ) 
        result = input_1 + input_2
    else 
        result = input_1.toString() + input_2.toString()
    
    console.log( result )
    console.log(result_output);
    
}

addValues( 5, 2, Result_output.Result_1 )

const newEntry = new NewEntry( "Johnny", 25 )
newEntry.print()