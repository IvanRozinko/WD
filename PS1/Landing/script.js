$(document).ready(function () {
    const $body = $("body, html");
    $(".jumper").on("click", function(event) {
        $body.stop(true, true);
        event.preventDefault();
        const $target = $($(this).attr("href"));
        const $targetHeight = $($(this).attr("href")).height();
        const $windowHeight = $(window).height();
        /*
        depend of target element height we choose offset from the top of html document.
        if element height < window height than we place element at the middle of window
        if element height > window height than we place element at the top of window
        */
        const $offset = $targetHeight > $windowHeight ?
                        $target.offset().top :
                         $target.offset().top - ($windowHeight - $targetHeight)/2;
        $body.animate({scrollTop: $offset}, 500);


    });


    const $backToTopButton =  $("#back-to-top");
    $(window).scroll(function(){
        $(this).scrollTop() > 100 ?
            $backToTopButton.fadeIn() : $backToTopButton.fadeOut();

    });

    $backToTopButton.on("click", function (){
        $body.stop(true, true);
        $body.animate({scrollTop: 0}, 500);

    });
});