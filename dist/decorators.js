"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function component(temp, id) {
    return function (constructor) {
        return class extends constructor {
            constructor(...args) {
                super("Typescript Decorator");
                const paragraph = document.getElementById(id);
                if (paragraph) {
                    paragraph.innerHTML = temp;
                    let label = paragraph === null || paragraph === void 0 ? void 0 : paragraph.querySelector("label");
                    label.textContent = this.user;
                }
            }
        };
    };
}
let TempObj = class TempObj {
    constructor(user) {
        this.name = ['John', 'Ohms'];
        this.id = 255;
        this.user = user;
        console.log(this.name[0] + this.name[1] + " is studying his typscript course");
    }
};
TempObj = __decorate([
    component("<label></label>", "para")
], TempObj);
const tempObj = new TempObj("Typscript Decorator");
function property(target, propertyName) {
    console.log(target);
    console.log(propertyName);
}
function log1(target, propertyName, description) {
    console.log("acessing decorator");
    console.log(target);
    console.log(propertyName);
    console.log(description);
}
function log2(target, propertyName, description) {
    console.log("acessing decorator object");
    console.log(target);
    console.log(propertyName);
    console.log(description);
}
function log3(target, propertyName, position) {
    console.log("acessing decorator property");
    console.log(target);
    console.log(propertyName);
    console.log(position);
}
function log4(target, propertyName, position) {
    console.log("acessing decorator property 2");
    console.log(position);
}
class TaxPayment {
    constructor(product, tax, price) {
        this.product = product;
        this.tax = tax;
        this.price = price;
    }
    set newPrice(value) {
        if (value) {
            this.price = this.price * value;
        }
    }
    print(value, num) {
        value = this.tax.toFixed();
        num = this.tax * num;
    }
}
__decorate([
    property
], TaxPayment.prototype, "product", void 0);
__decorate([
    log1
], TaxPayment.prototype, "newPrice", null);
__decorate([
    log2,
    __param(0, log3),
    __param(1, log4)
], TaxPayment.prototype, "print", null);
function printName(target, methodName, descriptor) {
    let originalMethod = descriptor.value;
    let dsc = {
        configurable: true,
        enumerable: false,
        get() {
            return originalMethod.bind(this);
        }
    };
    return dsc;
}
class Person {
    constructor() {
        this.massage = 'Decorator study';
    }
    printMessage() {
        console.log(this.massage);
    }
}
__decorate([
    printName
], Person.prototype, "printMessage", null);
const person = new Person();
const btn = document.querySelector("button");
btn.addEventListener("click", person.printMessage);
//# sourceMappingURL=decorators.js.map