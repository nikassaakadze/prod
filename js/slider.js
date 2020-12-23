(window.myNameSpace = window.myNameSpace || {}),
    $(function () {
        function e(e, t) {
            (element_width = e.width()), (scroll_left = $(".wrapper")[0].scrollLeft), "next" == t ? $(".wrapper")[0].scrollTo(scroll_left + element_width, 0) : "prev" == t && $(".wrapper")[0].scrollTo(scroll_left - element_width, 0);
        }
        function t() {
            clearInterval(r), (r = setInterval());
            var a = $(".selected"),
                l = $(".counter");
            0 != a.next().length
                ? (l.text(a.index() + 1),
                  a.next().overflown() && e(a, "next"),
                  a.fadeOut(200, () => {
                      a.next().trigger("click"), a.show();
                  }))
                : ($(".thumbnail:first").trigger("click"), $(".wrapper")[0].scrollTo(0, 0), l.text("1")),
                $(".toggleDiapo").attr("src", "icons/pause_diapo.png");
        }
        ($.fn.addImage = function (e, t) {
            var r = document.createElement("img");
            (r.src = "images/" + e), (r.alt = t), (r.className = "thumbnail"), $(this).append(r);
        }),
            ($.fn.overflown = function () {
                var e = $(".wrapper").offset().left,
                    t = e + $(".wrapper").width(),
                    r = $(this[0]).offset().left;
                return r + $(this[0]).width() / 2 > t || r < e;
            });
        var r,
            a = $(".thumbnail:first").toggleClass("selected");
        $(".counter").text("1"),
            $("#preview").attr("src", a.attr("src")),
            $("#caption").text(a.attr("alt")),
            (r = setInterval(t, 3e3)),
            $(".next").on("click", t),
            $(".prev").on("click", function () {
                clearInterval(r), (r = setInterval(t, 1500));
                var a = $(".selected"),
                    l = $(".counter");
                0 != a.prev().length
                    ? (l.text(a.index() + 1), a.prev().overflown() && e(a, "prev"), a.prev().trigger("click"))
                    : ($(".thumbnail:last").trigger("click"), $(".wrapper")[0].scrollTo($(".wrapper")[0].scrollWidth, 0), l.text($(".thumbnail:last").index() + 1)),
                    $(".toggleDiapo").attr("src", "../static/icon/pause_diapo.png");
            }),
            $(".thumbnail").on("click", function (e) {
                void 0 !== e.originalEvent && ($(".toggleDiapo").attr("src", "../static/icon/pause_diapo.png"), (r = clearInterval(r))), $(".wrapper");
                var t = $(this).index();
                $(".selected").toggleClass("selected"), $(this).toggleClass("selected"), $("#caption").text($(".selected").attr("alt")), $(".counter").text(t + 1);
                var a = $(this).attr("src");
                $("#preview").fadeOut("fast", () => {
                    $("#preview").attr("src", a), $("#preview").fadeIn("fast");
                });
            }),
            $(".toggleDiapo").on("click", function () {
                (r = null != r ? clearInterval(r) : setInterval(t, 1500)), $(".toggleDiapo").attr("src"), $(".toggleDiapo").attr("src", "../static/icon/play_diapo.png");
            }),
            $(".fullscreen").on("click", function () {
                $(".toggleDiapo").attr("src", "../static/icon/play_diapo.png"), (r = clearInterval(r));
                var e = $(".selected").attr("src"),
                    t = $(".fullscreen-container");
                $(".fullscreen-div").css({ "background-image": "url(" + e + ")", "background-size": "cover" }),
                    t.fadeIn("slow"),
                    t.on("click", function () {
                        $(this).fadeOut("slow");
                    });
            });
    });
