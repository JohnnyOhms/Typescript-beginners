"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function acessObjectThis(target, name, descriptor) {
    const mainMethod = descriptor.value;
    let obj = {
        configurable: true,
        enumerable: false,
        get() {
            return mainMethod.bind(this);
        }
    };
    return obj;
}
function validate(inputValidate) {
    let valid = true;
    if (inputValidate.required) {
        valid = valid && (inputValidate.value.toString().trim().length != 0);
    }
    if (inputValidate.maxLengthString != null && typeof inputValidate.value === "string") {
        valid = valid && (inputValidate.value.trim().length <= inputValidate.maxLengthString);
    }
    if (inputValidate.minLengthString != null && typeof inputValidate.value === "string") {
        valid = valid && (inputValidate.value.trim().length >= inputValidate.minLengthString);
    }
    if (inputValidate.maxLengthNumber != null && typeof inputValidate.value === "number") {
        valid = valid && (inputValidate.value <= inputValidate.maxLengthNumber);
    }
    if (inputValidate.minLengthNumber != null && typeof inputValidate.value === "number") {
        valid = valid && (inputValidate.value >= inputValidate.minLengthNumber);
    }
    return valid;
}
class Project {
    constructor(id, name, value, number) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.number = number;
    }
}
class ProjectStatus {
    constructor() {
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectStatus();
        return this.instance;
    }
    addProject(name, value, number) {
        const project = new Project(Math.floor(Math.random() * 10).toString(), name, value, number);
        this.pushProjects(project);
    }
    pushProjects(project) {
        this.projects.push(project);
        return this.sendProject();
    }
    sendProject() {
        let projectsData = this.projects;
        return projectsData;
    }
}
const projectStatus = ProjectStatus.getInstance();
class InputElements {
    constructor() {
        this.formEL = document.querySelector(".form-field");
        this.nameEL = document.getElementById("name");
        this.valueEL = document.getElementById("value");
        this.numberEL = document.getElementById("number");
        this.formEvent();
    }
    formEvent() {
        this.formEL.addEventListener('submit', this.InputValues);
    }
    InputValues(e) {
        e.preventDefault();
        let inputData = this.configureInput();
        if (Array.isArray(inputData)) {
            const [nameValue, valValues, numberValue] = inputData;
            projectStatus.addProject(nameValue, valValues, numberValue);
        }
    }
    resetForm() {
        this.formEL.reset();
    }
    configureInput() {
        const nameValue = this.nameEL.value;
        const valValues = this.valueEL.value;
        const numberValue = +this.numberEL.value;
        const nameValidate = {
            value: nameValue,
            required: true,
            minLengthString: 3,
            maxLengthString: 15
        };
        const valValidate = {
            value: valValues,
            required: true,
            minLengthString: 3,
            maxLengthString: 15
        };
        const numberValidate = {
            value: numberValue,
            required: true,
            minLengthNumber: 2,
            maxLengthNumber: 10
        };
        if (!validate(nameValidate) ||
            !validate(valValidate) ||
            !validate(numberValidate)) {
            alert("invalid input field");
            return;
        }
        this.resetForm();
        return [nameValue, valValues, numberValue];
    }
}
__decorate([
    acessObjectThis
], InputElements.prototype, "InputValues", null);
class InitialResult {
    constructor() {
        this.listener = projectStatus.sendProject();
        this.destruction();
    }
    destruction() {
        console.log(this.listener);
    }
    showResult() {
        const parentListEl = document.querySelector(".result");
        console.log(parentListEl);
    }
}
const inputElements = new InputElements();
//# sourceMappingURL=project_1.js.map