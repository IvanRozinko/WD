$(document).ready(function () {

    const $breeds = [
        {
            name: "dalmatian",
            icon: "<i class='flaticon-dog'></i>"
        },
        {
            name: "jack russel",
            icon: "<i class='flaticon-dog-1'></i>"
        },
        {
            name: "basset hound",
            icon: "<i class='flaticon-basset-houd'></i>"
        },
        {
            name: "boxer",
            icon: "<i class='flaticon-boxer'></i>"
        },
        {
            name: "collie",
            icon: "<i class='flaticon-collie'></i>"
        },
        {
            name: "poodle",
            icon: "<i class='flaticon-poodle'></i>"
        },
        {
            name: "akitas",
            icon: "<i class='flaticon-akitas'></i>"
        },
        {
            name: "bullterrier",
            icon: "<i class='flaticon-bullterrier'></i>"
        }];

    const $select = $("<div>", {id: "options"});

    $breeds.forEach((breed) => {
        const $option = $("<div>", {class: "option", text: breed.name});
        $option.append(breed.icon);
        $select.append($option);
    });
    $select.appendTo("#select");
    $select.hide();

    $("#title").click((event) => {
        $select.slideToggle();
        event.stopPropagation();
    });

    $(".option").click(function() {             //why if I replace with () => it returns other
       const content = $(this).text();
       $("#breed").text(content);
        $select.slideUp();
    });

    $(window).click(function() {
        $select.slideUp();
    });

});