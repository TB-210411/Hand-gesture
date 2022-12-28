prediction1="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach(camera);
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image"src="'+data_uri+'"/>';
    });
}
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Hh06zgW-f/model.json",modelLoaded);
function modelLoaded(){
    console.log("Model Loaded!!");
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if (error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        
prediction1=results[0].label;

speak();
if(results[0].label=="Amazing"){
    document.getElementById("update_emoji").innerHTML="👌🏻";
}
if(results[0].label=="All the best"){
    document.getElementById("update_emoji").innerHTML="👍🏻";
}
if(results[0].label=="Victory / Peace"){
    document.getElementById("update_emoji").innerHTML="✌🏻";
}

    }
}
function speak(){
    synth=window.speechSynthesis;
    speak_data1="This gesture means "+prediction1;
    utterThis=new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utterThis);
}