// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "model/";

let model, facemodel, webcam, labelContainer, maxPredictions, ctx;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    facemodel = await blazeface.load();
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(500, 500, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();

    // window.requestAnimationFrame(loop);
    setInterval(loop, 75);
    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    var width = webcam.canvas.offsetWidth;
    var height = webcam.canvas.offsetHeight;
    webcam.canvas.width = width;
    webcam.canvas.height = height;

    ctx = webcam.canvas.getContext("2d");

    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    await predict();
    // window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    const faceprediction = await facemodel.estimateFaces(webcam.canvas, false);
    webcam.update(); // update the webcam frame

    if (faceprediction.length > 0) {
        for (let i = 0; i < faceprediction.length; i++) {
            var pred = faceprediction[i];
            // draw the rectangle enclosing the face
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "red";
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

            var maxclass = "",
                maxchance = 0;

            // predict can take in an image, video or canvas html element
            const prediction = await model.predict( /*webcam.canvas*/ await createImageBitmap(face));
            //console.log(prediction);
            for (let i = 0; i < maxPredictions; i++) {
                if (prediction[i].probability > maxchance) {
                    maxchance = prediction[i].probability;
                    maxclass = prediction[i].className;
                }

                const classPrediction =
                    prediction[i].className + ": " + prediction[i].probability.toFixed(2);
                labelContainer.childNodes[i].innerHTML = classPrediction;
            }
            console.log(maxclass);

            ctx.font = "30px Arial";
            ctx.fillStyle = "red";
            ctx.fillText(maxclass, pred.topLeft[0], pred.bottomRight[1] + 50);


        }
    }

}