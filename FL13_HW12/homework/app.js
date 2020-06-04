let bookList = JSON.parse(localStorage.getItem('books'));
const root = document.getElementById('root');
const DELAY = 300;

function createLayout () {
    let bookshelf = document.createElement('div');
    bookshelf.classList.add('bookshelf');

    let container = document.createElement('div');
    container.classList.add('container');

    let list = document.createElement('ul');

    for(let i in bookList) {
        let book = document.createElement('li');
        book.innerHTML = bookList[i].title
        book.setAttribute('data-id', bookList[i].id);
        book.append(createButton('button', 'Edit'));
        list.append(book);
    }

    let addButton = createButton('button', 'Add a Book');
    addButton.setAttribute('id', 'add-button');
    bookshelf.append(list, addButton);

    root.append(bookshelf);
    root.append(container)
}

createLayout();

class Book {
    constructor(id, title, author, cover, summary){
        this.id = id;
        this.title = title;
        this.author = author;
        this.cover = cover;
        this.summary = summary;
    }
}

const container = document.querySelector('.container');

function createButton(type, content){
    let btn = document.createElement('button');
    btn.setAttribute('type', type);
    btn.innerHTML = content;

    return btn
}

function showPreview(index){
    container.innerHTML = '';
    const selectedBook = bookList[index-1]

    let title = document.createElement('h2');
    let author = document.createElement('p');
    let cover = document.createElement('img');
    let summary = document.createElement('p');

    title.innerHTML = selectedBook.title;
    author.innerHTML = selectedBook.author;
    cover.setAttribute('src', selectedBook.cover);
    summary.innerHTML = selectedBook.summary;

    container.append(cover, title, author, summary);
}

function generateForm(obj){
    container.innerHTML = '';
    const props = Object.keys(obj);
    let form = document.createElement('form');
    form.setAttribute('id', 'form');

    for(let i = 1; i<props.length; i++){
        let input;
        let label = document.createElement('label');
        label.setAttribute('for', props[i]);
        label.innerHTML = props[i]+ ':';

        if(i===4){
            input= document.createElement('textarea');
        } else {
            input= document.createElement('input');
        }
        
        input.setAttribute('id', props[i]);
        input.setAttribute('required', true);

        form.append(label, input);
    }
    form.append(createButton('submit', 'Submit'));
    form.append(createButton('button', 'Cancel'));

    return form;
}

function createBookEditForm(book){
    let form = generateForm(book);
    form.classList.add('edit-form');
    form.setAttribute('data-id', `${book.id}`);
    let keys = Object.keys(book);

    for(let i = 0; i<keys.length-1; i++){
        form[i].value = book[keys[i+1]];
    }
    return form;
}


function createBook (form) {
    let id = bookList.length+1;
    let title = form[0].value;
    let author = form[1].value;
    let cover = form[2].value;
    let summary = form[3].value;

    let book = new Book(id, title, author, cover, summary);

    return book;
}

function editBook(editedBook, id){
    editedBook.id = id;
    bookList[id-1] = editedBook;
    localStorage.setItem('books', JSON.stringify(bookList));
    location.hash = '';
    history.replaceState(null, '', `?id=${id}#preview`);
    window.setTimeout(() => {
        alert('Book successfully updated')
    }, DELAY);
}

function addBook(book){
    bookList.push(book);
    localStorage.setItem('books', JSON.stringify(bookList));
}

function cancelSubmit(){
    let cancel = confirm('Discard changes?');

    if(cancel){
        window.history.back();
    } else {
        return false;
    }
}

function setLocation() {
    let id = location.search.split('=')[1];
    let hash = location.hash.substring(1);
    if(hash === 'preview'){
        showPreview(id);
    } else if (hash === 'add') {
        container.append(generateForm(bookList[1]));
    } else if (hash === 'edit') {
        container.append(createBookEditForm(bookList[id-1]));
    } else {
        window.history.replaceState(null, '', `index.html`);
        container.innerHTML = '';
    }
}

window.addEventListener('load', () => {
    window.dispatchEvent(new Event('popstate'));
})

window.addEventListener('hashchange', setLocation);

window.addEventListener('popstate', setLocation);

document.querySelector('.bookshelf ul').addEventListener('click', event => {
    window.location.hash = '';
    if (event.target.tagName === 'LI'){
        let id = event.target.getAttribute('data-id');
        history.replaceState(null, '', `?id=${id}#preview`);
    } else if (event.target.tagName === 'BUTTON'){
        let id = event.target.parentNode.getAttribute('data-id');
        history.replaceState(null, '', `?id=${id}#edit`);
    }
});

document.querySelector('#add-button').addEventListener('click', () => {
    location.hash = '';
    window.history.replaceState(null, '', `#add`);
});

container.addEventListener('click', event => {
    if(event.target.tagName === 'BUTTON'){
        let form = event.target.parentNode;
        let id = form.getAttribute('data-id')
        if(event.target.getAttribute('type') === 'submit'){
            if(form.classList.contains('edit-form')){
                let editedBook = createBook(form);
                editBook(editedBook, id);
             } else {
                 let newBook = createBook(form);
                 addBook(newBook);
                 form.reset();
             }
        } else {
            cancelSubmit();
        }
    }
})