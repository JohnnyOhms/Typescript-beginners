function autoBind( target: object, name: string, descriptor: PropertyDescriptor ) {
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

enum Status {
    initial,
    final
}

class Project {
    constructor(
        public id: string,
        public name: string,
        public value: string,
        public number: number,
        public ActiveStatus: Status
    ) {}
}

interface Dragable {
    dragstartHandler( Event: DragEvent ): void;
    dragendHandler( Event: DragEvent): void
}

interface DragTarget {
    dragOverHandler( Event: DragEvent ): void | boolean
    dragLeaveHandler( Event: DragEvent ): void
    dropHandler( Event: DragEvent): void
}

type ProjectCompiler= { ( project: Project[] ): void } 

// class State<T> {
//     protected projectCompiler: ProjectCompiler<T>[] = [] 
//     AddprojectCompiler( compiler: ProjectCompiler<T> ) {
//         this.projectCompiler.push(compiler)
//     }
// }

class ProjectStatus{
    private static instance: ProjectStatus
    projects: Project[] = []
    protected projectCompiler: ProjectCompiler[] = [] 
  
    constructor() {}
    
    static getInstance() {
        if ( this.instance ) {
            return this.instance
        }
        this.instance = new ProjectStatus()
        return this.instance;
    }

    AddprojectCompiler( compiler: ProjectCompiler ) {
        this.projectCompiler.push(compiler)
    }

    addProject( name: string, value: string, number: number ) {
        const project = new Project(Math.random().toString(), name, value, number, Status.initial )
        this.projects.push( project )
        this.updateProject()
    }

    updateProject() {
        for ( const fn of this.projectCompiler) {
            fn( this.projects )
        } 
    }

    moveProject( project_Id: string, newStatus: Status ) {
        const projectId = this.projects.find( project => project.id === project_Id )
        if ( projectId ) {
            projectId.ActiveStatus = newStatus
            this.updateProject()
        }
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

    @autoBind
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
            maxLengthString: 20
        }

        const valValidate: ValidaFormat = {
            value: valValues,
            required: true,
            minLengthString: 3,
            maxLengthString: 20
        }

        const numberValidate: ValidaFormat = {
            value: numberValue,
            required: true,
            minLengthNumber: 1,
            maxLengthNumber: 30
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

class ProjectResult implements DragTarget{
    assignedProject: Project[] = []
    parentListEl: HTMLUListElement
    constructor(private type: string) {
        this.parentListEl = document.querySelector( `.${this.type}-result` ) as HTMLUListElement;    
        projectStatus.AddprojectCompiler( ( project: Project[] )=>{
            const relevantProject = project.filter( (project) => {
                if ( this.type === "initial" ) {
                    return project.ActiveStatus === Status.initial;
                }
                return project.ActiveStatus === Status.final;
            } )
            this.assignedProject = relevantProject;
            this.showProject()
            this.configure()
        } )

    }

    showProject() {
        this.parentListEl.innerHTML = ''
        this.assignedProject.forEach( item => {
            new RenderProject(item, this.parentListEl)
        })   
    }

    configure() {
        this.parentListEl.addEventListener("dragover", this.dragOverHandler)
        this.parentListEl.addEventListener("dragleave", this.dragLeaveHandler)
        this.parentListEl.addEventListener("drop", this.dropHandler)
    }

    @autoBind
    dragOverHandler( Event: DragEvent ) : boolean {
        Event.preventDefault()
        return false;
    }

    @autoBind
    dragLeaveHandler( Event: DragEvent ): void {
        console.log(this.parentListEl);   
    }

    @autoBind
    dropHandler( Event: DragEvent ): void {
        Event.stopPropagation()
        // if ( Event.dataTransfer) {
            const projectId = Event.dataTransfer!.getData( "text/plain" )
        projectStatus.moveProject(projectId, (this.type === "initial") ? Status.initial : Status.final)
        
        // }
    }
}

class RenderProject implements Dragable{
    listEl: HTMLLIElement;
    constructor( private project: Project, private Ulelement: HTMLUListElement ) {
        this.listEl =  document.createElement( "li" )
        this.renderProject()
        this.configure()
    }

    renderProject() {
        this.listEl.innerHTML = `<span>${ this.project.name }</span><br><span>${ this.project.value }</span><br><span>${ this.project.number }</span>`;
        this.Ulelement.appendChild(this.listEl)
    } 

    configure() {
        this.listEl.setAttribute("draggable", "true")
        this.listEl.addEventListener("dragstart", this.dragstartHandler)
        this.listEl.addEventListener("dragend", this.dragendHandler)
    }

    @autoBind
    dragstartHandler( Event: DragEvent ): void {
        Event.dataTransfer!.setData( "text/plain", this.project.id )
        Event.dataTransfer!.effectAllowed = "move";
    }

    @autoBind
    dragendHandler( Event: DragEvent ): void {}
}

const InitialResult = new ProjectResult("initial")
const finalResult = new ProjectResult("final")


const inputElements = new InputElements()