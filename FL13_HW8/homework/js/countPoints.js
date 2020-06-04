function isBigger(num1, num2){
    return num1>num2;
}

function countPoints(args){
    let totalPoints = 0;
    for (let i in args){
        let result = args[i].split(':');
        
        if(result[0]===result[1]){
            totalPoints+=1;
        } else if (isBigger(result[0], result[1])){
            totalPoints+=3
        }else{
            continue;
        }
    }
    return totalPoints;
}

console.log(countPoints(['1:1', '1:2', '2:0', '4:2', '0:1', '2:3', '1:1', '0:1', '1:1', '3:0']));


