//
class Book {
    //
    constructor(name, writer, image) {
        this.name = name;
        this.writer = writer;
        this.image = image;
    }
}
//
class Display {
    //
    add(book) {
        console.log("Adding to UI");
        var reader = new FileReader();
        let tableBody = document.getElementById('grid-container');
        let uiString = `<div class="grid-item">
                            <img width="200" height="200" src="Asset.png" id="preview"/>
                            <p><span style="color:#4682b4;font-weight: bold;">Name > </span>${book.name}</p>
                            <p><span style="color:#4682b4;font-weight: bold;">Writer > </span>${book.writer}</p>
                        </div>`;
        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);
        if (book.image) {
            reader.readAsDataURL(book.image);
        }                
        tableBody.innerHTML += uiString;
    }
    //
    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }
    //
    validate(book) {
        if (book.name.length < 2 || book.writer.length < 2) {
            return false
        }
        else {
            return true;
        }
    }
    //
    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    }
}
//
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);
let sequence = [];
//
function libraryFormSubmit(e) {
    //
    console.log('You have submitted library form');
    let name = document.getElementById('bookName').value;
    let writer = document.getElementById('writer').value;
    const file = document.querySelector('input[type=file]').files[0];
    let book = new Book(name, writer, file);    
    sequence.push(book);
    console.log(book);
    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        display.show('danger', 'Sorry you cannot add this book');
    }
    e.preventDefault();
}
//
let searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', searchFormSubmit);
//
function searchFormSubmit(e) {
    //
    console.log('You have submitted search form');
    let searchTxt = document.getElementById('searchTxt').value;
    let tableBody = document.getElementById('grid-container');
    let uiString = ``;
    tableBody.innerHTML = uiString;
    let book = new Book();
    for (let i = 0; i < sequence.length; i++) {
        book = sequence[i];
        if (book.name == searchTxt) {
            let display = new Display();
            if (display.validate(book)) {
                display.add(book);
                display.clear();
            }
            e.preventDefault();
        } else if (searchTxt == '') {
            let display = new Display();
            if (display.validate(book)) {
                display.add(book);
                display.clear();
            }
            e.preventDefault();
        }
    }
}
//