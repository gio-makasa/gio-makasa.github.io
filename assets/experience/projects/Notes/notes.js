const addbtn = document.getElementById("add");

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach(note => {
        addnote(note);
    })
}

addbtn.addEventListener("click", () => {
    addnote();
});

function addnote(text = ''){
    const note = document.createElement("div");
    note.classList.add('notes');

    note.innerHTML = `
        <div id="tools">
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <div class="main ${text ? '' : 'hidden'}"></div>
        <textarea class="${text ? 'hidden' : ''}"></textarea>
    `;

    const editbtn = note.querySelector(".edit");
    const deletebtn = note.querySelector(".delete");

    const main = note.querySelector(".main");
    const textarea = note.querySelector("textarea");

    textarea.value = text;
    main.innerHTML = marked(text);

    editbtn.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textarea.classList.toggle("hidden");
    });

    deletebtn.addEventListener("click", () => {
        note.remove();
    })

    textarea.addEventListener("input", (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLS();
    });

    document.body.appendChild(note);
}

function updateLS() {
    const notestext = document.querySelectorAll('textarea');
    const notes = [];

    notestext.forEach(note => {
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}