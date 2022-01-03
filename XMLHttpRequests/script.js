const firstReg = new XMLHttpRequest();

firstReg.addEventListener('load', function() {
    console.log("FIRST REQUEST WORKED!!!");
    const data = JSON.parse(this.responseText);
    const filmURL = data.results[0].films[0];
    const filmReq = new XMLHttpRequest();
    filmReq.addEventListener('load', function() {
        console.log("SECOND REQUEST WORKED!!!");
        const filmData = JSON.parse(this.responseText);
        console.log(filmData);
    });
    filmReq.addEventListener('error', function(e) {
        console.log("Error", e);
    });
    filmReq.open('GET', filmURL);
    filmReq.send();
    // for (let planet of data.results) {
    //     console.log(planet.name);
    // }
});
firstReg.addEventListener('error', function(e) {
    console.log("Error");
});
firstReg.open('GET', 'https://swapi.dev/api/planets/');
firstReg.send();
console.log('Request Sent!')