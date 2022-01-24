class Pet {
    constructor(name, age) {
        console.log('In pet constructor!')
        this.name = name; 
        this.age = age;
    }
    eat() { //new method
        return `${this.name} is eating!`;
    }
}


class Cat extends Pet { //extends is going to include the functionality of pet to extend pet
    constructor(name, age, liveLeft = 9) {
        console.log('In cat constructor!')
        super(name, age); // is going to be a reference to the super class
        this.liveLeft = liveLeft;
    }
    meaw() { //new method
        return 'MEOWWWWW!!!';
    }
}

class Dog extends Pet { //extends is going to include the functionality of pet to extend pet
    bark() { //new method
        return 'WOOOFFFF!!!';
    }
    eat() { // if we are going to call eat for dog will return this one not one from superclass Pet constructor
        return `${this.name} scarf his food!`
    }
}