baby=[];
status="";
objects=[];

function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectdetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}

function modelLoaded() 
{
console.log("model loaded!");
status=true;
}

function gotResult(error,results) 
{
if(error)
{
    console.error(error);
}
console.log(results);
objects=results;
}

function draw()
{
    image(video,0,0,380,380);
    if(status != "")
    {
        r=random(255);
        g=random(255);
        b=random(255);
        objectdetector.detect(video,gotResult);
        for(i=0; i<objects.length; i++) 
        {
            document.getElementById("status").innerHTML="status:object detected";
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person")
            {
                document.getElementById("baby").innerHTML="Baby found";
            }
            else{
                document.getElementById("baby").innerHTML="Baby not found";
            }
        }
        if(objects.length==0)
        {
            document.getElementById("baby").innerHTML="Baby not found";
        }
    }
}