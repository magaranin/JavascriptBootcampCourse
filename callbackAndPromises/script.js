const btn = document.querySelector('button');

//This function moves an element "amount" number of pixels after a delay.
//If the element will stay on screen, we move the element and call the onSuccess callback function
//If the element will move off screen, we do not move the element and instead call the onFailure callback

const moveX = (element, amount, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const bodyBoundary = document.body.clientWidth;
            const elRight = element.getBoundingClientRect().right;
            const currLeft = element.getBoundingClientRect().left;
            if (elRight + amount > bodyBoundary) {
                reject({bodyBoundary, elRight, amount});
            }
            else {
                element.style.transform = `translateX(${currLeft + amount}px)`;
                resolve();
            }
        }, delay);
    });
};

moveX(btn, 200, 1000)
.then(() => {
    return moveX(btn, 100, 1000)  // since is only one return = .then(() => moveX(btn, 300, 1000))
})
.then(() => {
    return moveX(btn, 200, 1000)
})
.then(() => {
    return moveX(btn, 200, 1000)
})
.then(() => {
    return moveX(btn, 200, 1000)
})
.then(() => {
    return moveX(btn, 200, 1000)
})
.then(() => {
    return moveX(btn, 200, 1000)
})
.catch(({bodyBoundary, amount, elRight}) => {
    console.log(`Body is ${bodyBoundary}px wide`);
    console.log(`Element is at ${elRight}px, ${amount}px is too large!`)
})
