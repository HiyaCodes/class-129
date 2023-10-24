scoreLeftWrist = 0

leftWristX = 0
leftWristY = 0
rightWristX = 0
rightWristY = 0
song = ""

function preload() {
    song = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(500, 500)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}

function draw() {
    image(video, 0, 0, 500, 500)

    fill("pink")
    stroke("purple")
    if (scoreLeftWrist > 0.2) {

        circle(leftWristX, leftWristY, 20)
        inNumberLeftWristY = Number(leftWristY)
        remove_decimals = floor(inNumberLeftWristY)
        volume = remove_decimals / 500
        document.getElementById("volume").innerHTML = "volume : " + volume
        song.setVolume(volume)
    }
}

function play() {
    song.play()
    song.setVolume(1)
    song.rate(1)
}

function modelLoaded() {
    console.log("poseNet has been initialised")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)

        scoreLeftWrist = results[0].pose.keypoints[9].score

        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y

        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
    }
}