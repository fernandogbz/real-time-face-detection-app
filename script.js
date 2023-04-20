//Getting video variable
const video = document.getElementById("video");

//Load the different models
// This is done asynchronously, so 'Promise.all' is going to run all these calls in parallel, to make it much quicker to execute
Promise.all([
  
  
])

//Hooking up the webcam to the video element
function startVideo() {
  // navigator.getUserMedia takes a parameter, so video is the key, with an empty object as the parameter
  navigator.getUserMedia(
    {video: {} },
    // stream method takes whats coming from the webcam, and with video.srcObjet I set it as the source of the video
    stream => video.srcObject = stream,
    // if there's an error just log that in the console
    error => console.error(error)
  )
};

startVideo()