const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");


let notes = [];


function updateNoteCount() {
    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = "You have " + notes.length + " notes.";
    }
}


function render() {
    notesList.textContent = "";

    notes.forEach(function (note) {
        
        const listItem = document.createElement("li");
        listItem.classList.add(
            "category-" + note.category.toLowerCase()
        );

        
        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        
        const categoryLabel = document.createElement("small");
        categoryLabel.textContent = note.category;

        
        const date = document.createElement("p");
        date.textContent = note.createdAt;

        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            notes = notes.filter(function (item) {
                return item.id !== note.id;
            });

            render();
        });

        
        listItem.appendChild(noteText);
        listItem.appendChild(categoryLabel);
        listItem.appendChild(date);
        listItem.appendChild(deleteButton);

        
        notesList.appendChild(listItem);
    });

    
    updateNoteCount();
}


noteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = noteInput.value.trim();

    
    if (text === "") {
        errorMessage.textContent = "Please enter a note.";
        return;
    }

    
    if (text.length > 200) {
        errorMessage.textContent = "Your note cannot exceed 200 characters.";
        return;
    }


    errorMessage.textContent = "";


    const note = {
        id: Date.now(),
        text: text,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };


    notes.push(note);


    render();

    noteInput.value = "";
});