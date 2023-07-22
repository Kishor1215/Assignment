let requirements = {
    video:{
        facingMode:"environment",
        width:300,
        hieght:200,
    },
    audio:false,
}

navigator.mediaDevices.getUserMedia(requirements).then(function(stream){
    let videoOne = document.getElementById("vdo1");

    videoOne.srcObject = stream;


    let record = new MediaRecorder(stream);
    let cunks = [];

    document.getElementById("start_video").addEventListener("click",function(){
        record.start();
        console.log("start...");
    })


    document.getElementById("pause_video").addEventListener("click",function(){
        record.pause();
        console.log("pause...");
    })

    document.getElementById("resume_video").addEventListener("click",function(){
        record.resume();
        console.log("resume...");
    })

    document.getElementById("stop_video").addEventListener("click",function(){
        record.stop();
        console.log("stop...");
    })

    record.ondataavailable = function(e){
        cunks.push(e.data);
    }

    record.onstop = function(){
        let videoTwo = document.getElementById("vdo2");
        let newStream = new Blob(cunks,{'type':"video/mp4"});
        // console.log(URL.createObjectURL(newStream));
        cunks = []
        videoTwo.src = URL.createObjectURL(newStream);
    }

    document.getElementById("take_picture").addEventListener("click",function(){

        let canvas = document.createElement("canvas");
        
        let context2D = canvas.getContext("2d");

        context2D.drawImage(videoOne,0,0,200,195);

        let parentDiv = document.getElementById("parentDiv");

        parentDiv.appendChild(canvas);

        let image = canvas.toDataURL();

        let a = document.createElement("a");

        a.href = image;
        a.download = "image.png";
        a.click();

    })
})
.catch(err=>{
    console.log(err);
})