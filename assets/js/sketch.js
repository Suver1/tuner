const modelUrl = 'https://crepe.ahoi.no' // source: https://github.com/ml5js/ml5-data-and-models/tree/master/models/pitch-detection/crepe

let audioContext
let mic
let pitch
let startBtn
let startBtnWidth = 300
let startBtnHeight = 100
let bg;

function setup() {
    bg = loadImage('/assets/images/thomas-thompson-0prD0G0SduE-unsplash.jpg')
    createCanvas(windowWidth, windowHeight)
    startBtn = createButton('Start tuning')
    startBtn.addClass('start-button')
    startBtn.position(width/2-startBtnWidth/2, height/2-startBtnHeight/2)
    startBtn.mousePressed(startListening)

}

function listening() {
    pitch = ml5.pitchDetection(
        modelUrl,
        audioContext,
        mic.stream,
        modelLoaded
    )
}

function modelLoaded() {
    pitch.getPitch(getPitchCallback)
}

function getPitchCallback(error, frequency) {
    if (error) {
        console.error(error)
    } else {
        // console.log(frequency)
    }
    pitch.getPitch(getPitchCallback)
}

function startListening() {
    startBtn.remove()
    startBtn = null;
    audioContext = new AudioContext()
    mic = new p5.AudioIn()
    mic.start(listening)
}

function draw() {
    background(bg)
}
