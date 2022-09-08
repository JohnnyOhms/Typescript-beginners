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
    }
    printSurname() {
        console.log(this.surname);
    }
}
const surname = new Surname("Ohms", []);
surname.addSurname("John");
surname.dataList(55);
surname.printSurname();
//# sourceMappingURL=classes.js.map