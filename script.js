const video = document.getElementById("video");

function startVideo() {
  navigator.mediaDevices.getUserMedia(
    {video: {} },
    stream => video.srcObject = stream,
  )
};