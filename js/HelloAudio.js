var audioCtx = new (window.AudioContext || webkitAudioContext)();
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
var canvasCtx = canvas.getContext("2d");
canvas.style.width = "600px";
canvas.style.height = "60px";
//main block for doing the audio recording
if (navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');
    var constraints = { audio: true };
    var chunks = [];
    var onSuccess = function (stream) {
        visualize(stream);
    };
    var onError = function (err) {
        console.log('The following error occured: ' + err);
    };
    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
}
else {
    console.log('getUserMedia not supported on your browser!');
}
function visualize(stream) {
    var source = audioCtx.createMediaStreamSource(stream);
    var analyser = audioCtx.createScriptProcessor();
    analyser.onaudioprocess = function (e) {
        draw(e.inputBuffer.getChannelData(0));
    };
    source.connect(analyser);
    function draw(f32) {
        WIDTH = canvas.width;
        HEIGHT = canvas.height;
        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
        canvasCtx.beginPath();
        var sliceWidth = WIDTH * 1.0 / 2048;
        var x = 0;
        for (var i = 0; i < bufferLength; i++) {
            var v = f32[i] * 10;
            var y = v * HEIGHT / 2;
            if (i === 0) {
                canvasCtx.moveTo(x, y);
            }
            else {
                canvasCtx.lineTo(x, y);
            }
            x += sliceWidth;
        }
        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
    }
}
//# sourceMappingURL=HelloAudio.js.map