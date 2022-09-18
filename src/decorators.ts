function component( temp: string, id: string) {    
    return function template( constructor:any) {
        // const data = new constructor()
        const paragraph = document.getElementById(id) 
        if ( paragraph ) {
            paragraph.innerHTML = temp
            let label = paragraph?.querySelector( "label" ) as HTMLLabelElement
            label.textContent = "Decorators"
        }   
    }
    

    
}


@component("<label></label>", "para")
class TempObj{
    name: Array<string> = ['John', 'Ohms']
    user: string = "JOHNOHMS"
    constructor() {
        console.log(this.name[0] + this.name[1] + " is studying his typscript course")
    }

    addNumberForm() {
        return `<input type="number" id="num">`
    }
}

const tempObj = new TempObj()

// decorators on properties

function property(target : object, propertyName: string | number) {
    console.log( target );
    console.log(propertyName);
    
    
}

function log1( target: Object, propertyName: Object, description: PropertyDescriptor ) {
    console.log("acessing decorator");
    console.log(target);
    console.log(propertyName);
    console.log(description);
    
}

function log2( target: Object, propertyName: Object, description: PropertyDescriptor) {
    console.log("acessing decorator object");
    console.log(target);
    console.log(propertyName);
    console.log(description);
    
}

function log3( target: Object, propertyName: number, position: number ) {
    console.log("acessing decorator property");
    console.log(target);
    console.log(propertyName);
    console.log(position);
    
}

function log4( target: Object, propertyName: number, position: number ) {
    console.log("acessing decorator property 2");
    // console.log(target);
    // console.log(propertyName);
    console.log(position);
    
}

class TaxPayment{
    @property
    product: string
    tax: number
    private price: number
    constructor( product: string, tax: number, price: number){
        this.product = product
        this.tax = tax
        this.price = price
    }

    @log1
    set newPrice(value: number) {
        if ( value ) {
            this.price = this.price * value
        }
    }

    @log2
    print( @log3 value: string, @log4 num: number) {
        value = this.tax.toFixed()
        num = this.tax * num
    }
      
}


