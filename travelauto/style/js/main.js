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
    $(".fui-location, .way .a-location").on("click", function () {
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
    $(".result-car .compare_container .checkbox").on("click", function () {
        var checkbox = $(this),
            checked = checkbox.find("input[type='checkbox']").prop("checked"),
            parent = checkbox.closest(".result-car"),
            compare_item;

        compare_item = {
            id: compare_list.length,
            img: parent.find('.left img').attr("src"),
            hertz: parent.find('.rating > img').attr("src"),
            name: parent.find(".title").html().replace(/\n/g, ''),
            price: parent.find(".price").html().replace(/\n/g, '')
        };

        if (!checked) {
            if (compare_list.length > 3) {
                alert("You can compare 4 cars maximum");
                return false;
            }
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

        var clone = $(".search-compare").clone();

        if ($(window).width() <= 767) {
            clone.css({
                "position": "fixed",
                "top": '100px',
                left: 0,
                right: 0,
                "display": "none",
                zIndex: 999
            });
        } else {
            clone.css({
                "position": "fixed",
                "top": '100px',
                "display": "none",
                "left": '50%',
                width: '675px',
                marginLeft: '-333px',
                zIndex: 999
            });
        }

        clone.addClass("compare-clone");

        clone.on("click", function () {
            $(window).scrollTop(100);
            $(this).remove();
        });

        if($(window).scrollTop() > 400) {
            $(".search-compare").append(clone);

            setTimeout(function () {
                clone.fadeOut(function () {
                    $(this).remove();
                });
            }, 1000);
        }

        if (compare_list.length > 0) {

            $(".search-compare").slideDown();

            for (var j = 0; j < compare_list.length; j++) {
                html += '<div class="item" id="' + j +'">' +
                    '<div class="delete"><div class="glyphicon glyphicon-remove-sign"></div></div>' +
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

        $(".search-compare .lists").html(html);
    });

    $(".mCustomScrollBar-location .select-from input[type='radio']").on("change", function () {
        if ($(this).prop("checked")) {
            $(this).closest(".result-car").find(".way-content-from").html('<strong>Pick-Up:</strong> ' + $(this).val());
        }
    });
    $(".mCustomScrollBar-location .select-to input[type='radio']").on("change", function () {
        if ($(this).prop("checked")) {
            $(this).closest(".result-car").find(".way-content-to").html('<strong>Drop-Off:</strong> ' + $(this).val());
        }
    });

    // close button - Hide modal reviews
    $(".modal .close").on("click", function (e) {
        var id = $(this).closest(".modal").attr("id");
        $("#" + id).modal('hide');
        e.stopPropagation();
    });

    $(window).scroll(function (e) {
        var label = $(".compare-wall .labels .label");
        var value = $(".compare-wall .item > div");
        var clone = $(".compare-sticky");
        if ($(this).scrollTop() > 290 && $(this).scrollTop() < 840 ) {
            if (!clone.find(".label").length) {

                clone.find(".labels").append(label.eq(0).clone());
                clone.find(".labels").append(label.eq(1).clone());
                clone.find(".labels").append(label.eq(2).clone());
                clone.find(".labels").append(label.eq(3).clone());

                clone.find(".item").eq(0).append(value.eq(0).clone());
                clone.find(".item").eq(0).append(value.eq(1).clone());
                clone.find(".item").eq(0).append(value.eq(2).clone());
                clone.find(".item").eq(0).append(value.eq(3).clone());

                clone.find(".item").eq(1).append(value.eq(0).clone());
                clone.find(".item").eq(1).append(value.eq(1).clone());
                clone.find(".item").eq(1).append(value.eq(2).clone());
                clone.find(".item").eq(1).append(value.eq(3).clone());

                clone.find(".item").eq(2).append(value.eq(0).clone());
                clone.find(".item").eq(2).append(value.eq(1).clone());
                clone.find(".item").eq(2).append(value.eq(2).clone());
                clone.find(".item").eq(2).append(value.eq(3).clone());

                clone.find(".item").eq(3).append(value.eq(0).clone());
                clone.find(".item").eq(3).append(value.eq(1).clone());
                clone.find(".item").eq(3).append(value.eq(2).clone());
                clone.find(".item").eq(3).append(value.eq(3).clone());
                clone.show();
            }

        } else {
            clone.find(".label").remove();
            clone.find(".item").html('');
            clone.hide();
        }
    }).scroll();

    $(document).on("click", ".search-compare .delete", function () {
        var item = $(this).closest(".item");
        for (var i = 0; i < compare_list.length; i++) {
            if (compare_list[i].id == item.attr("id")) {
                compare_list.splice(i, 1);
                item.remove();
                $(".results .result-car").eq(i).find("input[type='checkbox']").eq(0).prop("checked", false).parent().removeClass("checked");
                break;
            }
        }
        if (compare_list.length < 1) {
            $(".search-compare").slideUp();
        }
    });
})(jQuery);