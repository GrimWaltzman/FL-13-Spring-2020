let user = prompt('Enter your name please');
const date = new Date().getHours();
const minLength = 4;
const evening = 20;
if(user === null || user.length === 0){
    alert('Canceled');
} else if(user.length < minLength){
    alert("I don't know any users having name length less than 4 symbols")
} else if(user === 'User'){
    let password = prompt('Enter your password please');
    if(password === 'UserPass'){
        if(date<evening){
            alert('Good day, dear User!')
        }else if(date>=evening){
            alert('Good evening, dear User!')
        }
    } else {
        alert('Wrong password')
    }
} else if(user === 'Admin') {
    let password = prompt('Enter your password please');
    if(password === 'RootPass'){
        if(date<evening){
            alert('Good day, dear Admin!')
        }else if(date>=evening){
            alert('Good evening, dear Admin!')
        }
    } else {
        alert('Wrong password')
    }
}else {
    alert(`I don't know you`);
}