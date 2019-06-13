const API_URL = 'https://picsum.photos/';
const BIG_SIZE = '600/400';
const SMALL_SIZE = '60';

const IMAGES = [
    '?image=1080',
    '?image=1079',
    '?image=1069',
    '?image=1063',
    '?image=1050',
    '?image=1039'
];


$(document).ready(function () {

    moveFrameTo($(".slider-previews li:first"));

    const $preview = $(".slider-previews");

    IMAGES.forEach(function (img_path) {
        const $img = $("<li>", {class: "slider-previews"});
        const $img_preview = $("<img>", {src: API_URL + SMALL_SIZE + img_path, alt: "image"});
        $img.append($img_preview);
        $preview.append($img);
    });


    const $big_img = $(".slider-current img");
    const $prev_img = $(".slider-previews li img");

    $prev_img.on("click", function () {
        changeSlideTo($(this));
        moveFrameTo($(this).parent("li"));
    });


    $(document).on("keydown", function (event) {
        const current = $(".current");
        if (event.which === 37) {
            const left = current.prev().length === 0 ? $(".slider-previews li:last")
                                                        : current.prev();
            moveFrameTo(left);
            changeSlideTo(left.find("img"));
        }
        if (event.which === 39) {
            const right = current.next().length === 0 ? $(".slider-previews li:first")
                                                         : current.next();
            moveFrameTo(right);
            changeSlideTo(right.find("img"));
        }

    });

    function moveFrameTo(elem) {
        $(".slider-previews li").removeClass("current");
        elem.addClass("current");
    }

    function changeSlideTo(elem) {
        const img = elem.attr("src").replace(SMALL_SIZE, BIG_SIZE);
        $big_img.attr("src", img);
    }


});