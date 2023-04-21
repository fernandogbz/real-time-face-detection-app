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
  //Add that canvas to the screen
  document.body.append(canvas);
  //Get the display size of our current video
  const displaySize = { width: video.width, height: video.height};
  // Set interval cause the code is gonna run multiple times in a row, asynchronous cause is an asynchronous library
  setInterval(async () => {
    // Detections is going to await the faceapi, it's going to get all the faces inside of the webcam image, we're going to do this every 100 miliseconds
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions(); //Inside of here I pass the video element, what type of library we're gonna use to detect the faces and what we want to detect this faces with
    console.log(detections);
    //ResizedDetections is gonna make it so that the boxes that show up around the face are properly sized for the video element that I'm using as well as for the canvas
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    //To clear the canvas
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    //Draw the detections in the canvas
    faceapi.draw.drawDetections(canvas, resizedDetections);
  }, 100)
});

startVideo()