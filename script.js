$(document).ready(function() {
    if (!$("#cloudcanvas").tagcanvas({
            textColour: "",
            textFont: "",
            textHeight: 30,
            // outlineColour: "transparent",
            reverse: true,
            depth: 0.7,
            maxSpeed: 0.1,
            // weight: true,
            clickToFront: 500,
            decel: .5,
            initial: [.5, 0],
            radiusX: 1,
            radiusY: 1,
            txtScale: 1,
            zoom: .9,
            pinchZoom: true,
            outlineColour: '#f6f',
            outlineThickness: 3,


        }, "tags")) {
        // something went wrong hide the canvas container,
        // $("#cloudcanvascontainer");
    }
});


function resizeCanvas() {
    var container = document.getElementById("skillscanvascontainer");
    var canvas = document.getElementById("cloudcanvas");
    var width = container.offsetWidth;
    var height = container.offsetHeight;
    canvas.width = width;
    canvas.height = height;
}

resizeCanvas();

$(window).on('resize', function() {
    resizeCanvas();
});