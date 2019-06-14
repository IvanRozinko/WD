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

    const $previewListItems = $(".slider-previews");

    IMAGES.forEach(function (img_path) {
        const $previewListItem = $("<li>", {class: "slider-preview"});
        const $imgPreview = $("<img>", {src: API_URL + SMALL_SIZE + img_path, alt: "image"});
        $previewListItem.append($imgPreview);
        $previewListItems.append($previewListItem);
    });

    moveFrameTo($(".slider-previews li:first"));

    const $currentImg = $(".slider-current img");
    const $previewImg = $(".slider-previews li img");

    $previewImg.on("click", function () {
        changeSlideTo($(this));
        moveFrameTo($(this).parent("li"));
    });


    $(document).on("keydown", function (event) {
        const current = $(".current");

        if (event.which === 37) {
            const left = current.is(":first-child") ? $previewListItems.children().last() : current.prev();
            moveFrameTo(left);
            changeSlideTo(left.find("img"));
        }
        if (event.which === 39) {
            const right = current.is(":last-child") ? $previewListItems.children().first() : current.next();
            moveFrameTo(right);
            changeSlideTo(right.find("img"));
        }

    });

    function moveFrameTo(elem) {
        $(".slider-previews li.current").removeClass("current");
        elem.addClass("current");
    }

    function changeSlideTo(elem) {
        const imgURL = elem.attr("src").replace(SMALL_SIZE, BIG_SIZE);
        $currentImg.attr("src", imgURL);
    }


});