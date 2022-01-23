class Color {
    constructor(r, g, b, name) {  // constructor is a function that will execute immediately whenever a new color is created
        this.r = r; //added as a proprietie
        this.g = g; //added as a proprietie
        this.b = b; //added as a proprietie
        this.name = name; //added as a proprietie
        this.calcHSL();
    }

    innerRGB() {
        const {r, g, b} = this;
        return `${r}, ${g}, ${b}`;
    }

    rgb() { 
        return `rgb(${this.innerRGB()})` // new method
    }

    rgba(a = 1.0) {
        return `rgba(${this.innerRGB()}, ${a})` // new method
    }

    hex() {
        const {r, g, b} = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    hsl() {
        const {h, s, l} = this;
        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    fullySaturated() {
        const {h, l} = this;
        return `hsl(${h}, 100%, ${l}%)`;
    }

    opposite() {
        const {h, s, l} = this;
        const newHue = (h + 180) % 360;
        return `hsl(${newHue}, ${s}%, ${l}%)`;
    }

    calcHSL() { 
        let {r, g, b} = this;
        //make r, g, and b franctions of 1
        r /= 255;
        g /= 255;
        b /= 255;
    
        // Find greatest and smallest channel values
        let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r)
    //Red is max
        h = ((g - b) / delta) % 6;
    else if (cmax ==g)
    // green is max
        h = (b - r) / delta + 2;
    else
    //blue is max
        h = (r - g) / delta + 4;
     h = Math.round(h * 60);
    
     //make negative hues positive behind 360 degree
    if (h < 0) h += 360;
    //calculate lightness
    l = (cmax + cmin) / 2;
    
    //calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
    // Multiply l and s by 100
    s = + (s * 100).toFixed(1);
    l = + (l * 100).toFixed(1);
    // assign h, s, l to the object to the instance
    this.h = h;
    this.s = s;
    this.l = l;
    }
}

const red = new Color(255, 67, 89, 'tomato');
const white = new Color(255, 255, 255, 'white');



