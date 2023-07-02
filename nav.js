//SCROLL WHEN LINKS ARE CLICKED
$("#navigation a, footer a[href='#top'], a[href^='#']").on('click', function(event) {
    if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function() {
            window.location.hash = hash;
        });
    }
});

//HIGHLIGHT NAVIGATION WHEN IN POSITION
var active;

$(window).scroll(function() {
    navactive();
});

function navactive() {
    var sections = $(".section-container");
    var currentScroll = $(this).scrollTop();
    sections.each(function() {
        var divPosition = $(this).offset().top;
        if (divPosition - 1 < currentScroll) {
            active = $(this);
        }
    });
    $("a").removeClass("active");
    var now = document.querySelectorAll("a[href='#" + active.attr("id") + "']");
    now[0].className += " active"
}