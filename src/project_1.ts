
function acessObjectThis( target: object, name: string, descriptor: PropertyDescriptor ) {
    const mainMethod = descriptor.value;
    let obj: PropertyDescriptor= {
        configurable: true,
        enumerable: false,
        get() {
            return mainMethod.bind(this)
        }   
    }
    return obj
}

interface ValidaFormat {
    value: string | number;
    required?: true;
    minLengthString?: number;
    maxLengthString?: number;
    minLengthNumber?: number;
    maxLengthNumber?: number;
}

function validate( inputValidate: ValidaFormat ): boolean {
    // validation go in here
    let valid = true;
    if ( inputValidate.required ) {
        valid = valid && (inputValidate.value.toString().trim().length != 0)
    }
    if ( inputValidate.maxLengthString != null && typeof inputValidate.value === "string" ) {
        valid = valid && (inputValidate.value.trim().length <= inputValidate.maxLengthString)
    }
    if ( inputValidate.minLengthString != null && typeof inputValidate.value === "string" ) {
        valid = valid && (inputValidate.value.trim().length >= inputValidate.minLengthString)
    }
    if ( inputValidate.maxLengthNumber != null && typeof inputValidate.value === "number" ) {
        valid = valid && (inputValidate.value <= inputValidate.maxLengthNumber)
    }
    if ( inputValidate.minLengthNumber != null  && typeof inputValidate.value === "number" ) {
        valid = valid && (inputValidate.value >= inputValidate.minLengthNumber)
    }
    
    return valid
}

class Project {
    constructor(
        public id: string,
        public name: string,
        public value: string,
        public number : number
    ) {}
}

class ProjectStatus{
    private static instance: ProjectStatus
    projects: Project[] = []
    constructor() {}
    
    static getInstance() {
        if ( this.instance ) {
            return this.instance
        }
        this.instance = new ProjectStatus()
        return this.instance;
    }

    addProject( name: string, value: string, number: number ) {
        const project = new Project( Math.floor( Math.random()  * 10 ).toString(), name, value, number )
        this.pushProjects(project)
    }

    pushProjects(project: Project): Project [] {
        this.projects.push( project )
        return this.sendProject()
    }

    sendProject(): Project [] {
        let projectsData: Project[] = this.projects
        return projectsData
    }

}

const projectStatus = ProjectStatus.getInstance()

class InputElements {
    formEL: HTMLFormElement;
    nameEL: HTMLInputElement;
    valueEL: HTMLInputElement;
    numberEL: HTMLInputElement
    constructor() {
        this.formEL = document.querySelector( ".form-field" ) as HTMLFormElement
        this.nameEL = document.getElementById("name") as HTMLInputElement
        this.valueEL = document.getElementById("value") as HTMLInputElement
        this.numberEL = document.getElementById("number") as HTMLInputElement
        this.formEvent()
    }

    private formEvent() {
        this.formEL.addEventListener( 'submit', this.InputValues)
    }

    @acessObjectThis
    private InputValues( e: Event ){
        e.preventDefault()

        let inputData = this.configureInput()
        if ( Array.isArray( inputData ) ) {
            const [nameValue, valValues, numberValue] = inputData 
            projectStatus.addProject(nameValue, valValues, numberValue)
        }
    }

    resetForm() {
        this.formEL.reset()
    }

    private configureInput(): void | [string, string, number] {
        const nameValue = this.nameEL.value;
        const valValues = this.valueEL.value;
        const numberValue = +this.numberEL.value

        const nameValidate: ValidaFormat = {
            value: nameValue,
            required: true,
            minLengthString: 3,
            maxLengthString: 15
        }

        const valValidate: ValidaFormat = {
            value: valValues,
            required: true,
            minLengthString: 3,
            maxLengthString: 15
        }

        const numberValidate: ValidaFormat = {
            value: numberValue,
            required: true,
            minLengthNumber: 2,
            maxLengthNumber: 10
        }

        if (
            !validate( nameValidate ) ||
            !validate( valValidate ) ||
            !validate( numberValidate )
        ) {
            alert( "invalid input field" )
            return;
        }
        this.resetForm()
        return [nameValue, valValues, numberValue]    
    }
}

class InitialResult{
    listener : Project []
    constructor() {
        this.listener = projectStatus.sendProject()
        this.destruction()
    }

    destruction() {
        // console.log(projectStatus.projects);
        console.log(this.listener);
    }

    showResult() {
        const parentListEl = document.querySelector( ".result" ) as HTMLUListElement
        console.log(parentListEl)
    }
}

const inputElements = new InputElements()