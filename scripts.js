let myLibrary = [];
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalButton = document.querySelector("#bookButton");

modalButton.addEventListener("click", toggleModal);
window.addEventListener("mousedown", windowOnClick);

//Constructor for book object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//adds book to library array
function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
    console.log(myLibrary);
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
        e.preventDefault();
        document.querySelector(".add-book-form").reset();
        toggleModal();
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