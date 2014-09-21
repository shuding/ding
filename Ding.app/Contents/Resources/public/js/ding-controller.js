/*
 * This is the logic controller JavaScript file of Ding.app
 * Create by quietshu@gmail.com at 2014.9.14
 * */

var channels = [];
var window_pos = [], drag_pos = [], on_drag = false, moved = false;
var music_playing = false, play_mode = 0, music_now = {}, music_now_id = 0, volume = 0.5;
var music_audio_object = null;
var content_scope;
var update_current_time_interval;

var app = angular.module("ding", []);

function content($scope) {
    if($scope)
        content_scope = $scope;

    if(content_scope) {
        if (content_scope.playing === undefined)
            content_scope.playing = music_playing;
        if (content_scope.play_mode === undefined)
            content_scope.play_mode = play_mode;
        if (content_scope.music_now === undefined)
            content_scope.music_now = music_now;
        if (content_scope.time_formart === undefined)
            content_scope.time_formart = function (s) {
                if(s === undefined)
                    return "0:00";
                var m = Math.floor((+s) / 60);
                s = (+s) % 60;
                s = s < 10 ? ("0" + s) : s;
                return m + ":" + s;
            };
    }

    var require_login_func = function (callback) {
        // init model
        music_audio_object = new Audio("");
        $(music_audio_object).bind("canplay", function () {
            music_audio_object.currentTime = musics[music_now_id].current_time | 0;
            ui.music_info_animation();
            play_music();
        }).bind("ended", function () {
            if(play_mode == 0) {
                next_song_func();
                if(ui.expanded)
                    ui.back_to_default_cover();
                ui.expand_cover(music_now_id);
                ui.change_app_background(musics[music_now_id].picture);
            }
            else if(play_mode == 1) {
                this.currentTime = 0;
                this.play();
            }
        });

        network.get_musics(function () {
            // load UI
            network.load_channels(ui.load_channels);

            ui.color_theif().clear_wait().logo_animation().wait(2300).background_animation().wait(400).logo_fix_animation()
                .wait(200).navigation_load().wait(200).tableview_load(musics).wait(400).tabbar_load()
                .wait(200).control_btn_load().set_app_background(musics[0].picture).wait(400).layer_load();

            $("#login_form").submit(function () {
                network.auth($("#email").val(), $("#password").val(), function () {
                    ui.clear_wait().layer_unload();
                    setTimeout(function () {
                        ui.expand_cover(0);
                        change_play_no_func(0);
                    }, 400);
                });
            });
            // play music automatic
            /*
            setTimeout(function () {
                ui.expand_cover(0);
                change_play_no_func(0);
            }, ui.wait_time + 400);
            */
        });

        drag_func();
    };

    var load_func = function () {
        // init model
        music_audio_object = new Audio("");
        $(music_audio_object).bind("canplay", function () {
            music_audio_object.currentTime = musics[music_now_id].current_time | 0;
            ui.music_info_animation();
            play_music();
        }).bind("ended", function () {
            console.log("ended");
            network.post_end_of_song(music_now.sid);
            if(play_mode == 0) {
                next_song_func();
                if(ui.expanded)
                    ui.back_to_default_cover();
                ui.expand_cover(music_now_id);
                ui.change_app_background(musics[music_now_id].picture);
            }
            else if(play_mode == 1) {
                this.currentTime = 0;
                this.play();
            }
        });

        channel_now = -3;
        network.get_musics(function () {
            // load UI
            network.load_channels(function() {
                ui.load_channels();

                ui.color_theif().clear_wait().logo_animation().wait(2300).background_animation().wait(400).logo_fix_animation()
                    .wait(200).navigation_load().wait(200).tableview_load(musics).wait(400).tabbar_load()
                    .wait(200).control_btn_load().set_app_background(musics[0].picture);

                // play music automatic
                setTimeout(function () {
                    ui.expand_cover(0);
                    change_play_no_func(0);
                }, ui.wait_time + 400);
            });
        });
    };
    var drag_func = function () {
        if(MacGap === undefined)
            return;
        on_drag = false;
        window_pos = [Math.abs(MacGap.Window.x), Math.abs(MacGap.Window.y)];
        $(document).mousedown(function (event) {
            on_drag = true;
            moved = false;
            drag_pos = [event.pageX, event.pageY];
        }).mouseup(function (event) {
            on_drag = false;
        }).mouseleave(function () {
            on_drag = false;
        }).mousemove(function (event) {
            if(on_drag) {
                moved = true;
                var dx = event.pageX - drag_pos[0],
                    dy = event.pageY - drag_pos[1];

                window_pos[0] += dx;
                window_pos[1] -= dy;
                MacGap.Window.move(window_pos[0], window_pos[1]);
            }
        });
    };
    var update_current_time = function () {
        if(!music_playing) {
            clearInterval(update_current_time_interval);
            return;
        }
        musics[music_now_id].current_time = music_now.current_time = Math.floor(music_audio_object.currentTime);
        $("#song_cover_" + music_now_id + " .song_progress_bar_inner").css("-webkit-transform", "scaleX(" + music_now.current_time / music_now.length + ")");
        content_scope.$apply();
    };
    var play_music = function () {
        music_playing = true;
        content_scope.playing = true;
        music_audio_object.volume = volume;
        music_audio_object.play();
        content_scope.$apply();

        update_current_time_interval = setInterval(update_current_time, 1000);
    };
    var pause_music = function () {
        content_scope.$apply();
        clearInterval(update_current_time_interval);
        musics[music_now_id].current_time = music_audio_object.currentTime;
        $(music_audio_object).animate({ volume: 0 }, 300);
        setTimeout(function () {
            music_audio_object.pause();
        }, 300);
    };
    var load_music = function (no) {
        music_audio_object.src = musics[no].url;

    };
    var toggle_play_func = function () {
        music_playing = !music_playing;
        content_scope.playing = music_playing;
        if(music_playing)
            play_music();
        else
            pause_music();
        if(music_playing)
            ui.clear_wait().music_info_animation();
    };
    var change_play_mode_func = function () {
        play_mode = (play_mode + 1) % 3;
        content_scope.play_mode = play_mode;
        content_scope.$apply();
    };
    var change_play_no_func = function (no) {
        if(music_now === musics[no])
            return false;
        music_now_id = no;
        music_now = musics[no];
        content_scope.music_now = music_now;
        music_playing = false;
        content_scope.playing = music_playing;
        load_music(no);
        ui.clear_wait().music_info_animation();
        return true;
    };
    var prev_song_func = function () {
        change_play_no_func((music_now_id + musics.length - 1) % musics.length);
    };
    var next_song_func = function () {
        change_play_no_func((music_now_id + 1) % musics.length);
    };
    var load_channel_func = function (id) {
        pause_music();
        ui.clear_wait().wait(500).set_app_background("#fff", true);
        setTimeout(function () {
            ui.remove_musics(function () {
                $("#left_cover_list, #right_cover_list").html("");
                musics = [];
                channel_now = channels[id]["channel_id"];
                network.get_musics(function () {
                    ui.clear_wait().color_theif().tableview_load(musics).wait(500);
                    setTimeout(function () {
                        ui.clear_wait().expand_cover(0).wait(500).set_app_background(musics[0].picture);
                        change_play_no_func(0);
                    }, ui.wait_time + 400);
                });
            });
        }, 800);
    };

    var ret_obj = {
        load: load_func,
        bind_drag: drag_func,
        toggle_play: toggle_play_func,
        change_play_mode: change_play_mode_func,
        change_play_no: change_play_no_func,
        prev_song: prev_song_func,
        next_song: next_song_func,
        require_login: require_login_func,
        load_channel: load_channel_func
    };
    return ret_obj;
};

app.controller("content", content);