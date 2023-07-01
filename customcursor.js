const cursor = $("#customcursor");

// var x, y, width, height, iw, ih, xvel, yvel, ex, ey, mousex, mousey;

// var kp = 1;
// var ki = 0;

// var lastx = 0;
// var lasty = 0;
// var eix = 0;
// var eiy = 0;
// var lastscrollx = 0;
// var lastscrolly = 0;

// function mousehandler(e) {
//     width = cursor.outerWidth(true);
//     height = cursor.outerHeight(true);

//     iw = $(document).innerWidth();
//     ih = $(document).innerHeight();


//     if (typeof(e.pageX) !== "number") {
//         mousex += window.scrollX - lastscrollx;
//     } else {
//         mousex = e.pageX - width / 2;
//     }
//     if (typeof(e.pageY) !== "number") {
//         mousey += window.scrollY - lastscrolly;
//     } else {
//         mousey = e.pageY - height / 2;
//     }

//     ex = mousex - lastx;
//     ey = mousey - lasty;

//     eix += ex;
//     eiy += ey;

//     x = Math.pow(ex, 2) * +lastx;
//     y = Math.pow(ey, 2) * +lasty;

//     if (x + width > iw) {
//         x = iw - width;
//     }
//     if (x < 0) {
//         x = 0;
//     }
//     if (y + height > ih) {
//         y = ih - height;
//     }
//     if (y < 0) {
//         y = 0;
//     }


//     //cursor.css({ left: x, top: y });

//     cursor.animate({ left: x, top: y }, Math.sqrt(Math.pow(ex, 2) + Math.pow(ey, 2)) * .005, "easeInOutBack");
//     lastx = x;
//     lasty = y;
//     lastscrollx = window.scrollX;
//     lastscrolly = window.scrollY;
// }









// Assume you have a variable called cursor that refers to the cursor follower element
// Declare a variable to store the mouse position
var mousePosition = { x: 0, y: 0 };
var lastscrollx = 0;
var lastscrolly = 0;

function mouseupdate(e) {
    if (typeof(e.pageX) !== "number") {
        mousePosition.x += window.scrollX - lastscrollx;
    } else {
        mousePosition.x = e.pageX;
    }
    if (typeof(e.pageY) !== "number") {
        mousePosition.y += window.scrollY - lastscrolly;
    } else {
        mousePosition.y = e.pageY;
    }

    lastscrollx = window.scrollX;
    lastscrolly = window.scrollY;


}


// Attach a mousemove listener to the document to update the mouse position
$(document).on("mousemove", function(e) {
    mouseupdate(e);
});
$(window).scroll(function(e) {
    mouseupdate(e);
});
$(document).bind("dragover", function(e) {
    mouseupdate(e);
});

// Declare a function to animate the position of the cursor follower element
function animateCursor() {

    var width = cursor.outerWidth(true);
    var height = cursor.outerHeight(true);

    var iw = $(document).innerWidth();
    var ih = $(document).innerHeight()

    // Get the current position of the cursor follower element
    var offset = cursor.offset();
    // var cursorX = offset.left;
    // var cursorY = offset.top;

    // Calculate the distance and direction between the mouse and the cursor follower element
    if (Math.abs(distanceX) <= 40 && Math.abs(distanceY) <= 40) {
        var cursorX = offset.left + ((Math.random() * 2) - 1) * 100;
        var cursorY = offset.top + ((Math.random() * 2) - 1) * 100;
    } else {
        var cursorX = offset.left;
        var cursorY = offset.top;
    }
    var distanceX = mousePosition.x - (width / 2) - cursorX;
    var distanceY = mousePosition.y - (height / 2) - cursorY;
    var directionX = distanceX > 0 ? 1 : -1;
    var directionY = distanceY > 0 ? 1 : -1;

    // Calculate the speed of the animation based on the distance
    // You can use any function you like, such as linear, quadratic, exponential, etc.
    // Here I'm using a simple quadratic function: y = x * x * 0.01
    var speedX = distanceX * distanceX * 0.007 * directionX;
    var speedY = distanceY * distanceY * 0.007 * directionY;

    // var speedX = Math.pow(distanceX, 3) * .0001;
    // var speedY = Math.pow(distanceY, 3) * .0001;

    if (speedX > distanceX) {
        speedX = distanceX
    }
    if (speedY > distanceY) {
        speedY = distanceY
    };

    // Calculate the new position of the cursor follower element
    var newX = cursorX + speedX;
    var newY = cursorY + speedY;



    if (newX + width > iw) {
        newX = iw - width;
    }
    if (newX < 0) {
        newX = 0;
    }
    if (newY + height > ih) {
        newY = ih - height;
    }
    if (newY < 0) {
        newY = 0;
    }


    // Apply the new position to the cursor follower element
    cursor.css({ left: newX, top: newY });

    $(".reveal").each(function() {
        $(this).css({ "clip-path": "ellipse(" + width / 2 + "px " + height / 2 + "px at " + (newX + (width / 2) + $(this).offset().left) + "px " + (newY + +(height / 2) - $(this).offset().top) + "px)" });

    });



    // Request the browser to call this function again on the next frame
    requestAnimationFrame(animateCursor);
}

// Start the animation loop
requestAnimationFrame(animateCursor);


function expander(amount) {
    // cursor.animate({ width: amount, height: amount }, "easeInOutBack");

    cursor.css({ "width": amount });
    cursor.css({ "height": amount });

}

function normalize() {
    // cursor.animate({ width: "40px", height: "40px" }, "easeInOutBack");

    cursor.css({ "width": "40px", "height": "40px", "display": "block" });
}

$(".reveal").on("mouseleave", function() { normalize() }).on("mouseover", function() { expander($(this).attr("expansion")) });

$(".merge").on("mouseover", function() {
    // cursor.css({ "display": "none" })
    cursor.css({ "width": "0px", "height": "0px" });
    $(this).css({ "background-color": cursor.css("background-color") })
}).on("mouseleave", function() {
    normalize();
    $(this).css({ "background-color": "" })
});