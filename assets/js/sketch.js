const modelUrl = 'https://crepe.ahoi.no' // source: https://github.com/ml5js/ml5-data-and-models/tree/master/models/pitch-detection/crepe

let audioContext
let mic
let pitch
let startBtn;

function setup() {
    createCanvas(windowWidth, windowHeight)
    startBtn = createButton('Start tuning')
    startBtn.position(width/2-startBtn.width/2, height/2-startBtn.height/2)
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
        console.log(frequency)
    }
    pitch.getPitch(getPitchCallback)
}

function startListening() {
    startBtn.remove()
    audioContext = new AudioContext()
    mic = new p5.AudioIn()
    mic.start(listening)
}

function draw() {
    background(240)
}
