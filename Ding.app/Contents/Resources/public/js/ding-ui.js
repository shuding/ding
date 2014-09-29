/*
 * This is the UI controller JavaScript file of Ding.app
 * Create by quietshu@gmail.com at 2014.9.14
 * */
var ui = {
    /* controll function timer */
    wait_time: 0,
    music_info_interval: null,
    height: 0,
    expanded: false,
    expand_id: 0,
    info_bar_expanded: false,
    info_expanded: false,
    last_scroll_pos: 0,

    clear_wait: function () {
        ui.wait_time = 0;
        return ui;
    },
    load_channels: function () {
        var channel_parent_el = $("#nav_list").html("");
        $($("#nav_list li")[0]).removeClass("channel_active");
        for(var i = 0; i < channels.length; ++i) {
            channel_parent_el.append($('<li class="hide"><span>' + channels[i]["name"] + '</span></li>'));
        }
        channel_parent_el.append($('<li class="hide list_end"><span>E.N.D</span></li>'));
        $($("#nav_list li")[0]).addClass("channel_active");
        return ui;
    },
    wait: function (t) {
        ui.wait_time += t;
        return ui;
    },
    /* front layer animation */
    layer_load: function () {
        if(authed) {
            $("#email").val(user_email);
            $("#title").html("登出豆瓣<span style='width: .1em'></span>FM");
            $("#password").val("").hide();
            $("#login_btn").html("logout");
        }
        else {
            $("#title").html("登陆豆瓣<span style='width: .1em'></span>FM");
            $("#password").css("display", "initial");
            $("#login_btn").html("login");
        }
        setTimeout(function () {
            $("h1#logo").addClass("layer");
            setTimeout(function () {
                $("#login_form").addClass("play");
                layer_expanded = true;
            }, 400);
        }, ui.wait_time);
        return ui;
    },
    layer_unload: function () {
        setTimeout(function () {
            $("h1#logo").animate({
                "opacity": 0
            }, 400);
            setTimeout(function () {
                $("#login_form").removeClass("play");
                $("h1#logo").removeClass("layer").animate({
                    "opacity": 1
                }, 400);
                layer_expanded = false;
            }, 400);
        }, ui.wait_time);
        return ui;
    },
    /* logo loading animation */
    logo_animation: function () {
        setTimeout(function () {
            $("#logo").addClass("play");
            //var logo_sound = new Audio('./sound/logo.wav');
            //logo_sound.play();
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
                if(pos === last_scroll_pos) {
                    return;
                }
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
            $("#scrollbar_container").unbind("scroll").unbind("click").bind("scroll", scroll_animation).bind("click", function (event) {
                if(moved) {
                    event.preventDefault();
                    return;
                }
                var pos = Math.floor((event.pageY - 50) / 73) + last_scroll_pos;
                $(".channel_active").removeClass("channel_active");
                $($("#nav_list li")[pos]).addClass("channel_active");
                ui.default_info_bar();
                content().load_channel(pos);
            });
        }, ui.wait_time);
        return ui;
    },
    /* color theif */
    color_theif: function () {
        for(var i = 0; i < musics.length; ++i) {
            var img = new Image();
            img.src = musics[i].picture;
            img.style.width = img.style.height = "200px";
            img.dataset.num = i;
            img.onload = function () {
                // TODO
                var ct = new ColorThief();
                musics[this.dataset.num].color = ct.getPalette(this, 8);
            };
            img.onerror = function () {
                console.log("image 503");
                this.onerror = null;
                this.src = this.src + "#reload";
            }
        }
        return ui;
    },
    /* tableview animation */
    tableview_load: function (musics) {
        ui.expanded = false;
        ui.last_scroll_pos = 0;
        $("#tableview_scrollbar_container").scrollTop(0);

        for(var i = 0; i < musics.length; ++i) {
            var cover_element = $("<li id='song_cover_" + i + "' class='song_cover hide'></li>");
            cover_element.css("background-image", "url(" + musics[i].picture + ")");
            if(i % 2)
                $("#right_cover_list").append(cover_element);
            else
                $("#left_cover_list").append(cover_element);
        }
        ui.height = musics.length / 2;

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
            ui.last_scroll_pos = 0;
            var height = $("#left_cover_list")[0].scrollHeight - 400;
            var inner_scroll_top;
            var show_control_btn = false;
            ui.scroll_animation = function () {
                var scroll_dis = $(this).scrollTop();
                var pos = Math.floor(($(this).scrollTop() / 450.) * (ui.height - 2));
                inner_scroll_top = pos * 200;
                if(pos == ui.last_scroll_pos)
                    return;
                var delta = 0;
                for(var i = 0; i < left_covers.length; ++i) {
                    var li = left_covers[i];
                    var delay = 0;
                    if($(li).attr("data-delay-delta"))
                        delta = (+$(li).attr("data-delay-delta"));
                    if(pos > ui.last_scroll_pos) {
                        if (i + delta >= ui.last_scroll_pos) {
                            delay = (i + delta - ui.last_scroll_pos) * 80;
                        }
                        else
                            delay = 0;
                    }
                    else {
                        if (i + delta <= ui.last_scroll_pos + 4) {
                            delay = (ui.last_scroll_pos + 4 - i - delta) * 80;
                        }
                        else
                            delay = 0;
                    }
                    setTimeout(function (li) {
                        $(li).css("-webkit-transform", "translateY(-" + inner_scroll_top + "px) translateZ(0)");
                    }, delay, li);
                }
                delta = 0;
                for(var i = 0; i < right_covers.length; ++i) {
                    var li = right_covers[i];
                    var delay = 0;
                    if($(li).attr("data-delay-delta"))
                        delta = (+$(li).attr("data-delay-delta"));
                    if(pos > ui.last_scroll_pos) {
                        if (i + delta >= ui.last_scroll_pos)
                            delay = (i + delta - ui.last_scroll_pos) * 80;
                        else
                            delay = 0;
                    }
                    else {
                        if (i + delta <= ui.last_scroll_pos + 4)
                            delay = (ui.last_scroll_pos + 4 - i - delta) * 80;
                        else
                            delay = 0;
                    }
                    setTimeout(function (li) {
                        $(li).css("-webkit-transform", "translateY(-" + inner_scroll_top + "px) translateZ(0)");
                    }, delay + 90, li);
                }
                ui.last_scroll_pos = pos;
                if(ui.expanded &  pos != Math.floor(ui.expand_id / 2))
                    ui.default_info_bar();
                else if(ui.expanded)
                    ui.expand_info_bar();
            };

            $("#tableview_scrollbar_container").unbind("scroll").unbind("mousedown").unbind("click").bind("scroll", ui.scroll_animation).bind("mousedown", function (event) {
                var pos = Math.floor(event.pageY / 200) + ui.last_scroll_pos;
                var pos_x = (event.pageX < 300) ? 0 : 1;
                var no = pos * 2 + pos_x;
                if(ui.expanded) {
                    var expand_line =  Math.floor(ui.expand_id / 2);
                    if (expand_line <= pos) {
                        if (pos == expand_line) {
                            if (pos_x != (ui.expand_id % 2)) {
                                if(pos_x % 2 == 0)
                                    no += 1;
                                else
                                    no -= 1;
                            }
                        }
                        else if (pos == expand_line + 1 && pos_x != (ui.expand_id % 2)) {
                            if (ui.expand_id % 2 == 1)
                                no -= 1;
                            else
                                no -= 3;
                        }
                        else if (pos_x == (ui.expand_id % 2))
                            no -= 2;
                        else
                            no -= 4;
                    }
                }
                $("#song_cover_" + no).addClass("pressdown");
                setTimeout(function () {
                    $("#song_cover_" + no).removeClass("pressdown");
                }, 1000);
            }).bind("click", function (event) {
                if(moved) {
                    event.preventDefault();
                    return;
                }

                if(ui.expanded && ui.expand_id == ui.last_scroll_pos * 2) {
                    if(event.pageY >= 300) {

                    }
                }

                var pos = Math.floor(event.pageY / 200) + ui.last_scroll_pos;
                var pos_x = (event.pageX < 300) ? 0 : 1;
                var no = pos * 2 + pos_x;
                if(ui.expanded) {
                    var expand_line =  Math.floor(ui.expand_id / 2);
                    if (expand_line <= pos) {
                        if (pos == expand_line) {
                            if (pos_x != (ui.expand_id % 2)) {
                                if(pos_x % 2 == 0)
                                    no += 1;
                                else
                                    no -= 1;
                            }
                        }
                        else if (pos == expand_line + 1 && pos_x != (ui.expand_id % 2)) {
                            if (ui.expand_id % 2 == 1)
                                no -= 1;
                            else
                                no -= 3;
                        }
                        else if (pos_x == (ui.expand_id % 2))
                            no -= 2;
                        else
                            no -= 4;
                    }
                }
                if(content().change_play_no(no)) {
                    if(ui.expanded)
                        ui.back_to_default_cover();
                    ui.expand_cover(no);
                    ui.change_app_background(musics[no].picture);
                }
                else {
                    if(ui.expanded)
                        ui.back_to_default_cover();
                    else {
                        ui.expand_cover(no);
                    }
                }
            });
        }, ui.wait_time);
        return ui;
    },
    scroll_to_pos: function (pos) {
        if(pos == ui.last_scroll_pos)
            return ui;
        $("#tableview_scrollbar_container").scrollTop(Math.ceil(450 * (pos) / (ui.height - 2)));
        var inner_scroll_top = pos * 200;
        $("#left_cover_list .song_cover, #right_cover_list .song_cover").addClass("ease_scroll")
            .css("-webkit-transform", "translateY(-" + inner_scroll_top + "px) translateZ(0)");
        setTimeout(function () {
            $("#left_cover_list .song_cover, #right_cover_list .song_cover").removeClass("ease_scroll");
        }, 800);
        ui.last_scroll_pos = pos;
        return ui;
    },
    /* remove musics animation */
    remove_musics: function (callback) {
        music_now = {};
        $("#left_cover_list .song_cover").addClass("ease_scroll")
            .css("-webkit-transform", "translateY(-" + ((ui.height + 3) * 200) + "px) translateZ(0)");
        $("#right_cover_list .song_cover").addClass("ease_scroll")
            .css("-webkit-transform", "translateY(-" + ((ui.height + 4) * 200) + "px) translateZ(0)");
        setTimeout(function (callback) {
            callback();
        }, 800, callback);
    },
    /* expand the song cover animation */
    back_to_default_cover: function (need_toggle_info_bar) {
        if(need_toggle_info_bar !== false)
            ui.default_info_bar();
        if(!ui.expanded)
            return false;
        ui.expanded = false;
        var left_lis = $("#left_cover_list .song_cover"),
            right_lis = $("#right_cover_list .song_cover");
        $("#cover_control_icons").removeClass("play");
        if(ui.expand_id % 2) {
            var left_pos = Math.floor(ui.expand_id / 2);
            var right_pos = left_pos + 1;
            $(right_lis[left_pos]).removeClass("expand");
            if(right_pos < right_lis.length)
                $(right_lis[right_pos]).attr("data-delay-delta", "0");
            if(left_pos < left_lis.length)
                $(left_lis[left_pos]).css("margin-top", "0").attr("data-delay-delta", "0");
        }
        else {
            var right_pos = Math.floor(ui.expand_id / 2);
            var left_pos = right_pos + 1;
            $(left_lis[right_pos]).removeClass("expand");
            if(left_pos < left_lis.length)
                $(left_lis[left_pos]).attr("data-delay-delta", "0");
            if(right_pos < right_lis.length)
                $(right_lis[right_pos]).css("margin-top", "0").attr("data-delay-delta", "0");
        }
        ui.height = left_lis.length;
        return true;
    },
    expand_info_bar: function () {
        ui.info_bar_expanded = true;
        $("#tabbar_info_btn").addClass("expand");
        setTimeout(function () {
            $("#tabbar_info_btn").removeClass("uihover");
        }, 500);
    },
    default_info_bar: function () {
        ui.info_bar_expanded = false;
        $("#tabbar_info_btn").removeClass("expand")
        setTimeout(function () {
            $("#tabbar_info_btn").removeClass("uihover");
        }, 500);
    },
    toggle_info_bar: function () {
        if(ui.info_bar_expanded)
            ui.default_info_bar();
        else
            ui.expand_info_bar();
    },
    expand_cover: function (id) {
        if(ui.expanded)
            return false;
        var left_lis = $("#left_cover_list .song_cover"),
            right_lis = $("#right_cover_list .song_cover");
        $("#cover_control_icons").addClass("play");
        var left_pos, right_pos;
        if(id % 2) {
            left_pos = Math.floor(id / 2);
            right_pos = left_pos + 1;
            $(right_lis[left_pos]).addClass("expand");
            if(right_pos < right_lis.length)
                $(right_lis[right_pos]).attr("data-delay-delta", "1");
            if(left_pos < left_lis.length)
                $(left_lis[left_pos]).css("margin-top", "400px").attr("data-delay-delta", "2");
            ui.height = left_lis.length + 2;
        }
        else {
            right_pos = Math.floor(id / 2);
            left_pos = right_pos + 1;
            $(left_lis[right_pos]).addClass("expand");
            if(left_pos < left_lis.length)
                $(left_lis[left_pos]).attr("data-delay-delta", "1");
            if(right_pos < right_lis.length)
                $(right_lis[right_pos]).css("margin-top", "400px").attr("data-delay-delta", "2");
            ui.height = right_lis.length + 2;
        }
        if(Math.floor(id / 2) != ui.last_scroll_pos) {
            setTimeout(function () {
                ui.scroll_to_pos(Math.floor(id / 2));
            }, 400);
        }
        ui.expanded = true;
        ui.expand_id = id;
        setTimeout(ui.expand_info_bar, 300);
        return ui;
    },
    /* tabbar load animation */
    tabbar_load: function () {
        setTimeout(function () {
            $("#tabbar").addClass("play");
            /*
            $("#play_btn, #prev_next_btn, #play_mode_btn").mouseenter(function () {
                $(this).addClass("hover");
            }).mouseleave(function () {
                $(this).removeClass("hover");
            });
            */
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
                if(ui.expanded)
                    ui.back_to_default_cover(false);
                if($(this).attr("id") == "prev_btn")
                    content().prev_song();
                else
                    content().next_song();
                ui.expand_cover(music_now_id);
                ui.change_app_background(musics[music_now_id].picture);
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
            $("#song_info").mousedown(function (event) {
                var btn_parent = $($("#tabbar .tabbar_icon")[3]);
                btn_parent.addClass("active").attr("data-active", "true");
                setTimeout(function () {
                    if (btn_parent.attr("data-active") == "delay") {
                        btn_parent.removeClass("active").attr("data-active", "false");
                        return;
                    }
                    btn_parent.attr("data-active", "false");
                }, 500);
            }).mouseup(function (event) {
                var btn_parent = $($("#tabbar .tabbar_icon")[3]);
                if(btn_parent.attr("data-active") == "true") {
                    btn_parent.attr("data-active", "delay");
                    return;
                }
                btn_parent.removeClass("active").attr("data-active", "false");
            }).mouseleave(function (event) {
                var btn_parent = $($("#tabbar .tabbar_icon")[3]);
                btn_parent.removeClass("active").attr("data-active", "false");
                if($("#tabbar_info_btn").attr("data-click") !== "true")
                    $("#tabbar_info_btn").removeClass("uihover");
            }).mouseenter(function (event) {
                $("#tabbar_info_btn").addClass("uihover");
            }).click(function (event) {
                $("#tabbar_info_btn").attr("data-click", "true");
                setTimeout(function () {
                    $("#tabbar_info_btn").attr("data-click", "false");
                }, 500);
                if(moved) {
                    event.preventDefault();
                    return;
                }
                if (!ui.expand_cover(music_now_id)) {
                    if (Math.floor(music_now_id / 2) == ui.last_scroll_pos)
                        ui.toggle_info_bar();
                    else {
                        ui.expand_info_bar();
                        ui.scroll_to_pos(Math.floor(music_now_id / 2));
                    }
                }
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
    set_app_background: function (img_src, s) {
        if(!img_src)
            return ui;
        setTimeout(function () {
            // removed  " #tabbar .tabbar_icon span "
            $("#logo, #control_btns > div").addClass("drop_shadow");
            $("#tableview").css("background", "rgba(0, 0, 0, .1)");
            $("#content").addClass("blur_bg");
            if(s)
                $("#background").addClass("blur_bg").css({
                    "background-color": img_src
                });
            else
                $("#background").addClass("blur_bg").css({
                    "background-image": "url(" + img_src + ")",
                    "background-color": "rgba(255, 255, 255, 0.15)"
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
        move_func($("#song_info_artist"));
        move_func($("#album_title"));
    },
    /* toggle the information of album */
    hide_info: function () {
        if(ui.info_expanded)
            $("#album_info").removeClass("show");
        return ui;
    },
    toggle_info: function () {
        if(ui.info_expanded) {
            $("#album_info").removeClass("show");
        }
        else {
            $("#album_info").html(musics[music_now_id].info).addClass("show");
        }
        ui.info_expanded = !ui.info_expanded;
        return ui;
    }
}