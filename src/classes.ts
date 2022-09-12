type Format = {
    name: string;
    readonly id: number;
    result: ( name: string, id: number ) => void;
    // result2 (name2:string) : void /* different format */
}

interface IFormat extends Format{
    name: string;
    readonly id: number;
    result2( name: string ): void;
}

const userInfo: Format = {
    name: "JOhnnyOhms",
    id: 25,
    result: (name: string) => {
        console.log(name);    
    } 
}

abstract class USerNames {
    name: string
    id: number
    data: Format
    orders: string[] = ["Beans"]

    constructor( name: string, id: number, data: Format ) {
        this.name = name
        this.id = id
        this.data = data
    }

    addNameToOrder(surname: string): void {
        this.orders.push( this.name )
        this.orders = [...this.orders, surname]
        console.log(this.orders); 
    }

    getOrder(order: string): void {
        this.orders.push( order )
        console.log(this.orders);
        
    }

    abstract dscribe(): void;
}

// const userNames = new USerNames( "JohnnyOhms", 247, userInfo )
// userNames.getOrder("rice")
// userNames.addNameToOrder("Ohms")


class MainName extends USerNames {
    constructor(data: number) {
        super( "John", 22, userInfo )
        let datainfo: number = data;
        this.dataList(datainfo)
    }

    dataList(data: number) {
        console.log(data);
        
    }

    dscribe(): void {
        console.log('Inherited the describe methode from an abstract class' + this.name);
    }
}

const main = new MainName(55)

class Surname extends MainName{
    static readonly adminName: string = "James"
    constructor( public middleName: string, public surname: string[] ) {
        super(65)
    }

    addSurname(surName: string) {
        this.surname.push(surName)
        this.surname.push( this.middleName )
        if ( !Surname.adminName )
            throw new Error("admin name not found")
            
    }

    printSurname(): void {
        console.log(this.surname);
        
    }
}

class First extends Surname {
    private static instance: First;
    private constructor( public middleName: string, public surname: string[] ) {
        super("John", ["James"])
    }

    static getInstance() {
        if ( First.instance )
            return this.instance
        this.instance = new First( "Ohms", ["mario"] )
        console.log( this.instance );
        return this.instance  
    }

    addSurname( surName: string ) {
        console.log("2nd Surname");
        
        return
        this.surname.push(surName)
        this.surname.push( this.middleName )
        if ( !Surname.adminName )
            throw new Error("admin name not found")    
    }

    printSurname(): void {
        return
        console.log(this.surname);
    }
}

let firstName = First.getInstance()
firstName.addSurname("ohms")

const surname = new Surname( "Ohms", [] )
surname.addSurname( "John" )
surname.dataList(55)
surname.printSurname()