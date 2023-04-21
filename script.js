//Getting video variable
const video = document.getElementById("video");

//Load the different models
// This is done asynchronously, so 'Promise.all' is going to run all these calls in parallel, to make it much quicker to execute
Promise.all([
  //Here pass an array of all of the promises
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models'),
]).then(startVideo); // After all the models load, then it'll start the video

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

// Event Listener for when the video starts playing
video.addEventListener('play', () => {
  //Create canvas from the video element
  const canvas = faceapi.createCanvasFromMedia(video);
  // Set interval cause the code is gonna run multiple times in a row, asynchronous cause is an asynchronous library
  setInterval(async () => {
    // Detections is going to await the faceapi, it's going to get all the faces inside of the webcam image, we're going to do this every 100 miliseconds
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions() //Inside of here I pass the video element, what type of library we're gonna use to detect the faces and what we want to detect this faces with
  }, 100)
})

startVideo()