let string = prompt('Enter your string');
let charPosition;
let outputLength;
let byTwo = 2;

if(string.trim().length>0){
    if(string.length % byTwo === 1) {
        charPosition = string.length / byTwo;
        outputLength = 1;
    } else {
        charPosition = string.length / byTwo - 1;
        outputLength = byTwo;
    }
    let result = string.substring(charPosition, charPosition+outputLength);
    alert(`'${result}'`);
} else {
    alert('Invalid value!')
}