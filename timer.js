class Timer{
    constructor(length, name) {
        this.length = length;
        this.name = name;

        const t = document.createElement("div");
        const section = document.createElement("section");
        section.style.width = "300px"
        section.style.height = "300px"
        section.style.position = "relative"


        this.timerWrapper = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        this.timerWrapper.setAttribute("width", "300")
        this.timerWrapper.setAttribute("height", "300")
        this.timerWrapper.style.backgroundColor = "transparent";

        this.timerElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.timerElement.style.backgroundColor = "transparent";
        this.timerElement.setAttribute("r", "140");
        this.timerElement.setAttribute("cx", "150");
        this.timerElement.setAttribute("cy", "150");

        this.perimeter = 2 * Math.PI * Number(this.timerElement.getAttribute("r"))

        this.timerElement.setAttribute("fill", "transparent");
        this.timerElement.setAttribute("stroke", "purple");
        this.timerElement.setAttribute("stroke-width", "8");
        this.timerElement.setAttribute("stroke-dasharray", `${this.perimeter}`);
        this.timerElement.setAttribute("stroke-dashoffset", "0");
        this.timerElement.setAttribute("transform", "rotate(-90 150 150)");

        this.timerElement.id = `${name}`;
        // this.timerElement.classList.add("timerElement");

        this.timerValue = document.createElement("input");
        this.timerValue.value = `${length}`;
        this.timerValue.classList.add("timerValue");
        this.timerElement.append(this.timerValue);

        const buttonsDiv = document.createElement("div");
        const startButton = document.createElement("i");
        const stopButton = document.createElement("i");


        buttonsDiv.classList.add("timerButtons");
        startButton.classList.add("fa-solid");
        startButton.classList.add("fa-play");
        startButton.style.cursor = "pointer";
        startButton.style.fontSize = "50px"
        startButton.style.margin = "10px"

        stopButton.classList.add("fa-solid");
        stopButton.classList.add("fa-pause");
        stopButton.style.cursor = "pointer";
        stopButton.style.fontSize = "50px"
        stopButton.style.margin = "10px"



        startButton.addEventListener("click", () => {
            this.start();
        })
        stopButton.addEventListener("click", () => {
            this.stop();
        })


        t.style.position = "absolute";
        t.style.top = "50%";
        t.style.left = "50%";
        t.style.transform = "translate(-50%, -50%)";

        document.body.append(section)
        section.append(this.timerWrapper);
        this.timerWrapper.append(this.timerElement);
        section.append(t);
        t.append(this.timerValue);
        t.append(buttonsDiv);
        buttonsDiv.append(startButton);
        buttonsDiv.append(stopButton);
    }

    get getTime() {
        return parseFloat(this.timerValue.value);
    }

    set getTime(time) {
        this.timerValue.value = time.toFixed(2);
    }

    start() {
        if (!this.running && this.getTime > 0) {
            this.onStart();
            this.intervalId = setInterval(() => {
                if (this.length > 0) {
                    this.tick();
                }else{
                    clearInterval(this.intervalId);
                }
            }, 20)
        }else if(this.getTime === 0 || this.getTime < 0){
            console.log("You cant start from or below 0");
        }
    }
    tick() {
        let x = this.getTime;
        this.length = x;
        x -= .02;
        this.getTime = x;
        this.onTick();
        if (x === 0) {
            this.onFinish();
        }
    }

    onStart(totalDuration = this.getTime){
        this.totalDuration = totalDuration;
        console.log("Timer started");
        this.running = true;
    }

    onTick(){
        this.timerElement.setAttribute("stroke-dashoffset", `${this.perimeter * this.getTime / this.totalDuration - this.perimeter}`)
    }

    onFinish(){
        this.running = false;
        console.log("Timer finished");
        document.querySelector("audio").play()
        clearInterval(this.intervalId);
    }

    stop(){
        if(this.running){
            console.log("Timer paused")
            this.running = false;
            clearInterval(this.intervalId);
            this.length = parseFloat(this.timerValue.value);
        }
    }
}