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
    let times = table.childElementCount;
    for(let i = 1; i<times ; i++){
        table.children[i].remove()
    }   
    addtoTable(soldirs)
})


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
    
    // let a = setInterval(() =>{
    //     e.currentTarget.innerText = time
    //     time --
    //     if(t)
    // },1000)
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

    addDiv.append(newButton, CancelButton, nameinput)
}

function cancel(e){
    table.style.display =""
    document.querySelector("#second").style.display = "block"
    addDiv.children[7].remove()
    addDiv.children[7].remove()
    addDiv.children[7].remove()
    addDiv.children[6].style.display ="block"
    
    for (let i = 0 ; i <5; i++){
        addDiv.children[i].value =""
    }
}
function proove(e){
    addDiv.children[6].style.display ="block"
    let times = table.childElementCount;
    console.log(times)
    for(let i = 1; i<times ; i++){
        table.children[i].remove()
    }   
    table.style.display =""
    document.querySelector("#second").style.display = "block"
    let name = e.currentTarget.parentElement.children[9].innerText
    soldirs = soldirs.filter(s => {return s.name !== name})
    addToList()
    localStorage.setItem("soldirs", JSON.stringify(soldirs))
    addtoTable(soldirs) 
    for (let i = 0 ; i <5; i++){
        addDiv.children[i].value =""
    }   
    addDiv.children[7].remove()
    addDiv.children[7].remove()
    addDiv.children[7].remove()
}
