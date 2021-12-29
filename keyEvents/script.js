const input = document.querySelector('#username');

input.addEventListener("keydown", function(event) { //listen to any key that are toucked
   console.log('KEY DOWN!'); 
})

input.addEventListener("keyup", function(event) { //listen to any key that are toucked
    console.log('KEY UP!'); 
 })

 input.addEventListener("keypress", function(event) { //listen to any to key that shows up
    console.log('KEY PRESS!'); 
 })

 const addItemInput = document.querySelector('#addItem');
 const itemsUL = document.querySelector('#items')

 addItemInput.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        //check if any value
        if (! addItemInput.value) return; // or insted of addItemInput.value => this.value
        //add a new item to list
        const newItemText = addItemInput.value; // or insted of addItemInput.value => this.value
        const newItem = document.createElement('li');
        newItem.innerText = newItemText;
        itemsUL.appendChild(newItem);
        addItemInput.value = ""; // or insted of addItemInput.value => this.value
    }
 })