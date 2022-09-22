"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function autoBind(target, name, descriptor) {
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
var Status;
(function (Status) {
    Status[Status["initial"] = 0] = "initial";
    Status[Status["final"] = 1] = "final";
})(Status || (Status = {}));
class Project {
    constructor(id, name, value, number, ActiveStatus) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.number = number;
        this.ActiveStatus = ActiveStatus;
    }
}
class ProjectStatus {
    constructor() {
        this.projects = [];
        this.projectCompiler = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectStatus();
        return this.instance;
    }
    AddprojectCompiler(compiler) {
        this.projectCompiler.push(compiler);
    }
    addProject(name, value, number) {
        const project = new Project(Math.random().toString(), name, value, number, Status.initial);
        this.projects.push(project);
        this.updateProject();
    }
    updateProject() {
        for (const fn of this.projectCompiler) {
            fn(this.projects);
        }
    }
    moveProject(project_Id, newStatus) {
        const projectId = this.projects.find(project => project.id === project_Id);
        if (projectId) {
            projectId.ActiveStatus = newStatus;
            this.updateProject();
        }
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
            maxLengthString: 20
        };
        const valValidate = {
            value: valValues,
            required: true,
            minLengthString: 3,
            maxLengthString: 20
        };
        const numberValidate = {
            value: numberValue,
            required: true,
            minLengthNumber: 1,
            maxLengthNumber: 30
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
    autoBind
], InputElements.prototype, "InputValues", null);
class ProjectResult {
    constructor(type) {
        this.type = type;
        this.assignedProject = [];
        this.parentListEl = document.querySelector(`.${this.type}-result`);
        projectStatus.AddprojectCompiler((project) => {
            const relevantProject = project.filter((project) => {
                if (this.type === "initial") {
                    return project.ActiveStatus === Status.initial;
                }
                return project.ActiveStatus === Status.final;
            });
            this.assignedProject = relevantProject;
            this.showProject();
            this.configure();
        });
    }
    showProject() {
        this.parentListEl.innerHTML = '';
        this.assignedProject.forEach(item => {
            new RenderProject(item, this.parentListEl);
        });
    }
    configure() {
        this.parentListEl.addEventListener("dragover", this.dragOverHandler);
        this.parentListEl.addEventListener("dragleave", this.dragLeaveHandler);
        this.parentListEl.addEventListener("drop", this.dropHandler);
    }
    dragOverHandler(Event) {
        Event.preventDefault();
        return false;
    }
    dragLeaveHandler(Event) {
        console.log(this.parentListEl);
    }
    dropHandler(Event) {
        Event.stopPropagation();
        const projectId = Event.dataTransfer.getData("text/plain");
        projectStatus.moveProject(projectId, (this.type === "initial") ? Status.initial : Status.final);
    }
}
__decorate([
    autoBind
], ProjectResult.prototype, "dragOverHandler", null);
__decorate([
    autoBind
], ProjectResult.prototype, "dragLeaveHandler", null);
__decorate([
    autoBind
], ProjectResult.prototype, "dropHandler", null);
class RenderProject {
    constructor(project, Ulelement) {
        this.project = project;
        this.Ulelement = Ulelement;
        this.listEl = document.createElement("li");
        this.renderProject();
        this.configure();
    }
    renderProject() {
        this.listEl.innerHTML = `<span>${this.project.name}</span><br><span>${this.project.value}</span><br><span>${this.project.number}</span>`;
        this.Ulelement.appendChild(this.listEl);
    }
    configure() {
        this.listEl.setAttribute("draggable", "true");
        this.listEl.addEventListener("dragstart", this.dragstartHandler);
        this.listEl.addEventListener("dragend", this.dragendHandler);
    }
    dragstartHandler(Event) {
        Event.dataTransfer.setData("text/plain", this.project.id);
        Event.dataTransfer.effectAllowed = "move";
    }
    dragendHandler(Event) { }
}
__decorate([
    autoBind
], RenderProject.prototype, "dragstartHandler", null);
__decorate([
    autoBind
], RenderProject.prototype, "dragendHandler", null);
const InitialResult = new ProjectResult("initial");
const finalResult = new ProjectResult("final");
const inputElements = new InputElements();
//# sourceMappingURL=project_1.js.map