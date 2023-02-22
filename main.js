music = "";
music2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
function preload() {
    music = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(600, 600);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotResults);
}
function draw() {
    image(video, 0, 0, 600, 600);
    fill("red");
    stroke("red");
    music.isPlaying();

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        music2.stop();
    }
    if (music_status == false) {
        music.play();
        document.getElementById('song').innerHTML = "Music Audio 1";
    }

}
function modelLoaded() {
    console.log("Model has been initialized");
}
function gotResults(results) {
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
    rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + rightWristX + ", RightWristY = "+ rightWristY);
    }
}