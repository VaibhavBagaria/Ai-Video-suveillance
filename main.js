status=""
objects=[]
function preload(){
    video=createVideo("video.mp4")
}

function setup(){
    canvas=createCanvas(600,400)
    canvas.center()
    video.hide()
}

function draw(){
    image(video,0,0,600,400)
    if(status != ""){
        object_detector.detect(video,gotResult)
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status:Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects: "+objects.length;
            fill("blue")
            percent=(objects[i].confidence*100).toFixed(1)
            textSize(20)
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y-5)
            noFill()
            stroke("lightBlue")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
}

function Start(){
    object_detector=ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
    console.log("model loaded")
    status=true;
    video.loop()
    video.speed(1)
    video.volume(0)
}

function gotResult(error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        objects=results;
    }
}