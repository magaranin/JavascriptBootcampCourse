// axios is an external library that should be included in our index.html code "<script src="https://unpkg.com/axios/dist/axios.min.js"></script>"

// fetch we need manualy manualy t enter a message for error code. Axios knows if the status code is not 200 the catch code will run for 404 

// with axios you don't have to pass Jason, parsing. with axios is pre parse for us

const fetchNextPlanets = (url = 'https://swapi.py4e.com/api/planets/') => {
    return axios.get(url);
}

const printPlanets = ({data}) => {
    console.log(data);
    for (let planet of data.results) {
        console.log(planet.name);
    }
    return Promise.resolve(data.next);
};
fetchNextPlanets()
    .then(printPlanets)
    .then(fetchNextPlanets)
    .then(printPlanets)
    .then(printPlanets)
    .then(fetchNextPlanets)
    .catch((err) => {
        console.log('ERROR', err);
});