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

    constructor(name: string, id: number, data: Format ) {
        this.name = name
        this.id = id
        this.data = data
    }
}

const userNames = new USerNames( "JohnnyOhms", 247, userInfo )

console.log(userNames);
