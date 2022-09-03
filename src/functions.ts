// functions
function returnData(code: number){
    return 0
}

function userInfo (info: number): number{
    let user: number = info
    if(user > 10)
        return info = info * 5
    return info * 10

}

//todo app source code
const btn = document.querySelector<HTMLButtonElement>(".btn")!
const input = document.querySelector<HTMLInputElement>(".input-text")
const parent = document.querySelector("ul") as HTMLUListElement

btn.addEventListener("click", (e: Event)=>{
    e.preventDefault();
    if(input?.value == null) return
    
    let inputValue = input.value;

    updateList(inputValue)
})

const updateList = (input:string):void => {
    let item = document.createElement("li");
    item.textContent = input;
    parent.appendChild(item)

}

export{}