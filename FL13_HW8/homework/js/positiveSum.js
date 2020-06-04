function positiveSum(args){
    let result = 0;
    for (let i in args){
        if(args[i]>=0){
            result += args[i];
        }
    }
    return result;
}

console.log(positiveSum([0, -3, 5, 7]));