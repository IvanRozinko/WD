$(document).ready(function () {

    const $breeds = [
        {
            name: "dalmatian",
            icon: "flaticon-dog"
        },
        {
            name: "jack russel",
            icon: "flaticon-dog-1"
        },
        {
            name: "basset hound",
            icon: "flaticon-basset-houd"
        },
        {
            name: "boxer",
            icon: "flaticon-boxer"
        },
        {
            name: "collie",
            icon: "flaticon-collie"
        },
        {
            name: "poodle",
            icon: "flaticon-poodle"
        },
        {
            name: "akitas",
            icon: "flaticon-akitas"
        },
        {
            name: "bullterrier",
            icon: "flaticon-bullterrier"
        }];

    const $select = $("<div>", {id: "options"});

    $breeds.forEach((breed) => {
        const $option = $("<div>", {class: "option", text: breed.name});
        const $icon = $("<i>", {class: breed.icon});
        $option.append($icon);
        $select.append($option);
    });
    $select.appendTo("#select");
    $select.hide();

    $("#title").on("click",(event) => {
        $("#title").stop(true, true);
        event.stopPropagation();
        $select.slideToggle();
    });

    $(".option").on("click",function() {
        $(this).stop(true, true);
       const content = $(this).html();
       $("#breed").html(content);
        $select.slideUp();
    });

    $(window).on("click",function() {
        $(this).stop(true, true);
        $select.slideUp();
    });

});