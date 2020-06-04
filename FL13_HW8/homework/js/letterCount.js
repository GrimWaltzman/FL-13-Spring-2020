function letterCount(str, key){
    let count = 0;
    for(let i = 0;i<str.length; i++){
        if (str[i].toLowerCase() === key.toLowerCase()){
            count++;
        }
    }
    return count;
}

console.log(letterCount('Maggie','g'));
