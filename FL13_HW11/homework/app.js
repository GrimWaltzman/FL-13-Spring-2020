const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');
const contextMenuOptions = ['Rename', 'Delete Item'];

function createContextMenu(options, node){

  let contextMenu = document.createElement('div');
  contextMenu.classList.add('hidden', 'context-menu');

  for(let i in options){
    let option = document.createElement('a');
    option.classList.add('menu-option');
    option.innerHTML = options[i];
    contextMenu.append(option);
  }

  node.append(contextMenu);
}

function createTree(obj, container){
  container.append(createTreeDOM(obj));
}

function createTreeDOM(obj){
  if(!Object.keys(obj).length){
    return;
  }

  let list = document.createElement('ul');
  let folderIcon = '<i class="material-icons">folder</i>'
  let documentIcon = '<i class="material-icons">insert_drive_file</i>'

  for(let i in obj){

    let item = document.createElement('LI');
    item.innerHTML = folderIcon + ' ' + obj[i].title;
    
    if(obj[i].folder){
      item.classList.add('folder', 'closed');
      item.innerHTML = folderIcon + ' ' + obj[i].title;
    } else {
      item.innerHTML = documentIcon + ' ' + obj[i].title;
    }

    list.append(item)
    if(obj[i].children){ 
      let childList = createTreeDOM(obj[i].children);
      list.append(childList);
    } else if(obj[i].folder){
      let childList = generateEmptyFolder();
      list.append(childList);
    }
  }

  return list;
}

function generateEmptyFolder(){
  let childList = document.createElement('ul');
  childList.classList.add('empty');

  let emptyDesignation = document.createElement('li');
  emptyDesignation.innerHTML = 'Folder is empty'
  emptyDesignation.classList.add('italicised');

  childList.append(emptyDesignation);

  return childList;
}

createContextMenu(contextMenuOptions, rootNode);
createTree(data, rootNode);

const contextMenu = document.querySelector('.context-menu');
let contextTarget;

contextMenu.addEventListener('click', event => {
  event.stopPropagation();
})

rootNode.addEventListener('click', event => {
  if(event.target.classList.contains('folder')){
    event.target.classList.toggle('closed');

    if(!event.target.classList.contains('closed')){
      event.target.firstChild.innerHTML = 'folder_open';
    } else {
      event.target.firstChild.innerHTML = 'folder';
    } 
 }
})

rootNode.addEventListener('contextmenu', event => {

  event.preventDefault();
  contextMenu.style.top = event.clientY + 'px';
  contextMenu.style.left = event.clientX + 'px';
  contextMenu.classList.remove('hidden');
  contextTarget = event.target;
})

rootNode.addEventListener('click', event => {
  if(event.button !== 2){
    contextMenu.classList.add('hidden');
  }
})

contextMenu.addEventListener('click', event => {
  event.stopPropagation();
})

contextMenu.addEventListener('click', (event) => {
  if(event.target.innerHTML === 'Delete Item'){
    deleteItem(contextTarget);
  } else if( event.target.innerHTML === 'Rename'){
    renameItem(contextTarget);
  }

  contextMenu.classList.add('hidden');
})


function deleteItem(target) {
  if(target.classList.contains('folder')){
    target.nextSibling.remove();
    target.remove();
  } else if(target.parentNode.classList.contains('folder')){
    target.parentNode.nextSibling.remove();
    target.parentNode.remove()
  } else {
    target.remove();
  }
}

function renameItem(target){
  let input = document.createElement('input');
  let designatedParts = target.innerHTML.split(' ');
  input.value = designatedParts[2];
  target.innerHTML = designatedParts[0]+ ' ' + designatedParts[1];
  target.append(input);

  let char = input.value.indexOf('.');
  
  input.focus();
  input.setSelectionRange(0, char);

  input.addEventListener('focusout', () => {
    input.parentElement.innerHTML = designatedParts[0]+ ' ' + designatedParts[1] + ' ' + input.value;
  })
  

}