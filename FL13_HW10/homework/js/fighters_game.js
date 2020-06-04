const TWO = 2;
const HUNDRED = 100;

function Fighter(obj){
    let name = obj.name;
    let damage = obj.damage;
    let maxHealth = obj.hp;
    let strength = obj.strength;
    let agility = obj.agility;
    let wins = 0;
    let losses = 0;

    let currentHealth = maxHealth;

    this.getName = function(){
        return name;
    }

    this.getDamage = function(){
        return damage;
    }

    this.getHealth = function(){
        return currentHealth;
    }

    this.getStrength = function(){
        return strength;
    }

    this.getAgility = function(){
        return agility;
    }

    this.dealDamage = function(damageDealt){
        currentHealth -= damageDealt;
    }

    this.attack = function(defender){
        let probability = defender.getStrength()+defender.getAgility();
        let successfullHit = Math.random()>= probability/HUNDRED;

        if(successfullHit){
            console.log(`${name} makes ${strength} damage to ${defender.getName()}`);
            defender.dealDamage(strength);
        } else{
            console.log(name + ' attack missed');
        }
    }

    this.logCombatHistory = function(){
        console.log(`Name: ${name}, Wins: ${wins}, Losses:${losses}`);
    }

    this.heal = function(healAmount){
        if(currentHealth + healAmount <= maxHealth){
            currentHealth += healAmount;
        } else if(currentHealth+healAmount>maxHealth){
            currentHealth = maxHealth;
        }
        
    };

    this.addWin = function(){
        wins+=1
    } ;

    this.addLoss = function(){
        losses+=1
    };

}

function battle(fighter1, fighter2){
    console.log(fighter1.getHealth(), fighter2.getHealth());
    if(fighter1.getHealth() === 0){
        console.log(`${fighter1.getName()} is dead and can't fight`);
    } else if(fighter2.getHealth() === 0){
        console.log(`${fighter2.getName()} is dead and can't fight`);
    } else {
        for (let i = 1; fighter1.getHealth() > 0 && fighter2.getHealth() > 0; i++){
            if(i%TWO === 0){
                fighter2.attack(fighter1);
            } else{
                fighter1.attack(fighter2);
            }
        }

        if(fighter1.getHealth() <= 0){
            console.log(`${fighter2.getName()} has won`);
            fighter2.addWin();
            fighter1.addLoss();
        } else if (fighter2.getHealth() <= 0) {
            console.log(`${fighter1.getName()} has won`);
            fighter1.addWin();
            fighter2.addLoss();
        }
    }
}


const fighter1 = new Fighter({name: 'Maximus', damage: 25, hp: 100, strength: 30, agility: 25});
const fighter2 = new Fighter({name: 'Commodus', damage: 25, hp: 90, strength: 25, agility: 20});
