function component( temp: string, id: string) {    
    return function <T extends { new( ...args: any[] ) : {user: string}}>( constructor: T) {
        return class extends constructor {
            constructor(...args: any[]){
                super( "Typescript Decorator" )
                const paragraph = document.getElementById(id) 
                if ( paragraph ) {
                    paragraph.innerHTML = temp
                    let label = paragraph?.querySelector( "label" ) as HTMLLabelElement
                    label.textContent = this.user
                }
            }
        }
    }
}


@component("<label></label>", "para")
class TempObj{
    name: Array<string> = ['John', 'Ohms']
    id: number = 255
    user: string;
    constructor( user: string) {
        this.user = user
        console.log(this.name[0] + this.name[1] + " is studying his typscript course")
    }
}

const tempObj = new TempObj("Typscript Decorator")

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

// getting the property of  decorator descriptor

function printName( target: object, methodName: string, descriptor: PropertyDescriptor ) {
    let originalMethod = descriptor.value
    
    let dsc :PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return originalMethod.bind(this)
        }
        
    }
    return dsc
    // simplier term (methode) without the use of interface
    
    // let dsc = {
    //     get() {
    //         return originalMethod.bind(this)
    //     }
    // }
    // return dsc
}

class Person{
    massage: string = 'Decorator study';

    @printName
    printMessage() {
        console.log(this.massage)
    }
}

const person = new Person()

const btn = document.querySelector( "button" ) as HTMLButtonElement
btn.addEventListener("click", person.printMessage)


