class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) { //will be called automatically whenever we create a new instance
        this.durationInput = durationInput; //added as a proprietie
        this.startButton = startButton; //added as a proprietie
        this.pauseButton = pauseButton; //added as a proprietie

        if (callbacks) {
            //stored the reference
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }
    // Set event handlers on different elements.
    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.interval = setInterval(this.tick, 20);
    };

    pause = () => {
        clearInterval(this.interval);
    }

    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            this.timeRemaining = this.timeRemaining - .02; // is going to invoce function get/set timeRemaining()
            if (this.onTick) {
                this.onTick(this.timeRemaining);
            }
        }    
    };

    get timeRemaining() { // this is a getter 
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }

}