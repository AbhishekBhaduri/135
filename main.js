video = ""
objects = []
function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResults);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: Object Dectected";
            document.getElementById("number_of_object").innerHTML = "number of object detected are :" + object.length;

            fill("green")
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#26d420")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }

}


function start() {
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = 'status : dectecting object';
}

function modelloaded() {
    console.log("Model Loaded!")
    video.loop()
    video.speed(1)
    video.volume(0)
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results)
}