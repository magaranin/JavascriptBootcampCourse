// *** Returning Promises from Functions ***

 const willGetYouADog = new Promise((resolve, reject) => { // promise will have 2 parametrs (resolve and reject)
    const rand = Math.random();
    if (rand < 0.5) {
        resolve();
    }
    else {
        reject(); 
    }
})
// this code will run when the promise is resolved
willGetYouADog.then(() => {
    console.log('Yay We Got A Dog!!!');
})
//this code will run when the promise is rejected
willGetYouADog.catch(() => {
    console.log(':( NO DOG')
})
//=================================================================================================

const makeDogPromise = () => {
    return new Promise((resolve, reject) => { // promise will have 2 parametrs (resolve and reject)
        setTimeout(() => {
            const rand = Math.random();
            if (rand < 0.5) {
                resolve();
            }
            else {
                reject(); 
            } 
        }, 5000);
});
}
// this code will run when the promise is resolved
makeDogPromise()
.then(() => {
    console.log('Yay We Got A Dog!!!');
})
//this code will run when the promise is rejected
.catch(() => {
    console.log(':( NO DOG')
})
//====================================
//  **** HOW TO REJECT OR ACCEPT A PROMISE WITH VALUEs
const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const pages = {
                '/users' : [
                    {id: 1, username: 'Bilbo'},
                    {id: 5, username: 'Margo'}
                ],
                '/about' : 'This is the about page!'
            };
            const data = pages[url];
            if (data) {
                resolve({status: 200, data});
            }
            else {
                reject({status: 404})
            }
        }, 1000);
    });
};

fakeRequest('/users')
    .then((res) => {
        console.log('Status Code', res.status);
        console.log('Data', res.data);
        console.log('REQUEST WORKED!');
    })
    .catch((res) => {
        console.log(res.status);
        console.log('REQUEST FAILED!');
    });

    //this should be rejected since we don't have dogs 
fakeRequest('/dogs')
    .then((res) => {
        console.log('Status Code', res.status);
        console.log('Data', res.data);
        console.log('REQUEST WORKED!');
    })
    .catch((res) => {
        console.log(res.status);
        console.log('REQUEST FAILED!');
    });