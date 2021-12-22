const btn = document.querySelector('button')

btn.addEventListener('mouseover', () => {
    const buttonHeight = btn.clientHeight;
    const buttonWidth = btn.clientWidth;
    console.log("Mouse over me!");
    const height = Math.floor(Math.random() * (window.innerHeight - buttonHeight)) ;
    const width = Math.floor(Math.random() * (window.innerWidth - buttonWidth));
    btn.style.left = `${width}px`;
    btn.style.top = `${height}px`;
});

btn.addEventListener('click', () => {
    btn.innerText = "You Got Me";
    document.body.style.backgroundColor = 'green';
})