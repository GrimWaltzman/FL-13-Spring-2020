const two = 2;
const hundred = 100;
const five = 5;
let plays = confirm('Do you want to play a game?');
let secondNumber = five;
let basePrize = hundred;
let totalPrize = 0;

if(!plays){
    alert('You did not become a billionaire, but can.');
} else if(plays){
    while(plays){
        let correctPrompt = Math.round(Math.random()*secondNumber);
        let currentPrize = basePrize;
        console.log(correctPrompt);
        for (let i=3; i>0; i--){
            plays = false;
            let userInput = prompt(
`Choose a roulette pocket number from 0 to ${secondNumber}
Attempts left: ${i}
Total prize: ${totalPrize}
Possible prize on cuttent attempt: ${currentPrize}`);
            if(+userInput === correctPrompt){
                basePrize *=two;
                secondNumber*=two;
                plays = confirm(`Congratulation, you won!   Your prize is: ${currentPrize}$. Do you want to continue?`);
                totalPrize += currentPrize;
                break;
            } else {
                currentPrize = currentPrize/two;
            }
        }
        if(plays){
            continue
        } else{
            alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
            plays = confirm('Do you want to play again?');
            basePrize = hundred;
            secondNumber = five;
            totalPrize = 0;
        }
    }
}