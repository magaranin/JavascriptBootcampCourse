const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'indigo', 'violet'];
const container = document.querySelector('#boxes');

const changeColor = function(event) {
    console.log(event);
    const h1 = document.querySelector('h1');
    //change the h1 color to be the clicked box 
    h1.style.color = this.style.backgroundColor; // this -> box 
}

for (let color of colors) {
    const box = document.createElement('div');
    box.style.backgroundColor = color;
    box.classList.add('box')
    container.appendChild(box);
    box.addEventListener('click', changeColor);
    // box.addEventListener('click', function() {
    //     changeColor(box);
    // }); 
}    

//check for a key event
document.body.addEventListener('keypress', function(e) {
   console.log(e);
})