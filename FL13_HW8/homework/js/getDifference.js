function isBigger(num1, num2){
    return num1>num2;
}

function getDifference(num1, num2){
    if (isBigger(num1, num2)){
        return num1-num2
    } else {
        return num2-num1;
    }
}

console.log(getDifference(5, 8));