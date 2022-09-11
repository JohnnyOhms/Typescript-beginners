"use strict";
const userInfo = {
    name: "JOhnnyOhms",
    id: 25,
    result: (name) => {
        console.log(name);
    }
};
class USerNames {
    constructor(name, id, data) {
        this.orders = ["Beans"];
        this.name = name;
        this.id = id;
        this.data = data;
    }
    addNameToOrder(surname) {
        this.orders.push(this.name);
        this.orders = [...this.orders, surname];
        console.log(this.orders);
    }
    getOrder(order) {
        this.orders.push(order);
        console.log(this.orders);
    }
}
class MainName extends USerNames {
    constructor(data) {
        super("John", 22, userInfo);
        let datainfo = data;
        this.dataList(datainfo);
    }
    dataList(data) {
        console.log(data);
    }
    dscribe() {
        console.log('Inherited the describe methode from an abstract class' + this.name);
    }
}
const main = new MainName(55);
class Surname extends MainName {
    constructor(middleName, surname) {
        super(65);
        this.middleName = middleName;
        this.surname = surname;
    }
    addSurname(surName) {
        this.surname.push(surName);
        this.surname.push(this.middleName);
        if (!Surname.adminName)
            throw new Error("admin name not found");
    }
    printSurname() {
        console.log(this.surname);
    }
}
Surname.adminName = "James";
class First extends Surname {
    constructor(middleName, surname) {
        super("John", ["James"]);
        this.middleName = middleName;
        this.surname = surname;
    }
    static getInstance() {
        if (First.instance)
            return this.instance;
        this.instance = new First("Ohms", ["mario"]);
        console.log(this.instance);
        return this.instance;
    }
    addSurname(surName) {
        console.log("2nd Surname");
        return;
        this.surname.push(surName);
        this.surname.push(this.middleName);
        if (!Surname.adminName)
            throw new Error("admin name not found");
    }
    printSurname() {
        return;
        console.log(this.surname);
    }
}
let firstName = First.getInstance();
firstName.addSurname("ohms");
const surname = new Surname("Ohms", []);
surname.addSurname("John");
surname.dataList(55);
surname.printSurname();
//# sourceMappingURL=classes.js.map