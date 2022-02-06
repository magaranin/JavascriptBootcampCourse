const {Engine, Render, Runner, World, Bodies, Body, Events} = Matter;

const acceleration = 1;
const innerWallThickness = 5;
const cellsHorizontal = 10;
const cellsVerticals = 7;
const width = window.innerWidth;
const height = window.innerHeight;


const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVerticals;

const engine = Engine.create();
//disable gravity
engine.world.gravity.y = 0;
const {world} = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false, // solid shape and random color
        width,
        height
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);

const thickness = 50;
//Walls
const walls = [
    //X
    Bodies.rectangle(width / 2 , -(thickness/2), width, thickness, {isStatic: true}),
    Bodies.rectangle(width / 2, height + (thickness/2), width, thickness, {isStatic: true}),
    //Y
    Bodies.rectangle(-(thickness/2), height / 2, thickness, height, {isStatic: true}),
    Bodies.rectangle(width + (thickness/2), height / 2, thickness, height, {isStatic: true})
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

const grid = Array(cellsVerticals)
.fill(null)
.map(() => Array(cellsHorizontal).fill(false));

const verticals = Array(cellsVerticals)
.fill(null)
.map(() => Array(cellsHorizontal - 1).fill(false));

const horizontals = Array(cellsVerticals - 1)
.fill(null)
.map(() => Array(cellsHorizontal).fill(false));

//start row/column coordinates 
const startRow = Math.floor(Math.random() * cellsVerticals);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

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
        if (nextRow < 0 || nextRow >= cellsVerticals || nextColumn < 0 || nextColumn >= cellsHorizontal) {
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
            columnIndex * unitLengthX + unitLengthX / 2,
            // Y coordinates 
            rowIndex * unitLengthY + unitLengthY,
            //Wide
            unitLengthX,
            //tall
            innerWallThickness,
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'red'
                }
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
            columnIndex * unitLengthX + unitLengthX,
            // Y coordinates 
            rowIndex * unitLengthY + unitLengthY / 2,
            //Wide
            innerWallThickness,
            //tall
            unitLengthY,
            {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'red'
                }
            }
        );
        World.add(world, wall);
    });
});

//Goal
const goal = Bodies.rectangle(
    // X coordinate 
    width - unitLengthX / 2,
    // Y coordinate 
    height - unitLengthY / 2,
    //width
    unitLengthX * 0.7,
    //height
    unitLengthY * 0.7,
    {
        label: 'goal',
        isStatic: false,
        render: {
            fillStyle: 'lightgreen'
        }
    }
);
World.add(world, goal);

//radius of the ball
const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
//Ball
const ball = Bodies.circle(
    // X coordinate
    unitLengthX / 2,
    // Y coordinate 
    unitLengthY / 2,
    //ball size
    ballRadius, {
        label: 'ball',
        render: {
            fillStyle: 'blue'
        }
    }
);
World.add(world, ball);

document.addEventListener('keydown', event => {
    const {x, y} = ball.velocity;
    //up
    if (event.keyCode === 87) {
       Body.setVelocity(ball, {x, y: y - acceleration});
    }
    //right
    if (event.keyCode === 68) {
        Body.setVelocity(ball, {x: x + acceleration, y});
    }
    //down
    if (event.keyCode === 83) {
        Body.setVelocity(ball, {x, y: y + acceleration});
    }
    //left
    if (event.keyCode === 65) {
        Body.setVelocity(ball, {x: x - acceleration, y});
    }
})

// Win Condition

Events.on(engine, 'collisionStart', event => {
    event.pairs.forEach((collision) => {
        const labels = ['ball', 'goal'];
        if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)) {
            document.querySelector('.winner').classList.remove('hidden');
            // turn gravity on 
            world.gravity.y = 1; 
            //loop over all the shapes 
            world.bodies.forEach(body => {
                if (body.label === 'wall') {
                    Body.setStatic(body, false);
                }
            });
        }       
    });
});