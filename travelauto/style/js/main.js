/**
 * Author: Saif Adnan <saif.mowefak@gmail.com>
 * Date: 8/12/14
 * Time: 1:01 PM
 */
(function($){
    "use strict";
    var compare_list = [];
    // Vertical search for search filter and location content
    $(".mCustomScrollbar").mCustomScrollbar({
        theme: 'dark'
    });
    // Horizontal Scroll for compare in search's result
    $(".mCustomScrollbar_compare").mCustomScrollbar({
        axis:"x",
        theme: 'dark',
        advanced:{
            autoExpandHorizontalScroll:true
        }
    });
    // Open location
    $(".fui-location, .a-location").on("click", function () {
        var parent = $(this).closest(".result-car");
        if (parent.find(".collapse").hasClass("in")) {
            parent.find(".ftr .btn").fadeIn();
        } else {
            parent.find(".ftr .btn").fadeOut();
        }
    });
    // Close button in location
    $(".location-picker .close").on("click", function () {
        $(this).parent().closest(".result-car").find(".ftr .btn").fadeIn();
    });
    // compare checkbox input
    $(".result-car .checkbox").on("click", function () {
        var checkbox = $(this),
            checked = checkbox.find("input[type='checkbox']").prop("checked"),
            parent = checkbox.closest(".result-car"),
            compare_item;

        compare_item = {
            img: parent.find('.left img').attr("src"),
            hertz: parent.find('.rating > img').attr("src"),
            name: parent.find(".title").html().replace(/\n/g, ''),
            price: parent.find(".price").html().replace(/\n/g, '')
        };

        var html = '<div class="item">'+
            '<div class="img">'+
            '<img src="./style/images/car01.jpg" width="120" alt="Car"/>'+
            '</div>'+
            '<div class="hertz">'+
            '<img src="./style/images/hertz.png" width="64" height="24" alt="Hertz"/>'+
            '</div>'+
            '<div class="title">'+
            'Economy Car - KIA'+
            '</div>'+
            '<div class="price">'+
            '<span>US 84</span> / Day'+
            '</div>'+
            '</div>';

        if (!checked) {
            compare_list.push(compare_item);
        } else {
            for (var i = 0; i < compare_list.length; i++) {
                if (compare_list[i].name === compare_item.name) {
                    compare_list.splice(i, 1);
                    break;
                }
            }
        }

        var html = '';

        if (compare_list.length > 0) {

            $(".search-compare").slideDown();

            for (var j = 0; j < compare_list.length; j++) {
                html += '<div class="item">' +
                    '<div class="img">' +
                    '<img src="' + compare_list[j].img + '" width="120" alt="Car"/>' +
                    '</div>' +
                    '<div class="hertz">' +
                    '<img src="' + compare_list[j].hertz + '" width="64" height="24" alt="Hertz"/>' +
                    '</div>' +
                    '<div class="title">' +
                    ' ' + compare_list[j].name + ' ' +
                    '</div>' +
                    '<div class="price">' +
                    ' ' + compare_list[j].price + ' ' +
                    '</div>' +
                    '</div>';
            }
        } else {
            $(".search-compare").slideUp();
        }

        $(".search-compare .mCSB_container").html(html);
    });
    // close button - Hide modal reviews
    $(".modal-reviews .close").on("click", function () {
        $("#Reviews").modal('hide');
    });
})(jQuery);