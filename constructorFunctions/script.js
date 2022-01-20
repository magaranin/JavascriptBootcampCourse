
// constructor - A class or function that specifies the type of the object instance.

// arguments - A list of values that the constructor will be called with.

// *****   The new keyword does the following things:  *****
// 1. Creates a blank, plain JavaScript object.
// 2. Adds a property to the new object (__proto__) that links to the constructor function's prototype object
// Note: Properties/objects added to the construction function prototype are therefore accessible to all instances created from the constructor function (using new).
// 3. Binds the newly created object instance as the this context (i.e. all references to this in the constructor function now refer to the object created in the first step).
// 4. Returns this if the function doesn't return an object.

function Color(r, g, b) {
    this.r = r;
    this.g = g; 
    this.b = b;
    console.log(this);
}

Color.prototype.rgb = function() {
    const {r, g, b} = this; 
    return `rgb(${r}, ${g}, ${b})`
}

Color.prototype.hex = function() {
    const {r, g, b} = this;
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

Color.prototype.rgba = function(a = 1.0) {
    const {r, g, b} = this;
    return `rgba(${r}, ${g}, ${b}, ${a})`
}

const color1 = new Color(40, 255, 60); 
const color2 = new Color(0, 0, 0); 

color1.hex()