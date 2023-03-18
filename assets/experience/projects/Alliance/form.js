//for tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

var info = [];
const table = document.createElement("tbody");

// checks if there is some info in localstorage
if(localStorage.length > 0){
    info = JSON.parse(localStorage.getItem("info"));
    filltable();
}

//submit if there are no errors
document.forms['main'].addEventListener('submit', () => {
    if(document.forms["main"].reportValidity()){
        submit();
        filltable();
    }
}, false);

//saves info to localstorage
function submit(){
    let data = new FormData(main);
    let obj = {}; //for info
    let idobj = {}; //info with ID
    var LastIndex = 0;

    if(localStorage.length > 0){
        let LS = JSON.parse(localStorage["info"]);
        if(LS.length > 0){
            LastIndex = parseInt(Object.keys(LS[LS.length-1]))+1;
        }
    }

    for(let [key, value] of data){
        obj[key] = value;
    }
    idobj[LastIndex] = obj;
    info[info.length] = idobj;
    
    localStorage.setItem("info", JSON.stringify(info));
}

function filltable(){
    let info = JSON.parse(localStorage["info"]);
    
    table.innerHTML = '';
    info.forEach(element => {
        for([key, value] of Object.entries(element)){
            let note = `
            <div class="modal" id="modal${key}">
              <div class="modal-dialog">
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                        <h4 class="modal-title">Notes:</h4>
                    </div>
                    <div class="modal-body">
                    ${value["Notes"]}
                    </div>
                </div>
              </div>
            </div>
            `;

            let tr = `
            <tr id=${key} data-bs-toggle="modal" data-bs-target="#modal${key}">
                <td><i class="fa-solid fa-trash-can" onclick="removeRow(${key})"></i></td>
                <td>${parseInt(key)+1}</td>
                <td>${value["First name"]}</td>
                <td>${value["Last name"]}</td>
                <td>${value["Address"]}</td>
                <td>${value["Date"]}</td>
                <td>${value["Gender"]}</td>
            </tr>
            `;

            table.innerHTML += note;
            table.innerHTML += tr;
        }
    });
    document.getElementById("table").appendChild(table);
}

function removeRow(key){
    var value;
    
    //find value to remove
    info.forEach(element => {
        if(Object.keys(element) == key){
            value = (element[key]);
        }
    });

    //find index of value
    const indexOfObject = info.findIndex(object => {
        return object[Object.keys(object)] == value;
    });

    info.splice(indexOfObject, 1);

    localStorage.setItem("info", JSON.stringify(info));

    for( i of document.getElementsByClassName("modal-backdrop")){
        i.classList -= 'show';
    }

    filltable();
}