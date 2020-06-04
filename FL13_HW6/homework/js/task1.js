let total = prompt('Enter the check number');
let tip = prompt('Enter the tip percentage');
let percentConstant = 100;
let roundConstant = 2;


if(isNaN(tip) || tip>percentConstant || tip<=0 || isNaN(total) || total<0){
    alert('Invalid input data')
}

let tipSum = tip/percentConstant*total;
let totalSum = +total+tipSum;

tipSum = +tipSum.toFixed(roundConstant);
totalSum = +totalSum.toFixed(roundConstant);

alert(`Check number: ${total}
    Tip: ${tip}%
    Tip amount: ${tipSum}
    Total sum to pay:  ${totalSum}`
)