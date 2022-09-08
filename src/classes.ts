type Format = {
    name: string;
    readonly id: number;
    result: ( name: string, id: number ) => void;
}

const userInfo: Format = {
    name: "JOhnnyOhms",
    id: 25,
    result: (name: string) => {
        console.log(name);    
    } 
}

class USerNames{
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
}

const main = new MainName(55)

class Surname extends MainName{
    constructor( public middleName: string, public surname: string[] ) {
        super(65)
    }

    addSurname(surName: string) {
        this.surname.push(surName)
        this.surname.push(this.middleName)
    }

    printSurname(): void {
        console.log(this.surname);
        
    }
}

const surname = new Surname( "Ohms", [] )
surname.addSurname( "John" )
surname.dataList(55)
surname.printSurname()