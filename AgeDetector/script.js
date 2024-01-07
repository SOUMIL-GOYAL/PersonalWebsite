let video = document.getElementById("video");
let model, custommodel;
// declare a canvas variable and get its context
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let labelContainer = document.getElementById("label-container");

for (let i = 0; i < 11; i++) { // and class labels
    labelContainer.appendChild(document.createElement("div"));
}

const setupCamera = () => {
    navigator.mediaDevices
        .getUserMedia({
            video: { width: 600, height: 400 },
            audio: false,
        })
        .then((stream) => {
            video.srcObject = stream;
        });
};

async function detectFaces() {
    const prediction = await model.estimateFaces(video, false);

    //console.log(prediction);

    // draw the video first
    ctx.drawImage(video, 0, 0, 600, 400);

    if (prediction.length > 0) {
        for (let i = 0; i < prediction.length; i++) {
            var pred = prediction[i];
            // draw the rectangle enclosing the face
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "blue";
            // the last two arguments are width and height
            // since blazeface returned only the coordinates, 
            // we can find the width and height by subtracting them.
            ctx.rect(
                pred.topLeft[0],
                pred.topLeft[1],
                pred.bottomRight[0] - pred.topLeft[0],
                pred.bottomRight[1] - pred.topLeft[1]
            );
            ctx.stroke();

            const start = pred.topLeft;
            const end = pred.bottomRight;
            const size = [end[0] - start[0], end[1] - start[1]];

            const face = ctx.getImageData(start[0], start[1], size[0], size[1]);
            const faceTensor = tf.browser.fromPixels(face);
            const croppedFace = tf.image.resizeBilinear(faceTensor, [224, 224]);
            const expanded = tf.expandDims(croppedFace, 0);
            const result = await custommodel.predict(expanded);
            const probabilities = tf.softmax(result).arraySync();
            console.log(probabilities);
            for (let i = 0; i < 11; i++) {
                const classPrediction =
                    result[i].className + ": " + result[i].probability.toFixed(2);
                labelContainer.childNodes[i].innerHTML = classPrediction;
            }
            // ctx.fillText(result, start[0], start[1] > 10 ? start[1] - 5 : 10);

            // drawing small rectangles for the face landmarks

            // ctx.fillStyle = "red";
            // pred.landmarks.forEach((landmark) => {
            //     ctx.fillRect(landmark[0], landmark[1], 5, 5);
            // });

        }
    }
};

setupCamera();
video.addEventListener("loadeddata", async() => {
    model = await blazeface.load();

    const URL = "model/"
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    custommodel = await tf.loadLayersModel(modelURL, metadataURL);

    // call detect faces every 100 milliseconds or 10 times every second
    setInterval(detectFaces, 100);
});