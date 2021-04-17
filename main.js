Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function snapimg()
{
    Webcam.snap(function(data_uri)
      {
          document.getElementById("result").innerHTML='<img id="captured_image"src="'+data_uri+'"/>';
      }  
    );
}
console.log('Ml5version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6k7EuCE50/model.json',modelLoaded);
function modelLoaded()
{
    console.log('model has loaded');
}
function speak()
{
    var synth=window.speechSynthesis;
    speak_data1='prediction 1 is '+prediction1;
    speak_data2='prediction 2 is '+prediction2;
    var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}
function check()
{
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}
function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        document.getElementById("name1").innerHTML=results[0].label;
        document.getElementById("name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(results[0].label=="thumbs up")
        {
            document.getElementById("updateemoji").innerHTML="&#128077;"
        }
        if(results[0].label=="thumbs down")
        {
            document.getElementById("updateemoji").innerHTML="&#128078;"
        }
        if(results[0].label=="excellent")
        {
            document.getElementById("updateemoji").innerHTML="&#128076;"
        }
        if(results[1].label=="thumbs up")
        {
            document.getElementById("updateemoji2").innerHTML="&#128077;"
        }
        if(results[1].label=="thumbs down")
        {
            document.getElementById("updateemoji2").innerHTML="&#128078;"
        }
        if(results[1].label=="excellent")
        {
            document.getElementById("updateemoji2").innerHTML="&#128076;"
        }


    }
}