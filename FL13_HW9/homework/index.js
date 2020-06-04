function convert(...args){
    let output = [];
    for(let i in args){
        if(typeof args[i] === 'number'){
            output.push(''+args[i]);
        } else if (typeof args[i] === 'string') {
            output.push(+args[i])
        }
    }
    return output;
}

function executeForEach(arr, callback){
    for( let i in arr){
        callback(arr[i]);
    }
}

function mapArray(arr, callback){
    let output = [];
    executeForEach(arr, (el) => {
        output.push(callback(+el));
    })
    return output;
}

function filterArray(arr, callback){
    let output = [];

    executeForEach(arr,(el) => {
        if(callback(el)){
            output.push(el);
        }
    })
    return output;    
}

function containsValue(arr, key){
    let inArray = false;
    executeForEach(arr, (el) => {
        if(el === key){
            inArray = true;
        }
    })

    return inArray;
}

function flipOver(string){
    let container = []
    let output = '';
    for(let i in string){
        container.push(string[[...string].length-i-1]);
    }
    for (let n in container){
        output += container[n];
    }
    return output;
}

function makeListFromRange(arr){
    let output = [];
    for(let i = arr[0]; i<=arr[1]; i++){
        output.push(i);
    }
    return output;
}

const FRUITS = [
    { name: 'apple', weight: 0.5 },
    { name: 'pineapple', weight: 2 }
];

function getArrayOfKeys(arr, key){
    let output = [];
    executeForEach(arr, el => {
        output.push(el[key]);
    })
    return output;
}

function substitute(arr){
    const TEN = 10;
    const TWENTY = 20;
    return mapArray(arr, el => {
        if(el < TWENTY && el>TEN){
           return '*';
        } else {
            return el;
        }
    });
}

// const date = new Date(2020, 0, 2); //Commented out because of Magic Numbers warning
const FULL_DAY = 86400000;
function getPastDay(date, key){
    let payload = date -key*FULL_DAY;
    return new Date(payload).getDate();
//Only returns one number because it was stated during QA session that returning full date is not required
}

function formatDate(date){
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${year}/${month+1}/${day} ${hours}:${minutes}`;
}