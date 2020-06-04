const paymentCard = {cash: '100$'}
const creditCard = {creditLimit: '50$', cash: '200$'};

const assign = function (target, ...sources){
    sources.forEach(source => {
        Object.keys(source).forEach(key => {
            target[key] = source[key];
        })
    })

    return target;
}

// const universalCard = assign({}, creditCard, paymentCard);
// console.log(universalCard);

