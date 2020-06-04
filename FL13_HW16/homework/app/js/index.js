const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');
const FINAL_STATE = 4;
const REQUEST_OK = 200;
const REQUEST_CREATED = 201;
const NO_CONTENT = 204;

function User(name, username){
    this.name = name;
    this.username = username;
}
class App{
    constructor(rootNode, baseUrl){
        this.rootNode = rootNode,
        this.baseUrl = baseUrl
    }

    createForm(){
        const form = document.createElement('form');
        
        let name = document.createElement('input');
        name.setAttribute('id', 'name');
        name.setAttribute('placeholder', 'Name');

        let fullName = document.createElement('input');
        fullName.setAttribute('id', 'fullName');
        fullName.setAttribute('placeholder', 'Full Name');

        let button = document.createElement('input');
        button.setAttribute('type', 'submit');
        button.setAttribute('value', 'Add New User');

        form.append(name, fullName, button);

        form.addEventListener('submit', e => {
            e.preventDefault();
            if(form[0].value === ' ' || form[1].value === ''){
                console.log('fail')
            } else {
                let user = new User(form[0].value, form[1].value);
                this.addUser(user);
            }

        })
        return form;
    }

    createHeader(){
        const header = document.createElement('h1');
        header.innerHTML = 'Manage User App'

        return header;
    }

    createTable(){
        const table = document.createElement('table');
        table.setAttribute('id', 'table');

        return table;
    }

    createLayout(){
        let loading = document.createElement('span')
        loading.innerHTML = 'Loading...'
        loading.setAttribute('class', 'hidden');
        
        this.rootNode.append(this.createHeader(), this.createForm(), this.createTable(), loading);
    }

    printTable(arr){
        const table = document.querySelector('#table');

        arr.forEach(element => {
            let row = document.createElement('tr');

            let id = document.createElement('td');
            id.innerHTML = element.id;

            let innerForm = document.createElement('form')

            let name = document.createElement('input');
            name.value= element.name;

            let formCell = document.createElement('td')

            let username = document.createElement('input');
            username.value = element.username;

            let updateButton = document.createElement('button');
            updateButton.setAttribute('type', 'button');
            updateButton.innerHTML = 'Update'
            
            updateButton.addEventListener('click', e => {
                let name = e.target.parentNode[0].value;
                let username = e.target.parentNode[1].value;
                let user = new User(name, username);

                updateButton.toggleAttribute('disabled');
                this.updateUser(user, element.id);

            })

            let deleteButton = document.createElement('button');
            deleteButton.setAttribute('type', 'button');
            deleteButton.innerHTML = 'Delete'

            deleteButton.addEventListener('click', () => {
                deleteButton.toggleAttribute('disabled');
                this.deleteUser(element.id);
            })

            innerForm.append(name, username, updateButton, deleteButton);  
            formCell.append(innerForm);         


            row.append(id, formCell);
            table.append(row);
        });
    }


    getList(){
        const xhr = new XMLHttpRequest();
        const context = this;
        const loadMessage = document.querySelector('span');
        xhr.open('GET', this.baseUrl+ '/users', true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === FINAL_STATE && xhr.status === REQUEST_OK) {
                    loadMessage.classList.toggle('hidden');
                    let response = JSON.parse(xhr.responseText);
                    context.printTable(response);
            }
        };

        xhr.send();
        loadMessage.classList.toggle('hidden');
    }

    addUser(user){
        const xhr = new XMLHttpRequest();
        const loadMessage = document.querySelector('span');
        xhr.open('POST', this.baseUrl + '/users', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === FINAL_STATE && xhr.status === REQUEST_CREATED) {
                    location.reload()
                    loadMessage.classList.toggle('hidden');
            }
        };
        xhr.send(JSON.stringify(user));
        loadMessage.classList.toggle('hidden');
    }

    updateUser(user, userId){
        const xhr = new XMLHttpRequest();
        const loadMessage = document.querySelector('span');
        xhr.open('PUT', `${this.baseUrl}/users/${userId}` , true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === FINAL_STATE && xhr.status === NO_CONTENT) {
                    loadMessage.classList.toggle('hidden');
                    location.reload()
            }
        };
        xhr.send(JSON.stringify(user));
        loadMessage.classList.toggle('hidden');
    }


    deleteUser(userId){
        const xhr = new XMLHttpRequest();
        const loadMessage = document.querySelector('span');
        xhr.open('DELETE', `${this.baseUrl}/users/${userId}` , true);
        xhr.setRequestHeader('Authorization', 'admin');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === FINAL_STATE && xhr.status === NO_CONTENT) {
                    loadMessage.classList.toggle('hidden');
                    location.reload();
            }
        };
        xhr.send();
        loadMessage.classList.toggle('hidden');
    }
}

const body = new App(appContainer, baseUrl)

window.addEventListener('load', () => {
    body.createLayout();
    body.getList();
})
