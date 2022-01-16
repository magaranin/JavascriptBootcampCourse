
//     ***** The async keyword *****
// Async functions always return a promise
// If the function returns a value, the promise will be resolved with that value
// If the function throws an exceptions, the promise will be rejected

async function greet() {
    return 'Hello!!!'
}

greet().then((val) => {
    console.log('Promise Resolved with:', val);
});

//**********   FUNCTION add1 with async ******************
async function add1(x,y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
        throw 'x and y must be numbers!'
    }
    return x + y;
}

add1(4, 5).then((val) => {
    console.log('PROMISE RESOLVED WITH: ', val);
})
.catch((err) => {
    console.log('PROMISE REJECTED WITH: ', err)
});

//**********   FUNCTION add2 with promise ******************
function add2(x,y) {
    return new Promise((resolve, reject) => {
        if (typeof x !== 'number' || typeof y !== 'number') {
            reject ('x and y must be numbers!')
        }
        resolve (x + y);
    }) 
}

add2('4', 5).then((val) => {
    console.log('PROMISE RESOLVED WITH: ', val);
})
.catch((err) => {
    console.log('PROMISE REJECTED WITH: ', err)
});
//========================================================

//    ******** THE AWAIT KEYWORD **********
// We can only use the await keyword inside of functions declared with async.
// Await will pause the execution of the function, waiting for o promise to be resolved 

function getPlanets1() {
    return axios.get('https://swapi.py4e.com/api/planets/')
}

getPlanets1().then((res) => {
    console.log(res.data);
});
//-------------------------------------------------------------
// Easier way is to declare an async function

async function getPlanets2() {
    const res = await axios.get('https://swapi.py4e.com/api/planets/');
    console.log(res.data);  //only runs once the previous line is complete (the axios promise is resolved)
}
getPlanets2().catch((err) => {
    console.log('IN CATCH!!!');
    console.log(err);
})

//There is a different way to catch the error by adding a try and catch block. Please see below:

async function getPlanets3() {
    try {
        const res = await axios.get('https://swapi.py4e.com/api/1/');
        console.log(res.data);  //only runs once the previous line is complete (the axios promise is resolved)
    }
    catch(e) {
        console.log('IN CATCH!!!', e);
    }
}
getPlanets3();