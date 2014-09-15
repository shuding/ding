/*
 * This is the UI controller JavaScript file of Ding.app
 * Create by quietshu@gmail.com at 2014.9.14
 * */
var ui = {
    /* controll function timing */
    wait_time: 0,
    music_info_interval: null,
    clear_wait: function () {
        ui.wait_time = 0;
        return ui;
    },
    wait: function (t) {
        ui.wait_time += t;
        return ui;
    },
    /* logo loading animation */
    logo_animation: function () {
        setTimeout(function () {
            $("#logo").addClass("play");
            var logo_sound = new Audio('./sound/logo.wav');
            logo_sound.play();
        }, ui.wait_time);
        return ui;
    },
    logo_fix_animation: function () {
        setTimeout(function () {
            $("#logo").removeClass("play").addClass("fix");
        }, ui.wait_time);
        return ui;
    },
    /* background animation */
    background_animation: function () {
        setTimeout(function () {
            $("#background").addClass("play");
        }, ui.wait_time);
        return ui;
    },
    /* navigation animation */
    navigation_load: function () {
        setTimeout(function () {
            $("#navigation").addClass("play");
            var lis = $("#nav_list li");
            var last_scroll_pos = 0;
            var height = $("#nav_list")[0].scrollHeight - 350;
            var inner_scroll_top;
            for(var i = 0; i < lis.length; ++i) {
                setTimeout(function (li) {
                    $(li).removeClass("hide");
                    setTimeout(function () {
                        $(li).addClass("scroll");
                    }, 800);
                }, 100 * i, lis[i]);
            }
            var scroll_animation = function () {
                var scroll_dis = $(this).scrollTop();
                //$("#nav_list").css("-webkit-transform", "translateY(" + scroll_dis + "px)");
                var pos = Math.floor(($(this).scrollTop() / 500.) * (lis.length - 5));
                inner_scroll_top = pos * 73;
                if(pos == last_scroll_pos)
                    return;
                for(var i = 0; i < lis.length; ++i) {
                    var li = lis[i];
                    var delay = 0;
                    if(pos > last_scroll_pos) {
                        if (i >= last_scroll_pos)
                            delay = (i - last_scroll_pos) * 50;
                        else
                            delay = 0;
                    }
                    else {
                        if (i <= last_scroll_pos + 4)
                            delay = (last_scroll_pos + 4 - i) * 50;
                        else
                            delay = 0;
                    }
                    setTimeout(function (li) {
                        $(li).css("-webkit-transform", "translateY(-" + inner_scroll_top + "px)");
                    }, delay, li);
                }
                last_scroll_pos = pos;
            };
            $("#scrollbar_container").scroll(scroll_animation).click(function (event) {
                var pos = Math.floor((event.pageY - 50) / 73) + last_scroll_pos;
            });
        }, ui.wait_time);
        return ui;
    },
    /* tableview animation */
    tableview_load: function (musics) {
        for(var i = 0; i < musics.length; ++i) {
            var cover_element = $("<li id='song_cover_" + i + "' class='song_cover hide'></li>");
            cover_element.css("background-image", "url(" + musics[i].picture + ")");
            if(i % 2)
                $("#right_cover_list").append(cover_element);
            else
                $("#left_cover_list").append(cover_element);
        }
        setTimeout(function () {
            $("#tableview").addClass("play");
            var left_covers = $("#left_cover_list .song_cover"),
                right_covers = $("#right_cover_list .song_cover");
            for(var i = 0; i < left_covers.length; ++i) {
                setTimeout(function (cover) {
                    cover.removeClass("hide");
                    setTimeout(function () {
                        cover.addClass("scroll");
                    }, 800);
                }, i * 200, $(left_covers[i]));
            }
            for(var i = 0; i < right_covers.length; ++i) {
                setTimeout(function (cover) {
                    cover.removeClass("hide");
                    setTimeout(function () {
                        cover.addClass("scroll");
                    }, 800);
                }, i * 200 + 100, $(right_covers[i]));
            }

            /* scroll effect */
            var left_lis = $("#left_cover_list .song_cover"),
                right_lis = $("#right_cover_list .song_cover");
            var last_scroll_pos = 0;
            var height = $("#left_cover_list")[0].scrollHeight - 400;
            var inner_scroll_top;
            var scroll_animation = function () {
                var scroll_dis = $(this).scrollTop();
                var pos = Math.floor(($(this).scrollTop() / 450.) * (left_covers.length - 2));
                inner_scroll_top = pos * 200;
                if(pos == last_scroll_pos)
                    return;
                for(var i = 0; i < left_covers.length; ++i) {
                    var li = left_covers[i];
                    var delay = 0;
                    if(pos > last_scroll_pos) {
                        if (i >= last_scroll_pos)
                            delay = (i - last_scroll_pos) * 80;
                        else
                            delay = 0;
                    }
                    else {
                        if (i <= last_scroll_pos + 4)
                            delay = (last_scroll_pos + 4 - i) * 80;
                        else
                            delay = 0;
                    }
                    setTimeout(function (li) {
                        $(li).css("-webkit-transform", "translateY(-" + inner_scroll_top + "px) translateZ(0)");
                    }, delay, li);
                }
                for(var i = 0; i < right_covers.length; ++i) {
                    var li = right_covers[i];
                    var delay = 0;
                    if(pos > last_scroll_pos) {
                        if (i >= last_scroll_pos)
                            delay = (i - last_scroll_pos) * 80;
                        else
                            delay = 0;
                    }
                    else {
                        if (i <= last_scroll_pos + 4)
                            delay = (last_scroll_pos + 4 - i) * 80;
                        else
                            delay = 0;
                    }
                    setTimeout(function (li) {
                        $(li).css("-webkit-transform", "translateY(-" + inner_scroll_top + "px) translateZ(0)");
                    }, delay + 80, li);
                }
                last_scroll_pos = pos;
            };
            $("#tableview_scrollbar_container").scroll(scroll_animation).mousedown(function (event) {
                var pos = Math.floor(event.pageY / 200) + last_scroll_pos;
                var pos_x = (event.pageX < 300) ? 0 : 1;
                var no = pos * 2 + pos_x;
                $("#song_cover_" + no).addClass("pressdown");
                setTimeout(function () {
                    $("#song_cover_" + no).removeClass("pressdown");
                }, 1000);
            }).click(function (event) {
                if(moved) {
                    event.preventDefault();
                    return;
                }
                var pos = Math.floor(event.pageY / 200) + last_scroll_pos;
                var pos_x = (event.pageX < 300) ? 0 : 1;
                var no = pos * 2 + pos_x;
                content().change_play_no(no);
                ui.change_app_background(musics[no].picture);
            });

        }, ui.wait_time);
        return ui;
    },
    scroll_to_id: function (id) {
        var pos = Math.floor(id / 2);
    },
    /* tabbar load animation */
    tabbar_load: function () {
        setTimeout(function () {
            $("#tabbar").addClass("play");
            $("#play_btn").mousedown(function (event) {
                var btn_parent = $($(".tabbar_icon")[0]);
                btn_parent.addClass("active").attr("data-active", "true");
                setTimeout(function () {
                    if(btn_parent.attr("data-active") == "delay") {
                        btn_parent.removeClass("active").attr("data-active", "false");
                        return;
                    }
                    btn_parent.attr("data-active", "false");
                }, 500);
            }).mouseup(function (event) {
                var btn_parent = $($(".tabbar_icon")[0]);
                if(btn_parent.attr("data-active") == "true") {
                    btn_parent.attr("data-active", "delay");
                    return;
                }
                btn_parent.removeClass("active").attr("data-active", "false");
            }).mouseleave(function (event) {
                var btn_parent = $($(".tabbar_icon")[0]);
                btn_parent.removeClass("active").attr("data-active", "false");
            }).click(function (event) {
                if(moved) {
                    event.preventDefault();
                    return;
                }
                content().toggle_play();
            });
            $("#prev_btn, #next_btn").mousedown(function (event) {
                var btn = $(this), btn_parent = $($("#tabbar .tabbar_icon")[1]);
                btn_parent.addClass("active active_" + btn.attr("id")).attr("data-active", "true");
                setTimeout(function () {
                    if(btn_parent.attr("data-active") == "delay") {
                        btn_parent.removeClass("active active_" + btn.attr("id")).attr("data-active", "false");
                        return;
                    }
                    btn_parent.attr("data-active", "false");
                }, 500);
            }).mouseup(function (event) {
                var btn = $(this), btn_parent = $($("#tabbar .tabbar_icon")[1]);
                if(btn_parent.attr("data-active") == "true") {
                    btn_parent.attr("data-active", "delay");
                    return;
                }
                btn_parent.removeClass("active active_" + btn.attr("id")).attr("data-active", "false");
            }).mouseleave(function (event) {
                var btn = $(this), btn_parent = $($("#tabbar .tabbar_icon")[1]);
                btn_parent.removeClass("active active_" + btn.attr("id")).attr("data-active", "false");
            }).click(function (event) {
                if(moved) {
                    event.preventDefault();
                    return;
                }
            });
            $("#play_mode_btn").mousedown(function (event) {
                var btn_parent = $($("#tabbar .tabbar_icon")[2]);
                btn_parent.addClass("active").attr("data-active", "true");
                setTimeout(function () {
                    if (btn_parent.attr("data-active") == "delay") {
                        btn_parent.removeClass("active").attr("data-active", "false");
                        return;
                    }
                    btn_parent.attr("data-active", "false");
                }, 500);
            }).mouseup(function (event) {
                var btn_parent = $($("#tabbar .tabbar_icon")[2]);
                if(btn_parent.attr("data-active") == "true") {
                    btn_parent.attr("data-active", "delay");
                    return;
                }
                btn_parent.removeClass("active").attr("data-active", "false");
            }).mouseleave(function (event) {
                var btn_parent = $($("#tabbar .tabbar_icon")[2]);
                btn_parent.removeClass("active").attr("data-active", "false");
            }).click(function (event) {
                if(moved) {
                    event.preventDefault();
                    return;
                }
                content().change_play_mode();
            });
        }, ui.wait_time);
        return ui;
    },
    /* control buttons load animation */
    control_btn_load: function () {
        setTimeout(function () {
            $("#close_btn").addClass("play").click(function (event) {
                if(moved) {
                    event.preventDefault();
                    return;
                }
                if(MacGap)
                    MacGap.terminate();
            });
            setTimeout(function () {
                $("#mute_btn").addClass("play");
            }, 100);
        }, ui.wait_time);
        return ui;
    },
    /* set the main background */
    set_app_background: function (img_src) {
        if(!img_src)
            return ui;
        setTimeout(function () {
            // removed  " #tabbar .tabbar_icon span "
            $("#logo, #control_btns > div").addClass("drop_shadow");
            $("#tableview").css("background", "rgba(0, 0, 0, .1)");
            $("#content").addClass("blur_bg");
            $("#background").addClass("blur_bg").css({
                "background-image": "url(" + img_src + ")"
            });
        }, ui.wait_time);
        return ui;
    },
    change_app_background: function (img_src) {
        $("#background").css("background-color", "#fff");
        setTimeout(function () {
            $("#background").css({
                "background-image": "url(" + img_src + ")",
                "background-color": "rgba(255, 255, 255, 0.15)"
            });
        } ,500);
        return ui;
    },
    /* move music info field text */
    music_info_animation: function () {
        if(ui.music_info_interval != null)
            clearInterval(ui.music_info_interval);
        var move_func = function (span) {
            var width = span[0].scrollWidth,
                c_width = span.width();
            if(width <= c_width)
                return;
            (ui.music_info_interval = function (span) {
                span.animate({
                    scrollLeft: (width - c_width) + "px"
                }, 3000, 'linear');
                setTimeout(function (span) {
                    span.animate({
                        scrollLeft: 0
                    }, 3000, 'linear');
                }, 5000, span);
            })(span);
            setInterval(ui.music_info_interval, 10000, span);
        };
        move_func($("#song_info_title"));
    }
}