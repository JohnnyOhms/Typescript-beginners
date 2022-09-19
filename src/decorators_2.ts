class InputResult {
    name: string;
    num: number;
    constructor( name: string, num: number ) {
        this.name = name
        this.num = num
    }

}

const form = document.querySelector( ".form-field" )!;
form.addEventListener( "submit", e => {
    e.preventDefault()
    const valueEl = document.querySelector("#value") as HTMLInputElement
    const numberEL = document.querySelector( "#number" ) as HTMLInputElement
    
    let valueEl_value = valueEl.value;
    let numberEL_value = +numberEL.value;

    const result = new InputResult(valueEl_value, numberEL_value)

    console.log(result);
    
})
