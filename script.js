const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");
const clearAllButton = document.querySelector("#clear-all-button");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

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

    const searchText = searchInput.value.toLowerCase().trim();

    const filteredNotes = notes.filter(function (note) {
        return note.text.toLowerCase().includes(searchText);
    });

    if (filteredNotes.length === 0 && searchText !== "") {
        const message = document.createElement("li");
        message.textContent = "No notes match your search.";
        notesList.appendChild(message);
    } else {
        filteredNotes.forEach(function (note) {
  
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

                saveNotes();
                render();
            });

            listItem.appendChild(noteText);
            listItem.appendChild(categoryLabel);
            listItem.appendChild(date);
            listItem.appendChild(deleteButton);

            notesList.appendChild(listItem);
        });
    }

    updateNoteCount();
}

noteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    if (text === "") {
        errorMessage.textContent = "Please enter a note.";
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent =
            "Your note cannot exceed 200 characters.";
        return;
    }

    if (category === "") {
        errorMessage.textContent = "Please choose a category.";
        return;
    }


    errorMessage.textContent = "";


    const note = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);
    saveNotes();

    
    render();

    
    noteInput.value = "";
    noteCategory.value = "";
});


searchInput.addEventListener("input", function () {
    render();
});


clearAllButton.addEventListener("click", function () {
    if (confirm("Delete all notes?")) {
        notes = [];

        saveNotes();
        render();
    }
});

render();