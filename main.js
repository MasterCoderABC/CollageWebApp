var SpeechRecognition = window.webkitSpeechRecognition;
var Content;
var recognition = new SpeechRecognition();

function start()
{
    reset();
    document.getElementById("textarea").innerHTML = "";
    recognition.start();
} 

recognition.onresult = function(event){
    var content = event.results[0][0].transcript;

    document.getElementById("textarea").innerHTML = content;
    if(content.indexOf("take my selfie") != -1){
        speak();
    }

}


var camera = document.getElementById("realCamera");
Webcam.set({
    width:500,
    height:400,
    image_format : 'png',
    jpeg_quality:90
});

var timeInterval = 5000;

function speak(){
    var synth = window.speechSynthesis;
    Webcam.attach(camera);

    speak_data = "Taking your next Selfie in" + timeInterval / 1000 + "seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    camera.style.visibility = "visible";
    document.getElementById("start-btn").disabled = true;
    document.getElementById("reset-btn").disabled = true;
    document.getElementById("start-btn").style.cursor = "not-allowed";
    document.getElementById("reset-btn").style.cursor = "not-allowed";

    setTimeout(take_snapshot, Number(timeInterval));
    setTimeout(take_snapshot2, Number(timeInterval) * 2);
    setTimeout(take_snapshot3, Number(timeInterval) * 3);
}

function take_snapshot(){
    document.getElementById("result2").src = "";
    document.getElementById("result3").src = "";
    Webcam.snap((data_url) => {
        document.getElementById("result1").src = data_url;
     })
}

function take_snapshot2(){
    Webcam.snap((data_url) => {
        document.getElementById("result2").src = data_url;
     })
}

function take_snapshot3(){
    Webcam.snap((data_url) => {
        document.getElementById("result3").src = data_url;
     });
    document.getElementById("start-btn").disabled = false;
    document.getElementById("reset-btn").disabled = false;
    document.getElementById("start-btn").style.cursor = "pointer";
    document.getElementById("reset-btn").style.cursor = "pointer";
    save();
    save2();
    save3();
}

function reset(){
    document.getElementById("textarea").innerHTML = "";
    camera.style.visibility = "hidden";
    document.getElementById("result1").src = "Screenshot 2022-11-21 182043.jpg";
    document.getElementById("result2").src = "sunset.jpg";
    document.getElementById("result3").src = "Screenshot 2022-11-21 182423.jpg";
}

document.getElementById("select").addEventListener("change", () => {
    var e = document.getElementById("select");
    var text = e.options[e.selectedIndex].text.charAt(0);
    timeInterval = Number(text) * 1000;
});

function save(){
    var link = document.getElementById("link");
    var image = document.getElementById("result1").src;
    link.href = image;
    link.click();
}

function save2(){
    var link = document.getElementById("link");
    var image = document.getElementById("result2").src;
    link.href = image;
    link.click();
}

function save3(){
    var link = document.getElementById("link");
    var image = document.getElementById("result3").src;
    link.href = image;
    link.click();
}