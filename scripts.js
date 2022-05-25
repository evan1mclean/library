let myLibrary = [];
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalButton = document.querySelector("#bookButton");
const cardContainer = document.querySelector(".display-books");

modalButton.addEventListener("click", toggleModal);
window.addEventListener("mousedown", windowOnClick);

//Constructor for book object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    if (this.read === true) {
        this.read = false;
    }
    else {
        this.read = true;
    }
}

//adds book to library array
function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

//gets user input from form element
function getBookFromForm() {
    let submitButton = document.getElementById("submit");

    submitButton.addEventListener("click", function(e) {
        let title = document.getElementById("title").value;
        let author = document.getElementById("author").value;
        let pages = document.getElementById("pages").value;
        //checks to make sure fields aren't empty
        if (title.length === 0 || author.length === 0 || pages.length ===0) {
            return;
        }
        let read = document.getElementById("read");
        if (read.checked) {
            read = true;
        }
        else {
            read = false;
        }
        //adds book to library using user input
        addBookToLibrary(title, author, pages, read);
        displayBook();
        e.preventDefault();
        document.querySelector(".add-book-form").reset();
        toggleModal();
    });
}

//Function to loop through library array and display each book on a card
function displayBook() {
    removeAllBooks();
    for (let i = 0; i < myLibrary.length; i++) {
       let book = myLibrary[i];
       let card = document.createElement("div");
        card.classList.add('card');
        card.dataset.index = i;
        cardContainer.appendChild(card);
        let title = document.createElement("h2");
        let author = document.createElement("p");
        let pages = document.createElement("p");
        let buttonContainer = document.createElement("div");
        let read = document.createElement("button");
        let remove = document.createElement("button");
        title.textContent = book.title;
        author.style.fontStyle = "italic";
        author.textContent = book.author;
        pages.textContent = book.pages + " Pages";
        buttonContainer.classList.add("button-container");
        read.classList.add('read-button');
        remove.classList.add('remove-button');
        remove.textContent = "Remove";
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(buttonContainer);
        buttonContainer.appendChild(read);
        readButtonStyle(i, book.read);
        buttonContainer.appendChild(remove);
    }
    toggleReadStatusWithButton();
    removeIndividualBook();
}

//Function for removing all books from the page
function removeAllBooks() {
    let book = document.querySelectorAll('.card');
    if (book.length === 0) {
        return;
    }
    else {
        for (const card of book) {
            card.remove();
        }
    }
}

//Function to remove book object from display and library array when remove button is pressed
function removeIndividualBook() {
    let removeButton = document.querySelectorAll(".remove-button");
    removeButton.forEach(element => {
        element.addEventListener("click", function(e) {
            let index = e.target.parentElement.parentElement.dataset.index
            myLibrary.splice(index, 1);
            displayBook();
        }); 
    });
}

//Displays different style depending on if the book is read or not
function readButtonStyle(i, read) {
    let button = document.querySelector(`[data-index="${i}"] .read-button`);
    if (read === false) {
        button.style.backgroundColor = "rgb(248, 101, 101)";
        button.textContent = "Not Read";
    }
    else {
        button.style.backgroundColor = "rgb(31, 145, 31)";
        button.textContent = "Read";
    }
}

//Function for toggling if a book has been read or not with the read/not read button
function toggleReadStatusWithButton() {
    let readButton = document.querySelectorAll(".read-button");
    readButton.forEach(element => {
        element.addEventListener("click", function(e) {
            let index = e.target.parentElement.parentElement.dataset.index;
            myLibrary[index].toggleReadStatus();
            displayBook();
        });
    });
}

//function for displaying modal form
function toggleModal() {
    modal.classList.toggle("show-modal");
    modalContent.classList.toggle("show-modal");
}

//allows you to exit modal by clicking outside of the form
function windowOnClick(e) {
    if (e.target === modal) {
        document.querySelector(".add-book-form").reset();
        toggleModal();
    }
}

getBookFromForm();