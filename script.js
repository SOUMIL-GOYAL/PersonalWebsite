$(document).ready(function() {
    if (!$("#cloudcanvas").tagcanvas({
            textColour: "",
            textFont: "",
            textHeight: 30,
            // outlineColour: "transparent",
            reverse: true,
            depth: 0.7,
            maxSpeed: 0.075,
            // weight: true,
            clickToFront: 500,
            decel: .5,
            initial: [.5, 0],
            radiusX: 1,
            radiusY: 1,
            txtScale: 1,
            zoom: .9,
            pinchZoom: true,
            outlineMethod: 'colour',
            outlineColour: 'tagbg',


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

$("#cloudcanvas").on("mouseleave", function() {
    $(this).tagcanvas("setspeed", [0.5, 0]);
});

$("#cloudcanvas a").on("click", function(e) {
    e.preventDefault();
});

$(".skillcard").each(function() {
    var currentcard = $(this);
    currentcard.on("mouseover", function() {
        currentcard.css({ "box-shadow": "0 0 10px " + currentcard.attr("hovercolor") });
        currentcard.find("i").css({ "color": currentcard.attr("hovercolor") });
    });
    currentcard.on("mouseleave", function() {
        currentcard.css({ "box-shadow": "" });
        currentcard.find("i").css({ "color": "" });
    });
    currentcard.click(function() {
        currentcard.toggleClass("flipped");
    });
});