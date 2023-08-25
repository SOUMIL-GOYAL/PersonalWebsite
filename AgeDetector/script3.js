const video = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Load the custom model
let myModel;
async function loadModel() {
    const modelURL = 'model/model.json';
    myModel = await tf.loadLayersModel(modelURL);
}
loadModel();

// Access the webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            video.play();
            detectFaces();
        };
    });

async function detectFaces() {
    const model = await blazeface.load();

    // Detect faces
    const returnTensors = false;
    const predictions = await model.estimateFaces(video, returnTensors);

    if (predictions.length > 0) {
        for (let i = 0; i < predictions.length; i++) {
            const start = predictions[i].topLeft;
            const end = predictions[i].bottomRight;
            const size = [end[0] - start[0], end[1] - start[1]];

            // Render a rectangle over each detected face.
            context.beginPath();
            context.rect(start[0], start[1], size[0], size[1]);
            context.lineWidth = 2;
            context.strokeStyle = 'red';
            context.fillStyle = 'red';
            context.stroke();

            // Crop and resize the image to a square
            const face = context.getImageData(start[0], start[1], size[0], size[1]);
            const croppedFace = tf.image.resizeBilinear(face, [224, 224]);

            // Use your custom model for prediction
            const prediction = await myModel.predict(croppedFace);
            context.fillText(prediction, start[0], start[1] > 10 ? start[1] - 5 : 10);
        }
    }

    requestAnimationFrame(detectFaces);
}