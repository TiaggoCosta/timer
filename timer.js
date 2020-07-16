class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if(callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }
    start = () => {
        if(this.onStart) {
            this.onStart(this.timeLeft);
        }
        this.tick();
        this.idInterval = setInterval(this.tick, 50);
    }
    pause = () => {
        clearInterval(this.idInterval);
    }

    tick = () => {
        if(this.timeLeft <= 0) {
            this.pause();
            if(this.onComplete) {
                this.onComplete();
            }
        } else {
            this.timeLeft = this.timeLeft - 0.05;
            if(this.onTick) {
                this.onTick(this.timeLeft);
            }
        }
    }

    get timeLeft() {
        return parseFloat(this.durationInput.value);
    }

    set timeLeft(time) {
        this.durationInput.value = time.toFixed(2);
    }
}