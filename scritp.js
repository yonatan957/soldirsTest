const containor = document.querySelector("#containor")
const addButton = document.querySelector("#add")
const addDiv = document.querySelector("#details")
const table = document.querySelector("table")
let local= localStorage.soldirs
if (!local){
    localStorage.setItem("soldirs", "[]")
    local = "[]"
}
let soldirs = local? JSON.parse(local) : []

addtoTable(soldirs)
console.log(soldirs)

addButton.addEventListener("click", e=> {
    console.log(soldirs)
    addToList()
    localStorage.setItem("soldirs", JSON.stringify(soldirs))
    table.innerHTML =""
    addtoTable(soldirs)
})

// function initPage(){
//     let div = cteateDatailsDiv()
//     console.log(div)
//     containor.appendChild(div)
// }

// function cteateDatailsDiv(details)
//     {
//         let detailsDiv = document.createElement("div")

//         let detailsKeys = ["name", "rank", "position", "flatton"]
//         let placeholders = ["Full Name","Rank","Position","Flatton"]
//         for(let i =0; i <4; i++){
//             let input = document.createElement("input")
//             if(details){input.value = details[detailsKeys[i]]}
//             else{input.placeholder = placeholders[i]}
//             detailsDiv.appendChild(input)
//         }

//         let numInput = document.createElement("input")
//         numInput.type ="number"
//         if(details){numInput.value = details.missionTime}
//         detailsDiv.appendChild(numInput)

//         let statuses = ["Active", "Retired", "Reserve"]
//         let select = document.createElement("select")
//         for (let i=0; i <3; i++){
//             let option = document.createElement("option")
//             option.value = statuses[i]
//             option.innerText = statuses[i]
//             select.appendChild(option)
//         }
//         detailsDiv.appendChild(select)

//         let button = document.createElement("button")
//         button.id = "add-save"
//         if(details){
//             button.innerText = "Save Changes"
//             let cancelButton = document.createElement("button")
//             cancelButton.id = "cancelButton"
//             cancelButton.innerText = "Cancel"
//             detailsDiv.append(button, cancelButton)
//         }
//         else{
//             button.innerText = "Add Personnal"
//             detailsDiv.appendChild(button)
//         }
//         return detailsDiv
//     }
function addtoTable(rows){
    for (let row of rows){
        let tr = document.createElement("tr")

        let tdN = document.createElement("td")
        tdN.innerText = row.name
        
        let tdR = document.createElement("td")
        tdR.innerText = row.rank
        
        let tdP = document.createElement("td")
        tdP.innerText = row.position
        
        let tdF = document.createElement("td")
        tdF.innerText = row.flatton

        let tdS = document.createElement("td")
        tdS.innerText = row.status
        
        let tdB = document.createElement("td")

        let buttonR =document.createElement("button")
        buttonR.innerText = "Remove"
        buttonR.addEventListener("click", e=>{
            removeRow(e)
        })
        tdB.appendChild(buttonR)
       
        if (row.status !== "Retired"){
            let buttonM =document.createElement("button")
            buttonM.innerText = "Mission"
            buttonM.addEventListener("click", e => {startMission(e)} )
            tdB.appendChild(buttonM)
        }

        let buttonE =document.createElement("button")
        buttonE.innerText = "Edit"
        tdB.appendChild(buttonE)
        buttonE.addEventListener("click", e=>{
            edit(e)
        })

        tr.append(tdN, tdR, tdP, tdF,tdS, tdB)
        table.appendChild(tr)
    }
}

function addToList(){
    let soldir = {
        id: Math.random().toString().replace("0.", ""),
        name: addDiv.children[0].value,
        rank: addDiv.children[1].value,
        position: addDiv.children[2].value,
        flatton: addDiv.children[3].value,
        time: addDiv.children[4].value,
        status: addDiv.children[5].value
    }
    soldirs.push(soldir)
    console.log(soldir)
}
function removeRow(e){
    let name = e.currentTarget.parentElement.parentElement.children[0].innerText
    soldirs = soldirs.filter(s => {return s.name !== name})
    e.currentTarget.parentElement.parentElement.remove();
    localStorage.setItem("soldirs", JSON.stringify(soldirs))
}
function startMission(e){
    let name = e.currentTarget.parentElement.parentElement.children[0].innerText
    let time = Number(soldirs.filter(s => s.name === name)[0].time)
    let a = setInterval((e) =>{

    })
}

function edit(e){
    let name = e.currentTarget.parentElement.parentElement.children[0].innerText
    let soldir = soldirs.filter(s => s.name === name)[0]
    table.style.display ="none"
    document.querySelector("#second").style.display = "none"
    addDiv.children[6].style.display ="none"

    let nameinput = document.createElement("input")
    nameinput.type = "hidden"
    nameinput.innerText = soldir.name
    
    addDiv.children[0].value = soldir.name
    addDiv.children[1].value = soldir.rank
    addDiv.children[2].value = soldir.position
    addDiv.children[3].value = soldir.flatton
    addDiv.children[4].value = soldir.time
    addDiv.children[5].value = soldir.status

    let newButton = document.createElement("button")
    newButton.innerText = "Save Changes"
    newButton.addEventListener("click", e=>{
        proove(e)
    })

    let CancelButton = document.createElement("button")
    CancelButton.innerText = "Cancel"
    CancelButton.Id = "red"
    CancelButton.addEventListener("click", e=>{
        cancel(e)
    })

    addDiv.append(newButton, CancelButton)
}

function cancel(e){
    table.style.display ="block"
    document.querySelector("#second").style.display = "block"
    addDiv.children[7].remove()
    addDiv.children[7].remove()
    let newButton = document.createElement("button")
    newButton.innerText = "AddPersonnal"
    addDiv.children[6].style.display ="block"
}
function proove(e){
    let name = e.currentTarget.parentElement.parentElement.children[9].value
    console.log(name)
    soldirs = soldirs.filter(s => {return s.name !== name})
    e.currentTarget.parentElement.parentElement.remove();
    // localStorage.setItem("soldirs", JSON.stringify(soldirs))
}
