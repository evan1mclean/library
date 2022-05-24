let myLibrary = [];
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalButton = document.querySelector("#bookButton");

modalButton.addEventListener("click", toggleModal);
window.addEventListener("mousedown", windowOnClick);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, have ${read}`;
    }
}

function addBookToLibrary() {

}

function toggleModal() {
    modal.classList.toggle("show-modal");
    modalContent.classList.toggle("show-modal");
}

function windowOnClick(e) {
    if (e.target === modal) {
        toggleModal();
    }
}