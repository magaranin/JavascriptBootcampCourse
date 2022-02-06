const {Engine, Render, Runner, World, Bodies} = Matter;

const cells = 10;
const width = 600;
const height = 600;

const unitLength = width / cells;

const engine = Engine.create();
const {world} = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: true, // solid shape and random color
        width,
        height
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);


//Walls
const walls = [
    Bodies.rectangle(width / 2 , 0, width, 1, {isStatic: true}),
    Bodies.rectangle(width / 2, height, height, 1, {isStatic: true}),
    Bodies.rectangle(0, height / 2, 1, height, {isStatic: true}),
    Bodies.rectangle(width, height / 2, 1, height, {isStatic: true})
];
World.add(world, walls);

//maze generation

const shuffle = (arr) => {
    let counter = arr.length;

    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        counter --;
        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
    return arr;
};

const grid = Array(cells )
.fill(null)
.map(() => Array(cells ).fill(false));

const verticals = Array(cells)
.fill(null)
.map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
.fill(null)
.map(() => Array(cells ).fill(false));

//start row/column coordinates 
const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

//iterating through the maze
const stepThroughCell = (row, column) => {
    //if cell at [row, column] was visited, then return 
    if(grid[row][column]) {
        return;
    }
    //mark this cell as beingvisited
    grid[row][column] = true;

    //assemble randomly-ordered list of neigbors
    const neighbors = shuffle([
        [row - 1, column, 'up'],
        [row, column + 1, 'right'],
        [row + 1, column, 'down'],
        [row, column - 1, 'left']
    ]);
    // for each neighbor...
    for (let neighbor of neighbors) {
        const [nextRow, nextColumn, direction] = neighbor;

    //see if that neighbor is out of bounds 
        if (nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells) {
            continue;
        }
    //if we have visited that neighbor, continue to next neighbor
        if (grid[nextRow] [nextColumn]) {
            continue;
        }
    //remove a wall from either horizontals or verticals
        if (direction === 'left') {
            verticals[row][column - 1] = true;
        } else if (direction === 'right') {
            verticals[row][column] = true;
        } else if (direction === 'up') {
            horizontals[row - 1][column] = true;
        } else if (direction === 'down') {
            horizontals[row][column] = true;
        }
    stepThroughCell(nextRow, nextColumn);
    }
    //visite next cell
};
stepThroughCell(startRow, startColumn);

horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return;
        }
      
        const wall = Bodies.rectangle(
            // X coordinates 
            columnIndex * unitLength + unitLength / 2,
            // Y coordinates 
            rowIndex * unitLength + unitLength,
            //Wide
            unitLength,
            //tall
            1,
            {
                isStatic: true
            }
        );
        World.add(world, wall);
    });
});

verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return;
        }
      
        const wall = Bodies.rectangle(
            // X coordinates 
            columnIndex * unitLength + unitLength,
            // Y coordinates 
            rowIndex * unitLength + unitLength / 2,
            //Wide
            1,
            //tall
            unitLength,
            {
                isStatic: true
            }
        );
        World.add(world, wall);
    });
});

//Goal
const goal = Bodies.rectangle(
    // X coordinate 
    width - unitLength / 2,
    // Y coordinate 
    height - unitLength / 2,
    //width
    unitLength * 0.7,
    //height
    unitLength * 0.7,
    {
        isStatic: true
    }
);
World.add(world, goal);

//Ball
const ball = Bodies.circle(
    // X coordinate
    unitLength / 2,
    // Y coordinate 
    unitLength / 2,
    //ball size
    unitLength * 0.25,
    {
        isStatic: true
    }
);
World.add(world, ball);